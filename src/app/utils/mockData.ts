export const generateMockData = () => {
  const mockStats: DashboardStats = {
    totalProperties: 1284,
    totalRevenue: 4582930,
    totalUsers: 3421,
    activeListings: 892,
    pendingApprovals: 23,
    monthlyRevenue: [125000, 142000, 165000, 189000, 178000, 198000, 
                     210000, 215000, 234000, 245000, 255000, 265000],
    propertyTypes: [
      { type: 'Residential', count: 645 },
      { type: 'Commercial', count: 234 },
      { type: 'Industrial', count: 89 },
      { type: 'Land', count: 316 }
    ],
    leadConversionRate: 68.5
  }

  const mockActivities: Activity[] = [
    {
      id: '1',
      type: 'property',
      message: 'New luxury property listed in Beverly Hills - $8.5M',
      timestamp: new Date('2024-03-15T10:30:00'),
      status: 'completed'
    },
    {
      id: '2',
      type: 'sale',
      message: 'Property sale completed: 123 Main Street - $750,000',
      timestamp: new Date('2024-03-15T09:15:00'),
      status: 'completed'
    },
    {
      id: '3',
      type: 'inquiry',
      message: 'Urgent: High-priority client requesting property tour',
      timestamp: new Date('2024-03-15T08:45:00'),
      status: 'urgent'
    },
    // Add more mock activities...
  ]

  return { mockStats, mockActivities }
} 