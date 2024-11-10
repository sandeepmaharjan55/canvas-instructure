const axios = require('axios');
const router = require("express").Router();
const CANVAS_API_BASE_URL = 'https://canvas.instructure.com/api/v1';
const NodeServer_API_BASE_URL = 'http://localhost:7004/';

// @route:  GET api/courses/list
// @desc:   get all the courses list
// @access: bearer token
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

// @route:  GET api/courses/:id
// @desc:   get the data require for the courses dashboard
// @access: bearer token

router.get('/:id', async (req, res) => {
  try {
    // Fetch basic enrollments data
    const { id } = req.params;
    const enrollmentsResponse = await axios.get(`${CANVAS_API_BASE_URL}/courses/${id}/enrollments`, {
      headers: { 'Authorization': `Bearer ${process.env.REACT_APP_CANVAS_TOKEN}`,'Accept': 'application/json', }
    });

    const enrollments = enrollmentsResponse.data;

    //to calculate the max activity time.
    // let totalActivityTimeAllStudents = 0;
    // const maxActivityTime = Math.max(...enrollments.filter((student) => student.type === 'StudentEnrollment').map(a => totalActivityTimeAllStudents=totalActivityTimeAllStudents+a.total_activity_time));
    //console.log(maxActivityTime);
    const maxActivityTime = Math.max(...enrollments.filter((student) => student.type === 'StudentEnrollment').map(a => a.total_activity_time));

    // Fetch analytics data for more student activity details
    const analyticsResponse = await axios.get(`${CANVAS_API_BASE_URL}/courses/${id}/analytics/student_summaries`, {
      headers: { 'Authorization': `Bearer ${process.env.REACT_APP_CANVAS_TOKEN}`,'Accept': 'application/json', }
    });

    const analyticsData = analyticsResponse.data;

    // Fetch analytics data for more student discussion posts
    const discussionResponse = await axios.get(`${CANVAS_API_BASE_URL}/courses/${id}/discussion_topics`, {
      headers: { 'Authorization': `Bearer ${process.env.REACT_APP_CANVAS_TOKEN}`,'Accept': 'application/json', }
    });
    const discussionData = discussionResponse.data;
    const postCounts = {};
    discussionData.forEach((entry) => {
      const userId = entry.author.id;
      postCounts[userId] = (postCounts[userId] || 0) + 1;
    });


    // Fetch analytics data for more student assignments
    const assignmentResponse = await axios.get(`${CANVAS_API_BASE_URL}/courses/${id}/assignments`, {
      headers: { 'Authorization': `Bearer ${process.env.REACT_APP_CANVAS_TOKEN}`,'Accept': 'application/json', }
    });
    const assignmentData = assignmentResponse.data;

    //to get the roll call data
    const studentRollAnalytics = assignmentData.find(
      (analytics) => analytics.name === "Roll Call Attendance"
    );
  
    const rollCallDataResponse = studentRollAnalytics?await axios.get(`${CANVAS_API_BASE_URL}/courses/${id}/assignments/${studentRollAnalytics.id}/submissions`, {
      headers: { 'Authorization': `Bearer ${process.env.REACT_APP_CANVAS_TOKEN}`,'Accept': 'application/json', }
    }):null;
      const rollCallData = rollCallDataResponse?.data || null;

      
      // const assignmentSubmissions = await Promise.all(
      //   assignmentData
      //   .filter((assignment) => assignment.name !== 'Roll Call Attendance')
      //   .map(async (assignment) => {
       
      //       // Fetch submissions for each assignment
      //       const assignmentResponse = await axios.get(
      //         `${CANVAS_API_BASE_URL}/courses/${id}/assignments/${assignment.id}/submissions`, {
      //           headers: { 'Authorization': `Bearer ${process.env.REACT_APP_CANVAS_TOKEN}`,'Accept': 'application/json', 
      //         }}
      //       );
  
      //       //const assignmentAllData = assignmentResponse.data;
           
      //       return {
      //        // assignment_id: assignment.id,
      //         submissions: assignmentResponse.data.map(submission => ({
      //           id: submission.id,
      //           assignment_id: submission.assignment_id,
      //           user_id: submission.user_id,
      //           submission_type: submission.submission_type,
      //           workflow_state: submission.workflow_state,
      //         })),
      //       };
      //     })
      // );
      // //task left total assignmnets submissions count
      // // Flatten the nested array of submissions
      // const flattenedSubmissions = assignmentSubmissions.flat();
      // //console.log(flattenedSubmissions);
      // // Count total submissions per student
      // const submissionCountsByStudent = flattenedSubmissions.reduce((acc, submission) => {
      //   console.log(submission);
      //   const user_id  = submission.user_id;
      //   acc[user_id] = (acc[user_id] || 0) + 1;  // Increment count for each user
      //   return acc;
      // }, {});

      // //console.log(assignmentSubmissions[0].submissions[0].user_id);
      // console.log(submissionCountsByStudent);



      // const responsePrediction = await axios.post(
      //   `${NodeServer_API_BASE_URL}api/predictions/predict`,
      //   {
      //     totalActivity: 1000,
      //     attendance: 30,
      //     participation: 10,
      //     pageViews: 10,
      //     discussionCount: 2,
      //     currentGrade: 40,
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json', // Set the content type to JSON
      //     },
      //   }
      // );
      // console.log(responsePrediction.data);


    // Merge the data by matching student IDs
    const detailedEnrollments = enrollments.map((enrollment) => {
      const studentAnalytics = analyticsData.find(
        (analytics) => analytics.id === enrollment.user_id
      );
      const rollCallAnalytics = rollCallData?rollCallData.find(
        (analytics) => analytics.user_id === enrollment.user_id
      ):null;

      const activityPData = enrollment?((enrollment.total_activity_time / maxActivityTime) * 100).toFixed(2):0;
     
      // const assignmentAnalytics = assignmentSubmissions.find(
      //   (analytics) => analytics.user_id === enrollment.user_id
      // );
      // let totalDiscussionTimeAllStudents = 0;                                          
      // const maxDiscussionCount = Math.max(...enrollments.filter((student) => student.type === 'StudentEnrollment').map(
      //   a =>
      //     totalDiscussionTimeAllStudents = totalDiscussionTimeAllStudents + postCounts[a.user_id]?postCounts[a.user_id]:0));
      const maxDiscussionCount = Math.max(...enrollments.filter((student) => student.type === 'StudentEnrollment').map(a =>postCounts[a.user_id]?postCounts[a.user_id]:0));
      //postCounts[a.user_id]?postCounts[a.user_id]:0
      //postCounts[a.user_id]?postCounts[a.user_id]:0
      // console.log(assignmentAnalytics);

      const participationPercent=(((studentAnalytics?.participations ?? 0)/(studentAnalytics?.max_participations ?? 0))*100).toFixed(2);
      const discussionPercent=((( postCounts[enrollment.user_id]?postCounts[enrollment.user_id]:0)/maxDiscussionCount)*100).toFixed(2);

      const pageViewsPercent=(((studentAnalytics?.page_views ?? 0)/(studentAnalytics?.max_page_views ?? 0))*100).toFixed(2);
      
      console.log(discussionPercent );
      return axios.post(
        `${NodeServer_API_BASE_URL}api/predictions/predict`, 
        {
          totalActivity: enrollment?activityPData:0,
          attendance: rollCallAnalytics?.score ?? 0,
          participation: participationPercent?participationPercent:0,
          pageViews: pageViewsPercent?pageViewsPercent:0,
          discussionCount: discussionPercent?discussionPercent:0,
          currentGradeScore: enrollment?.grades?.current_score ?? 0,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => {
        //console.log('Prediction response hawa :', response.data.prediction);
        return {
          ...enrollment,
          // page_views: studentAnalytics?.page_views ?? 0,
          // max_page_views: studentAnalytics?.max_page_views ?? 0,
          page_Views_Percent: pageViewsPercent?pageViewsPercent:0,
          // page_views_level:studentAnalytics?.page_views_level ?? 0,
          
          // participation_count: studentAnalytics?.participations ?? 0,
          // max_participation_count: studentAnalytics?.max_participations ?? 0,
          participation_percent: participationPercent? participationPercent:0,
          // participations_level: studentAnalytics?.participations_level ?? 0,
  
          tardiness_breakdown_missing: studentAnalytics?.tardiness_breakdown.missing ?? 0,
          tardiness_breakdown_late: studentAnalytics?.tardiness_breakdown.late ?? 0,
          tardiness_breakdown_on_time: studentAnalytics?.tardiness_breakdown.on_time ?? 0,
          tardiness_breakdown_floating: studentAnalytics?.tardiness_breakdown.floating ?? 0,
          tardiness_breakdown_total: studentAnalytics?.tardiness_breakdown.total ?? 0,
  
          // discussion_Count: postCounts[enrollment.user_id]?postCounts[enrollment.user_id]:0,
          // max_Discussion: maxDiscussionCount?maxDiscussionCount:0,
          discussion_Percent: discussionPercent?discussionPercent:0,

          attendance_Percentage: rollCallAnalytics?.score ?? 0,
          activity_Time_Percent: enrollment?activityPData:0,
          predicted_Data: enrollment?response.data.prediction:null,
        };
        })
        .catch((error) => {
          // Handle errors
          console.error('Error with prediction request:', error);
          return {
            ...enrollment,
            predicted_Data: null, // In case of an error, prediction data is set to null
          };
        });
        //console.log("Prediction response ",prediction);
    });
    const detailedEnrollmentsPromises = await Promise.all(detailedEnrollments);
    res.json(detailedEnrollmentsPromises);
  } catch (error) {
    console.error('Error fetching enrollment data:', error);
    throw error;
  }
});


module.exports = router;