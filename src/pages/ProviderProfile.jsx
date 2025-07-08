import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { Link } from 'react-router-dom';
import { 
  FaEdit, 
  FaUser, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaStar, 
  FaTools, 
  FaArrowLeft
} from 'react-icons/fa';

const ProviderProfile = () => {
  const { user } = useAuth();
  const [providerProfile, setProviderProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Simulate loading provider profile data
    setTimeout(() => {
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
      setLoading(false);
    }, 1000);
  }, [user]);

  const handleSaveProfile = () => {
    // Handle save logic here
    setIsEditing(false);
    // Show success message
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your profile...</p>
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
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Business Profile</h1>
                <p className="text-gray-600 text-lg">Manage your business information and settings</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FaEdit className="mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="space-y-8">
          {/* Business Profile Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Basic Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={providerProfile?.businessName}
                        onChange={(e) => setProviderProfile(prev => ({...prev, businessName: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-900 font-medium">{providerProfile?.businessName}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={providerProfile?.ownerName}
                        onChange={(e) => setProviderProfile(prev => ({...prev, ownerName: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-900 font-medium">{providerProfile?.ownerName}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
                  {isEditing ? (
                    <textarea
                      value={providerProfile?.description}
                      onChange={(e) => setProviderProfile(prev => ({...prev, description: e.target.value}))}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-900">{providerProfile?.description}</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={providerProfile?.specialties?.join(', ')}
                      onChange={(e) => setProviderProfile(prev => ({...prev, specialties: e.target.value.split(', ')}))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Separate with commas"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {providerProfile?.specialties?.map((specialty, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          <FaTools className="inline mr-1" />
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={providerProfile?.location}
                      onChange={(e) => setProviderProfile(prev => ({...prev, location: e.target.value}))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-900 font-medium">{providerProfile?.location}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={providerProfile?.contactInfo?.phone}
                        onChange={(e) => setProviderProfile(prev => ({...prev, contactInfo: {...prev.contactInfo, phone: e.target.value}}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-900 font-medium">{providerProfile?.contactInfo?.phone}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={providerProfile?.contactInfo?.email}
                        onChange={(e) => setProviderProfile(prev => ({...prev, contactInfo: {...prev.contactInfo, email: e.target.value}}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-900 font-medium">{providerProfile?.contactInfo?.email}</p>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex items-center gap-4 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              
              {/* Contact & Stats */}
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-3 text-blue-600" />
                      <span>{providerProfile?.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaPhone className="mr-3 text-green-600" />
                      <span>{providerProfile?.contactInfo?.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaEnvelope className="mr-3 text-red-600" />
                      <span>{providerProfile?.contactInfo?.email}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-4">Business Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience</span>
                      <span className="font-semibold">{providerProfile?.yearsExperience} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed Jobs</span>
                      <span className="font-semibold">{providerProfile?.completedJobs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Response Time</span>
                      <span className="font-semibold">{providerProfile?.responseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating</span>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-500 mr-1" />
                        <span className="font-semibold">{providerProfile?.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile; 
