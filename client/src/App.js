// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Link, Routes, useParams } from 'react-router-dom';
// import axios from 'axios';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Container,
//   List,
//   ListItem,
//   ListItemText,
//   CircularProgress,
//   Box,
//   Paper,
//   Button,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from '@mui/material';


// // Main component displaying list of courses
// const CoursesList = ({ courses }) => {
//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" component="h1" gutterBottom>
//         Canvas Courses
//       </Typography>
//       <List>
//         {courses.map((course) => (
//           <Paper key={course.id} elevation={3} style={{ marginBottom: '1rem' }}>
//             <ListItem button component={Link} to={`/courses/${course.id}`}>
//               <ListItemText primary={course.name} />
//             </ListItem>
//           </Paper>
//         ))}
//       </List>
//     </Container>
//   );
// };

// // Component to fetch and display enrollment data
// // Updated CourseEnrollments component in React
// const CourseEnrollments = () => {
//   const { id } = useParams();
//   const [enrollments, setEnrollments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEnrollments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:7004/api/courses/${id}`);
//         setEnrollments(response.data);
//       } catch (error) {
//         console.error('Error fetching enrollments:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEnrollments();
//   }, [id]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h5" component="h2" gutterBottom>
//         Enrollments for Course ID: {id}
//       </Typography>
//       <Box>
//         {enrollments.map((enrollment) => (
//           <Paper key={enrollment.id} elevation={3} style={{ marginBottom: '1rem', padding: '1rem' }}>
//             <Accordion>
//               <AccordionSummary
//                 aria-controls={`panel-${enrollment.id}-content`}
//                 id={`panel-${enrollment.id}-header`}
//               >
//                 <Typography>{enrollment.type==="StudentEnrollment"?"Student":"Teacher"}: {enrollment.user.name}</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 {/* Accordion Details (List of Enrollment Details) */}
//                 <Box>
//                   <Typography variant="body1">
//                     <strong>Enrollment State:</strong> {enrollment.enrollment_state}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Last Activity:</strong> {new Date(enrollment.last_activity_at).toLocaleString()}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Total Activity Time:</strong> {`${enrollment.total_activity_time ?? 0} minutes`}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Page Views:</strong> {enrollment.page_views}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Max Page Views:</strong> {enrollment.max_page_views}
//                   </Typography>

//                   {/* Additional Student Analytics Information */}
//                   <Typography variant="body1">
//                     <strong>Participation:</strong> {enrollment.participation_count}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Max Participation:</strong> {enrollment.max_participation_count}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Participation Level:</strong> {enrollment.participation_level}
//                   </Typography>
                  
//                    {/* Additional Student Analytics Information  Tardiness*/}
                  
//                   <Typography variant="body1">
//                     <strong>Tardiness Data Below</strong>
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Missing:</strong> {enrollment.tardiness_breakdown_missing}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Late:</strong> {enrollment.tardiness_breakdown_late}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>On Time:</strong> {enrollment.tardiness_breakdown_on_time}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Floating:</strong> {enrollment.tardiness_breakdown_floating}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Total:</strong> {enrollment.tardiness_breakdown_total}
//                   </Typography>
//                 </Box>
//               </AccordionDetails>
//             </Accordion>
//           </Paper>
//         ))}
//       </Box>
//     </Container>
//   );
// };


// // Main App Component
// const App = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get('http://localhost:7004/api/courses/list');
//         setCourses(response.data);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <Router>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Canvas Instructure Student Data Visualization
//           </Typography>
//           <Button color="inherit" component={Link} to="/">Home</Button>
//         </Toolbar>
//       </AppBar>
//       <Routes>
//         <Route path="/" element={<CoursesList courses={courses} />} />
//         <Route path="/courses/:id" element={<CourseEnrollments />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;





import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useParams } from 'react-router-dom';
import axios from 'axios';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardContent, Input, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Tab } from '@mui/material';
import { Filter, ArrowUp, ArrowDown } from 'lucide-react';
import './App.css';

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

