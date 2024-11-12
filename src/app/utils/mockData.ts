export interface DashboardStats {
  totalProperties: number;
  totalRevenue: number;
  totalUsers: number;
  activeListings: number;
  pendingApprovals: number;
  monthlyRevenue: number[];
  propertyTypes: { type: string; count: number }[];
  leadConversionRate: number;
}

export interface Activity {
  id: string;
  type: 'property' | 'user' | 'sale' | 'inquiry' | 'approval' | 'application' | 'viewing' | 'lease';
  message: string;
  timestamp: Date;
  status?: 'pending' | 'completed' | 'urgent';
  userId?: string;
}

export function generateMockData(): { mockStats: DashboardStats; mockActivities: Activity[] } {
  const mockStats: DashboardStats = {
    totalProperties: 284,
    totalRevenue: 582930,
    totalUsers: 421,
    activeListings: 92,
    pendingApprovals: 43,
    monthlyRevenue: [45000, 52000, 48000, 51000, 58000, 62000, 
                     65000, 85000, 95000, 55000, 45000, 42000], // Higher in school starting months
    propertyTypes: [
      { type: 'Shared House', count: 145 },
      { type: 'Studio Apartment', count: 64 },
      { type: 'Student Complex', count: 45 },
      { type: 'Basement Suite', count: 30 }
    ],
    leadConversionRate: 92.5
  }

  const mockActivities: Activity[] = [
    {
      id: '1',
      type: 'application',
      message: 'New student group application for 123 University Ave',
      timestamp: new Date('2024-03-15T10:30:00'),
      status: 'pending'
    },
    {
      id: '2',
      type: 'lease',
      message: 'Lease signed: 45 College Street - 4 bedroom house',
      timestamp: new Date('2024-03-15T09:15:00'),
      status: 'completed'
    },
    {
      id: '3',
      type: 'viewing',
      message: 'Group viewing scheduled for Student Complex Unit 12B',
      timestamp: new Date('2024-03-15T08:45:00'),
      status: 'urgent'
    }
  ]

  return { mockStats, mockActivities }
}

export const analyticsData = {
  totalProperties: 284,
  totalRevenue: 582930,
  activeListings: 92,
  monthlyViews: 8500,
  revenueData: [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 48000 },
    { month: 'Mar', amount: 52000 },
    { month: 'Apr', amount: 55000 },
    { month: 'May', amount: 85000 }, // Peak due to summer term
    { month: 'Jun', amount: 95000 }  // Peak due to fall term preparation
  ],
  propertyTypeDistribution: [
    { type: 'Shared House', count: 145 },
    { type: 'Studio Apartment', count: 64 },
    { type: 'Student Complex', count: 45 },
    { type: 'Basement Suite', count: 30 }
  ],
  recentTransactions: [
    { 
      id: 1, 
      property: '123 University Ave - 5 Bed House', 
      amount: 2500, 
      date: '2024-03-15', 
      status: 'Completed',
      tenants: 5
    },
    { 
      id: 2, 
      property: 'Student Complex Unit 4B', 
      amount: 1200, 
      date: '2024-03-14', 
      status: 'Pending',
      tenants: 2
    },
    { 
      id: 3, 
      property: '45 College St - Studio', 
      amount: 950, 
      date: '2024-03-13', 
      status: 'Completed',
      tenants: 1
    },
    { 
      id: 4, 
      property: '789 Campus Drive - Basement', 
      amount: 1100, 
      date: '2024-03-12', 
      status: 'Processing',
      tenants: 1
    }
  ]
}; 