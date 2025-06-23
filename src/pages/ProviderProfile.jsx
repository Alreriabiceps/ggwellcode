import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProviders } from '../data/mockData';
import qualityAI from '../lib/ai';
import { 
  FaBolt, 
  FaStar, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaGlobe,
  FaCheckCircle
} from 'react-icons/fa';

const ProviderProfile = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [aiValueProp, setAiValueProp] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    // Load provider data
    console.log('🔍 Looking for provider with ID:', id);
    console.log('📋 Available provider IDs:', mockProviders.map(p => p._id));
    
    const foundProvider = mockProviders.find(p => p._id === id);
    if (foundProvider) {
      console.log('✅ Provider found:', foundProvider.businessName);
      setProvider(foundProvider);
      setLoading(false);
      
      // Load AI value proposition
      loadAIValueProp(foundProvider);
    } else {
      console.log('❌ Provider not found with ID:', id);
      setLoading(false);
    }
  }, [id]);

  const loadAIValueProp = async (providerData) => {
    setLoadingAI(true);
    try {
      const valueProp = await qualityAI.generateValueProposition(providerData);
      setAiValueProp(valueProp);
    } catch (error) {
      console.error('AI Enhancement Error:', error);
      setAiValueProp(`${providerData.businessName} brings ${providerData.yearsInBusiness} years of professional experience in ${providerData.category.toLowerCase()} services. With a ${providerData.rating}-star rating and verified status, they deliver quality work that clients trust and recommend.`);
    } finally {
      setLoadingAI(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading provider...</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{provider.businessName}</h1>
                  {provider.badges.verified && (
                    <FaCheckCircle className="text-blue-500" title="Verified Provider" />
                  )}
                </div>
                <p className="text-gray-600 flex items-center mb-2">
                  <FaMapMarkerAlt className="mr-2" />
                  {provider.barangay}, {provider.municipality}, Bataan
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-yellow-400">
                    <FaStar className="mr-1" />
                    <span className="text-gray-900 font-medium">{provider.rating}</span>
                    <span className="text-gray-500 ml-1">({provider.reviewCount} reviews)</span>
                  </div>
                  <span className="text-gray-600">{provider.yearsInBusiness} years experience</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                {provider.contact.phone && (
                  <button
                    onClick={() => handleContactClick('phone', provider.contact.phone)}
                    className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FaPhone className="mr-2" />
                    Call
                  </button>
                )}
                {provider.contact.email && (
                  <button
                    onClick={() => handleContactClick('email', provider.contact.email)}
                    className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaEnvelope className="mr-2" />
                    Email
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* AI Value Proposition */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <FaBolt className="text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Why Choose This Provider</h2>
            </div>
            
            {loadingAI ? (
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                <span>Analyzing provider strengths...</span>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed">{aiValueProp}</p>
            )}
          </div>

          {/* About Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">About {provider.businessName}</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{provider.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Business Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Owner:</span>
                    <span className="font-medium">{provider.ownerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{provider.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Team Size:</span>
                    <span className="font-medium">{provider.employeeCount} employees</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.services.slice(0, 6).map((service, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-md"
                    >
                      {service}
                    </span>
                  ))}
                  {provider.services.length > 6 && (
                    <span className="text-sm text-gray-500 px-2 py-1">
                      +{provider.services.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {provider.contact.phone && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaPhone className="text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">{provider.contact.phone}</p>
                  </div>
                </div>
              )}
              
              {provider.contact.email && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaEnvelope className="text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">{provider.contact.email}</p>
                  </div>
                </div>
              )}
              
              {provider.contact.website && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaGlobe className="text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Website</p>
                    <p className="text-gray-600">{provider.contact.website}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-8">
            <Link
              to="/explore"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Provider Directory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile; 
