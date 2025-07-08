import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { Link } from 'react-router-dom';
import { 
  FaClipboardList, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaEye, 
  FaMapMarkerAlt,
  FaCalendar,
  FaFilter,
  FaSort,
  FaSearch,
  FaArrowRight,
  FaExclamationTriangle
} from 'react-icons/fa';

const ProviderApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate loading applications data
    setTimeout(() => {
      setApplications([
        {
          id: 1,
          jobTitle: "Modern Kitchen Renovation",
          client: "Maria Santos",
          location: "Balanga City",
          budget: "₱125,000",
          status: "pending",
          appliedAt: "2024-01-15",
          deadline: "2024-02-15",
          type: "Kitchen",
          description: "Complete kitchen renovation with modern appliances and cabinets",
          clientRating: 4.5,
          urgency: "medium"
        },
        {
          id: 2,
          jobTitle: "Master Bathroom Upgrade",
          client: "Juan Cruz",
          location: "Mariveles",
          budget: "₱85,000",
          status: "accepted",
          appliedAt: "2024-01-12",
          deadline: "2024-01-30",
          type: "Bathroom",
          description: "Upgrade master bathroom with new fixtures and tiling",
          clientRating: 4.8,
          urgency: "high"
        },
        {
          id: 3,
          jobTitle: "Living Room Electrical Work",
          client: "Ana Rodriguez",
          location: "Orion",
          budget: "₱45,000",
          status: "in_progress",
          appliedAt: "2024-01-10",
          deadline: "2024-01-25",
          type: "Electrical",
          description: "Install new electrical outlets and lighting fixtures",
          clientRating: 4.2,
          urgency: "medium"
        },
        {
          id: 4,
          jobTitle: "Roof Repair Service",
          client: "Carlos Mendoza",
          location: "Bagac",
          budget: "₱65,000",
          status: "rejected",
          appliedAt: "2024-01-08",
          deadline: "2024-01-20",
          type: "Roofing",
          description: "Emergency roof repair after storm damage",
          clientRating: 4.0,
          urgency: "high"
        },
        {
          id: 5,
          jobTitle: "Office Space Renovation",
          client: "ABC Company",
          location: "Balanga City",
          budget: "₱200,000",
          status: "completed",
          appliedAt: "2024-01-05",
          deadline: "2024-01-18",
          type: "Commercial",
          description: "Complete office renovation including flooring and painting",
          clientRating: 4.7,
          urgency: "medium"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return <FaCheckCircle className="w-4 h-4" />;
      case 'pending': return <FaClock className="w-4 h-4" />;
      case 'in_progress': return <FaEye className="w-4 h-4" />;
      case 'completed': return <FaCheckCircle className="w-4 h-4" />;
      case 'rejected': return <FaTimesCircle className="w-4 h-4" />;
      default: return <FaClock className="w-4 h-4" />;
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.appliedAt) - new Date(a.appliedAt);
      case 'oldest':
        return new Date(a.appliedAt) - new Date(b.appliedAt);
      case 'budget_high':
        return parseFloat(b.budget.replace(/₱|,/g, '')) - parseFloat(a.budget.replace(/₱|,/g, ''));
      case 'budget_low':
        return parseFloat(a.budget.replace(/₱|,/g, '')) - parseFloat(b.budget.replace(/₱|,/g, ''));
      default:
        return 0;
    }
  });

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FaClipboardList className="text-2xl text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
                <p className="text-gray-600 mt-1">Track and manage your job applications</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{applications.length}</div>
              <div className="text-sm text-gray-500">Total Applications</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Pending', count: statusCounts.pending || 0, color: 'yellow', icon: FaClock },
            { label: 'Accepted', count: statusCounts.accepted || 0, color: 'green', icon: FaCheckCircle },
            { label: 'In Progress', count: statusCounts.in_progress || 0, color: 'blue', icon: FaEye },
            { label: 'Completed', count: statusCounts.completed || 0, color: 'purple', icon: FaCheckCircle }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                  <stat.icon className={`text-xl text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaSort className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="budget_high">Highest Budget</option>
                <option value="budget_low">Lowest Budget</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {sortedApplications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <FaClipboardList className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'You haven\'t applied to any jobs yet'
                }
              </p>
              {!searchTerm && filter === 'all' && (
                <Link
                  to="/explore"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Jobs
                  <FaArrowRight className="ml-2" />
                </Link>
              )}
            </div>
          ) : (
            sortedApplications.map((application) => (
              <div key={application.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{application.jobTitle}</h3>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">{application.status.replace('_', ' ')}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Client</p>
                        <p className="font-medium text-gray-900">{application.client}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Budget</p>
                        <p className="font-bold text-green-600 text-lg">{application.budget}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Location</p>
                        <div className="flex items-center text-gray-900">
                          <FaMapMarkerAlt className="text-gray-400 mr-1" />
                          {application.location}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Deadline</p>
                        <div className="flex items-center text-gray-900">
                          <FaCalendar className="text-gray-400 mr-1" />
                          {new Date(application.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{application.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Applied on {new Date(application.appliedAt).toLocaleDateString()}</span>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-1">Urgency:</span>
                          <span className={`text-sm font-medium ${getUrgencyColor(application.urgency)}`}>
                            {application.urgency}
                          </span>
                        </div>
                      </div>
                      <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                        View Details
                        <FaArrowRight className="ml-1 text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderApplications; 