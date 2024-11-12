'use client'

import { useState, useEffect } from 'react'
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
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'
import { generateMockData } from '@/app/utils/mockData'
import DashboardDrawer from '@/app/components/DashboardDrawer'

// Register ChartJS components
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
)

interface DashboardStats {
  totalProperties: number
  totalRevenue: number
  totalUsers: number
  activeListings: number
  pendingApprovals: number
  monthlyRevenue: number[]
  propertyTypes: { type: string; count: number }[]
  leadConversionRate: number
}

interface Activity {
  id: string
  type: 'property' | 'user' | 'sale' | 'inquiry' | 'approval'
  message: string
  timestamp: Date
  status?: 'pending' | 'completed' | 'urgent'
  userId?: string
}

export default function AdminDashboard(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [timeRange, setTimeRange] = useState('week')
  const [filterType, setFilterType] = useState('all')
  const [selectedChart, setSelectedChart] = useState<'revenue' | 'properties'>('revenue')

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true)
        // For demo, we'll use mock data instead of actual API calls
        const { mockStats, mockActivities } = generateMockData()
        setStats(mockStats)
        setActivities(mockActivities)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Monthly Revenue',
      data: stats?.monthlyRevenue || [],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
    }]
  }

  const propertyTypeChartData = {
    labels: stats?.propertyTypes.map(pt => pt.type) || [],
    datasets: [{
      data: stats?.propertyTypes.map(pt => pt.count) || [],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(139, 92, 246, 0.8)',
      ],
    }]
  }

  const StatCard = ({ title, value, trend, color }: {
    title: string
    value: string | number
    trend?: string
    color: string
  }) => (
    <div className={`bg-white rounded-xl shadow-sm p-6 border border-gray-100`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 flex items-center ${
              trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              ↑ {trend} vs last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <span className="text-white text-xl">📊</span>
        </div>
      </div>
    </div>
  )

  const ChartSection = (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Analytics Overview</h2>
        <div className="space-x-2">
          <button
            onClick={() => setSelectedChart('revenue')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedChart === 'revenue'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setSelectedChart('properties')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedChart === 'properties'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Properties
          </button>
        </div>
      </div>
      <div className="h-[400px]">
        {selectedChart === 'revenue' ? (
          <Line data={revenueChartData} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              title: { display: false }
            }
          }} />
        ) : (
          <Doughnut data={propertyTypeChartData} options={{
            responsive: true,
            maintainAspectRatio: false,
          }} />
        )}
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      <DashboardDrawer isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <button 
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsSidebarOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back, Admin</p>
              </div>
            </div>
            <div className="space-x-3">
              <button className="px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Generate Report
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add Property
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Properties"
              value={stats?.totalProperties || 0}
              trend="+12.5%"
              color="bg-blue-600"
            />
            <StatCard
              title="Total Revenue"
              value={`$${stats?.totalRevenue?.toLocaleString() || 0}`}
              trend="+8.2%"
              color="bg-green-600"
            />
            <StatCard
              title="Total Users"
              value={stats?.totalUsers || 0}
              trend="+5.1%"
              color="bg-purple-600"
            />
            <StatCard
              title="Active Listings"
              value={stats?.activeListings || 0}
              trend="+2.3%"
              color="bg-orange-600"
            />
          </div>

          {ChartSection}

          {/* Quick Actions Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Pending Approvals</h3>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {stats?.pendingApprovals || 0}
              </div>
              <button className="w-full px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                Review Now
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Lead Conversion</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stats?.leadConversionRate || 0}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${stats?.leadConversionRate || 0}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  Add New Property
                </button>
                <button className="w-full px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                  View Reports
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Activities</h2>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border rounded-lg px-3 py-2 bg-gray-50 text-sm"
              >
                <option value="all">All Activities</option>
                <option value="property">Properties</option>
                <option value="user">Users</option>
                <option value="sale">Sales</option>
                <option value="inquiry">Inquiries</option>
              </select>
            </div>
            <div className="space-y-4">
              {activities
                .filter(activity => filterType === 'all' || activity.type === filterType)
                .map((activity) => (
                  <div 
                    key={activity.id} 
                    className={`flex items-start space-x-4 p-4 rounded-lg ${
                      activity.status === 'urgent' ? 'bg-red-50' : 
                      activity.status === 'pending' ? 'bg-yellow-50' : 
                      'bg-green-50'
                    }`}
                  >
                    <span className="text-gray-400">⏰</span>
                    <div className="flex-1">
                      <p className="text-gray-700">{activity.message}</p>
                      <div className="flex items-center mt-2">
                        <p className="text-sm text-gray-500">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                        {activity.status && (
                          <span className={`ml-3 text-xs px-2 py-1 rounded-full ${
                            activity.status === 'urgent' ? 'bg-red-100 text-red-700' :
                            activity.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {activity.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 