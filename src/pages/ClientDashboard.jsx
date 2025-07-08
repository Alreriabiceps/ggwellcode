import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaRobot, 
  FaMobileAlt, 
  FaClipboardList, 
  FaStar, 
  FaComments, 
  FaEdit,
  FaCheckCircle,
  FaUserCircle
} from 'react-icons/fa';
import { 
  MdVerified 
} from 'react-icons/md';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [jobHistory, setJobHistory] = useState([]);
  const [favoriteProviders, setFavoriteProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FaUserCircle className="text-blue-500 text-2xl mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h2>
              <p className="text-gray-600">Find and connect with trusted service providers in Bataan</p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <FaCheckCircle className="mr-1" />
              Client Account
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/explore"
            className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            <div className="flex justify-center mb-2">
              <FaSearch className="text-2xl" />
            </div>
            <div className="font-medium">Find Providers</div>
            <div className="text-sm opacity-90">Browse service providers</div>
          </Link>
          
          <Link
            to="/ai-analyzer"
            className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors text-center"
          >
            <div className="flex justify-center mb-2">
              <FaRobot className="text-2xl" />
            </div>
            <div className="font-medium">AI Image Analyzer</div>
            <div className="text-sm opacity-90">Analyze project images</div>
          </Link>
          
          <Link
            to="/explore"
            className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors text-center"
          >
            <div className="flex justify-center mb-2">
              <FaMobileAlt className="text-2xl" />
            </div>
            <div className="font-medium">Request Service</div>
            <div className="text-sm opacity-90">Post a job request</div>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaClipboardList className="text-blue-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Requests</p>
              <p className="text-2xl font-bold text-gray-900">{jobHistory.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FaStar className="text-green-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Favorite Providers</p>
              <p className="text-2xl font-bold text-gray-900">{favoriteProviders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FaComments className="text-purple-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Reviews Given</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <FaEdit className="text-4xl text-gray-400" />
          </div>
          <p className="text-gray-600">No recent activity</p>
          <p className="text-sm text-gray-500 mt-2">
            Start by browsing providers or posting a job request
          </p>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <p className="text-gray-900">{user?.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <p className="text-gray-900">{user?.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
          <p className="text-gray-900">Client</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
          <p className="text-gray-900">Recently joined</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your service requests and find providers</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'requests'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My Requests
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'requests' && (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <FaClipboardList className="text-4xl text-gray-400" />
                </div>
                <p className="text-gray-600">No service requests yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Start by browsing providers and requesting services
                </p>
                <Link
                  to="/explore"
                  className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Providers
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard; 