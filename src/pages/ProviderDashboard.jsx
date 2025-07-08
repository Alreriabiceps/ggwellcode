import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { Link } from 'react-router-dom';
import { 
  FaUser, 
  FaSearch, 
  FaCamera, 
  FaEye, 
  FaClipboardList, 
  FaBriefcase, 
  FaStar, 
  FaBuilding, 
  FaUserCircle, 
  FaCheckCircle, 
  FaClock, 
  FaMapMarkerAlt,
  FaArrowUp,
  FaAward,
  FaCalendar
} from 'react-icons/fa';
import { 
  MdNotifications,
  MdSettings
} from 'react-icons/md';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [providerProfile, setProviderProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    totalViews: 0,
    totalApplications: 0,
    activeJobs: 0,
    rating: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      // Mock provider profile data
      setProviderProfile({
        businessName: "Elite Construction Solutions",
        ownerName: user?.name || "John Doe",
        description: "Premium construction and renovation services with over 5 years of excellence in Bataan. Specializing in residential and commercial projects.",
        specialties: ["Construction", "Renovation", "Electrical", "Plumbing"],
        location: "Balanga City, Bataan",
        isVerified: true,
        rating: 4.8,
        completedJobs: 47,
        yearsExperience: 5,
        responseTime: "2 hours",
        contactInfo: {
          phone: "+63-912-3456-789",
          email: user?.email || "contact@example.com"
        }
      });

      // Mock stats
      setStats({
        totalViews: 1247,
        totalApplications: 23,
        activeJobs: 8,
        rating: 4.8
      });

      // Mock applications
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
          type: "Kitchen"
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
          type: "Bathroom"
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
          type: "Electrical"
        }
      ]);

             // Portfolio data removed - handled by separate portfolio page

      setLoading(false);
    }, 1000);
  }, [user]);

  // Portfolio functions removed - handled by separate portfolio page

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!providerProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-xl p-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaBuilding className="text-3xl text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Provider Dashboard</h2>
          <p className="text-gray-600 mb-8">
            You haven't created your provider profile yet. Register your business to start connecting with clients in Bataan.
          </p>
          <Link
            to="/register-provider"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <FaBuilding className="mr-2" />
            Register Your Business
          </Link>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-6">
              <FaUserCircle className="text-3xl text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Welcome back, {providerProfile?.ownerName}!
              </h2>
              <p className="text-blue-100 text-lg">
                {providerProfile?.businessName} • {providerProfile?.location}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
              providerProfile?.isVerified 
                ? 'bg-green-500 text-white' 
                : 'bg-yellow-500 text-white'
            }`}>
              {providerProfile?.isVerified ? (
                <>
                  <FaCheckCircle className="mr-2" />
                  Verified Provider
                </>
              ) : (
                <>
                  <FaClock className="mr-2" />
                  Pending Verification
                </>
              )}
            </div>
            <div className="mt-3 flex items-center text-blue-100">
              <FaStar className="mr-1" />
              <span className="font-semibold">{providerProfile?.rating}</span>
              <span className="mx-2">•</span>
              <span>{providerProfile?.completedJobs} projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FaEye className="text-2xl text-blue-600" />
            </div>
                         <div className="text-right">
               <FaArrowUp className="text-green-500" />
             </div>
           </div>
           <div>
             <p className="text-gray-600 text-sm font-medium">Profile Views</p>
             <p className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
             <p className="text-green-600 text-sm mt-1">+12% this month</p>
           </div>
         </div>

         <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
           <div className="flex items-center justify-between mb-4">
             <div className="p-3 bg-green-100 rounded-xl">
               <FaClipboardList className="text-2xl text-green-600" />
             </div>
             <div className="text-right">
               <FaArrowUp className="text-green-500" />
             </div>
           </div>
           <div>
             <p className="text-gray-600 text-sm font-medium">Total Applications</p>
             <p className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
             <p className="text-green-600 text-sm mt-1">+8% this week</p>
           </div>
         </div>

         <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
           <div className="flex items-center justify-between mb-4">
             <div className="p-3 bg-orange-100 rounded-xl">
               <FaBriefcase className="text-2xl text-orange-600" />
             </div>
             <div className="text-right">
               <FaArrowUp className="text-green-500" />
             </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Active Projects</p>
            <p className="text-3xl font-bold text-gray-900">{stats.activeJobs}</p>
            <p className="text-blue-600 text-sm mt-1">2 starting soon</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <FaStar className="text-2xl text-purple-600" />
            </div>
            <div className="text-right">
              <FaAward className="text-yellow-500" />
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Rating</p>
            <p className="text-3xl font-bold text-gray-900">{stats.rating.toFixed(1)}</p>
            <p className="text-purple-600 text-sm mt-1">Excellent rating</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/profile"
            className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 text-left"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <FaUser className="text-xl text-white" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-900">Update Profile</h4>
                <p className="text-sm text-gray-600">Edit business information</p>
              </div>
            </div>
          </Link>

          <Link
            to="/explore"
            className="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 text-left"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <FaSearch className="text-xl text-white" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-900">Find Opportunities</h4>
                <p className="text-sm text-gray-600">Browse new projects</p>
              </div>
            </div>
          </Link>

          <Link
            to="/portfolio"
            className="group p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-violet-100 transition-all duration-300 text-left"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <FaCamera className="text-xl text-white" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-900">Manage Portfolio</h4>
                <p className="text-sm text-gray-600">Showcase your work</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Recent Applications</h3>
          <Link
            to="/applications"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </Link>
        </div>
        
        {applications.length > 0 ? (
          <div className="space-y-4">
            {applications.slice(0, 3).map((app) => (
              <div key={app.id} className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="font-semibold text-gray-900 text-lg">{app.jobTitle}</h4>
                      <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}>
                        {app.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FaUser className="mr-2" />
                        {app.client}
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2" />
                        {app.location}
                      </div>
                      <div className="flex items-center">
                        <FaCalendar className="mr-2" />
                        Due: {app.deadline}
                      </div>
                      <div className="flex items-center font-semibold text-green-600">
                        Budget: {app.budget}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaClipboardList className="text-3xl text-gray-400" />
            </div>
            <p className="text-gray-600 text-lg">No applications yet</p>
            <p className="text-gray-500 mt-2 mb-6">
              Browse opportunities and apply for jobs to get started
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <FaSearch className="mr-2" />
              Find Opportunities
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  // Removed separate render functions - dashboard now shows only overview
  // Profile, Applications, and Portfolio are handled by separate pages via main navigation

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Provider Dashboard</h1>
              <p className="text-gray-600 text-lg">Manage your business and grow your client base</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <MdNotifications className="text-xl text-gray-600" />
              </button>
              <button className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <MdSettings className="text-xl text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Overview Content */}
        {renderOverview()}
      </div>
    </div>
  );
};

export default ProviderDashboard; 