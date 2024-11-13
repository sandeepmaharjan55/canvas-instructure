import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useParams } from 'react-router-dom';
import Axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Paper,
  Button,
} from '@mui/material';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardContent, Input, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Tab } from '@mui/material';
import { Filter } from 'lucide-react';
import './App.css';
const NodeServer_API_BASE_URL = 'http://localhost:7005/';

// Main component displaying list of courses
const CoursesList = ({ courses }) => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Canvas Courses
      </Typography>
      <List>
        {courses.map((course) => (
          <Paper key={course.id} elevation={3} style={{ marginBottom: '1rem' }}>
            <ListItem button component={Link} to={`/courses/${course.id}`}>
              <ListItemText primary={course.name} />
            {/* </ListItem>
            <ListItem> */}
              
               <span className={` ${
                          (course.workflow_state ==="available")  ? 'grade grade-green' :
                          'grade grade-red'
                        }`}>
                          <ListItemText secondary={course.workflow_state} />
               </span>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Container>
  );
};


const engagementTrends = [
  { week: 'W1', discussion: 85, attendance: 92, quiz: 78, assignment: 88 },
  { week: 'W2', discussion: 88, attendance: 85, quiz: 82, assignment: 90 },
  { week: 'W3', discussion: 92, attendance: 88, quiz: 85, assignment: 87 },
  { week: 'W4', discussion: 90, attendance: 95, quiz: 88, assignment: 92 }
];

const predictionData = [
  { score: 85, probability: 90, risk: 'Low' },
  { score: 65, probability: 70, risk: 'Medium' },
  { score: 45, probability: 40, risk: 'High' }
];

const CourseEnrollments = () => {
  const { id } = useParams();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  //from here UI
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTab, setSelectedTab] = useState('individual');
  
    const handleTabChange = (event, newTab) => setSelectedTab(newTab);

  
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await Axios.get(`${NodeServer_API_BASE_URL}api/courses/${id}`);
        //console.log(response.data);
        setEnrollments(response.data);
        
        // const responsePrediction = await Axios.post(`${NodeServer_API_BASE_URL}api/predictions/predict`,
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
        // setPrediction(responsePrediction.data);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [id]);

  const StudentDetail = ({ student }) => (
    <Card variant="outlined" className="mt-6 shadow-lg">
      <CardHeader
        title={`Student Detail: ${student.user.name}`}
        className="bg-blue-100 font-semibold text-lg p-4"
      />
      <CardContent className="p-6">
        <div>
          {/* Performance Bar Chart */}
     
<div className='pull-left'>
            <BarChart width={1000} height={350} data={[
              { subject: 'Total Activity', score: student.activity_Time_Percent },
              { subject: 'Grade', score: student.grades.current_score },
              { subject: 'Attendance', score: (student.attendance_Percentage).toFixed(2)  },
              { subject: 'Discussion', score: student.discussion_Percent},
              { subject: 'Participation', score: student.participation_percent} ,
              { subject: 'Page Views', score: student.page_Views_Percent} ,
      
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#82ca9d" />
            </BarChart>
       </div>
       <div className='pull-right styled-div'>
            <h4>Key Metrics</h4>
         
              {[
                { label: 'Total Activity', value: `${student.activity_Time_Percent} %` },
                { label: 'Current Grade', value: `${student.grades.current_score }%` },
                { label: 'Attendance', value: `${(student.attendance_Percentage).toFixed(2) }%` },
                { label: 'Discussion', value: `${student.discussion_Percent}%` },
                { label: 'Participation', value: `${student.participation_percent}%` },
                { label: 'Page Views', value: `${student.page_Views_Percent }%` },
                { label: 'Page Views', value: `${student.page_Views_Percent }` },
                { label: 'Risk Level', value: (student.grades.current_score>=70?"Low":
                  (student.grades.current_score>=41 && student.grades.current_score<=69)?"Medium":"High")}
              ].map((metric, index) => (
                <div key={index}>
                  <div>{metric.label}: {metric.value}</div>
                </div>
              ))}
          
          </div>
        </div>
      </CardContent>
    </Card>
  );
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }
    return (
      <div>    
          <div className="container">
            <div className="header">
              <h1 className="heading">Detailed Student Analytics</h1>
              <div className="actions">
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input"
                />
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Filter />}
                  className="button button-outlined"
                >
                  Filters
                </Button>
              </div>
            </div>
          </div>

      
          {enrollments.filter((student) => student.type === 'TeacherEnrollment').map((student) => (
          <div className='App' key={student.id}>Professor: {student.user.name}</div>
        ))}
  
       

        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Individual Analysis" value="individual" />
          <Tab label="Engagement Trends" value="trends" />
          <Tab label="Predictive Analytics" value="predictions" />
        </Tabs>
  
        {selectedTab === 'individual' && (
          <Card variant="outlined" className="shadow-lg">
            <CardContent className="p-6">
              <Table>
                <TableHead>
                  <TableRow className="bg-gray-200">
                    {['Name', 'Total Activity', 'Attendance', 'Participation','Page Views','Discussion Post Rate', 'Current Score', "Future Result Prediction"].map((header) => (
                      <TableCell key={header} className="cursor-pointer py-3 px-6 text-left font-semibold">
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {enrollments.filter((student) => student.type === 'StudentEnrollment').map((student) => (
                    <TableRow
                      key={student.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <TableCell>{student.user.name}</TableCell>
                      <TableCell>{student.activity_Time_Percent}%</TableCell>
                      <TableCell>{(student.attendance_Percentage).toFixed(2) }%</TableCell>
                      
                      <TableCell>{student.participation_percent}%</TableCell>
                      {/* <TableCell>{student.max_participation_count}</TableCell> */}
                 

                      <TableCell>{student.page_Views_Percent}%</TableCell>
                      
                     

                      {/* <TableCell>{student.discussion_Count}</TableCell> */}
                      <TableCell>{student.discussion_Percent}%</TableCell>
                      
                      <TableCell>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          (student.grades.current_score >= 70)  ? 'grade grade-green' :
                          (student.grades.current_score >= 41 && student.grades.current_score <= 69) ? 'grade grade-yellow' :
                          'grade grade-red'
                        }`}>
                          {student.grades.current_score}%
                        </span>
                      </TableCell>
                      {/* edit here for final */}

                      <TableCell>{student.predicted_Data}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
  
              {selectedStudent && <StudentDetail student={selectedStudent} />}
            </CardContent>
          </Card>
        )}
  
        {selectedTab === 'trends' && (
          <Card variant="outlined" className="shadow-lg">
            <CardHeader title="Engagement Trends" className="bg-blue-100 font-semibold text-lg p-4" />
            <CardContent className="p-6">
              <BarChart width={600} height={400} data={engagementTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="discussion" fill="#8884d8" />
                <Bar dataKey="attendance" fill="#82ca9d" />
                <Bar dataKey="quiz" fill="#ff8042" />
                <Bar dataKey="assignment" fill="#1976d2" />
              </BarChart>
            </CardContent>
          </Card>
        )}
  
        {selectedTab === 'predictions' && (
          <Card variant="outlined" className="shadow-lg">
            <CardHeader title="Predictive Analytics" className="bg-blue-100 font-semibold text-lg p-4" />
            <CardContent className="p-6">
              <div className="space-y-6">
                {predictionData.map((data, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md">
                    <div className="font-semibold">Score: {data.score}%</div>
                    <div className={`text-sm ${data.risk === 'Low' ? 'text-green-600' : data.risk === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>
                      Probability: {data.probability}% - Risk: {data.risk}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );

  
};


// Main App Component
const App = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await Axios.get(`${NodeServer_API_BASE_URL}api/courses/list`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Canvas Instructure Student Data Visualization
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<CoursesList courses={courses} />} />
        <Route path="/courses/:id" element={<CourseEnrollments />} />
      </Routes>
    </Router>
  );
};

export default App;

