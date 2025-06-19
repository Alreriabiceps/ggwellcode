// Mock data for Bataan Connect platform - Expanded to 100+ providers

// Base providers data
const baseMockProviders = [
  {
    _id: '1',
    businessName: 'Bataan Construction Co.',
    ownerName: 'Juan Dela Cruz',
    description: 'Premier construction company specializing in residential and commercial buildings. We have over 15 years of experience in Bataan province.',
    services: ['Construction', 'Renovation', 'Roofing', 'Foundation Work'],
    category: 'Construction',
    municipality: 'Balanga',
    barangay: 'Poblacion',
    location: {
      coordinates: [120.5362, 14.6760],
      type: 'Point'
    },
    contact: {
      phone: '+63 917 123 4567',
      email: 'info@bataanconstruction.com',
      website: 'https://bataanconstruction.com'
    },
    badges: {
      verified: true,
      featured: true,
      topRated: true
    },
    rating: 4.8,
    reviewCount: 42,
    portfolio: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400'
    ],
    yearsInBusiness: 15,
    employeeCount: '25-50',
    specialties: ['Residential Construction', 'Commercial Buildings', 'Infrastructure'],
    createdAt: '2023-01-15T00:00:00Z'
  },
  {
    _id: '2',
    businessName: 'Mariveles Electrical Services',
    ownerName: 'Maria Santos',
    description: 'Professional electrical installation and repair services. Licensed electricians serving Mariveles and surrounding areas.',
    services: ['Electrical Installation', 'Wiring', 'Electrical Repair', 'Panel Upgrades'],
    category: 'Electrical',
    municipality: 'Mariveles',
    barangay: 'Poblacion',
    location: {
      coordinates: [120.4842, 14.4325],
      type: 'Point'
    },
    contact: {
      phone: '+63 918 234 5678',
      email: 'maria@mariveleselectrical.com'
    },
    badges: {
      verified: true,
      featured: false,
      topRated: false
    },
    rating: 4.6,
    reviewCount: 28,
    portfolio: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    ],
    yearsInBusiness: 8,
    employeeCount: '5-10',
    specialties: ['Residential Wiring', 'Commercial Electrical', 'Emergency Repairs'],
    createdAt: '2023-03-20T00:00:00Z'
  },
  {
    _id: '3',
    businessName: 'Hermosa Plumbing Solutions',
    ownerName: 'Roberto Garcia',
    description: 'Complete plumbing services for homes and businesses. Available 24/7 for emergency repairs.',
    services: ['Plumbing Repair', 'Pipe Installation', 'Water Heater Service', 'Drain Cleaning'],
    category: 'Plumbing',
    municipality: 'Hermosa',
    barangay: 'Sandico',
    location: {
      coordinates: [120.5089, 14.8342],
      type: 'Point'
    },
    contact: {
      phone: '+63 919 345 6789',
      email: 'roberto@hermosaplumbing.com'
    },
    badges: {
      verified: false,
      featured: false,
      topRated: true
    },
    rating: 4.7,
    reviewCount: 35,
    portfolio: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400'
    ],
    yearsInBusiness: 12,
    employeeCount: '10-25',
    specialties: ['Emergency Plumbing', 'Bathroom Renovation', 'Water System Installation'],
    createdAt: '2023-02-10T00:00:00Z'
  },
  {
    _id: '4',
    businessName: 'Dinalupihan Auto Repair',
    ownerName: 'Carlos Mendoza',
    description: 'Full-service automotive repair shop. We service all makes and models with quality parts and expert technicians.',
    services: ['Auto Repair', 'Engine Service', 'Brake Repair', 'Oil Change'],
    category: 'Automotive',
    municipality: 'Dinalupihan',
    barangay: 'San Ramon',
    location: {
      coordinates: [120.4667, 14.9333],
      type: 'Point'
    },
    contact: {
      phone: '+63 920 456 7890',
      email: 'carlos@dinaautorepair.com'
    },
    badges: {
      verified: true,
      featured: false,
      topRated: false
    },
    rating: 4.4,
    reviewCount: 67,
    portfolio: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400',
      'https://images.unsplash.com/photo-1537450042960-b22c2fe2b9eb?w=400'
    ],
    yearsInBusiness: 20,
    employeeCount: '15-25',
    specialties: ['Engine Diagnostics', 'Transmission Repair', 'Preventive Maintenance'],
    createdAt: '2023-01-05T00:00:00Z'
  },
  {
    _id: '5',
    businessName: 'Orani Landscaping & Gardens',
    ownerName: 'Ana Reyes',
    description: 'Beautiful landscape design and maintenance services. Transform your outdoor spaces with our expert team.',
    services: ['Landscaping', 'Garden Design', 'Tree Trimming', 'Lawn Maintenance'],
    category: 'Landscaping',
    municipality: 'Orani',
    barangay: 'Poblacion',
    location: {
      coordinates: [120.5333, 14.8000],
      type: 'Point'
    },
    contact: {
      phone: '+63 921 567 8901',
      email: 'ana@oranilandscaping.com',
      website: 'https://oranilandscaping.com'
    },
    badges: {
      verified: true,
      featured: true,
      topRated: false
    },
    rating: 4.9,
    reviewCount: 23,
    portfolio: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    ],
    yearsInBusiness: 6,
    employeeCount: '5-10',
    specialties: ['Residential Landscaping', 'Commercial Gardens', 'Irrigation Systems'],
    createdAt: '2023-04-12T00:00:00Z'
  },
  {
    _id: '6',
    businessName: 'Samal Welding Works',
    ownerName: 'Pedro Villanueva',
    description: 'Professional welding and fabrication services. Custom metalwork for residential and industrial projects.',
    services: ['Welding', 'Metal Fabrication', 'Gate Installation', 'Structural Steel'],
    category: 'Welding',
    municipality: 'Samal',
    barangay: 'East Poblacion',
    location: {
      coordinates: [120.5500, 14.7667],
      type: 'Point'
    },
    contact: {
      phone: '+63 922 678 9012',
      email: 'pedro@samalwelding.com'
    },
    badges: {
      verified: false,
      featured: false,
      topRated: false
    },
    rating: 4.3,
    reviewCount: 19,
    portfolio: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400'
    ],
    yearsInBusiness: 10,
    employeeCount: '1-5',
    specialties: ['Custom Gates', 'Structural Welding', 'Repair Services'],
    createdAt: '2023-05-08T00:00:00Z'
  },
  {
    _id: '7',
    businessName: 'Abucay Catering Services',
    ownerName: 'Elena Cruz',
    description: 'Full-service catering for weddings, corporate events, and special occasions. Traditional Filipino and international cuisine.',
    services: ['Event Catering', 'Wedding Catering', 'Corporate Catering', 'Party Planning'],
    category: 'Catering',
    municipality: 'Abucay',
    barangay: 'Capitangan',
    location: {
      coordinates: [120.5333, 14.7167],
      type: 'Point'
    },
    contact: {
      phone: '+63 923 789 0123',
      email: 'elena@abucaycatering.com',
      website: 'https://abucaycatering.com'
    },
    badges: {
      verified: true,
      featured: false,
      topRated: true
    },
    rating: 4.8,
    reviewCount: 56,
    portfolio: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?w=400',
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400'
    ],
    yearsInBusiness: 18,
    employeeCount: '25-50',
    specialties: ['Wedding Catering', 'Corporate Events', 'Traditional Filipino Cuisine'],
    createdAt: '2023-01-30T00:00:00Z'
  },
  {
    _id: '8',
    businessName: 'Pilar IT Solutions',
    ownerName: 'Mark Tan',
    description: 'Complete IT services including computer repair, network setup, and software development for small businesses.',
    services: ['Computer Repair', 'Network Setup', 'Software Development', 'IT Consulting'],
    category: 'IT Services',
    municipality: 'Pilar',
    barangay: 'Poblacion',
    location: {
      coordinates: [120.5833, 14.6667],
      type: 'Point'
    },
    contact: {
      phone: '+63 924 890 1234',
      email: 'mark@pilarit.com',
      website: 'https://pilarit.com'
    },
    badges: {
      verified: true,
      featured: true,
      topRated: false
    },
    rating: 4.5,
    reviewCount: 31,
    portfolio: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'
    ],
    yearsInBusiness: 5,
    employeeCount: '5-10',
    specialties: ['Small Business IT', 'Web Development', 'Network Security'],
    createdAt: '2023-06-15T00:00:00Z'
  },
  {
    _id: '9',
    businessName: 'Bagac Beach Resort Services',
    ownerName: 'Roberto Fernandez',
    description: 'Complete resort and hospitality services including accommodation, event planning, and recreational activities.',
    services: ['Resort Management', 'Event Planning', 'Tourism Services', 'Beach Activities'],
    category: 'Tourism',
    municipality: 'Bagac',
    barangay: 'Bagac',
    location: {
      coordinates: [120.4167, 14.6000],
      type: 'Point'
    },
    contact: {
      phone: '+63 920 111 2222',
      email: 'info@bagacresort.com',
      website: 'https://bagacresort.com'
    },
    badges: {
      verified: true,
      featured: true,
      topRated: false
    },
    rating: 4.5,
    reviewCount: 89,
    portfolio: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
    ],
    yearsInBusiness: 12,
    employeeCount: '50-100',
    specialties: ['Beach Resorts', 'Corporate Events', 'Wedding Venues'],
    createdAt: '2023-02-05T00:00:00Z'
  },
  {
    _id: '10',
    businessName: 'Limay Auto Parts & Service',
    ownerName: 'Carlos Mendoza',
    description: 'Complete automotive services including repairs, parts supply, and maintenance for all vehicle types.',
    services: ['Auto Repair', 'Parts Supply', 'Oil Change', 'Tire Service'],
    category: 'Automotive',
    municipality: 'Limay',
    barangay: 'Reformista',
    location: {
      coordinates: [120.5833, 14.5667],
      type: 'Point'
    },
    contact: {
      phone: '+63 921 333 4444',
      email: 'carlos@limayauto.com'
    },
    badges: {
      verified: true,
      featured: false,
      topRated: true
    },
    rating: 4.7,
    reviewCount: 156,
    portfolio: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400'
    ],
    yearsInBusiness: 18,
    employeeCount: '10-25',
    specialties: ['Engine Repair', 'Transmission Service', 'Brake Systems'],
    createdAt: '2023-01-12T00:00:00Z'
  }
];

