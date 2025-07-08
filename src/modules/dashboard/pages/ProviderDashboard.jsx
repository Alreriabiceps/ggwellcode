import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { Card, StatsCard } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Loading } from '../../../components/ui/Loading';
import { 
  FaUserCircle, 
  FaBuilding, 
  FaCheckCircle, 
  FaClock, 
  FaEye, 
  FaClipboardList, 
  FaBriefcase, 
  FaStar, 
  FaUser, 
  FaSearch, 
  FaCamera,
  FaEdit,
  FaArrowUp,
  FaArrowRight,
  FaChartLine,
  FaHeart,
  FaComments,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe
} from 'react-icons/fa';

const ProviderDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data - in real app, this would come from API
  const user = {
    name: 'Juan Dela Cruz',
    email: 'juan@delacruz.com',
    phone: '+63 917 123 4567',
    website: 'www.delacruzservices.com',
    location: 'Balanga, Bataan',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    businessName: 'Dela Cruz Construction Services',
    businessCategory: 'Construction & Renovation',
    businessDescription: 'Professional construction and renovation services with over 15 years of experience in residential and commercial projects.',
    verified: true,
    rating: 4.9,
    reviewCount: 127,
    completedProjects: 89,
    yearsInBusiness: 15
  };

  const stats = [
    {
      title: 'Total Earnings',
      value: '₱2,450,000',
      description: 'This month: ₱180,000',
      trend: '+12%',
      variant: 'success'
    },
    {
      title: 'Active Projects',
      value: '8',
      description: '2 starting this week',
      trend: '+2',
      variant: 'primary'
    },
    {
      title: 'Client Reviews',
      value: '4.9',
      description: `${user.reviewCount} reviews`,
      trend: '+0.2',
      variant: 'warning'
    },
    {
      title: 'Profile Views',
      value: '1,234',
      description: 'Last 30 days',
      trend: '+15%',
      variant: 'purple'
    }
  ];

  const recentApplications = [
    {
      id: 1,
      projectTitle: 'Modern House Renovation',
      client: 'Maria Santos',
      budget: '₱850,000',
      location: 'Mariveles, Bataan',
      status: 'pending',
      submittedAt: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b287?w=48&h=48&fit=crop&crop=face'
    },
    {
      id: 2,
      projectTitle: 'Commercial Building Construction',
      client: 'ABC Trading Corp',
      budget: '₱5,200,000',
      location: 'Balanga, Bataan',
      status: 'reviewing',
      submittedAt: '1 day ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face'
    },
    {
      id: 3,
      projectTitle: 'Residential Interior Design',
      client: 'Ana Rodriguez',
      budget: '₱320,000',
      location: 'Orion, Bataan',
      status: 'accepted',
      submittedAt: '3 days ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face'
    }
  ];

  const portfolioHighlights = [
    {
      id: 1,
      title: 'Luxury Villa Construction',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      completedAt: '2 months ago',
      rating: 5.0,
      budget: '₱3,200,000'
    },
    {
      id: 2,
      title: 'Office Building Renovation',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      completedAt: '4 months ago',
      rating: 4.8,
      budget: '₱1,800,000'
    },
    {
      id: 3,
      title: 'Modern Apartment Complex',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
      completedAt: '6 months ago',
      rating: 4.9,
      budget: '₱4,500,000'
    }
  ];

  const quickActions = [
    {
      label: 'Update Profile',
      icon: FaEdit,
      href: '/profile',
      variant: 'primary'
    },
    {
      label: 'View Portfolio',
      icon: FaBriefcase,
      href: '/portfolio',
      variant: 'secondary'
    },
    {
      label: 'Manage Applications',
      icon: FaClipboardList,
      href: '/applications',
      variant: 'success'
    },
    {
      label: 'Upload Photos',
      icon: FaCamera,
      href: '/portfolio/upload',
      variant: 'purple'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="w-3 h-3" />;
      case 'reviewing':
        return <FaEye className="w-3 h-3" />;
      case 'accepted':
        return <FaCheckCircle className="w-3 h-3" />;
      default:
        return <FaClock className="w-3 h-3" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading size="lg" text="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-apple py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-apple-lg overflow-hidden shadow-apple">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-title font-bold text-gray-900">
                    Welcome back, {user.name}!
                  </h1>
                  {user.verified && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-apple-lg text-sm font-medium">
                      <FaCheckCircle className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                </div>
                <p className="text-body text-gray-600 mb-1">
                  {user.businessName} • {user.businessCategory}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FaStar className="w-4 h-4 text-yellow-400" />
                    <span>{user.rating}</span>
                    <span>({user.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" leftIcon={<FaEdit />}>
                Edit Profile
              </Button>
              <Button variant="primary" size="sm" leftIcon={<FaEye />}>
                View Public Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-apple py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Stats & Recent Activity */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  description={stat.description}
                  trend={stat.trend}
                  variant={stat.variant}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>

            {/* Recent Applications */}
            <Card className="animate-slide-up">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-title font-semibold">Recent Applications</h2>
                  <Link to="/applications">
                    <Button variant="ghost" size="sm" rightIcon={<FaArrowRight />}>
                      View All
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div 
                      key={application.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-apple-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={application.avatar}
                          alt={application.client}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {application.projectTitle}
                          </h3>
                          <p className="text-sm text-gray-600 mb-1">
                            {application.client} • {application.location}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="font-medium text-green-600">
                              {application.budget}
                            </span>
                            <span>•</span>
                            <span>{application.submittedAt}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'flex items-center gap-1 px-3 py-1 rounded-apple text-sm font-medium',
                          getStatusColor(application.status)
                        )}>
                          {getStatusIcon(application.status)}
                          {application.status}
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Portfolio Highlights */}
            <Card className="animate-slide-up">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-title font-semibold">Portfolio Highlights</h2>
                  <Link to="/portfolio">
                    <Button variant="ghost" size="sm" rightIcon={<FaArrowRight />}>
                      View Portfolio
                    </Button>
                  </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {portfolioHighlights.map((project) => (
                    <div key={project.id} className="group">
                      <div className="aspect-[4/3] rounded-apple-lg overflow-hidden mb-4 shadow-apple group-hover:shadow-apple-lg transition-shadow">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <FaStar className="w-4 h-4 text-yellow-400" />
                          <span>{project.rating}</span>
                        </div>
                        <span className="font-medium text-green-600">
                          {project.budget}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Completed {project.completedAt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Business Info */}
          <div className="space-y-8">
            
            {/* Quick Actions */}
            <Card className="animate-slide-up">
              <div className="p-6">
                <h2 className="text-title font-semibold mb-6">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link 
                      key={index}
                      to={action.href}
                      className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-apple-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className={cn(
                        'w-12 h-12 rounded-apple flex items-center justify-center group-hover:scale-110 transition-transform',
                        action.variant === 'primary' && 'bg-blue-500 text-white',
                        action.variant === 'secondary' && 'bg-gray-500 text-white',
                        action.variant === 'success' && 'bg-green-500 text-white',
                        action.variant === 'purple' && 'bg-purple-500 text-white'
                      )}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 text-center">
                        {action.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </Card>

            {/* Business Information */}
            <Card className="animate-slide-up">
              <div className="p-6">
                <h2 className="text-title font-semibold mb-6">Business Information</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {user.businessName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {user.businessDescription}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <FaPhone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FaEnvelope className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FaGlobe className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{user.website}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{user.location}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {user.completedProjects}
                        </div>
                        <div className="text-sm text-gray-600">
                          Projects Completed
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {user.yearsInBusiness}
                        </div>
                        <div className="text-sm text-gray-600">
                          Years in Business
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Performance Insights */}
            <Card className="animate-slide-up">
              <div className="p-6">
                <h2 className="text-title font-semibold mb-6">Performance Insights</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-apple flex items-center justify-center">
                        <FaChartLine className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Profile Views</div>
                        <div className="text-sm text-gray-600">Up 15% this month</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">
                      <FaArrowUp className="w-4 h-4 inline mr-1" />
                      +15%
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-apple flex items-center justify-center">
                        <FaHeart className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Client Satisfaction</div>
                        <div className="text-sm text-gray-600">98% positive feedback</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">
                      98%
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-apple flex items-center justify-center">
                        <FaComments className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Response Time</div>
                        <div className="text-sm text-gray-600">Average 2.5 hours</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">
                      Excellent
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard; 