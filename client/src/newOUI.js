// import React, { useState } from 'react';
// import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter } from 'recharts';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardContent from '@mui/material/CardContent';
// import Tabs from "@mui/material/Tabs";
// import TabsContent from "@mui/material/Tabs";
// import TabsList from "@mui/material/Tabs";
// import TabsTrigger from "@mui/material/Tabs";
// import Alert from "@mui/material/Alert";
// import AlertDescription from "@mui/material/Alert";
// import Button from "@mui/material/Button";
// import Input from "@mui/material/Input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@mui/material";
// import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
// import TableHeader from "@mui/material/TableHead";
// import { Activity, Users, BookOpen, TrendingUp, Bell, Download, Filter, Search, ArrowUp, ArrowDown } from 'lucide-react';

// // Mock data for student analytics
// const studentPerformanceData = [
//   { id: 'ST001', name: 'Alice Johnson', engagement: 95, attendance: 98, submissions: 100, grade: 92, risk: 'Low' },
//   { id: 'ST002', name: 'Bob Smith', engagement: 78, attendance: 85, submissions: 90, grade: 85, risk: 'Medium' },
//   { id: 'ST003', name: 'Carol Wilson', engagement: 45, attendance: 60, submissions: 70, grade: 65, risk: 'High' }
// ];

// const engagementTrends = [
//   { week: 'W1', forum: 85, video: 92, quiz: 78, assignment: 88 },
//   { week: 'W2', forum: 88, video: 85, quiz: 82, assignment: 90 },
//   { week: 'W3', forum: 92, video: 88, quiz: 85, assignment: 87 },
//   { week: 'W4', forum: 90, video: 95, quiz: 88, assignment: 92 }
// ];

// const predictionData = [
//   { score: 85, probability: 90, risk: 'Low' },
//   { score: 65, probability: 70, risk: 'Medium' },
//   { score: 45, probability: 40, risk: 'High' }
// ];

// const DetailedAnalyticsDashboard = () => {
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortField, setSortField] = useState('name');
//   const [sortDirection, setSortDirection] = useState('asc');

//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortField(field);
//       setSortDirection('asc');
//     }
//   };

//   const StudentDetail = ({ student }) => (
//     <Card className="mt-4">
//       <CardHeader>
//         <h3 className="text-lg font-semibold">Student Detail: {student.name}</h3>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Performance Radar Chart */}
//           <div>
//             <RadarChart width={300} height={300} data={[
//               { subject: 'Engagement', A: student.engagement },
//               { subject: 'Attendance', A: student.attendance },
//               { subject: 'Submissions', A: student.submissions },
//               { subject: 'Grade', A: student.grade }
//             ]}>
//               <PolarGrid />
//               <PolarAngleAxis dataKey="subject" />
//               <PolarRadiusAxis angle={30} domain={[0, 100]} />
//               <Radar name="Performance" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//             </RadarChart>
//           </div>

//           {/* Detailed Metrics */}
//           <div className="space-y-4">
//             <h4 className="font-semibold">Key Metrics</h4>
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 { label: 'Engagement Score', value: `${student.engagement}%` },
//                 { label: 'Attendance Rate', value: `${student.attendance}%` },
//                 { label: 'Submission Rate', value: `${student.submissions}%` },
//                 { label: 'Current Grade', value: `${student.grade}%` },
//                 { label: 'Risk Level', value: student.risk }
//               ].map((metric, index) => (
//                 <div key={index} className="bg-gray-50 p-2 rounded">
//                   <div className="text-sm text-gray-600">{metric.label}</div>
//                   <div className="text-lg font-semibold">{metric.value}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Detailed Student Analytics</h1>
//         <div className="flex gap-2">
//           <Input
//             placeholder="Search students..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-64"
//           />
//           <Button variant="outline">
//             <Filter className="h-4 w-4 mr-2" />
//             Filters
//           </Button>
//         </div>
//       </div>

//       <Tabs defaultValue="individual" className="w-full">
//         <TabsList>
//           <TabsTrigger value="individual">Individual Analysis</TabsTrigger>
//           <TabsTrigger value="trends">Engagement Trends</TabsTrigger>
//           <TabsTrigger value="predictions">Predictive Analytics</TabsTrigger>
//         </TabsList>