// Generate additional 96 providers programmatically
const generateAdditionalProviders = () => {
  const municipalities = [
    'Abucay', 'Bagac', 'Balanga', 'Dinalupihan', 'Hermosa', 
    'Limay', 'Mariveles', 'Morong', 'Orani', 'Orion', 'Pilar', 'Samal'
  ];
  
  const barangays = {
    'Abucay': ['Capitangan', 'Laon', 'Mabatang', 'Omboy', 'Salian'],
    'Bagac': ['Bagac', 'Binuangan', 'Ibaba', 'Pag-asa', 'Quinawan'],
    'Balanga': ['Poblacion', 'Bagong Silang', 'Central', 'Dangcol', 'Ibayo'],
    'Dinalupihan': ['San Ramon', 'Bangal', 'Daang Bago', 'Gen. Luna', 'Kataasan'],
    'Hermosa': ['Sandico', 'A. Rivera', 'Bacong', 'Cataning', 'Daungan'],
    'Limay': ['Reformista', 'Alangan', 'Kitang I', 'Lamao', 'Townsite'],
    'Mariveles': ['Poblacion', 'Alas-asin', 'Balon-anito', 'Cabcaben', 'Lucanin'],
    'Morong': ['Poblacion', 'Binaritan', 'Mabayo', 'Nagbalayong', 'Sabang'],
    'Orani': ['Poblacion', 'Bagong Paraiso', 'Balut', 'Centro I', 'Kaparangan'],
    'Orion': ['Poblacion', 'Arellano', 'Bagumbayan', 'Bilolo', 'Camachile'],
    'Pilar': ['Poblacion', 'Bagumbayan', 'Balut I', 'Diwa', 'Wakas'],
    'Samal': ['East Poblacion', 'West Poblacion', 'Guinhawa', 'Ibaba', 'Imelda']
  };

  const serviceCategories = [
    {
      category: 'Construction',
      services: ['Construction', 'Renovation', 'Roofing', 'Foundation Work', 'Masonry', 'Concrete Work'],
      specialties: ['Residential Construction', 'Commercial Buildings', 'Infrastructure', 'Home Renovation']
    },
    {
      category: 'Electrical',
      services: ['Electrical Installation', 'Wiring', 'Electrical Repair', 'Panel Upgrades', 'Lighting Installation'],
      specialties: ['Residential Wiring', 'Commercial Electrical', 'Emergency Repairs', 'Solar Installation']
    },
    {
      category: 'Plumbing',
      services: ['Plumbing Repair', 'Pipe Installation', 'Water Heater Service', 'Drain Cleaning', 'Bathroom Renovation'],
      specialties: ['Emergency Plumbing', 'Bathroom Renovation', 'Water System Installation', 'Septic Systems']
    },
    {
      category: 'Automotive',
      services: ['Auto Repair', 'Engine Service', 'Brake Repair', 'Oil Change', 'Tire Service', 'Battery Service'],
      specialties: ['Engine Diagnostics', 'Transmission Repair', 'Preventive Maintenance', 'Air Conditioning']
    },
    {
      category: 'Landscaping',
      services: ['Landscaping', 'Garden Design', 'Tree Trimming', 'Lawn Maintenance', 'Irrigation Systems'],
      specialties: ['Residential Landscaping', 'Commercial Gardens', 'Irrigation Systems', 'Tree Care']
    },
    {
      category: 'Catering',
      services: ['Event Catering', 'Wedding Catering', 'Corporate Catering', 'Party Planning', 'Food Delivery'],
      specialties: ['Wedding Catering', 'Corporate Events', 'Traditional Filipino Cuisine', 'International Cuisine']
    },
    {
      category: 'IT Services',
      services: ['Computer Repair', 'Network Setup', 'Software Development', 'IT Consulting', 'Data Recovery'],
      specialties: ['Small Business IT', 'Web Development', 'Network Security', 'System Administration']
    },
    {
      category: 'Cleaning',
      services: ['House Cleaning', 'Office Cleaning', 'Deep Cleaning', 'Carpet Cleaning', 'Window Cleaning'],
      specialties: ['Residential Cleaning', 'Commercial Cleaning', 'Post-Construction Cleanup', 'Sanitization']
    },
    {
      category: 'Beauty & Wellness',
      services: ['Hair Styling', 'Nail Care', 'Massage Therapy', 'Facial Treatments', 'Makeup Services'],
      specialties: ['Bridal Makeup', 'Therapeutic Massage', 'Skin Care', 'Hair Treatments']
    },
    {
      category: 'Education',
      services: ['Tutoring', 'Music Lessons', 'Language Classes', 'Computer Training', 'Test Preparation'],
      specialties: ['Academic Tutoring', 'Music Education', 'English Classes', 'Computer Literacy']
    }
  ];

  const businessNames = [
    'Elite', 'Premier', 'Professional', 'Quality', 'Reliable', 'Expert', 'Trusted', 'Superior',
    'Advanced', 'Modern', 'Innovative', 'Excellence', 'Prime', 'Top', 'Best', 'Golden',
    'Diamond', 'Platinum', 'Royal', 'Master', 'Pro', 'Ace', 'Star', 'Champion'
  ];

  const businessSuffixes = [
    'Services', 'Solutions', 'Works', 'Enterprise', 'Company', 'Corp', 'Group',
    'Center', 'Studio', 'Shop', 'Clinic', 'Academy', 'Institute', 'Hub'
  ];

  const ownerNames = [
    'Juan Dela Cruz', 'Maria Santos', 'Jose Rizal', 'Ana Garcia', 'Pedro Martinez',
    'Carmen Rodriguez', 'Miguel Torres', 'Rosa Hernandez', 'Antonio Lopez', 'Elena Gonzalez',
    'Francisco Perez', 'Isabella Morales', 'Diego Ramirez', 'Sofia Jimenez', 'Carlos Vargas',
    'Lucia Castillo', 'Manuel Ortega', 'Valentina Ruiz', 'Rafael Moreno', 'Camila Gutierrez'
  ];

  const additionalProviders = [];
  let currentId = 11;

  for (let i = 0; i < 96; i++) {
    const municipality = municipalities[i % municipalities.length];
    const categoryData = serviceCategories[i % serviceCategories.length];
    const barangayList = barangays[municipality];
    const barangay = barangayList[i % barangayList.length];
    
    // Generate coordinates within Bataan bounds
    const baseLat = 14.6760;
    const baseLng = 120.5362;
    const latOffset = (Math.random() - 0.5) * 0.6; // ±0.3 degrees
    const lngOffset = (Math.random() - 0.5) * 0.4; // ±0.2 degrees
    
    const businessPrefix = businessNames[i % businessNames.length];
    const businessSuffix = businessSuffixes[i % businessSuffixes.length];
    const businessName = `${businessPrefix} ${municipality} ${categoryData.category} ${businessSuffix}`;
    
    const isVerified = Math.random() > 0.4; // 60% verified
    const isFeatured = Math.random() > 0.8; // 20% featured
    const isTopRated = Math.random() > 0.7; // 30% top rated
    
    const rating = 3.5 + Math.random() * 1.5; // 3.5 to 5.0
    const reviewCount = Math.floor(Math.random() * 200) + 5; // 5 to 204 reviews
    const yearsInBusiness = Math.floor(Math.random() * 25) + 1; // 1 to 25 years
    
    const employeeCounts = ['1-5', '5-10', '10-25', '25-50', '50-100'];
    const employeeCount = employeeCounts[Math.floor(Math.random() * employeeCounts.length)];
    
    const provider = {
      _id: currentId.toString(),
      businessName,
      ownerName: ownerNames[i % ownerNames.length],
      description: `Professional ${categoryData.category.toLowerCase()} services in ${municipality}, Bataan. We provide high-quality ${categoryData.services[0].toLowerCase()} and related services with ${yearsInBusiness} years of experience serving the local community.`,
      services: categoryData.services.slice(0, 3 + Math.floor(Math.random() * 3)), // 3-5 services
      category: categoryData.category,
      municipality,
      barangay,
      location: {
        coordinates: [baseLng + lngOffset, baseLat + latOffset],
        type: 'Point'
      },
      contact: {
        phone: `+63 9${Math.floor(Math.random() * 4) + 1}${Math.floor(Math.random() * 9)}${Math.random().toString().substr(2, 7)}`,
        email: `info@${businessName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com`
      },
      badges: {
        verified: isVerified,
        featured: isFeatured,
        topRated: isTopRated
      },
      rating: Math.round(rating * 10) / 10,
      reviewCount,
      portfolio: Math.random() > 0.5 ? [
        `https://images.unsplash.com/photo-${1500000000 + Math.floor(Math.random() * 100000000)}?w=400`,
        `https://images.unsplash.com/photo-${1500000000 + Math.floor(Math.random() * 100000000)}?w=400`
      ] : [],
      yearsInBusiness,
      employeeCount,
      specialties: categoryData.specialties.slice(0, 2 + Math.floor(Math.random() * 2)), // 2-3 specialties
      createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
    };
    
    // Add website for some providers
    if (Math.random() > 0.7) {
      provider.contact.website = `https://${businessName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com`;
    }
    
    additionalProviders.push(provider);
    currentId++;
  }
  
  return additionalProviders;
};

