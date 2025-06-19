import React, { useState, useEffect } from 'react';
import { providerAPI } from '../lib/api';
import { useGeolocation } from '../hooks/useGeolocation';
import ProviderCard from '../modules/providers/ProviderCard';
import ProviderFilters from '../modules/providers/ProviderFilters';
import { Button } from '../components/ui/Button';

const ExplorePage = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { latitude, longitude } = useGeolocation();

  useEffect(() => {
    loadProviders();
  }, [filters, latitude, longitude]);

  const loadProviders = async (append = false) => {
    try {
      setLoading(true);
      setError('');

      const queryParams = {
        ...filters,
        ...(latitude && longitude && { latitude, longitude })
      };

      // Clean up 'all' values
      if (queryParams.category === 'all') delete queryParams.category;
      if (queryParams.municipality === 'all') delete queryParams.municipality;
      if (!queryParams.minRating) delete queryParams.minRating;

      const response = await providerAPI.getAll(queryParams);
      const { providers: newProviders, total: totalCount, hasMore: moreAvailable } = response.data.data;

      if (append) {
        setProviders(prev => [...prev, ...newProviders]);
      } else {
        setProviders(newProviders);
      }

      setTotal(totalCount);
      setHasMore(moreAvailable);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load providers');
    } finally {
      setLoading(false);
    }
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

  const handleLoadMore = () => {
    const nextPage = filters.page + 1;
    setFilters(prev => ({ ...prev, page: nextPage }));
    loadProviders(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Providers</h1>
          <p className="text-gray-600">
            Discover trusted service providers in Bataan Province
            {total > 0 && ` (${total} providers found)`}
          </p>
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
          <div className="lg:col-span-3">
            {loading && providers.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading providers...</p>
              </div>
            ) : error ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <div className="text-red-600 mb-4">⚠️</div>
                <p className="text-red-600">{error}</p>
                <Button 
                  onClick={() => loadProviders()} 
                  className="mt-4"
                  variant="outline"
                >
                  Try Again
                </Button>
              </div>
            ) : providers.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <div className="text-gray-400 text-4xl mb-4">🔍</div>
                <p className="text-gray-600 mb-2">No providers found</p>
                <p className="text-sm text-gray-500">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {providers.map(provider => (
                    <ProviderCard key={provider._id} provider={provider} />
                  ))}
                </div>
                
                {hasMore && (
                  <div className="mt-8 text-center">
                    <Button 
                      onClick={handleLoadMore}
                      loading={loading}
                      variant="outline"
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage; 