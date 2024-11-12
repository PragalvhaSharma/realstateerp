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

  const activityTypes = ['inquiry', 'approval', 'application', 'viewing', 'lease', 'property', 'user', 'sale'] as const;
  const mockActivities: Activity[] = Array.from({ length: 20 }, (_, i) => ({
    id: `activity-${i}`,
    type: activityTypes[Math.floor(Math.random() * activityTypes.length)],
    message: `Sample activity message ${i + 1}`,
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    status: ['pending', 'completed', 'urgent'][Math.floor(Math.random() * 3)] as 'pending' | 'completed' | 'urgent'
  }));

  // Sort activities by timestamp (most recent first)
  mockActivities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  return {
    mockStats,
    mockActivities
  }
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

export interface Property {
  id: string
  property: string
  address: string
  price: number
  status: 'Available' | 'Sold' | 'Pending'
  createdAt: Date
}

export const mockProperties: Property[] = [
  {
    id: '1',
    property: 'Luxury Villa',
    address: '123 Palm Street',
    price: 850000,
    status: 'Available',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    property: 'Modern Apartment',
    address: '456 Oak Avenue',
    price: 320000,
    status: 'Sold',
    createdAt: new Date('2024-02-01')
  },
  {
    id: '3',
    property: 'Beach House',
    address: '789 Coastal Road',
    price: 1200000,
    status: 'Available',
    createdAt: new Date('2024-02-15')
  },
  {
    id: '4',
    property: 'City Condo',
    address: '321 Urban Lane',
    price: 450000,
    status: 'Pending',
    createdAt: new Date('2024-03-01')
  },
  {
    id: '5',
    property: 'Country Estate',
    address: '654 Rural Route',
    price: 925000,
    status: 'Available',
    createdAt: new Date('2024-03-10')
  },
] 

export interface User {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Agent' | 'Manager' | 'Staff'
  status: 'Active' | 'Inactive' | 'Suspended'
  joinedDate: string
  lastActive: string
  phoneNumber: string
  properties: number
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    joinedDate: '2024-01-15',
    lastActive: '2024-03-15',
    phoneNumber: '+1 (555) 123-4567',
    properties: 12
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Agent',
    status: 'Active',
    joinedDate: '2024-02-01',
    lastActive: '2024-03-14',
    phoneNumber: '+1 (555) 234-5678',
    properties: 8
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'Manager',
    status: 'Active',
    joinedDate: '2023-11-15',
    lastActive: '2024-03-15',
    phoneNumber: '+1 (555) 345-6789',
    properties: 15
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'Agent',
    status: 'Inactive',
    joinedDate: '2023-12-01',
    lastActive: '2024-02-28',
    phoneNumber: '+1 (555) 456-7890',
    properties: 5
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'Staff',
    status: 'Suspended',
    joinedDate: '2024-01-20',
    lastActive: '2024-03-10',
    phoneNumber: '+1 (555) 567-8901',
    properties: 0
  },
  {
    id: '6',
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'Agent',
    status: 'Active',
    joinedDate: '2023-10-15',
    lastActive: '2024-03-15',
    phoneNumber: '+1 (555) 678-9012',
    properties: 10
  }
] 