// Combine original providers with generated ones
const allProviders = [
  ...baseMockProviders,
  ...generateAdditionalProviders()
];

// Export the combined providers
export const mockProviders = allProviders;

export const mockHighlights = [
  {
    _id: 'h1',
    providerId: '1',
    provider: allProviders[0],
    title: 'Featured: Bataan Construction Co.',
    description: 'Premier construction services with 15+ years of experience',
    week: '2024-W25',
    isActive: true,
    createdAt: '2024-06-17T00:00:00Z'
  },
  {
    _id: 'h2',
    providerId: '5',
    provider: allProviders[4],
    title: 'Beautiful Gardens by Orani Landscaping',
    description: 'Transform your outdoor spaces with expert landscape design',
    week: '2024-W25',
    isActive: true,
    createdAt: '2024-06-17T00:00:00Z'
  },
  {
    _id: 'h3',
    providerId: '8',
    provider: allProviders[7],
    title: 'IT Solutions for Small Business',
    description: 'Complete IT services from Pilar IT Solutions',
    week: '2024-W25',
    isActive: true,
    createdAt: '2024-06-17T00:00:00Z'
  }
];

export const mockJobs = [
  {
    _id: 'j1',
    title: 'Kitchen Renovation',
    description: 'Need complete kitchen renovation including cabinets, countertops, and electrical work.',
    category: 'Construction',
    location: 'Balanga, Bataan',
    budget: '150000-200000',
    clientId: 'user1',
    status: 'open',
    suggestedProviders: [allProviders[0], allProviders[1]],
    createdAt: '2024-06-15T00:00:00Z'
  },
  {
    _id: 'j2',
    title: 'Wedding Catering for 200 guests',
    description: 'Looking for catering services for outdoor wedding reception.',
    category: 'Catering',
    location: 'Hermosa, Bataan',
    budget: '80000-120000',
    clientId: 'user2',
    status: 'open',
    suggestedProviders: [allProviders[6]],
    createdAt: '2024-06-16T00:00:00Z'
  }
];