// Component to fetch and display enrollment data
// Updated CourseEnrollments component in React

// const studentPerformanceData = [
//   { id: 'ST001', name: 'Alice Johnson', engagement: 95, attendance: 98, submissions: 100, grade: 92, risk: 'Low' },
//   { id: 'ST002', name: 'Bob Smith', engagement: 78, attendance: 85, submissions: 90, grade: 85, risk: 'Medium' },
//   { id: 'ST003', name: 'Carol Wilson', engagement: 45, attendance: 60, submissions: 70, grade: 65, risk: 'High' }
// ];

const engagementTrends = [
  { week: 'W1', forum: 85, video: 92, quiz: 78, assignment: 88 },
  { week: 'W2', forum: 88, video: 85, quiz: 82, assignment: 90 },
  { week: 'W3', forum: 92, video: 88, quiz: 85, assignment: 87 },
  { week: 'W4', forum: 90, video: 95, quiz: 88, assignment: 92 }
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
        const response = await axios.get(`http://localhost:7004/api/courses/${id}`);
        setEnrollments(response.data);
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
          <div>

            <BarChart width={1200} height={400} data={[
              { subject: 'Total Activity', score: student.activity_Time_Percent },
              { subject: 'Grade', score: student.grades.current_score },
              { subject: 'Attendance', score: student.attendance_Percentage },
              { subject: 'Discussion', score: student.discussion_Count },
              { subject: 'Participation Level', score: student.participations_level },
              { subject: 'Max Page Views', score: student.max_page_views },
              
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#82ca9d" />
            </BarChart>
          </div>

          {/* Detailed Metrics */}
          <div>
            <h4>Key Metrics</h4>
            <div>
              {[
                { label: 'Total Activity', value: `${student.activity_Time_Percent} %` },
                { label: 'Current Grade Score', value: `${student.grades.current_score }%` },
                { label: 'Attendance', value: `${student.attendance_Percentage }%` },
                { label: 'Participation Level', value: `${student.participations_level }` },
                { label: 'Max Page Views', value: `${student.max_page_views }` },
                { label: 'Risk Level', value: (student.grades.current_score>=70?"Low":
                  (student.grades.current_score>=41 && student.grades.current_score<=69)?"Medium":"High")}
              ].map((metric, index) => (
                <div key={index}>
                  <div>{metric.label}</div>
                  <div>{metric.value}</div>
                </div>
              ))}
            </div>
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
          <div className='App'>Professor: {student.user.name}</div>
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
                    {['Name', 'Total Activity', 'Attendance', 'Max Participations','Participations lvl','Max Page Views', 'Page Views lvl','Discussion','Current Score','Current Grade', 'Risk'].map((header) => (
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
                      <TableCell>{student.attendance_Percentage}%</TableCell>

                      <TableCell>{student.max_participation_count}</TableCell>
                      <TableCell>{student.participations_level}</TableCell>

                      <TableCell>{student.max_page_views}</TableCell>
                      <TableCell>{student.page_views_level}</TableCell>

                      <TableCell>{student.discussion_Count}</TableCell>
                      <TableCell>{student.grades.current_score}%</TableCell>
                      <TableCell>{student.grades.current_grade}</TableCell>
                      <TableCell>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          (student.grades.current_score >= 70)  ? 'grade grade-green' :
                          (student.grades.current_score >= 41 && student.grades.current_score <= 69) ? 'grade grade-yellow' :
                          'grade grade-red'
                        }`}>
                          {student.grades.current_score}
                        </span>
                      </TableCell>
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
                <Bar dataKey="forum" fill="#8884d8" />
                <Bar dataKey="video" fill="#82ca9d" />
                <Bar dataKey="quiz" fill="#ff8042" />
                <Bar dataKey="assignment" fill="#ff7300" />
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
        const response = await axios.get('http://localhost:7004/api/courses/list');
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

