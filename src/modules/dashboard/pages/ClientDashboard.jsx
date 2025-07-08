import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { Card, StatsCard } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Loading } from '../../../components/ui/Loading';
import { 
  FaUserCircle,
  FaCheckCircle,
  FaSearch,
  FaRobot,
  FaMobileAlt,
  FaClipboardList,
  FaStar,
  FaComments,
  FaEdit,
  FaArrowRight,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaEye,
  FaHeart,
  FaBell,
  FaCalendarCheck,
  FaChartLine
} from 'react-icons/fa';

const ClientDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data - in real app, this would come from API
  const user = {
    name: 'Maria Santos',
    email: 'maria@santos.com',
    phone: '+63 917 987 6543',
    location: 'Mariveles, Bataan',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b287?w=100&h=100&fit=crop&crop=face',
    memberSince: 'January 2023',
    projectsPosted: 12,
    averageRating: 4.8,
    totalSpent: '₱2,150,000'
  };

  const stats = [
    {
      title: 'Active Projects',
      value: '3',
      description: '1 in progress, 2 pending',
      trend: '+1',
      variant: 'primary'
    },
    {
      title: 'Total Spent',
      value: '₱2.15M',
      description: 'Across all projects',
      trend: '+8%',
      variant: 'success'
    },
    {
      title: 'Completed Projects',
      value: '9',
      description: 'Successfully finished',
      trend: '+3',
      variant: 'purple'
    },
    {
      title: 'Saved Providers',
      value: '24',
      description: 'In your favorites',
      trend: '+5',
      variant: 'warning'
    }
  ];

  const activeProjects = [
    {
      id: 1,
      title: 'Modern House Renovation',
      provider: 'Juan Dela Cruz Construction',
      budget: '₱850,000',
      status: 'in_progress',
      progress: 65,
      startDate: '2024-01-15',
      expectedCompletion: '2024-03-30',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'
    },
    {
      id: 2,
      title: 'Garden Landscaping',
      provider: 'Green Thumb Landscaping',
      budget: '₱280,000',
      status: 'pending',
      progress: 0,
      startDate: '2024-02-01',
      expectedCompletion: '2024-02-28',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face'
    },
    {
      id: 3,
      title: 'Kitchen Remodeling',
      provider: 'Elite Interior Design',
      budget: '₱420,000',
      status: 'pending',
      progress: 0,
      startDate: '2024-02-15',
      expectedCompletion: '2024-04-15',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'project_update',
      message: 'Juan Dela Cruz Construction shared progress photos for Modern House Renovation',
      timestamp: '2 hours ago',
      icon: FaCheckCircle,
      iconColor: 'text-green-500'
    },
    {
      id: 2,
      type: 'application_received',
      message: 'New application received from Elite Builders for Kitchen Remodeling',
      timestamp: '5 hours ago',
      icon: FaBell,
      iconColor: 'text-blue-500'
    },
    {
      id: 3,
      type: 'review_request',
      message: 'Please review completed project: Bathroom Renovation',
      timestamp: '1 day ago',
      icon: FaStar,
      iconColor: 'text-yellow-500'
    },
    {
      id: 4,
      type: 'message',
      message: 'New message from Juan Dela Cruz Construction',
      timestamp: '2 days ago',
      icon: FaComments,
      iconColor: 'text-purple-500'
    }
  ];

  const recommendedProviders = [
    {
      id: 1,
      name: 'ABC Construction Services',
      category: 'General Construction',
      rating: 4.9,
      reviewCount: 156,
      location: 'Balanga, Bataan',
      startingPrice: '₱150,000',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
      verified: true
    },
    {
      id: 2,
      name: 'Modern Interiors Studio',
      category: 'Interior Design',
      rating: 4.8,
      reviewCount: 89,
      location: 'Mariveles, Bataan',
      startingPrice: '₱80,000',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face',
      verified: true
    },
    {
      id: 3,
      name: 'Reliable Plumbing Co.',
      category: 'Plumbing Services',
      rating: 4.7,
      reviewCount: 234,
      location: 'Orion, Bataan',
      startingPrice: '₱25,000',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      verified: false
    }
  ];

  const quickActions = [
    {
      label: 'Find Providers',
      icon: FaSearch,
      href: '/explore',
      variant: 'primary',
      description: 'Browse verified service providers'
    },
    {
      label: 'AI Analyzer',
      icon: FaRobot,
      href: '/ai-analyzer',
      variant: 'purple',
      description: 'Upload photos for AI analysis'
    },
    {
      label: 'My Projects',
      icon: FaClipboardList,
      href: '/projects',
      variant: 'secondary',
      description: 'Manage your active projects'
    },
    {
      label: 'Messages',
      icon: FaComments,
      href: '/messages',
      variant: 'success',
      description: 'Chat with your providers'
    }
  ];

  const getProjectStatusColor = (status) => {
    switch (status) {
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'on_hold':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectStatusIcon = (status) => {
    switch (status) {
      case 'in_progress':
        return <FaClock className="w-3 h-3" />;
      case 'pending':
        return <FaEye className="w-3 h-3" />;
      case 'completed':
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
                </div>
                <p className="text-body text-gray-600 mb-1">
                  Member since {user.memberSince}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FaStar className="w-4 h-4 text-yellow-400" />
                    <span>{user.averageRating} average rating</span>
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
              <Button variant="primary" size="sm" leftIcon={<FaSearch />}>
                Find Providers
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-apple py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Projects & Activity */}
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

            {/* Active Projects */}
            <Card className="animate-slide-up">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-title font-semibold">Active Projects</h2>
                  <Link to="/projects">
                    <Button variant="ghost" size="sm" rightIcon={<FaArrowRight />}>
                      View All
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {activeProjects.map((project) => (
                    <div 
                      key={project.id}
                      className="p-4 bg-gray-50 rounded-apple-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={project.avatar}
                            alt={project.provider}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {project.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">
                              {project.provider}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span className="font-medium text-green-600">
                                {project.budget}
                              </span>
                              <span>•</span>
                              <span>Expected: {project.expectedCompletion}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'flex items-center gap-1 px-3 py-1 rounded-apple text-sm font-medium',
                            getProjectStatusColor(project.status)
                          )}>
                            {getProjectStatusIcon(project.status)}
                            {project.status.replace('_', ' ')}
                          </div>
                        </div>
                      </div>
                      
                      {project.status === 'in_progress' && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="animate-slide-up">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-title font-semibold">Recent Activity</h2>
                  <Button variant="ghost" size="sm">
                    Mark All Read
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4">
                      <div className={cn(
                        'w-10 h-10 rounded-apple-lg flex items-center justify-center flex-shrink-0',
                        'bg-gray-100'
                      )}>
                        <activity.icon className={cn('w-5 h-5', activity.iconColor)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 leading-relaxed">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Recommendations */}
          <div className="space-y-8">
            
            {/* Quick Actions */}
            <Card className="animate-slide-up">
              <div className="p-6">
                <h2 className="text-title font-semibold mb-6">Quick Actions</h2>
                <div className="space-y-4">
                  {quickActions.map((action, index) => (
                    <Link 
                      key={index}
                      to={action.href}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-apple-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className={cn(
                        'w-12 h-12 rounded-apple flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0',
                        action.variant === 'primary' && 'bg-blue-500 text-white',
                        action.variant === 'secondary' && 'bg-gray-500 text-white',
                        action.variant === 'success' && 'bg-green-500 text-white',
                        action.variant === 'purple' && 'bg-purple-500 text-white'
                      )}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900">
                          {action.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {action.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Card>

            {/* Recommended Providers */}
            <Card className="animate-slide-up">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-title font-semibold">Recommended for You</h2>
                  <Link to="/explore">
                    <Button variant="ghost" size="sm" rightIcon={<FaArrowRight />}>
                      View More
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {recommendedProviders.map((provider) => (
                    <div key={provider.id} className="p-4 border border-gray-200 rounded-apple-lg hover:shadow-apple transition-shadow">
                      <div className="flex items-start gap-4">
                        <img
                          src={provider.avatar}
                          alt={provider.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {provider.name}
                            </h3>
                            {provider.verified && (
                              <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {provider.category}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <FaStar className="w-4 h-4 text-yellow-400" />
                                <span>{provider.rating}</span>
                                <span className="text-gray-500">({provider.reviewCount})</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-500">
                                <FaMapMarkerAlt className="w-3 h-3" />
                                <span>{provider.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="text-gray-600">Starting from </span>
                            <span className="font-semibold text-green-600">{provider.startingPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Account Summary */}
            <Card className="animate-slide-up">
              <div className="p-6">
                <h2 className="text-title font-semibold mb-6">Account Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <FaPhone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FaEnvelope className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{user.location}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {user.projectsPosted}
                        </div>
                        <div className="text-sm text-gray-600">
                          Projects Posted
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {user.averageRating}
                        </div>
                        <div className="text-sm text-gray-600">
                          Average Rating
                        </div>
                      </div>
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

export default ClientDashboard; 