export const mockUser = {
  _id: 'user1',
  email: 'demo@bataanconnect.com',
  name: 'Demo User',
  role: 'client',
  isProvider: false,
  createdAt: '2024-01-01T00:00:00Z'
};

export const mockStats = {
  totalProviders: allProviders.length,
  verifiedProviders: allProviders.filter(p => p.badges.verified).length,
  totalJobs: mockJobs.length,
  activeHighlights: mockHighlights.filter(h => h.isActive).length,
  categoriesCount: {
    'Construction': allProviders.filter(p => p.category === 'Construction').length,
    'Electrical': allProviders.filter(p => p.category === 'Electrical').length,
    'Plumbing': allProviders.filter(p => p.category === 'Plumbing').length,
    'Automotive': allProviders.filter(p => p.category === 'Automotive').length,
    'Landscaping': allProviders.filter(p => p.category === 'Landscaping').length,
    'Catering': allProviders.filter(p => p.category === 'Catering').length,
    'IT Services': allProviders.filter(p => p.category === 'IT Services').length,
    'Cleaning': allProviders.filter(p => p.category === 'Cleaning').length,
    'Beauty & Wellness': allProviders.filter(p => p.category === 'Beauty & Wellness').length,
    'Education': allProviders.filter(p => p.category === 'Education').length
  }
}; 