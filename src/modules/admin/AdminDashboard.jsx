import React, { useState, useEffect } from 'react';
import { 
  UserGroupIcon, 
  StarIcon, 
  CheckBadgeIcon, 
  ExclamationTriangleIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import api from '../../lib/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [providers, setProviders] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [stats, setStats] = useState({
    totalProviders: 0,
    verifiedProviders: 0,
    pendingVerifications: 0,
    totalHighlights: 0
  });
  const [loading, setLoading] = useState(false);
  const [showAddHighlight, setShowAddHighlight] = useState(false);
  const [newHighlight, setNewHighlight] = useState({
    providerId: '',
    title: '',
    description: '',
    isActive: true
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [providersRes, highlightsRes] = await Promise.all([
        api.get('/providers'),
        api.get('/admin/highlights')
      ]);
      
      setProviders(providersRes.data);
      setHighlights(highlightsRes.data);
      
      // Calculate stats
      const totalProviders = providersRes.data.length;
      const verifiedProviders = providersRes.data.filter(p => p.badges?.verified).length;
      const pendingVerifications = providersRes.data.filter(p => !p.badges?.verified).length;
      
      setStats({
        totalProviders,
        verifiedProviders,
        pendingVerifications,
        totalHighlights: highlightsRes.data.length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyProvider = async (providerId, verified = true) => {
    try {
      await api.put(`/admin/providers/${providerId}/verify`, { verified });
      await fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error verifying provider:', error);
      alert('Failed to update provider verification status');
    }
  };

  const handleAddHighlight = async () => {
    try {
      await api.post('/admin/highlights', newHighlight);
      setShowAddHighlight(false);
      setNewHighlight({ providerId: '', title: '', description: '', isActive: true });
      await fetchDashboardData();
    } catch (error) {
      console.error('Error adding highlight:', error);
      alert('Failed to add highlight');
    }
  };

  const handleDeleteHighlight = async (highlightId) => {
    if (!confirm('Are you sure you want to delete this highlight?')) return;
    
    try {
      await api.delete(`/admin/highlights/${highlightId}`);
      await fetchDashboardData();
    } catch (error) {
      console.error('Error deleting highlight:', error);
      alert('Failed to delete highlight');
    }
  };

  const handleToggleHighlight = async (highlightId, isActive) => {
    try {
      await api.put(`/admin/highlights/${highlightId}`, { isActive });
      await fetchDashboardData();
    } catch (error) {
      console.error('Error toggling highlight:', error);
      alert('Failed to update highlight status');
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Providers</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalProviders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckBadgeIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Verified Providers</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.verifiedProviders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Verification</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pendingVerifications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <StarIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Highlights</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalHighlights}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Providers</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {providers.slice(0, 5).map(provider => (
            <div key={provider._id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {provider.badges?.verified ? (
                    <CheckBadgeIcon className="h-6 w-6 text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
                  )}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{provider.businessName}</p>
                  <p className="text-sm text-gray-500">{provider.services?.join(', ')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  provider.badges?.verified 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {provider.badges?.verified ? 'Verified' : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProviders = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Provider Management</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Services
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {providers.map(provider => (
              <tr key={provider._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{provider.businessName}</div>
                  <div className="text-sm text-gray-500">{provider.contact?.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {provider.services?.slice(0, 2).join(', ')}
                    {provider.services?.length > 2 && '...'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {provider.barangay}, {provider.municipality}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    provider.badges?.verified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {provider.badges?.verified ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {!provider.badges?.verified ? (
                      <button
                        onClick={() => handleVerifyProvider(provider._id, true)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Verify
                      </button>
                    ) : (
                      <button
                        onClick={() => handleVerifyProvider(provider._id, false)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Unverify
                      </button>
                    )}
                    <a
                      href={`/provider/${provider._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderHighlights = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Weekly Highlights</h3>
        <button
          onClick={() => setShowAddHighlight(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Highlight
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlights.map(highlight => (
          <div key={highlight._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-900">{highlight.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{highlight.description}</p>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleToggleHighlight(highlight._id, !highlight.isActive)}
                  className={`text-sm px-2 py-1 rounded ${
                    highlight.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {highlight.isActive ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={() => handleDeleteHighlight(highlight._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {highlight.provider && (
              <div className="border-t pt-4">
                <p className="text-sm font-medium text-gray-900">{highlight.provider.businessName}</p>
                <p className="text-sm text-gray-500">{highlight.provider.services?.join(', ')}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Highlight Modal */}
      {showAddHighlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Highlight</h3>
              <button
                onClick={() => setShowAddHighlight(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Provider
                </label>
                <select
                  value={newHighlight.providerId}
                  onChange={(e) => setNewHighlight({...newHighlight, providerId: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Select a provider</option>
                  {providers.filter(p => p.badges?.verified).map(provider => (
                    <option key={provider._id} value={provider._id}>
                      {provider.businessName}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newHighlight.title}
                  onChange={(e) => setNewHighlight({...newHighlight, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter highlight title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newHighlight.description}
                  onChange={(e) => setNewHighlight({...newHighlight, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows="3"
                  placeholder="Enter highlight description"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddHighlight(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddHighlight}
                  disabled={!newHighlight.providerId || !newHighlight.title}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  Add Highlight
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage providers, highlights, and platform settings</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'providers', name: 'Providers' },
              { id: 'highlights', name: 'Highlights' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'providers' && renderProviders()}
        {activeTab === 'highlights' && renderHighlights()}
      </div>
    </div>
  );
};

export default AdminDashboard; 