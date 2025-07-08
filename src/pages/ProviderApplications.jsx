import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { Link } from 'react-router-dom';
import { 
  FaUser, 
  FaMapMarkerAlt, 
  FaCalendar, 
  FaClipboardList, 
  FaSearch, 
  FaArrowLeft, 
  FaFilter,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaTimesCircle
} from 'react-icons/fa';

const ProviderApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate loading applications data
    setTimeout(() => {
      const mockApplications = [
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
          description: "Complete kitchen makeover with modern appliances and contemporary design. Looking for experienced contractor with portfolio.",
          clientContact: "+63-912-1234-567"
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
          description: "Luxury bathroom renovation with premium fixtures and modern styling. Project starts next week.",
          clientContact: "+63-912-2345-678"
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
          description: "Complete electrical rewiring for living room and dining area. Safety is priority.",
          clientContact: "+63-912-3456-789"
        },
        {
          id: 4,
          jobTitle: "Commercial Office Renovation",
          client: "Business Corp",
          location: "Balanga City",
          budget: "₱300,000",
          status: "completed",
          appliedAt: "2023-12-20",
          deadline: "2024-01-15",
          type: "Commercial",
          description: "Full office space renovation for 20-person team. Modern design with efficient layout.",
          clientContact: "+63-912-4567-890"
        },
        {
          id: 5,
          jobTitle: "Residential Plumbing Repair",
          client: "Roberto Silva",
          location: "Hermosa",
          budget: "₱35,000",
          status: "rejected",
          appliedAt: "2024-01-08",
          deadline: "2024-01-20",
          type: "Plumbing",
          description: "Emergency plumbing repairs for 2-story house. Multiple leaks and pipe replacement needed.",
          clientContact: "+63-912-5678-901"
        },
        {
          id: 6,
          jobTitle: "Bedroom Interior Design",
          client: "Sofia Martinez",
          location: "Bagac",
          budget: "₱95,000",
          status: "pending",
          appliedAt: "2024-01-14",
          deadline: "2024-02-10",
          type: "Bedroom",
          description: "Master bedroom makeover with walk-in closet design. Modern aesthetic preferred.",
          clientContact: "+63-912-6789-012"
        }
      ];
      setApplications(mockApplications);
      setFilteredApplications(mockApplications);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter applications based on status and search term
    let filtered = applications;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredApplications(filtered);
  }, [statusFilter, searchTerm, applications]);

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
      case 'accepted': return <FaCheckCircle className="text-green-600" />;
      case 'pending': return <FaClock className="text-yellow-600" />;
      case 'in_progress': return <FaClipboardList className="text-blue-600" />;
      case 'completed': return <FaCheckCircle className="text-purple-600" />;
      case 'rejected': return <FaTimesCircle className="text-red-600" />;
      default: return <FaClock className="text-gray-600" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleContactClient = (contact) => {
    window.open(`tel:${contact}`, '_self');
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/dashboard"
                className="mr-4 p-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-blue-600"
              >
                <FaArrowLeft className="text-xl" />
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Applications</h1>
                <p className="text-gray-600 text-lg">Track and manage your project applications</p>
              </div>
            </div>
            <Link
              to="/explore"
              className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FaSearch className="mr-2" />
              Find New Opportunities
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applications by job title, client, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
        </div>

        {/* Applications Grid */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          {filteredApplications.length > 0 ? (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Your Applications ({filteredApplications.length})
                </h3>
                <p className="text-gray-600 mt-2">
                  {statusFilter !== 'all' && `Showing ${statusFilter} applications`}
                </p>
              </div>
              
              <div className="space-y-6">
                {filteredApplications.map((app) => (
                  <div key={app.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      {/* Main Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-bold text-gray-900 text-xl">{app.jobTitle}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}>
                                {app.status.replace('_', ' ').toUpperCase()}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-4">{app.description}</p>
                          </div>
                          <div className="ml-4">
                            {getStatusIcon(app.status)}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <FaUser className="mr-2 text-blue-600" />
                            <div>
                              <span className="block text-xs text-gray-500">Client</span>
                              <span className="font-medium">{app.client}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-green-600" />
                            <div>
                              <span className="block text-xs text-gray-500">Location</span>
                              <span className="font-medium">{app.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FaCalendar className="mr-2 text-orange-600" />
                            <div>
                              <span className="block text-xs text-gray-500">Deadline</span>
                              <span className="font-medium">{formatDate(app.deadline)}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FaClipboardList className="mr-2 text-purple-600" />
                            <div>
                              <span className="block text-xs text-gray-500">Applied</span>
                              <span className="font-medium">{formatDate(app.appliedAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Budget and Actions */}
                      <div className="lg:text-right lg:min-w-[200px]">
                        <div className="mb-4">
                          <span className="block text-sm text-gray-500 mb-1">Project Budget</span>
                          <div className="text-3xl font-bold text-green-600">{app.budget}</div>
                          <div className="text-sm text-gray-500">{app.type}</div>
                        </div>
                        
                        <div className="flex lg:flex-col gap-2">
                          <button 
                            className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex-1 lg:w-full"
                            title="View Details"
                          >
                            <FaEye className="mr-2" />
                            View Details
                          </button>
                          
                          {(app.status === 'accepted' || app.status === 'in_progress') && (
                            <button 
                              onClick={() => handleContactClient(app.clientContact)}
                              className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex-1 lg:w-full"
                              title="Contact Client"
                            >
                              <FaUser className="mr-2" />
                              Contact
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaClipboardList className="text-4xl text-gray-400" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No applications match your filters' 
                  : 'No Applications Yet'
                }
              </h4>
              <p className="text-gray-600 mb-8">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search criteria or filters'
                  : 'Browse opportunities and apply for jobs to get started'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link
                  to="/explore"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <FaSearch className="mr-2" />
                  Browse Opportunities
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
          {['all', 'pending', 'accepted', 'in_progress', 'completed'].map((status) => {
            const count = status === 'all' 
              ? applications.length 
              : applications.filter(app => app.status === status).length;
              
            return (
              <div 
                key={status}
                className={`bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  statusFilter === status ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setStatusFilter(status)}
              >
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600 capitalize">
                  {status === 'all' ? 'Total' : status.replace('_', ' ')}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProviderApplications; 