import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProviders } from '../data/mockData';

const ProviderProfile = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProvider = mockProviders.find(p => p._id === id);
      if (foundProvider) {
        setProvider(foundProvider);
      } else {
        setError('Provider not found');
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading provider profile...</p>
        </div>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Provider Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The provider you are looking for does not exist.'}</p>
          <Link
            to="/explore"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const handleContactClick = (type, value) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${value}`, '_self');
        break;
      case 'email':
        window.open(`mailto:${value}`, '_self');
        break;
      case 'website':
        window.open(value, '_blank');
        break;
      default:
        break;
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                    {provider.businessName.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{provider.businessName}</h1>
                    <p className="text-blue-100 text-lg">
                      📍 {provider.barangay}, {provider.municipality}, Bataan
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  {provider.badges.verified && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Verified Provider
                    </span>
                  )}
                  {provider.badges.featured && (
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ⭐ Featured
                    </span>
                  )}
                  {provider.badges.topRated && (
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      🏆 Top Rated
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {renderStars(provider.rating)}
                    </div>
                    <span className="text-blue-100">
                      {provider.rating} ({provider.reviewCount} reviews)
                    </span>
                  </div>
                  <span className="text-blue-100">•</span>
                  <span className="text-blue-100">
                    {provider.yearsInBusiness} years in business
                  </span>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0 flex flex-col gap-3">
                {provider.contact.phone && (
                  <button
                    onClick={() => handleContactClick('phone', provider.contact.phone)}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    📞 Call Now
                  </button>
                )}
                {provider.contact.email && (
                  <button
                    onClick={() => handleContactClick('email', provider.contact.email)}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    ✉️ Send Email
                  </button>
                )}
                {provider.contact.website && (
                  <button
                    onClick={() => handleContactClick('website', provider.contact.website)}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    🌐 Visit Website
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: '📋' },
                { id: 'services', label: 'Services', icon: '🔧' },
                { id: 'portfolio', label: 'Portfolio', icon: '📸' },
                { id: 'contact', label: 'Contact', icon: '📞' }
              ].map((tab) => (
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
        <div className="bg-white rounded-lg shadow-lg p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About {provider.businessName}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{provider.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Owner:</span>
                      <span className="font-medium">{provider.ownerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{provider.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Years in Business:</span>
                      <span className="font-medium">{provider.yearsInBusiness} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Team Size:</span>
                      <span className="font-medium">{provider.employeeCount} employees</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{provider.barangay}, {provider.municipality}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Specialties</h3>
                  <div className="space-y-2">
                    {provider.specialties.map((specialty, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-blue-600">•</span>
                        <span className="text-gray-700">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {provider.services.map((service, index) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">{service}</h3>
                    <p className="text-sm text-blue-700">
                      Professional {service.toLowerCase()} services with quality guarantee
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio</h2>
              {provider.portfolio && provider.portfolio.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {provider.portfolio.map((image, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <img
                        src={image}
                        alt={`${provider.businessName} work ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                        onClick={() => setSelectedImage(image)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          🔍 View Larger
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-4xl mb-4">📸</div>
                  <p className="text-gray-600">No portfolio images available yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {provider.contact.phone && (
                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xl">📞</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-green-600">{provider.contact.phone}</p>
                      </div>
                      <button
                        onClick={() => handleContactClick('phone', provider.contact.phone)}
                        className="ml-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                      >
                        Call
                      </button>
                    </div>
                  )}
                  
                  {provider.contact.email && (
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-xl">✉️</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-blue-600">{provider.contact.email}</p>
                      </div>
                      <button
                        onClick={() => handleContactClick('email', provider.contact.email)}
                        className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        Email
                      </button>
                    </div>
                  )}
                  
                  {provider.contact.website && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-xl">🌐</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Website</p>
                        <p className="text-gray-600">{provider.contact.website}</p>
                      </div>
                      <button
                        onClick={() => handleContactClick('website', provider.contact.website)}
                        className="ml-auto bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                      >
                        Visit
                      </button>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                  <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-4">📍</div>
                    <p className="font-medium text-gray-900">{provider.businessName}</p>
                    <p className="text-gray-600">{provider.barangay}, {provider.municipality}</p>
                    <p className="text-gray-600">Bataan, Philippines</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Portfolio item"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderProfile; 
