const axios = require('axios');
const router = require("express").Router();

// Define a route to fetch data from the Canvas API
router.get('/courses', async (req, res) => {
  try {
    const response = await axios.get('https://canvas.instructure.com/api/v1/courses', {
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

module.exports = router;