import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { Link } from 'react-router-dom';
import { mockJobs, mockProviders } from '../data/mockData';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [providerProfile, setProviderProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    totalViews: 0,
    totalApplications: 0,
    activeJobs: 0,
    rating: 0
  });

  useEffect(() => {
    // Simulate loading provider data
    const mockProfile = {
      _id: user?._id || 'provider-1',
      businessName: user?.businessName || `${user?.name}'s Services`,
      ownerName: user?.name || 'Provider Name',
      description: 'Professional service provider offering quality solutions.',
      services: ['General Services'],
      category: 'General',
      municipality: 'Balanga',
      barangay: 'Poblacion',
      contact: {
        phone: '+63 912 345 6789',
        email: user?.email || 'provider@example.com'
      },
      badges: {
        verified: false,
        featured: false,
        topRated: false
      },
      rating: 4.2,
      reviewCount: 8,
      portfolio: [],
      yearsInBusiness: 2,
      employeeCount: '1-5',
      specialties: ['Quality Service'],
      status: 'pending' // pending, approved, rejected
    };

    setProviderProfile(mockProfile);

    // Mock stats
    setStats({
      totalViews: Math.floor(Math.random() * 500) + 50,
      totalApplications: Math.floor(Math.random() * 20) + 5,
      activeJobs: mockJobs.length,
      rating: 4.2
    });

    // Mock applications
    setApplications([
      {
        _id: 'app1',
        jobTitle: 'Kitchen Renovation',
        clientName: 'John Doe',
        budget: '₱150,000 - ₱200,000',
        status: 'pending',
        appliedAt: '2024-06-15T00:00:00Z',
        location: 'Balanga, Bataan'
      },
      {
        _id: 'app2',
        jobTitle: 'Office Cleaning Services',
        clientName: 'ABC Company',
        budget: '₱25,000/month',
        status: 'accepted',
        appliedAt: '2024-06-10T00:00:00Z',
        location: 'Mariveles, Bataan'
      }
    ]);
  }, [user]);

  const handleProfileUpdate = (field, value) => {
    setProviderProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome & Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}! 👋
            </h2>
            <p className="text-gray-600">Manage your business and track your performance</p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              providerProfile?.status === 'approved' ? 'bg-green-100 text-green-800' :
              providerProfile?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {providerProfile?.status === 'approved' ? '✓ Approved' :
               providerProfile?.status === 'pending' ? '⏳ Pending Review' :
               '❌ Needs Attention'}
            </div>
          </div>
        </div>

        {providerProfile?.status === 'pending' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium text-yellow-800 mb-2">Profile Under Review</h3>
            <p className="text-yellow-700 text-sm">
              Your provider profile is being reviewed by our team. This usually takes 1-2 business days.
              Complete your profile to speed up the approval process.
            </p>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-xl">👁️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Profile Views</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-xl">📋</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Applications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-yellow-600 text-xl">💼</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-purple-600 text-xl">⭐</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveTab('profile')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">👤</span>
            <div className="text-left">
              <p className="font-medium">Update Profile</p>
              <p className="text-sm text-gray-600">Edit business information</p>
            </div>
          </button>

          <Link
            to="/jobs"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">🔍</span>
            <div className="text-left">
              <p className="font-medium">Browse Jobs</p>
              <p className="text-sm text-gray-600">Find new opportunities</p>
            </div>
          </Link>

          <button
            onClick={() => setActiveTab('portfolio')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">📸</span>
            <div className="text-left">
              <p className="font-medium">Manage Portfolio</p>
              <p className="text-sm text-gray-600">Showcase your work</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
          <button
            onClick={() => setActiveTab('applications')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {applications.slice(0, 3).map((app) => (
            <div key={app._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{app.jobTitle}</h4>
                <p className="text-sm text-gray-600">{app.clientName} • {app.location}</p>
                <p className="text-sm text-gray-500">{app.budget}</p>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {app.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(app.appliedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Business Profile</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Name
            </label>
            <input
              type="text"
              value={providerProfile?.businessName || ''}
              onChange={(e) => handleProfileUpdate('businessName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Owner Name
            </label>
            <input
              type="text"
              value={providerProfile?.ownerName || ''}
              onChange={(e) => handleProfileUpdate('ownerName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Description
            </label>
            <textarea
              rows="4"
              value={providerProfile?.description || ''}
              onChange={(e) => handleProfileUpdate('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your business and services..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={providerProfile?.contact?.phone || ''}
              onChange={(e) => handleProfileUpdate('contact', {...providerProfile?.contact, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={providerProfile?.contact?.email || ''}
              onChange={(e) => handleProfileUpdate('contact', {...providerProfile?.contact, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Job Applications</h3>
        
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{app.jobTitle}</h4>
                  <div className="flex items-center text-sm text-gray-600 space-x-4 mb-3">
                    <span>👤 {app.clientName}</span>
                    <span>📍 {app.location}</span>
                    <span>💰 {app.budget}</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Applied on {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {app.status === 'accepted' ? '✓ Accepted' :
                     app.status === 'pending' ? '⏳ Pending' :
                     '❌ Rejected'}
                  </span>
                </div>
              </div>
              
              {app.status === 'pending' && (
                <div className="mt-4 flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300 transition-colors">
                    Withdraw
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Portfolio</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Add Images
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <span className="text-gray-400 text-4xl">📸</span>
                <p className="text-gray-500 text-sm mt-2">Upload Image</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'applications', label: 'Applications', icon: '📋' },
    { id: 'portfolio', label: 'Portfolio', icon: '📸' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Provider Dashboard</h1>
          <p className="text-gray-600">Manage your business profile and track your success</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'applications' && renderApplications()}
        {activeTab === 'portfolio' && renderPortfolio()}
      </div>
    </div>
  );
};

export default ProviderDashboard; 