//         <TabsContent value="individual">
//           <Card>
//             <CardContent className="pt-6">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     {['Name', 'Engagement', 'Attendance', 'Submissions', 'Grade', 'Risk'].map((header) => (
//                       <TableHead 
//                         key={header}
//                         className="cursor-pointer"
//                         onClick={() => handleSort(header.toLowerCase())}
//                       >
//                         <div className="flex items-center">
//                           {header}
//                           {sortField === header.toLowerCase() && (
//                             sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
//                           )}
//                         </div>
//                       </TableHead>
//                     ))}
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {studentPerformanceData.map((student) => (
//                     <TableRow 
//                       key={student.id}
//                       className="cursor-pointer hover:bg-gray-50"
//                       onClick={() => setSelectedStudent(student)}
//                     >
//                       <TableCell>{student.name}</TableCell>
//                       <TableCell>{student.engagement}%</TableCell>
//                       <TableCell>{student.attendance}%</TableCell>
//                       <TableCell>{student.submissions}%</TableCell>
//                       <TableCell>{student.grade}%</TableCell>
//                       <TableCell>
//                         <span className={`px-2 py-1 rounded-full text-xs ${
//                           student.risk === 'Low' ? 'bg-green-100 text-green-800' :
//                           student.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
//                           'bg-red-100 text-red-800'
//                         }`}>
//                           {student.risk}
//                         </span>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>

//               {selectedStudent && <StudentDetail student={selectedStudent} />}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="trends">
//           <Card>
//             <CardHeader>
//               <h3 className="text-lg font-semibold">Engagement Trends Analysis</h3>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Time Series Chart */}
//                 <div>
//                   <LineChart width={500} height={300} data={engagementTrends}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="week" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Line type="monotone" dataKey="forum" stroke="#8884d8" />
//                     <Line type="monotone" dataKey="video" stroke="#82ca9d" />
//                     <Line type="monotone" dataKey="quiz" stroke="#ffc658" />
//                     <Line type="monotone" dataKey="assignment" stroke="#ff7300" />
//                   </LineChart>
//                 </div>

//                 {/* Distribution Chart */}
//                 <div>
//                   <ScatterChart width={500} height={300}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="score" name="Score" />
//                     <YAxis dataKey="probability" name="Probability" />
//                     <Tooltip cursor={{ strokeDasharray: '3 3' }} />
//                     <Scatter name="Performance" data={predictionData} fill="#8884d8" />
//                   </ScatterChart>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="predictions">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Card>
//               <CardHeader>
//                 <h3 className="text-lg font-semibold">Success Probability</h3>
//               </CardHeader>
//               <CardContent>
//                 <BarChart width={500} height={300} data={predictionData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="risk" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="probability" fill="#8884d8" />
//                 </BarChart>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <h3 className="text-lg font-semibold">Risk Distribution</h3>
//               </CardHeader>
//               <CardContent>
//                 <PieChart width={400} height={300}>
//                   <Pie
//                     data={predictionData}
//                     cx={200}
//                     cy={150}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="probability"
//                     label
//                   >
//                     {predictionData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={['#82ca9d', '#ffc658', '#ff7300'][index]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default DetailedAnalyticsDashboard;
// import React, { useState } from 'react';
// import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter } from 'recharts';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardContent from '@mui/material/CardContent';
// import Tabs from "@mui/material/Tabs";
// import TabsContent from "@mui/material/Tabs";
// import TabsList from "@mui/material/Tabs";
// import TabsTrigger from "@mui/material/Tabs";
// import Alert from "@mui/material/Alert";
// import Button from "@mui/material/Button";
// import Input from "@mui/material/Input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@mui/material";
// import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
// import { Activity, Users, BookOpen, TrendingUp, Bell, Download, Filter, Search, ArrowUp, ArrowDown } from 'lucide-react';

// // Mock data for student analytics
// const studentPerformanceData = [
//   { id: 'ST001', name: 'Alice Johnson', engagement: 95, attendance: 98, submissions: 100, grade: 92, risk: 'Low' },
//   { id: 'ST002', name: 'Bob Smith', engagement: 78, attendance: 85, submissions: 90, grade: 85, risk: 'Medium' },
//   { id: 'ST003', name: 'Carol Wilson', engagement: 45, attendance: 60, submissions: 70, grade: 65, risk: 'High' }
// ];

// const engagementTrends = [
//   { week: 'W1', forum: 85, video: 92, quiz: 78, assignment: 88 },
//   { week: 'W2', forum: 88, video: 85, quiz: 82, assignment: 90 },
//   { week: 'W3', forum: 92, video: 88, quiz: 85, assignment: 87 },
//   { week: 'W4', forum: 90, video: 95, quiz: 88, assignment: 92 }
// ];

// const predictionData = [
//   { score: 85, probability: 90, risk: 'Low' },
//   { score: 65, probability: 70, risk: 'Medium' },
//   { score: 45, probability: 40, risk: 'High' }
// ];

// const DetailedAnalyticsDashboard = () => {
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortField, setSortField] = useState('name');
//   const [sortDirection, setSortDirection] = useState('asc');

//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortField(field);
//       setSortDirection('asc');
//     }
//   };

//   const StudentDetail = ({ student }) => (
//     <Card className="mt-6 shadow-lg rounded-lg bg-white">
//       <CardHeader>
//         <h3 className="text-xl font-semibold text-indigo-600">Student Detail: {student.name}</h3>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Performance Radar Chart */}
//           <div className="bg-gray-50 p-4 rounded-lg shadow-md">
//             <RadarChart width={300} height={300} data={[
//               { subject: 'Engagement', A: student.engagement },
//               { subject: 'Attendance', A: student.attendance },
//               { subject: 'Submissions', A: student.submissions },
//               { subject: 'Grade', A: student.grade }
//             ]}>
//               <PolarGrid />
//               <PolarAngleAxis dataKey="subject" />
//               <PolarRadiusAxis angle={30} domain={[0, 100]} />
//               <Radar name="Performance" dataKey="A" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.6} />
//             </RadarChart>
//           </div>

//           {/* Detailed Metrics */}
//           <div className="space-y-4">
//             <h4 className="font-semibold text-lg">Key Metrics</h4>
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 { label: 'Engagement Score', value: `${student.engagement}%` },
//                 { label: 'Attendance Rate', value: `${student.attendance}%` },
//                 { label: 'Submission Rate', value: `${student.submissions}%` },
//                 { label: 'Current Grade', value: `${student.grade}%` },
//                 { label: 'Risk Level', value: student.risk }
//               ].map((metric, index) => (
//                 <div key={index} className="bg-gray-50 p-3 rounded-lg shadow-md">
//                   <div className="text-sm text-gray-700">{metric.label}</div>
//                   <div className="text-lg font-semibold text-gray-900">{metric.value}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Detailed Student Analytics</h1>
//         <div className="flex gap-4">
//           <Input
//             placeholder="Search students..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-72 px-4 py-2 rounded-lg border border-gray-300 shadow-sm"
//           />
//           <Button variant="outlined" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 shadow-md">
//             <Filter className="h-5 w-5 text-gray-600" />
//             <span className="text-gray-600">Filters</span>
//           </Button>
//         </div>
//       </div>

//       <Tabs defaultValue="individual" className="w-full bg-white shadow-sm rounded-lg">
//         <TabsList>
//           <TabsTrigger value="individual">Individual Analysis</TabsTrigger>
//           <TabsTrigger value="trends">Engagement Trends</TabsTrigger>
//           <TabsTrigger value="predictions">Predictive Analytics</TabsTrigger>
//         </TabsList>

//         <TabsContent value="individual">
//           <Card className="shadow-lg rounded-lg bg-white">
//             <CardContent className="pt-6">
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     {['Name', 'Engagement', 'Attendance', 'Submissions', 'Grade', 'Risk'].map((header) => (
//                       <TableCell 
//                         key={header} 
//                         className="cursor-pointer hover:bg-gray-100 text-gray-700 font-semibold"
//                         onClick={() => handleSort(header.toLowerCase())}
//                       >
//                         <div className="flex items-center">
//                           {header}
//                           {sortField === header.toLowerCase() && (
//                             sortDirection === 'asc' ? <ArrowUp className="ml-2 h-5 w-5 text-gray-500" /> : <ArrowDown className="ml-2 h-5 w-5 text-gray-500" />
//                           )}
//                         </div>
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {studentPerformanceData.map((student) => (
//                     <TableRow 
//                       key={student.id}
//                       className="cursor-pointer hover:bg-gray-100"
//                       onClick={() => setSelectedStudent(student)}
//                     >
//                       <TableCell>{student.name}</TableCell>
//                       <TableCell>{student.engagement}%</TableCell>
//                       <TableCell>{student.attendance}%</TableCell>
//                       <TableCell>{student.submissions}%</TableCell>
//                       <TableCell>{student.grade}%</TableCell>
//                       <TableCell>
//                         <span className={`px-2 py-1 rounded-full text-xs ${
//                           student.risk === 'Low' ? 'bg-green-100 text-green-800' :
//                           student.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
//                           'bg-red-100 text-red-800'
//                         }`}>
//                           {student.risk}
//                         </span>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>

//               {selectedStudent && <StudentDetail student={selectedStudent} />}
//             </CardContent>
//           </Card>
//         </TabsContent>
//         </Tabs>
//     </div>
//   );
// };
// export default DetailedAnalyticsDashboard;

// import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardContent from '@mui/material/CardContent';
// import Tabs from "@mui/material/Tabs";
// import TabsContent from "@mui/material/Tabs";
// import TabsList from "@mui/material/Tabs";
// import TabsTrigger from "@mui/material/Tabs";
// import Button from "@mui/material/Button";
// import Input from "@mui/material/Input";
// import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
// import TableHeader from "@mui/material/TableHead";
// import { Filter, ArrowUp, ArrowDown } from 'lucide-react';

// // Mock data for student analytics
// const studentPerformanceData = [
//   { id: 'ST001', name: 'Alice Johnson', engagement: 95, attendance: 98, submissions: 100, grade: 92, risk: 'Low' },
//   { id: 'ST002', name: 'Bob Smith', engagement: 78, attendance: 85, submissions: 90, grade: 85, risk: 'Medium' },
//   { id: 'ST003', name: 'Carol Wilson', engagement: 45, attendance: 60, submissions: 70, grade: 65, risk: 'High' }
// ];

// const engagementTrends = [
//   { week: 'W1', forum: 85, video: 92, quiz: 78, assignment: 88 },
//   { week: 'W2', forum: 88, video: 85, quiz: 82, assignment: 90 },
//   { week: 'W3', forum: 92, video: 88, quiz: 85, assignment: 87 },
//   { week: 'W4', forum: 90, video: 95, quiz: 88, assignment: 92 }
// ];

// const predictionData = [
//   { score: 85, probability: 90, risk: 'Low' },
//   { score: 65, probability: 70, risk: 'Medium' },
//   { score: 45, probability: 40, risk: 'High' }
// ];

// const DetailedAnalyticsDashboard = () => {
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortField, setSortField] = useState('name');
//   const [sortDirection, setSortDirection] = useState('asc');

//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortField(field);
//       setSortDirection('asc');
//     }
//   };

//   const StudentDetail = ({ student }) => (
//     <Card className="mt-4">
//       <CardHeader>
//         <h3 className="text-lg font-semibold">Student Detail: {student.name}</h3>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Performance Bar Chart */}
//           <div>
//             <BarChart width={300} height={300} data={[
//               { subject: 'Engagement', score: student.engagement },
//               { subject: 'Attendance', score: student.attendance },
//               { subject: 'Submissions', score: student.submissions },
//               { subject: 'Grade', score: student.grade }
//             ]}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="subject" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="score" fill="#8884d8" />
//             </BarChart>
//           </div>

//           {/* Detailed Metrics */}
//           <div className="space-y-4">
//             <h4 className="font-semibold">Key Metrics</h4>
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 { label: 'Engagement Score', value: `${student.engagement}%` },
//                 { label: 'Attendance Rate', value: `${student.attendance}%` },
//                 { label: 'Submission Rate', value: `${student.submissions}%` },
//                 { label: 'Current Grade', value: `${student.grade}%` },
//                 { label: 'Risk Level', value: student.risk }
//               ].map((metric, index) => (
//                 <div key={index} className="bg-gray-50 p-2 rounded">
//                   <div className="text-sm text-gray-600">{metric.label}</div>
//                   <div className="text-lg font-semibold">{metric.value}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Detailed Student Analytics</h1>
//         <div className="flex gap-2">
//           <Input
//             placeholder="Search students..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-64"
//           />
//           <Button variant="outline">
//             <Filter className="h-4 w-4 mr-2" />
//             Filters
//           </Button>
//         </div>
//       </div>

//       <Tabs defaultValue="individual" className="w-full">
//         <TabsList>
//           <TabsTrigger value="individual">Individual Analysis</TabsTrigger>
//           <TabsTrigger value="trends">Engagement Trends</TabsTrigger>
//           <TabsTrigger value="predictions">Predictive Analytics</TabsTrigger>
//         </TabsList>

//         <TabsContent value="individual">
//           <Card>
//             <CardContent className="pt-6">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     {['Name', 'Engagement', 'Attendance', 'Submissions', 'Grade', 'Risk'].map((header) => (
//                       <TableHead 
//                         key={header}
//                         className="cursor-pointer"
//                         onClick={() => handleSort(header.toLowerCase())}
//                       >
//                         <div className="flex items-center">
//                           {header}
//                           {sortField === header.toLowerCase() && (
//                             sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
//                           )}
//                         </div>
//                       </TableHead>
//                     ))}
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {studentPerformanceData.map((student) => (
//                     <TableRow 
//                       key={student.id}
//                       className="cursor-pointer hover:bg-gray-50"
//                       onClick={() => setSelectedStudent(student)}
//                     >
//                       <TableCell>{student.name}</TableCell>
//                       <TableCell>{student.engagement}%</TableCell>
//                       <TableCell>{student.attendance}%</TableCell>
//                       <TableCell>{student.submissions}%</TableCell>
//                       <TableCell>{student.grade}%</TableCell>
//                       <TableCell>
//                         <span className={`px-2 py-1 rounded-full text-xs ${
//                           student.risk === 'Low' ? 'bg-green-100 text-green-800' :
//                           student.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
//                           'bg-red-100 text-red-800'
//                         }`}>
//                           {student.risk}
//                         </span>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>

//               {selectedStudent && <StudentDetail student={selectedStudent} />}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="trends">
//           <Card>
//             <CardHeader>
//               <h3 className="text-lg font-semibold">Engagement Trends Analysis</h3>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Bar Chart for Engagement Trends */}
//                 <div>
//                   <BarChart width={500} height={300} data={engagementTrends}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="week" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="forum" fill="#8884d8" />
//                     <Bar dataKey="video" fill="#82ca9d" />
//                     <Bar dataKey="quiz" fill="#ffc658" />
//                     <Bar dataKey="assignment" fill="#ff7300" />
//                   </BarChart>
//                 </div>

//                 {/* Bar Chart for Prediction Data */}
//                 <div>
//                   <BarChart width={500} height={300} data={predictionData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="score" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="probability" fill="#8884d8" />
//                   </BarChart>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="predictions">
//           <Card>
//             <CardHeader>
//               <h3 className="text-lg font-semibold">Predictive Analytics</h3>
//             </CardHeader>
//             <CardContent>
//               {/* Add any prediction-related content here */}
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default DetailedAnalyticsDashboard;


// import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardContent from '@mui/material/CardContent';
// import Tabs from "@mui/material/Tabs";
// import TabsContent from "@mui/material/Tabs";
// import TabsList from "@mui/material/Tabs";
// import TabsTrigger from "@mui/material/Tabs";
// import Button from "@mui/material/Button";
// import Input from "@mui/material/Input";
// import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
// import { Filter, ArrowUp, ArrowDown } from 'lucide-react';

// // Mock data for student analytics
// const studentPerformanceData = [
//   { id: 'ST001', name: 'Alice Johnson', engagement: 95, attendance: 98, submissions: 100, grade: 92, risk: 'Low' },
//   { id: 'ST002', name: 'Bob Smith', engagement: 78, attendance: 85, submissions: 90, grade: 85, risk: 'Medium' },
//   { id: 'ST003', name: 'Carol Wilson', engagement: 45, attendance: 60, submissions: 70, grade: 65, risk: 'High' }
// ];

// const engagementTrends = [
//   { week: 'W1', forum: 85, video: 92, quiz: 78, assignment: 88 },
//   { week: 'W2', forum: 88, video: 85, quiz: 82, assignment: 90 },
//   { week: 'W3', forum: 92, video: 88, quiz: 85, assignment: 87 },
//   { week: 'W4', forum: 90, video: 95, quiz: 88, assignment: 92 }
// ];

// const predictionData = [
//   { score: 85, probability: 90, risk: 'Low' },
//   { score: 65, probability: 70, risk: 'Medium' },
//   { score: 45, probability: 40, risk: 'High' }
// ];

// const DetailedAnalyticsDashboard = () => {
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortField, setSortField] = useState('name');
//   const [sortDirection, setSortDirection] = useState('asc');

//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortField(field);
//       setSortDirection('asc');
//     }
//   };

//   const StudentDetail = ({ student }) => (
//     <Card className="mt-4">
//       <CardHeader>
//         <h3 className="text-lg font-semibold">Student Detail: {student.name}</h3>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Performance Bar Chart */}
//           <div className="flex justify-center items-center">
//             <BarChart width={300} height={300} data={[
//               { subject: 'Engagement', score: student.engagement },
//               { subject: 'Attendance', score: student.attendance },
//               { subject: 'Submissions', score: student.submissions },
//               { subject: 'Grade', score: student.grade }
//             ]}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="subject" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="score" fill="#82ca9d" />
//             </BarChart>
//           </div>

//           {/* Detailed Metrics */}
//           <div className="space-y-4">
//             <h4 className="font-semibold">Key Metrics</h4>
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 { label: 'Engagement Score', value: `${student.engagement}%` },
//                 { label: 'Attendance Rate', value: `${student.attendance}%` },
//                 { label: 'Submission Rate', value: `${student.submissions}%` },
//                 { label: 'Current Grade', value: `${student.grade}%` },
//                 { label: 'Risk Level', value: student.risk }
//               ].map((metric, index) => (
//                 <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
//                   <div className="text-sm text-gray-600">{metric.label}</div>
//                   <div className="text-lg font-semibold">{metric.value}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Detailed Student Analytics</h1>
//         <div className="flex gap-4 items-center">
//           <Input
//             placeholder="Search students..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-80 p-2 border border-gray-300 rounded-lg"
//           />
//           <Button variant="outlined" color="primary" startIcon={<Filter />}>
//             Filters
//           </Button>
//         </div>
//       </div>

//       <Tabs defaultValue="individual" className="w-full">
//         <TabsList>
//           <TabsTrigger value="individual">Individual Analysis</TabsTrigger>
//           <TabsTrigger value="trends">Engagement Trends</TabsTrigger>
//           <TabsTrigger value="predictions">Predictive Analytics</TabsTrigger>
//         </TabsList>

//         <TabsContent value="individual">
//           <Card className="shadow-md">
//             <CardContent className="pt-6">
//               <Table>
//                 <TableHead className="bg-gray-100">
//                   <TableRow>
//                     {['Name', 'Engagement', 'Attendance', 'Submissions', 'Grade', 'Risk'].map((header) => (
//                       <TableCell
//                         key={header}
//                         className="cursor-pointer py-3 px-6 text-left font-semibold text-gray-700"
//                         onClick={() => handleSort(header.toLowerCase())}
//                       >
//                         <div className="flex items-center">
//                           {header}
//                           {sortField === header.toLowerCase() && (
//                             sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
//                           )}
//                         </div>
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {studentPerformanceData.map((student) => (
//                     <TableRow
//                       key={student.id}
//                       className="cursor-pointer hover:bg-gray-50"
//                       onClick={() => setSelectedStudent(student)}
//                     >
//                       <TableCell>{student.name}</TableCell>
//                       <TableCell>{student.engagement}%</TableCell>
//                       <TableCell>{student.attendance}%</TableCell>
//                       <TableCell>{student.submissions}%</TableCell>
//                       <TableCell>{student.grade}%</TableCell>
//                       <TableCell>
//                         <span className={`px-2 py-1 rounded-full text-xs ${
//                           student.risk === 'Low' ? 'bg-green-100 text-green-800' :
//                           student.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
//                           'bg-red-100 text-red-800'
//                         }`}>
//                           {student.risk}
//                         </span>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>

//               {selectedStudent && <StudentDetail student={selectedStudent} />}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="trends">
//           <Card className="shadow-md">
//             <CardHeader>
//               <h3 className="text-lg font-semibold">Engagement Trends Analysis</h3>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Bar Chart for Engagement Trends */}
//                 <div>
//                   <BarChart width={500} height={300} data={engagementTrends}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="week" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="forum" fill="#8884d8" />
//                     <Bar dataKey="video" fill="#82ca9d" />
//                     <Bar dataKey="quiz" fill="#ff8042" />
//                     <Bar dataKey="assignment" fill="#ff7300" />
//                   </BarChart>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="predictions">
//           <Card className="shadow-md">
//             <CardHeader>
//               <h3 className="text-lg font-semibold">Predictive Analytics</h3>
//             </CardHeader>
//             <CardContent>
//               {/* Add any prediction-related content here */}
//               <div className="space-y-4">
//                 {predictionData.map((data, index) => (
//                   <div key={index} className="flex justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
//                     <div className="font-semibold">Score: {data.score}%</div>
//                     <div className={`text-xs ${data.risk === 'Low' ? 'text-green-600' : data.risk === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>
//                       Probability: {data.probability}% - Risk: {data.risk}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default DetailedAnalyticsDashboard;


import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardContent, Button, Input, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Tab } from '@mui/material';
import { Filter, ArrowUp, ArrowDown } from 'lucide-react';

// Sample Data
const studentPerformanceData = [
  { id: 'ST001', name: 'Alice Johnson', engagement: 95, attendance: 98, submissions: 100, grade: 92, risk: 'Low' },
  { id: 'ST002', name: 'Bob Smith', engagement: 78, attendance: 85, submissions: 90, grade: 85, risk: 'Medium' },
  { id: 'ST003', name: 'Carol Wilson', engagement: 45, attendance: 60, submissions: 70, grade: 65, risk: 'High' }
];

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

const DetailedAnalyticsDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('individual');

  const handleTabChange = (event, newTab) => setSelectedTab(newTab);

  const StudentDetail = ({ student }) => (
    <Card variant="outlined" className="mt-6 shadow-lg">
      <CardHeader
        title={`Student Detail: ${student.name}`}
        className="bg-blue-100 font-semibold text-lg p-4"
      />
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Performance Bar Chart */}
          <div className="flex justify-center items-center">
            <BarChart width={300} height={300} data={[
              { subject: 'Engagement', score: student.engagement },
              { subject: 'Attendance', score: student.attendance },
              { subject: 'Submissions', score: student.submissions },
              { subject: 'Grade', score: student.grade }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#82ca9d" />
            </BarChart>
          </div>

          {/* Detailed Metrics */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700">Key Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Engagement Score', value: `${student.engagement}%` },
                { label: 'Attendance Rate', value: `${student.attendance}%` },
                { label: 'Submission Rate', value: `${student.submissions}%` },
                { label: 'Current Grade', value: `${student.grade}%` },
                { label: 'Risk Level', value: student.risk }
              ].map((metric, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md">
                  <div className="text-sm text-gray-600">{metric.label}</div>
                  <div className="text-lg font-semibold">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-8 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Detailed Student Analytics</h1>
        <div className="flex gap-6 items-center">
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80 p-3 border border-gray-300 rounded-lg"
          />
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Filter />}
            className="border-2 border-gray-500 px-4 py-2 rounded-lg"
          >
            Filters
          </Button>
        </div>
      </div>

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
                  {['Name', 'Engagement', 'Attendance', 'Submissions', 'Grade', 'Risk'].map((header) => (
                    <TableCell key={header} className="cursor-pointer py-3 px-6 text-left font-semibold">
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {studentPerformanceData.map((student) => (
                  <TableRow
                    key={student.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.engagement}%</TableCell>
                    <TableCell>{student.attendance}%</TableCell>
                    <TableCell>{student.submissions}%</TableCell>
                    <TableCell>{student.grade}%</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        student.risk === 'Low' ? 'bg-green-100 text-green-800' :
                        student.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {student.risk}
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

export default DetailedAnalyticsDashboard;
