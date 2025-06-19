import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockHighlights, mockProviders } from '../data/mockData';

const HomePage = () => {
  const [highlights, setHighlights] = useState([]);
  const [featuredProviders, setFeaturedProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setHighlights(mockHighlights);
      setFeaturedProviders(mockProviders.filter(p => p.badges.featured).slice(0, 6));
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Bataan Connect...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Trusted Service Providers in{' '}
              <span className="text-yellow-400">Bataan</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with verified contractors, MSMEs, and service providers across Bataan Province
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/explore"
                className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors"
              >
                🔍 Explore Providers
              </Link>
              <Link
                to="/jobs"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-800 transition-colors"
              >
                📝 Post a Job
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{mockProviders.length}+</div>
              <div className="text-gray-600">Service Providers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {mockProviders.filter(p => p.badges.verified).length}+
              </div>
              <div className="text-gray-600">Verified Businesses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">8+</div>
              <div className="text-gray-600">Service Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">11+</div>
              <div className="text-gray-600">Municipalities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Highlights */}
      {highlights.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ⭐ This Week's Highlights
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover featured service providers making a difference in Bataan communities
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {highlights.map((highlight) => (
                <div key={highlight._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-6xl">
                      {highlight.provider.category === 'Construction' ? '🏗️' :
                       highlight.provider.category === 'Landscaping' ? '🌱' :
                       highlight.provider.category === 'IT Services' ? '💻' : '⭐'}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {highlight.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        📍 {highlight.provider.municipality}
                      </div>
                      <Link
                        to={`/provider/${highlight.provider._id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Providers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🏆 Featured Providers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Top-rated and verified service providers across Bataan Province
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProviders.map((provider) => (
              <div key={provider._id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {provider.businessName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        📍 {provider.municipality}, Bataan
                      </p>
                    </div>
                    {provider.badges.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {provider.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {provider.services.slice(0, 3).map((service, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                    {provider.services.length > 3 && (
                      <span className="text-xs text-gray-500">+{provider.services.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(provider.rating))}
                        {'☆'.repeat(5 - Math.floor(provider.rating))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">
                        ({provider.reviewCount})
                      </span>
                    </div>
                    <Link
                      to={`/provider/${provider._id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/explore"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View All Providers
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Bataan Connect Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to find and connect with trusted service providers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                1. Search & Discover
              </h3>
              <p className="text-gray-600">
                Browse our directory of verified service providers or use our interactive map to find providers near you.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                2. Compare & Choose
              </h3>
              <p className="text-gray-600">
                View detailed profiles, portfolios, ratings, and reviews to make informed decisions about your service needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                3. Connect & Hire
              </h3>
              <p className="text-gray-600">
                Contact providers directly through phone, email, or our platform to discuss your project requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Perfect Service Provider?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found quality services through Bataan Connect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/explore"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Exploring
            </Link>
            <Link
              to="/auth"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Join as Provider
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 