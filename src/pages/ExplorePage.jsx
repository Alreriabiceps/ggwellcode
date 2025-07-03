import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { providerAPI } from '../lib/api';
import LeafletMap from '../components/LeafletMap';
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaStar, 
  FaShieldAlt,
  FaCheckCircle,
  FaEye,
  FaHeart
} from 'react-icons/fa';
import { 
  MdGrid3X3, 
  MdMap,
  MdVerified
} from 'react-icons/md';

const ExplorePage = () => {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [qualityFilter, setQualityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simplified quality tiers
  const qualityTiers = [
    { id: 'all', name: 'All Providers' },
    { id: 'premium', name: 'Premium (4.5+ stars)', minRating: 4.5 },
    { id: 'quality', name: 'Quality (4.0+ stars)', minRating: 4.0 },
    { id: 'verified', name: 'Verified Only', minRating: 0 }
  ];

  // Simplified sort options
  const sortOptions = [
    { id: 'rating', name: 'Highest Rated' },
    { id: 'experience', name: 'Most Experienced' },
    { id: 'reviews', name: 'Most Reviews' }
  ];

  const municipalities = [
    'All Municipalities', 'Balanga', 'Mariveles', 'Hermosa', 'Orani', 'Samal',
    'Abucay', 'Pilar', 'Orion', 'Limay', 'Bagac', 'Morong', 'Dinalupihan'
  ];

  const categories = [
    'All Categories', 'Construction', 'Electrical', 'Plumbing', 'Automotive', 
    'Landscaping', 'Catering', 'IT Services', 'Cleaning', 'Beauty & Wellness', 'Education'
  ];

  // Fetch providers from API
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const response = await providerAPI.getAll();
        
        if (response.data && response.data.success) {
          setProviders(response.data.data.providers || []);
          setFilteredProviders(response.data.data.providers || []);
        } else {
          setProviders([]);
          setFilteredProviders([]);
        }
      } catch (error) {
        console.error('Error fetching providers:', error);
        setError('Failed to load providers. Please try again later.');
        setProviders([]);
        setFilteredProviders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    let filtered = [...providers];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(provider =>
        provider.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.services?.some(service => 
          service.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Municipality filter
    if (selectedMunicipality && selectedMunicipality !== 'All Municipalities') {
      filtered = filtered.filter(provider => 
        provider.municipality === selectedMunicipality
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'All Categories') {
      filtered = filtered.filter(provider =>
        provider.category === selectedCategory
      );
    }

    // Quality filter
    if (qualityFilter !== 'all') {
      const tier = qualityTiers.find(t => t.id === qualityFilter);
      if (tier && tier.minRating !== undefined) {
        filtered = filtered.filter(provider => (provider.rating || 0) >= tier.minRating);
      }
      if (qualityFilter === 'verified') {
        filtered = filtered.filter(provider => provider.isVerified);
      }
    }

    // Sort providers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'experience':
          return (b.yearsExperience || 0) - (a.yearsExperience || 0);
        case 'reviews':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        default:
          return (b.rating || 0) - (a.rating || 0);
      }
    });

    setFilteredProviders(filtered);
  }, [providers, searchTerm, selectedMunicipality, selectedCategory, qualityFilter, sortBy]);

  const getProviderBadge = (provider) => {
    if ((provider.rating || 0) >= 4.5 && provider.isVerified) {
      return { label: 'Premium', color: 'bg-blue-100 text-blue-800' };
    } else if ((provider.rating || 0) >= 4.0 && provider.isVerified) {
      return { label: 'Quality', color: 'bg-green-100 text-green-800' };
    } else if (provider.isVerified) {
      return { label: 'Verified', color: 'bg-gray-100 text-gray-800' };
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading providers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Find Quality Providers
              </h1>
              <p className="text-gray-600">
                Discover trusted professionals in Bataan ({filteredProviders.length} providers found)
              </p>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MdGrid3X3 className="mr-2" />
                Grid
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'map'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MdMap className="mr-2" />
                Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Filters */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search providers or services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Municipality Filter */}
            <div>
              <select
                value={selectedMunicipality}
                onChange={(e) => setSelectedMunicipality(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {municipalities.map(municipality => (
                  <option key={municipality} value={municipality}>
                    {municipality}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {filteredProviders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No providers found</h3>
            <p className="text-gray-600 mb-6">
              {providers.length === 0 
                ? "No providers have registered yet. Be the first to register your business!"
                : "Try adjusting your search criteria or filters to find more providers."
              }
            </p>
            <Link
              to="/register-provider"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Register Your Business
            </Link>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProviders.map(provider => {
                  const badge = getProviderBadge(provider);
                  return (
                    <div key={provider._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {provider.businessName}
                            </h3>
                            <p className="text-sm text-gray-600 flex items-center">
                              <FaMapMarkerAlt className="mr-1" />
                              {provider.barangay}, {provider.municipality}
                            </p>
                          </div>
                          {badge && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                              {badge.label}
                            </span>
                          )}
                        </div>

                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                          {provider.description || 'Professional service provider in Bataan.'}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <FaStar className="text-yellow-400 mr-1" />
                            <span className="font-medium text-gray-900">
                              {(provider.rating || 0).toFixed(1)}
                            </span>
                            <span className="text-gray-500 text-sm ml-1">
                              ({provider.reviewCount || 0} reviews)
                            </span>
                          </div>
                          {provider.isVerified && (
                            <FaShieldAlt className="text-green-500" title="Verified Provider" />
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {(provider.services || []).slice(0, 3).map((service, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                          {(provider.services || []).length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{(provider.services || []).length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            {provider.yearsExperience || 0} years experience
                          </span>
                          <Link
                            to={`/provider/${provider._id}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                          >
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md">
                <LeafletMap 
                  providers={filteredProviders}
                  onProviderSelect={setSelectedProvider}
                  selectedProvider={selectedProvider}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;