import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const UsageAnalytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState('week');
  
  // Demo data for charts
  const labels = timeframe === 'week' 
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : timeframe === 'month'
    ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const conversationData = {
    labels,
    datasets: [
      {
        label: 'Conversations',
        data: timeframe === 'week' 
          ? [12, 19, 15, 25, 22, 8, 5]
          : timeframe === 'month'
          ? [45, 62, 58, 70]
          : [120, 145, 178, 190, 210, 225, 255, 240, 270, 290, 310, 320],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };
  
  const featureUsageData = {
    labels: ['Document Extraction', 'Configuration Analysis', 'Product Alternatives', 'Product Roadmap'],
    datasets: [
      {
        label: 'Usage Count',
        data: [65, 42, 38, 25],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',  // Blue
          'rgba(16, 185, 129, 0.7)',  // Green
          'rgba(245, 158, 11, 0.7)',  // Amber
          'rgba(99, 102, 241, 0.7)',  // Indigo
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const messageTypeData = {
    labels: ['User Messages', 'AI Responses', 'File Uploads'],
    datasets: [
      {
        label: 'Count',
        data: [320, 345, 78],
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',  // Indigo
          'rgba(16, 185, 129, 0.7)',  // Green
          'rgba(245, 158, 11, 0.7)',  // Amber
        ],
      },
    ],
  };
  
  const userActivityData = {
    labels,
    datasets: [
      {
        label: 'Active Users',
        data: timeframe === 'week' 
          ? [8, 12, 10, 14, 12, 5, 3]
          : timeframe === 'month'
          ? [24, 30, 28, 32]
          : [40, 45, 55, 60, 64, 70, 75, 70, 80, 85, 88, 90],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
    ],
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-dark-200 shadow-sm">
        <div className="p-4 border-b border-dark-200 flex justify-between items-center">
          <h2 className="font-medium text-dark-800">Usage Analytics</h2>
          <div className="flex bg-dark-100 rounded-md">
            <button
              onClick={() => setTimeframe('week')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === 'week' ? 'bg-primary-600 text-white' : 'text-dark-700'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === 'month' ? 'bg-primary-600 text-white' : 'text-dark-700'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeframe('year')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === 'year' ? 'bg-primary-600 text-white' : 'text-dark-700'
              }`}
            >
              Year
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark-50 p-4 rounded-lg border border-dark-200">
              <h3 className="text-dark-800 font-medium mb-3">Conversation Volume</h3>
              <div className="h-64">
                <Line 
                  data={conversationData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: { beginAtZero: true }
                    }
                  }} 
                />
              </div>
            </div>
            
            <div className="bg-dark-50 p-4 rounded-lg border border-dark-200">
              <h3 className="text-dark-800 font-medium mb-3">Feature Usage</h3>
              <div className="h-64">
                <Bar 
                  data={featureUsageData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: { beginAtZero: true }
                    }
                  }} 
                />
              </div>
            </div>
            
            <div className="bg-dark-50 p-4 rounded-lg border border-dark-200">
              <h3 className="text-dark-800 font-medium mb-3">Message Types</h3>
              <div className="h-64 flex items-center justify-center">
                <div className="w-3/4 h-full">
                  <Pie 
                    data={messageTypeData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }} 
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-dark-50 p-4 rounded-lg border border-dark-200">
              <h3 className="text-dark-800 font-medium mb-3">User Activity</h3>
              <div className="h-64">
                <Bar 
                  data={userActivityData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: { beginAtZero: true }
                    }
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-dark-200 shadow-sm">
        <div className="p-4 border-b border-dark-200">
          <h2 className="font-medium text-dark-800">Key Metrics</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-dark-50 p-4 rounded-lg border border-dark-200">
              <div className="text-dark-500 text-sm">Total Conversations</div>
              <div className="text-2xl font-semibold text-dark-900">1,432</div>
              <div className="text-green-600 text-sm">+12% from last period</div>
            </div>
            
            <div className="bg-dark-50 p-4 rounded-lg border border-dark-200">
              <div className="text-dark-500 text-sm">Average Response Time</div>
              <div className="text-2xl font-semibold text-dark-900">1.4s</div>
              <div className="text-green-600 text-sm">-0.3s from last period</div>
            </div>
            
            <div className="bg-dark-50 p-4 rounded-lg border border-dark-200">
              <div className="text-dark-500 text-sm">Files Processed</div>
              <div className="text-2xl font-semibold text-dark-900">285</div>
              <div className="text-green-600 text-sm">+24% from last period</div>
            </div>
            
            <div className="bg-dark-50 p-4 rounded-lg border border-dark-200">
              <div className="text-dark-500 text-sm">Active Users</div>
              <div className="text-2xl font-semibold text-dark-900">98</div>
              <div className="text-green-600 text-sm">+8% from last period</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageAnalytics;