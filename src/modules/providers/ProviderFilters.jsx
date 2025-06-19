import React from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { SERVICE_CATEGORIES, BATAAN_MUNICIPALITIES } from '../../lib/utils';

const ProviderFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const handleInputChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Clear All
        </Button>
      </div>
      
      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <Input
            type="text"
            placeholder="Search providers..."
            value={filters.search || ''}
            onChange={(e) => handleInputChange('search', e.target.value)}
          />
        </div>
        
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Category
          </label>
          <select
            value={filters.category || 'all'}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {SERVICE_CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        {/* Municipality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Municipality
          </label>
          <select
            value={filters.municipality || 'all'}
            onChange={(e) => handleInputChange('municipality', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Municipalities</option>
            {BATAAN_MUNICIPALITIES.map(municipality => (
              <option key={municipality} value={municipality}>
                {municipality}
              </option>
            ))}
          </select>
        </div>
        
        {/* Verified Only */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="verified"
            checked={filters.verified || false}
            onChange={(e) => handleInputChange('verified', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="verified" className="ml-2 block text-sm text-gray-700">
            Verified providers only
          </label>
        </div>
        
        {/* Minimum Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Rating
          </label>
          <select
            value={filters.minRating || ''}
            onChange={(e) => handleInputChange('minRating', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </select>
        </div>
        
        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={filters.sortBy || 'createdAt'}
            onChange={(e) => handleInputChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="createdAt">Newest First</option>
            <option value="rating">Highest Rated</option>
            <option value="businessName">Name A-Z</option>
            <option value="distance">Distance</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProviderFilters; 