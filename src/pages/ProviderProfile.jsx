import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProviders } from '../data/mockData';
import qualityAI from '../lib/ai';
import { FaBolt, FaChartLine, FaCheckCircle, FaExclamationTriangle, FaGraduationCap, FaLightbulb, FaTrophy } from 'react-icons/fa';

const ProviderProfile = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(null);
  const [aiValueProp, setAiValueProp] = useState('');
  const [aiQualityAnalysis, setAiQualityAnalysis] = useState(null);
  const [aiEducation, setAiEducation] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    // Load provider data
    const foundProvider = mockProviders.find(p => p._id === id);
    if (foundProvider) {
      setProvider(foundProvider);
      setLoading(false);
      
      // Load AI enhancements
      loadAIEnhancements(foundProvider);
    } else {
      setLoading(false);
    }
  }, [id]);

  const loadAIEnhancements = async (providerData) => {
    setLoadingAI(true);
    try {
      // Generate AI-powered value proposition
      const valueProp = await qualityAI.generateValueProposition(providerData);
      setAiValueProp(valueProp);

      // Analyze quality factors
      const qualityAnalysis = await qualityAI.analyzeQualityFactors(providerData);
      setAiQualityAnalysis(qualityAnalysis);

      // Generate educational content
      const education = await qualityAI.generateQualityEducation(providerData.category);
      setAiEducation(education);
    } catch (error) {
      console.error('AI Enhancement Error:', error);
    } finally {
      setLoadingAI(false);
    }
  };

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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* AI-Generated Value Proposition */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <FaBolt className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">AI-Powered Value Proposition</h3>
                <div className="ml-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  AI Enhanced
                </div>
              </div>
              
              {loadingAI ? (
                <div className="flex items-center space-x-2 text-blue-600">
                  <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  <span>AI is analyzing this provider's value...</span>
                </div>
              ) : (
                <p className="text-slate-700 leading-relaxed">{aiValueProp}</p>
              )}
            </div>

            {/* AI Quality Analysis */}
            {aiQualityAnalysis && (
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <FaChartLine className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">AI Quality Analysis</h3>
                  <div className="ml-2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    AI Insights
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Quality Strengths</h4>
                    <ul className="space-y-2">
                      {aiQualityAnalysis.strengths.map((strength, index) => (
                        <li key={index} className="flex items-center text-slate-700">
                          <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Competitive Advantages</h4>
                    <ul className="space-y-2">
                      {aiQualityAnalysis.competitiveAdvantages.map((advantage, index) => (
                        <li key={index} className="flex items-center text-slate-700">
                          <FaTrophy className="text-yellow-500 mr-2 flex-shrink-0" />
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Why This Provider is Worth Premium Pricing</h4>
                  <p className="text-blue-800">{aiQualityAnalysis.valueJustification}</p>
                </div>
              </div>
            )}

            {/* AI Educational Content */}
            {aiEducation && (
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <FaGraduationCap className="text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Quality vs. Cheap Work</h3>
                  <div className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                    AI Education
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                      <FaExclamationTriangle className="mr-2" />
                      Risks of Cheap Work
                    </h4>
                    <ul className="space-y-2">
                      {aiEducation.cheapWorkRisks.map((risk, index) => (
                        <li key={index} className="text-red-700 text-sm">{risk}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                      <FaCheckCircle className="mr-2" />
                      Quality Benefits
                    </h4>
                    <ul className="space-y-2">
                      {aiEducation.qualityBenefits.map((benefit, index) => (
                        <li key={index} className="text-green-700 text-sm">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">5-Year Cost Comparison</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-red-600 font-bold text-lg">₱{aiEducation.costComparison.cheap5Year.toLocaleString()}</div>
                      <div className="text-red-700 text-sm">Cheap Work Total</div>
                    </div>
                    <div>
                      <div className="text-green-600 font-bold text-lg">₱{aiEducation.costComparison.premium5Year.toLocaleString()}</div>
                      <div className="text-green-700 text-sm">Premium Work Total</div>
                    </div>
                    <div>
                      <div className="text-blue-600 font-bold text-lg">₱{aiEducation.costComparison.savings.toLocaleString()}</div>
                      <div className="text-blue-700 text-sm">Your Savings</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Quality Tips */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <FaLightbulb className="text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">AI Quality Tips</h3>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    💡 This provider's {provider?.yearsExperience}+ years of experience and {provider?.rating}-star rating indicate exceptional quality standards.
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-green-800 text-sm">
                    ✅ Verified providers like this typically deliver 3x longer-lasting results than unverified alternatives.
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-purple-800 text-sm">
                    🎯 Premium providers save an average of ₱80,000 over 5 years through superior materials and workmanship.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
