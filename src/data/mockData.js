// Real data will be fetched from the API - removing mock data

// Mock user for authentication (until real auth is implemented)
export const mockUser = {
  _id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'client',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
};

// Empty arrays - real data will come from API
export const mockProviders = [];

export const mockJobs = [];

// Service categories for registration forms
export const serviceCategories = [
  'Construction',
  'Electrical', 
  'Plumbing',
  'Carpentry',
  'Masonry',
  'Painting',
  'Roofing',
  'Landscaping',
  'Interior Design',
  'Cleaning Services',
  'HVAC',
  'Security Services',
  'Appliance Repair',
  'Automotive',
  'Catering',
  'Photography',
  'IT Services',
  'Beauty & Wellness',
  'Education',
  'Transportation',
  'Event Planning',
  'Pest Control',
  'Moving Services',
  'Welding',
  'Solar Installation',
  'Other'
];

// Municipalities in Bataan
export const municipalities = [
  'Abucay',
  'Bagac', 
  'Balanga',
  'Dinalupihan',
  'Hermosa',
  'Limay',
  'Mariveles',
  'Morong',
  'Orani',
  'Orion',
  'Pilar',
  'Samal'
];

// Export defaults
export default {
  mockUser,
  mockProviders,
  mockJobs,
  serviceCategories,
  municipalities
}; 