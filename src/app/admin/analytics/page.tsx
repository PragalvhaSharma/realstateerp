'use client';

import { useState } from 'react';
import { FiUsers, FiHome, FiCalendar, FiThumbsUp } from 'react-icons/fi';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { monthlyData, propertyData, quickStats } from '@/app/utils/analyticsData';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Overview</h1>
        <p className="text-gray-500 mt-2">Track your real estate metrics and performance</p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
        <QuickStatCard
          icon={<FiUsers className="w-7 h-7" />}
          title="Active Students"
          value={quickStats.activeStudents.value}
          change={quickStats.activeStudents.change}
          description="vs last month"
        />
        <QuickStatCard
          icon={<FiHome className="w-7 h-7" />}
          title="Listed Properties"
          value={quickStats.listedProperties.value}
          change={quickStats.listedProperties.change}
          description="vs last month"
        />
        <QuickStatCard
          icon={<FiCalendar className="w-7 h-7" />}
          title="Monthly Viewings"
          value={quickStats.monthlyViewings.value}
          change={quickStats.monthlyViewings.change}
          description="vs last month"
        />
        <QuickStatCard
          icon={<FiThumbsUp className="w-7 h-7" />}
          title="Success Rate"
          value={quickStats.successRate.value}
          change={quickStats.successRate.change}
          description="vs last month"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-8 lg:grid-cols-2 mb-10">
        {/* Activity Trends Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Activity Trends</h3>
              <p className="text-sm text-gray-500 mt-1">
                Track student engagement over time
              </p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1m">Last month</option>
              <option value="3m">Last 3 months</option>
              <option value="6m">Last 6 months</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorViewings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#colorStudents)"
                />
                <Area
                  type="monotone"
                  dataKey="viewings"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#colorViewings)"
                />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stroke="#f59e0b"
                  fillOpacity={1}
                  fill="url(#colorApplications)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property Distribution Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900">Property Distribution</h3>
            <p className="text-sm text-gray-500 mt-1">
              Available properties by type
            </p>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="type" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(value) => [`${value} units`]}
                />
                <Bar
                  dataKey="count"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Most Common</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">2 Bedroom</p>
              <p className="text-sm text-blue-600 mt-1">95 units</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Avg. Monthly Rent</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">$1,600</p>
              <p className="text-sm text-gray-600 mt-1">+8% vs last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Top Neighborhoods"
          description="Most popular student areas"
          items={[
            { label: 'University District', value: '45%' },
            { label: 'Downtown', value: '25%' },
            { label: 'West End', value: '20%' },
          ]}
        />
        <MetricCard
          title="Popular Amenities"
          description="Common amenities in these areas"
          items={[
            { label: 'In-unit Laundry', value: '85%' },
            { label: 'High-speed Internet', value: '78%' },
            { label: 'Parking', value: '65%' },
          ]}
        />
        <MetricCard
          title="Average Response Times"
          description="Time taken to respond to inquiries"
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

// Updated interfaces
interface QuickStatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  description: string;
}

interface MetricItem {
  label: string;
  value: string;
}

interface MetricCardProps {
  title: string;
  description: string;
  items: MetricItem[];
}

function QuickStatCard({ icon, title, value, change, description }: QuickStatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <div className="text-indigo-600">{icon}</div>
        </div>
        <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
          change.startsWith('+') 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-red-700'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      <p className="text-gray-400 text-sm mt-1">{description}</p>
    </div>
  );
}

function MetricCard({ title, description, items }: MetricCardProps & { description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-500 text-sm mt-1 mb-6">{description}</p>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{item.label}</span>
            <span className="font-semibold text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 