import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Loading, CardSkeleton } from '../components/ui/Loading';
import { providerAPI } from '../lib/api';
import LeafletMap from '../components/LeafletMap';
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaStar, 
  FaShieldAlt,
  FaCheckCircle,
  FaEye,
  FaHeart,
  FaFilter,
  FaTh,
  FaMap,
  FaArrowRight,
  FaUsers,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

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
  const [showFilters, setShowFilters] = useState(false);

  // Apple-inspired quality tiers
  const qualityTiers = [
    { id: 'all', name: 'All Providers' },
    { id: 'premium', name: 'Premium (4.5+ ⭐)', minRating: 4.5 },
    { id: 'quality', name: 'Quality (4.0+ ⭐)', minRating: 4.0 },
    { id: 'verified', name: 'Verified Only', minRating: 0 }
  ];

  // Apple-inspired sort options
  const sortOptions = [
    { id: 'rating', name: 'Highest Rated' },
    { id: 'experience', name: 'Most Experienced' },
    { id: 'reviews', name: 'Most Reviews' },
    { id: 'name', name: 'Name A-Z' }
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
          typeof service === 'string' ? service.toLowerCase().includes(searchTerm.toLowerCase()) : false
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
        case 'name':
          return (a.businessName || '').localeCompare(b.businessName || '');
        default:
          return (b.rating || 0) - (a.rating || 0);
      }
    });

    setFilteredProviders(filtered);
  }, [providers, searchTerm, selectedMunicipality, selectedCategory, qualityFilter, sortBy]);

  const getProviderBadge = (provider) => {
    if ((provider.rating || 0) >= 4.5 && provider.isVerified) {
      return { label: 'Premium', color: 'bg-blue-100 text-blue-700 border-blue-200' };
    } else if ((provider.rating || 0) >= 4.0 && provider.isVerified) {
      return { label: 'Quality', color: 'bg-green-100 text-green-700 border-green-200' };
    } else if (provider.isVerified) {
      return { label: 'Verified', color: 'bg-gray-100 text-gray-700 border-gray-200' };
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-apple py-16">
          <div className="text-center mb-12">
            <Loading size="lg" text="Discovering amazing providers..." center />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} lines={4} avatar />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-title mb-4">Something went wrong</h3>
          <p className="text-body text-gray-600 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container-apple py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-display font-bold mb-4 animate-fade-in">
              Discover Premium
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                Service Providers
              </span>
            </h1>
            <p className="text-subtitle text-blue-100 mb-8 animate-fade-in">
              Connect with {filteredProviders.length} verified professionals across Bataan Province
            </p>
            
            {/* Hero Search */}
            <div className="max-w-2xl mx-auto animate-slide-up">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search providers or services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftIcon={FaSearch}
                  className="text-lg py-4 bg-white/90 backdrop-blur-apple border-white/20 focus:bg-white"
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container-apple py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant={showFilters ? 'primary' : 'outline'}
                size="sm"
                leftIcon={<FaFilter />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
              
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <FaTh className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  <FaMap className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {filteredProviders.length} providers found
              </span>
            </div>
          </div>

                     {/* Filter Controls */}
           {showFilters && (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 rounded-apple-lg animate-slide-down">
              
              <Select
                label="Municipality"
                value={selectedMunicipality}
                onChange={(e) => setSelectedMunicipality(e.target.value)}
                fullWidth
              >
                {municipalities.map(municipality => (
                  <option key={municipality} value={municipality}>
                    {municipality}
                  </option>
                ))}
              </Select>

              <Select
                label="Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                fullWidth
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>

              <Select
                label="Quality Tier"
                value={qualityFilter}
                onChange={(e) => setQualityFilter(e.target.value)}
                fullWidth
              >
                {qualityTiers.map(tier => (
                  <option key={tier.id} value={tier.id}>
                    {tier.name}
                  </option>
                ))}
              </Select>

              <Select
                label="Sort By"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                fullWidth
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container-apple">
          {filteredProviders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-apple-2xl flex items-center justify-center mx-auto mb-8">
                <FaSearch className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-headline mb-4">No providers found</h3>
              <p className="text-subtitle text-gray-600 mb-8 max-w-md mx-auto">
                {providers.length === 0 
                  ? "No providers have registered yet. Be the first to join our platform!"
                  : "Try adjusting your search criteria or filters to discover more providers."
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {providers.length === 0 ? (
                  <Link to="/register-provider">
                    <Button size="lg" rightIcon={<FaArrowRight />}>
                      Register Your Business
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedMunicipality('');
                      setSelectedCategory('');
                      setQualityFilter('all');
                    }}
                    variant="outline"
                    size="lg"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <>
                             {viewMode === 'grid' ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {filteredProviders.map((provider, index) => {
                    const badge = getProviderBadge(provider);
                    return (
                      <Card 
                        key={provider._id} 
                        variant="elevated"
                        className="group hover:shadow-apple-lg transition-all duration-300 animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="p-4">
                          
                          {/* Provider Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {provider.businessName}
                                </h3>
                                {provider.isVerified && (
                                  <FaCheckCircle className="w-4 h-4 text-green-500" />
                                )}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <FaMapMarkerAlt className="w-3 h-3" />
                                <span>{provider.barangay}, {provider.municipality}</span>
                              </div>
                            </div>
                            {badge && (
                              <div className={cn(
                                'px-2 py-1 rounded-apple text-xs font-medium border',
                                badge.color
                              )}>
                                {badge.label}
                              </div>
                            )}
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-700 mb-3 line-clamp-2 leading-relaxed">
                            {provider.description || 'Professional service provider in Bataan offering quality services.'}
                          </p>

                          {/* Rating & Services Row */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1">
                              <FaStar className="w-4 h-4 text-yellow-400" />
                              <span className="font-medium text-sm text-gray-900">
                                {(provider.rating || 0).toFixed(1)}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({provider.reviewCount || 0})
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <FaUsers className="w-3 h-3" />
                              <span>{provider.yearsExperience || 0}+ years</span>
                            </div>
                          </div>

                          {/* Services */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1">
                              {(provider.services || []).slice(0, 2).map((service, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-apple font-medium"
                                >
                                  {service}
                                </span>
                              ))}
                              {(provider.services || []).length > 2 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-apple font-medium">
                                  +{(provider.services || []).length - 2}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                              <FaHeart className="w-4 h-4" />
                            </button>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <FaEye className="w-3 h-3" />
                              </Button>
                              <Link to={`/provider/${provider._id}`}>
                                <Button size="sm" className="px-3 py-1.5 text-xs">
                                  View
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card variant="elevated" className="overflow-hidden">
                  <div style={{ height: '600px' }}>
                    <LeafletMap 
                      providers={filteredProviders}
                      onProviderSelect={setSelectedProvider}
                      selectedProvider={selectedProvider}
                    />
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;