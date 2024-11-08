const axios = require('axios');
const router = require("express").Router();
const CANVAS_API_BASE_URL = 'https://canvas.instructure.com/api/v1';

// Define a route to fetch data from the Canvas API
router.get('/list', async (req, res) => {
  try {
    const response = await axios.get(`${CANVAS_API_BASE_URL}/courses`, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_CANVAS_TOKEN}`, // Make sure to define this token in .env file
        'Accept': 'application/json',
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;  // Retrieve the 'id' parameter from the URL
//     const response = await axios.get(`https://canvas.instructure.com/api/v1/courses/${id}/enrollments`, {
//       headers: {
//         'Authorization': `Bearer ${process.env.REACT_APP_CANVAS_TOKEN}`, // Make sure to define this token in .env file
//         'Accept': 'application/json',
//       }
//     });
//     console.log(response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching courses:', error);
//     res.status(500).json({ error: 'Failed to fetch courses' });
//   }
// });
router.get('/:id', async (req, res) => {
  try {
    // Fetch basic enrollments data
    const { id } = req.params;
    const enrollmentsResponse = await axios.get(`${CANVAS_API_BASE_URL}/courses/${id}/enrollments`, {
      headers: { 'Authorization': `Bearer ${process.env.REACT_APP_CANVAS_TOKEN}`,'Accept': 'application/json', }
    });

    const enrollments = enrollmentsResponse.data;

    // Fetch analytics data for more student activity details
    const analyticsResponse = await axios.get(`${CANVAS_API_BASE_URL}/courses/${id}/analytics/student_summaries`, {
      headers: { 'Authorization': `Bearer ${process.env.REACT_APP_CANVAS_TOKEN}`,'Accept': 'application/json', }
    });

    const analyticsData = analyticsResponse.data;

    // Merge the data by matching student IDs
    const detailedEnrollments = enrollments.map((enrollment) => {
      const studentAnalytics = analyticsData.find(
        (analytics) => analytics.id === enrollment.user_id
      );
      return {
        ...enrollment,
        page_views: studentAnalytics?.page_views ?? 0,
        max_page_views: studentAnalytics?.max_page_views ?? 0,
        page_views_level:studentAnalytics?.page_views_level ?? 0,
        
        participation_count: studentAnalytics?.participations ?? 0,
        max_participation_count: studentAnalytics?.max_participations ?? 0,
        participations_level: studentAnalytics?.participations_level ?? 0,

        tardiness_breakdown_missing: studentAnalytics?.tardiness_breakdown.missing ?? 0,
        tardiness_breakdown_late: studentAnalytics?.tardiness_breakdown.late ?? 0,
        tardiness_breakdown_on_time: studentAnalytics?.tardiness_breakdown.on_time ?? 0,
        tardiness_breakdown_floating: studentAnalytics?.tardiness_breakdown.floating ?? 0,
        tardiness_breakdown_total: studentAnalytics?.tardiness_breakdown.total ?? 0,
      };
    });
    res.json(detailedEnrollments);
  } catch (error) {
    console.error('Error fetching enrollment data:', error);
    throw error;
  }
});

module.exports = router;