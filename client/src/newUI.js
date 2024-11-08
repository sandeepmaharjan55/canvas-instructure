import React from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Activity, Users, BookOpen, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Week 1', engagement: 85, assignments: 92, participation: 78 },
  { name: 'Week 2', engagement: 88, assignments: 85, participation: 82 },
  { name: 'Week 3', engagement: 92, assignments: 88, participation: 85 },
  { name: 'Week 4', engagement: 90, assignments: 95, participation: 88 },
];

const DashboardMockup = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Engagement Dashboard</h1>
        <div className="flex gap-2">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            System Status: Healthy
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Active Students</p>
              <p className="text-2xl font-bold">243</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <Activity className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Avg. Engagement</p>
              <p className="text-2xl font-bold">87%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <BookOpen className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Course Progress</p>
              <p className="text-2xl font-bold">65%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <TrendingUp className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">At-Risk Students</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Box sx={{ width: '100%' }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Engagement Metrics" />
          <Tab label="Performance Trends" />
          <Tab label="Predictions" />
        </Tabs>

        {activeTab === 0 && (
          <Box sx={{ p: 3 }}>
            <Card>
              <CardHeader title="Weekly Engagement Overview" />
              <CardContent>
                <BarChart width={800} height={400} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="engagement" fill="#3b82f6" />
                  <Bar dataKey="assignments" fill="#10b981" />
                  <Bar dataKey="participation" fill="#8b5cf6" />
                </BarChart>
              </CardContent>
            </Card>
          </Box>
        )}
        {activeTab === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography>Performance Trends Content</Typography>
          </Box>
        )}
        {activeTab === 2 && (
          <Box sx={{ p: 3 }}>
            <Typography>Predictions Content</Typography>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default DashboardMockup;
