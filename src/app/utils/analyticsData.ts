export const monthlyData = [
  {
    month: "Jan",
    students: 100,
    viewings: 150,
    applications: 75
  },
  {
    month: "Feb",
    students: 120,
    viewings: 180,
    applications: 90
  },
  { month: 'Mar', students: 120, viewings: 75, applications: 45 },
  { month: 'Apr', students: 150, viewings: 90, applications: 60 },
  { month: 'May', students: 180, viewings: 110, applications: 75 },
  { month: 'Jun', students: 210, viewings: 130, applications: 85 },
  { month: 'Jul', students: 195, viewings: 125, applications: 80 },
  { month: 'Aug', students: 230, viewings: 145, applications: 95 },
  { month: 'Sep', students: 245, viewings: 155, applications: 100 },
  { month: 'Oct', students: 225, viewings: 140, applications: 90 },
  { month: 'Nov', students: 200, viewings: 125, applications: 80 },
  { month: 'Dec', students: 190, viewings: 120, applications: 75 }
].map(item => ({
  ...item,
  students: Number(item.students),
  viewings: Number(item.viewings),
  applications: Number(item.applications)
}));

export const propertyData = [
  { type: 'Studio', count: 45, avgRent: 950 },
  { type: '1 Bedroom', count: 85, avgRent: 1200 },
  { type: '2 Bedroom', count: 95, avgRent: 1600 },
  { type: '3 Bedroom', count: 55, avgRent: 2100 },
  { type: '4+ Bedroom', count: 25, avgRent: 2800 },
];

export const quickStats = {
  activeStudents: {
    value: '2,456',
    change: '+15%',
  },
  listedProperties: {
    value: '305',
    change: '+8%',
  },
  monthlyViewings: {
    value: '428',
    change: '+22%',
  },
  successRate: {
    value: '82%',
    change: '+5%',
  },
}; 