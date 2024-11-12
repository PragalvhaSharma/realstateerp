'use client';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { analyticsData } from '@/app/utils/mockData';
import DashboardDrawer from '@/app/components/DashboardDrawer';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function AnalyticsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <DashboardDrawer 
      isOpen={isDrawerOpen} 
      onClose={() => setIsDrawerOpen(false)}
    >
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Student Housing Analytics</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-gray-600 text-sm font-medium">Available Units</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">{analyticsData.totalProperties}</p>
            <p className="text-sm text-gray-500 mt-1">Across all categories</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-gray-600 text-sm font-medium">Average Monthly Rent</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">
              {formatCurrency(analyticsData.totalRevenue / analyticsData.totalProperties)}
            </p>
            <p className="text-sm text-gray-500 mt-1">Per unit</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-gray-600 text-sm font-medium">Active Listings</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">{analyticsData.activeListings}</p>
            <p className="text-sm text-gray-500 mt-1">Available for next term</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-gray-600 text-sm font-medium">Student Inquiries</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">{analyticsData.monthlyViews.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Monthly Rental Revenue</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}
                  />
                  <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Property Type Distribution</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.propertyTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {analyticsData.propertyTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Leases */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Lease Applications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Rent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenants</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {analyticsData.recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{transaction.property}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(transaction.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{transaction.tenants} student(s)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${transaction.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                          transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-blue-100 text-blue-700'}`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardDrawer>
  );
} 