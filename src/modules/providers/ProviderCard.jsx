import React from 'react';
import { Link } from 'react-router-dom';
import { getInitials, truncateText } from '../../lib/utils';

const ProviderCard = ({ provider, isSelected = false, showFullDetails = false }) => {
  if (!provider) return null;

  const {
    _id,
    businessName,
    description,
    municipality,
    barangay,
    services = [],
    badges = {},
    rating = 0,
    reviewCount = 0,
    contact = {}
  } = provider;

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {getInitials(businessName)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{businessName}</h3>
              <p className="text-sm text-gray-600">
                📍 {barangay}, {municipality}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {badges.verified && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                ✓ Verified
              </span>
            )}
            {badges.featured && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                ⭐ Featured
              </span>
            )}
            {badges.topRated && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                🏆 Top Rated
              </span>
            )}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          {truncateText(description, showFullDetails ? 200 : 120)}
        </p>
        
        {/* Services */}
        <div className="flex flex-wrap gap-2 mb-4">
          {services.slice(0, 3).map((service, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
            >
              {service}
            </span>
          ))}
          {services.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              +{services.length - 3} more
            </span>
          )}
        </div>
        
        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(rating) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {rating.toFixed(1)} ({reviewCount} reviews)
            </span>
          </div>
        )}
        
        <div className="flex gap-2">
          <Link 
            to={`/provider/${_id}`} 
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded text-sm text-center hover:bg-blue-700 transition-colors"
          >
            View Profile
          </Link>
          {contact.phone && (
            <button
              onClick={() => window.open(`tel:${contact.phone}`, '_self')}
              className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors"
            >
              📞 Call
            </button>
          )}
          {contact.email && !contact.phone && (
            <button
              onClick={() => window.open(`mailto:${contact.email}`, '_self')}
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
            >
              ✉️ Email
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderCard; 