import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter } from 'recharts';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Tabs from "@mui/material/Tabs";
import TabsContent from "@mui/material/Tabs";
import TabsList from "@mui/material/Tabs";
import TabsTrigger from "@mui/material/Tabs";
import Alert from "@mui/material/Alert";
import AlertDescription from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import TableHeader from "@mui/material/TableHead";
import { Activity, Users, BookOpen, TrendingUp, Bell, Download, Filter, Search, ArrowUp, ArrowDown } from 'lucide-react';

// Mock data for student analytics
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
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const StudentDetail = ({ student }) => (
    <Card className="mt-4">
      <CardHeader>
        <h3 className="text-lg font-semibold">Student Detail: {student.name}</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Performance Radar Chart */}
          <div>
            <RadarChart width={300} height={300} data={[
              { subject: 'Engagement', A: student.engagement },
              { subject: 'Attendance', A: student.attendance },
              { subject: 'Submissions', A: student.submissions },
              { subject: 'Grade', A: student.grade }
            ]}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Performance" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </div>

          {/* Detailed Metrics */}
          <div className="space-y-4">
            <h4 className="font-semibold">Key Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Engagement Score', value: `${student.engagement}%` },
                { label: 'Attendance Rate', value: `${student.attendance}%` },
                { label: 'Submission Rate', value: `${student.submissions}%` },
                { label: 'Current Grade', value: `${student.grade}%` },
                { label: 'Risk Level', value: student.risk }
              ].map((metric, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded">
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
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detailed Student Analytics</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="individual" className="w-full">
        <TabsList>
          <TabsTrigger value="individual">Individual Analysis</TabsTrigger>
          <TabsTrigger value="trends">Engagement Trends</TabsTrigger>
          <TabsTrigger value="predictions">Predictive Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="individual">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    {['Name', 'Engagement', 'Attendance', 'Submissions', 'Grade', 'Risk'].map((header) => (
                      <TableHead 
                        key={header}
                        className="cursor-pointer"
                        onClick={() => handleSort(header.toLowerCase())}
                      >
                        <div className="flex items-center">
                          {header}
                          {sortField === header.toLowerCase() && (
                            sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
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
                        <span className={`px-2 py-1 rounded-full text-xs ${
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
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Engagement Trends Analysis</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Time Series Chart */}
                <div>
                  <LineChart width={500} height={300} data={engagementTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="forum" stroke="#8884d8" />
                    <Line type="monotone" dataKey="video" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="quiz" stroke="#ffc658" />
                    <Line type="monotone" dataKey="assignment" stroke="#ff7300" />
                  </LineChart>
                </div>

                {/* Distribution Chart */}
                <div>
                  <ScatterChart width={500} height={300}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="score" name="Score" />
                    <YAxis dataKey="probability" name="Probability" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Performance" data={predictionData} fill="#8884d8" />
                  </ScatterChart>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Success Probability</h3>
              </CardHeader>
              <CardContent>
                <BarChart width={500} height={300} data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="risk" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="probability" fill="#8884d8" />
                </BarChart>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Risk Distribution</h3>
              </CardHeader>
              <CardContent>
                <PieChart width={400} height={300}>
                  <Pie
                    data={predictionData}
                    cx={200}
                    cy={150}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="probability"
                    label
                  >
                    {predictionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#82ca9d', '#ffc658', '#ff7300'][index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DetailedAnalyticsDashboard;