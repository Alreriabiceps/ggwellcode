import React, { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon, FunnelIcon } from '@heroicons/react/24/outline';

const SearchInterface = ({ onSearch, onLocationFilter, onToggleFilters, showFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ searchTerm, location });
  };

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationFilter({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to detect your location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for services (e.g., electrician, plumber, contractor...)"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Location and Actions Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Location Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPinIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (e.g., Balanga, Bataan)"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleLocationDetect}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              📍 Detect Location
            </button>
            
            <button
              type="button"
              onClick={onToggleFilters}
              className={`px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 ${
                showFilters 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FunnelIcon className="h-4 w-4" />
              Filters
            </button>
            
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </div>

        {/* Quick Service Categories */}
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-3">Popular Services:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Electrician', 'Plumber', 'Carpenter', 'Painter', 
              'Mason', 'Roofer', 'Landscaper', 'Cleaner'
            ].map(service => (
              <button
                key={service}
                type="button"
                onClick={() => setSearchTerm(service)}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchInterface; 