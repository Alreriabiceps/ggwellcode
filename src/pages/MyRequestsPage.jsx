import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  FaPlus,
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign
} from 'react-icons/fa';

const MyRequestsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for requests
  const [requests] = useState([
    {
      id: 1,
      title: "Kitchen Renovation",
      description: "Complete kitchen remodel including cabinets, countertops, and appliances",
      budget: "₱150,000 - ₱200,000",
      location: "Balanga City, Bataan",
      category: "Construction",
      status: "active",
      createdAt: "2024-01-15",
      deadline: "2024-03-15",
      proposals: 8,
      views: 24
    },
    {
      id: 2,
      title: "Website Development",
      description: "E-commerce website for local business with payment integration",
      budget: "₱80,000 - ₱120,000",
      location: "Mariveles, Bataan",
      category: "IT Services",
      status: "in_progress",
      createdAt: "2024-01-10",
      deadline: "2024-02-10",
      proposals: 12,
      views: 31,
      assignedProvider: "TechSolutions Pro"
    },
    {
      id: 3,
      title: "Garden Landscaping",
      description: "Front and backyard landscaping with native plants",
      budget: "₱45,000 - ₱60,000",
      location: "Hermosa, Bataan",
      category: "Landscaping",
      status: "completed",
      createdAt: "2023-12-20",
      deadline: "2024-01-20",
      proposals: 6,
      views: 18,
      completedAt: "2024-01-18"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <FaClock className="w-4 h-4" />;
      case 'in_progress': return <FaClock className="w-4 h-4" />;
      case 'completed': return <FaCheckCircle className="w-4 h-4" />;
      case 'cancelled': return <FaTimesCircle className="w-4 h-4" />;
      default: return <FaClock className="w-4 h-4" />;
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || request.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const tabs = [
    { id: 'all', label: 'All Requests', count: requests.length },
    { id: 'active', label: 'Active', count: requests.filter(r => r.status === 'active').length },
    { id: 'in_progress', label: 'In Progress', count: requests.filter(r => r.status === 'in_progress').length },
    { id: 'completed', label: 'Completed', count: requests.filter(r => r.status === 'completed').length }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-apple py-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Requests</h1>
            <p className="text-gray-600">Manage your service requests and track progress</p>
          </div>
          <Link to="/request-service">
            <Button rightIcon={<FaPlus />} className="mt-4 sm:mt-0">
              New Request
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-apple focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <Button variant="outline" leftIcon={<FaFilter />}>
              Filter
            </Button>
          </div>
        </Card>

        {/* Tabs */}
        <div className="bg-white rounded-apple-lg shadow-apple border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Requests Grid */}
        {filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="p-6 hover:shadow-apple-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{request.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{request.description}</p>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-apple text-sm font-medium border ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    {request.status.replace('_', ' ').toUpperCase()}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaDollarSign className="w-4 h-4 text-green-600" />
                    <span>Budget: {request.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaMapMarkerAlt className="w-4 h-4 text-blue-600" />
                    <span>{request.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendarAlt className="w-4 h-4 text-purple-600" />
                    <span>Deadline: {new Date(request.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                {request.assignedProvider && (
                  <div className="bg-blue-50 border border-blue-200 rounded-apple p-3 mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Assigned to:</strong> {request.assignedProvider}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{request.proposals} proposals</span>
                  <span>{request.views} views</span>
                  <span>Posted {new Date(request.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" leftIcon={<FaEye />}>
                    View
                  </Button>
                  {request.status === 'active' && (
                    <>
                      <Button size="sm" variant="outline" leftIcon={<FaEdit />}>
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" leftIcon={<FaTrash />} className="text-red-600 hover:text-red-700">
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSearch className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">No requests found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms.' : 'You haven\'t created any service requests yet.'}
            </p>
            <Link to="/request-service">
              <Button rightIcon={<FaPlus />}>
                Create Your First Request
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyRequestsPage; 