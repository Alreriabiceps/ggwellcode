import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockProviders } from '../data/mockData';
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

  useEffect(() => {
    setTimeout(() => {
      setProviders(mockProviders);
      setFilteredProviders(mockProviders);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = [...providers];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(provider =>
        provider.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.services.some(service => 
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
        filtered = filtered.filter(provider => provider.rating >= tier.minRating);
      }
      if (qualityFilter === 'verified') {
        filtered = filtered.filter(provider => provider.badges.verified);
      }
    }

    // Sort providers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.yearsExperience - a.yearsExperience;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        default:
          return b.rating - a.rating;
      }
    });

    setFilteredProviders(filtered);
  }, [providers, searchTerm, selectedMunicipality, selectedCategory, qualityFilter, sortBy]);

  const getProviderBadge = (provider) => {
    if (provider.rating >= 4.5 && provider.badges.verified) {
      return { label: 'Premium', color: 'bg-blue-100 text-blue-800' };
    } else if (provider.rating >= 4.0 && provider.badges.verified) {
      return { label: 'Quality', color: 'bg-green-100 text-green-800' };
    } else if (provider.badges.verified) {
      return { label: 'Verified', color: 'bg-gray-100 text-gray-800' };
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Finding providers...</p>
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
              <p className="text-gray-600">Discover trusted professionals in Bataan</p>
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

            {/* Quality Filter */}
            <div>
              <select
                value={qualityFilter}
                onChange={(e) => setQualityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {qualityTiers.map(tier => (
                  <option key={tier.id} value={tier.id}>{tier.name}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                value={selectedMunicipality}
                onChange={(e) => setSelectedMunicipality(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {municipalities.map(municipality => (
                  <option key={municipality} value={municipality}>{municipality}</option>
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
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="container mx-auto px-4 py-4">
        <p className="text-gray-600">
          <span className="font-semibold text-gray-900">{filteredProviders.length}</span> providers found
        </p>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-8">
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => {
              const badge = getProviderBadge(provider);

              return (
                <div
                  key={provider._id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {provider.businessName}
                        </h3>
                        <p className="text-gray-500 flex items-center text-sm">
                          <FaMapMarkerAlt className="mr-1" />
                          {provider.municipality}, Bataan
                        </p>
                      </div>
                      {badge && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                          {badge.label}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center text-yellow-400 mr-2">
                        <FaStar />
                        <span className="ml-1 text-gray-900 font-medium">{provider.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({provider.reviewCount} reviews)</span>
                      {provider.badges.verified && (
                        <MdVerified className="ml-2 text-blue-500" />
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {provider.description}
                    </p>

                    {/* Services */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(provider.services || []).slice(0, 3).map((service, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
                        >
                          {service}
                        </span>
                      ))}
                      {(provider.services || []).length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{(provider.services || []).length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Experience */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">
                        {provider.yearsExperience} years experience
                      </span>
                    </div>

                    {/* Action */}
                    <Link
                      to={`/provider/${provider._id}`}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <LeafletMap
              providers={filteredProviders}
              onProviderSelect={setSelectedProvider}
              selectedProvider={selectedProvider}
              height="600px"
            />
          </div>
        )}
      </div>

      {/* No Results */}
      {filteredProviders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No providers found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedMunicipality('');
              setSelectedCategory('');
              setQualityFilter('all');
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;