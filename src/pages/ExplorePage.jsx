import React, { useState, useEffect } from 'react';
import { mockProviders } from '../data/mockData';
import { useGeolocation } from '../hooks/useGeolocation';
import ProviderCard from '../modules/providers/ProviderCard';
import ProviderFilters from '../modules/providers/ProviderFilters';
import LeafletMap from '../components/LeafletMap';

const ExplorePage = () => {
  const [allProviders] = useState(mockProviders);
  const [filteredProviders, setFilteredProviders] = useState(mockProviders);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    category: 'all',
    municipality: 'all',
    verified: false,
    minRating: '',
    sortBy: 'createdAt',
    search: ''
  });

  const { latitude, longitude } = useGeolocation();

  useEffect(() => {
    // Simulate loading and apply filters
    setTimeout(() => {
      applyFilters();
      setLoading(false);
    }, 500);
  }, [filters]);

  const applyFilters = () => {
    let filtered = [...allProviders];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(provider =>
        provider.businessName.toLowerCase().includes(searchTerm) ||
        provider.description.toLowerCase().includes(searchTerm) ||
        provider.services.some(service => service.toLowerCase().includes(searchTerm)) ||
        provider.municipality.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(provider => 
        provider.category === filters.category
      );
    }

    // Municipality filter
    if (filters.municipality && filters.municipality !== 'all') {
      filtered = filtered.filter(provider => 
        provider.municipality === filters.municipality
      );
    }

    // Verified filter
    if (filters.verified) {
      filtered = filtered.filter(provider => provider.badges.verified);
    }

    // Rating filter
    if (filters.minRating) {
      filtered = filtered.filter(provider => 
        provider.rating >= parseFloat(filters.minRating)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviewCount':
          return b.reviewCount - a.reviewCount;
        case 'businessName':
          return a.businessName.localeCompare(b.businessName);
        case 'createdAt':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredProviders(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({
      ...newFilters,
      page: 1 // Reset page when filters change
    });
  };

  const handleClearFilters = () => {
    setFilters({
      page: 1,
      limit: 12,
      category: 'all',
      municipality: 'all',
      verified: false,
      minRating: '',
      sortBy: 'createdAt',
      search: ''
    });
  };

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    if (viewMode === 'grid') {
      // Scroll to provider card or show details
      const element = document.getElementById(`provider-${provider._id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const renderGridView = () => (
    <>
      {filteredProviders.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="text-gray-400 text-4xl mb-4">🔍</div>
          <p className="text-gray-600 mb-2">No providers found</p>
          <p className="text-sm text-gray-500">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProviders.map(provider => (
            <div key={provider._id} id={`provider-${provider._id}`}>
              <ProviderCard 
                provider={provider} 
                isSelected={selectedProvider?._id === provider._id}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );

  const renderMapView = () => (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Map */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <LeafletMap 
            providers={filteredProviders} 
            onProviderSelect={handleProviderSelect}
            selectedProvider={selectedProvider}
          />
        </div>
      </div>
      
      {/* Selected Provider Details */}
      <div className="lg:col-span-1">
        {selectedProvider ? (
          <div className="bg-white rounded-lg shadow">
            <ProviderCard 
              provider={selectedProvider} 
              isSelected={true}
              showFullDetails={true}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-gray-400 text-4xl mb-4">🗺️</div>
            <p className="text-gray-600 mb-2">Select a provider on the map</p>
            <p className="text-sm text-gray-500">Click on any marker to view details</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Explore Providers</h1>
              <p className="text-gray-600">
                Discover trusted service providers in Bataan Province
                {filteredProviders.length > 0 && ` (${filteredProviders.length} providers found)`}
              </p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📋 Grid View
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'map'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🗺️ Map View
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProviderFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
          
          {/* Results */}
          <div className={viewMode === 'map' ? 'lg:col-span-3' : 'lg:col-span-3'}>
            {loading ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading providers...</p>
              </div>
            ) : error ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <div className="text-red-600 mb-4">⚠️</div>
                <p className="text-red-600">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              viewMode === 'grid' ? renderGridView() : renderMapView()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage; 