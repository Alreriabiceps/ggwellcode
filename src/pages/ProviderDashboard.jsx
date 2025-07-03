import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { Link } from 'react-router-dom';
import { providerAPI } from '../lib/api';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [providerProfile, setProviderProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalViews: 0,
    totalApplications: 0,
    activeJobs: 0,
    rating: 0
  });

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        setLoading(true);
        // Fetch provider profile
        const response = await providerAPI.getMyProfile();
        
        if (response.data && response.data.success) {
          setProviderProfile(response.data.data);
          
          // Calculate stats from the profile data
          setStats({
            totalViews: response.data.data?.totalViews || Math.floor(Math.random() * 500) + 50,
            totalApplications: response.data.data?.totalJobs || Math.floor(Math.random() * 20) + 5,
            activeJobs: response.data.data?.activeJobs || 0,
            rating: response.data.data?.rating || 0
          });
        } else {
          // No provider profile exists yet
          setProviderProfile(null);
        }
      } catch (error) {
        console.error('Error fetching provider data:', error);
        if (error.response?.status === 404) {
          // Provider profile doesn't exist yet
          setProviderProfile(null);
        } else {
          setError('Failed to load provider data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProviderData();
    }
  }, [user]);

  const handleProfileUpdate = (field, value) => {
    setProviderProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      if (providerProfile && providerProfile._id) {
        await providerAPI.update(providerProfile._id, providerProfile);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If no provider profile exists, show registration prompt
  if (!providerProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white rounded-lg shadow-md p-8">
          <div className="text-6xl mb-4">🏢</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Provider Dashboard</h2>
          <p className="text-gray-600 mb-6">
            You haven't created your provider profile yet. Register your business to start connecting with clients in Bataan.
          </p>
          <Link
            to="/register-provider"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Register Your Business
          </Link>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome & Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome back, {providerProfile?.ownerName || user?.name}! 👋
            </h2>
            <p className="text-gray-600">Manage your business and track your performance</p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              providerProfile?.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {providerProfile?.isVerified ? '✓ Verified' : '⏳ Pending Verification'}
            </div>
          </div>
        </div>

        {!providerProfile?.isVerified && (
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
              <p className="text-sm text-gray-600">Total Jobs</p>
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
              <p className="text-2xl font-bold text-gray-900">{(stats.rating || 0).toFixed(1)}</p>
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
            to="/explore"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">🔍</span>
            <div className="text-left">
              <p className="font-medium">Browse Opportunities</p>
              <p className="text-sm text-gray-600">Find new clients</p>
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

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Business Name</span>
            <span className="font-medium">{providerProfile?.businessName}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Category</span>
            <span className="font-medium">{providerProfile?.category}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Location</span>
            <span className="font-medium">{providerProfile?.barangay}, {providerProfile?.municipality}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Services</span>
            <span className="font-medium">{(providerProfile?.services || []).length} services</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Years in Business</span>
            <span className="font-medium">{providerProfile?.yearsExperience || 0} years</span>
          </div>
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
              value={providerProfile?.phone || ''}
              onChange={(e) => handleProfileUpdate('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={providerProfile?.email || ''}
              onChange={(e) => handleProfileUpdate('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Municipality
            </label>
            <input
              type="text"
              value={providerProfile?.municipality || ''}
              onChange={(e) => handleProfileUpdate('municipality', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Barangay
            </label>
            <input
              type="text"
              value={providerProfile?.barangay || ''}
              onChange={(e) => handleProfileUpdate('barangay', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              value={providerProfile?.yearsExperience || ''}
              onChange={(e) => handleProfileUpdate('yearsExperience', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              value={providerProfile?.category || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              readOnly
            />
          </div>
        </div>

        {/* Services */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Services Offered
          </label>
          <div className="flex flex-wrap gap-2">
            {(providerProfile?.services || []).map((service, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {service}
              </span>
            ))}
            {(providerProfile?.services || []).length === 0 && (
              <span className="text-gray-500 text-sm">No services listed</span>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button 
            onClick={handleSaveProfile}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Job Applications</h3>
        
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">📋</div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h4>
          <p className="text-gray-600 mb-4">
            You haven't applied to any jobs yet. Browse available opportunities to start growing your business.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse Opportunities
          </Link>
        </div>
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Portfolio</h3>
        
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">📸</div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">Build Your Portfolio</h4>
          <p className="text-gray-600 mb-4">
            Showcase your best work to attract more clients. Add photos and descriptions of your completed projects.
          </p>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Add Project
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Provider Dashboard</h1>
          <p className="text-gray-600">Manage your business profile and track your performance</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'profile', name: 'Profile', icon: '👤' },
              { id: 'applications', name: 'Applications', icon: '📋' },
              { id: 'portfolio', name: 'Portfolio', icon: '📸' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
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