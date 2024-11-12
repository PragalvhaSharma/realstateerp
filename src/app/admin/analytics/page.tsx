'use client';

import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import { FiUsers, FiHome, FiCalendar, FiThumbsUp } from 'react-icons/fi';

// Mock data - replace with real data from your backend
const monthlyData = [
  { month: 'Jan', students: 65, viewings: 40, applications: 25 },
  { month: 'Feb', students: 85, viewings: 55, applications: 35 },
  { month: 'Mar', students: 120, viewings: 75, applications: 45 },
  { month: 'Apr', students: 150, viewings: 90, applications: 60 },
];

const propertyData = [
  { type: 'Studio', count: 15 },
  { type: '1 Bedroom', count: 25 },
  { type: '2 Bedroom', count: 35 },
  { type: '3+ Bedroom', count: 20 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Analytics Dashboard</h1>
      
      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <QuickStatCard
          icon={<FiUsers className="w-6 h-6" />}
          title="Active Students"
          value="1,234"
          change="+12%"
        />
        <QuickStatCard
          icon={<FiHome className="w-6 h-6" />}
          title="Listed Properties"
          value="89"
          change="+5%"
        />
        <QuickStatCard
          icon={<FiCalendar className="w-6 h-6" />}
          title="Monthly Viewings"
          value="156"
          change="+25%"
        />
        <QuickStatCard
          icon={<FiThumbsUp className="w-6 h-6" />}
          title="Success Rate"
          value="78%"
          change="+8%"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Monthly Activity</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#8884d8" />
                <Line type="monotone" dataKey="viewings" stroke="#82ca9d" />
                <Line type="monotone" dataKey="applications" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Property Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Top Neighborhoods"
          items={[
            { label: 'University District', value: '45%' },
            { label: 'Downtown', value: '25%' },
            { label: 'West End', value: '20%' },
          ]}
        />
        <MetricCard
          title="Popular Amenities"
          items={[
            { label: 'In-unit Laundry', value: '85%' },
            { label: 'High-speed Internet', value: '78%' },
            { label: 'Parking', value: '65%' },
          ]}
        />
        <MetricCard
          title="Average Response Times"
          items={[
            { label: 'Viewing Requests', value: '4h' },
            { label: 'Applications', value: '24h' },
            { label: 'Inquiries', value: '2h' },
          ]}
        />
      </div>
    </div>
  );
}

// Add TypeScript interfaces for the components
interface QuickStatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
}

interface MetricItem {
  label: string;
  value: string;
}

interface MetricCardProps {
  title: string;
  items: MetricItem[];
}

function QuickStatCard({ icon, title, value, change }: QuickStatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="text-blue-500">{icon}</div>
        <span className={`text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}

function MetricCard({ title, items }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 