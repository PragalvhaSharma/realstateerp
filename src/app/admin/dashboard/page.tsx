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
import { useRouter } from 'next/navigation'

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
  type: 'property' | 'user' | 'sale' | 'inquiry' | 'approval' | 'application' | 'viewing' | 'lease'
  message: string
  timestamp: Date
  status?: 'pending' | 'completed' | 'urgent'
  userId?: string
}

export default function AdminDashboard(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [timeRange, setTimeRange] = useState('week')
  const [filterType, setFilterType] = useState('all')
  const [selectedChart, setSelectedChart] = useState<'revenue' | 'properties'>('revenue')
  const router = useRouter()

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
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 mb-8 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Analytics Overview</h2>
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

  const handleAddProperty = () => {
    // You can either navigate to a new page or show a modal
    router.push('/admin/properties/add')
  }

  const handleGenerateReport = () => {
    router.push('/admin/reports')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="overflow-x-hidden transition-all duration-300 ease-in-out">
        <div className="p-4 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-500 mt-1">Welcome back, Admin</p>
            </div>
            <div className="space-x-3">
              <button 
                onClick={handleGenerateReport}
                className="px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Generate Report
              </button>
              <button 
                onClick={handleAddProperty}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Property
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
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

          {/* Replace the Quick Actions div with System Health */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Server Response Time</span>
                  <span className="text-sm font-medium text-green-600">98ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Database Load</span>
                  <span className="text-sm font-medium text-blue-600">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Storage Usage</span>
                  <span className="text-sm font-medium text-yellow-600">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs text-gray-500">Last updated: 2 minutes ago</span>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 overflow-x-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-900"
              >
                <option value="all">All Activities</option>
                <option value="application">Applications</option>
                <option value="viewing">Viewings</option>
                <option value="lease">Leases</option>
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
                      <p className="text-gray-900">{activity.message}</p>
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