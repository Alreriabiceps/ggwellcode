import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { getInitials, truncateText } from '../../lib/utils';

const ProviderCard = ({ provider }) => {
  const {
    _id,
    businessName,
    businessDescription,
    location,
    services,
    verification,
    ratings
  } = provider;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {getInitials(businessName)}
            </div>
            <div>
              <CardTitle className="text-lg">{businessName}</CardTitle>
              <CardDescription>
                {location?.barangay}, {location?.municipality}
              </CardDescription>
            </div>
          </div>
          {verification?.isVerified && (
            <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              <span className="mr-1">✓</span>
              Verified
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          {truncateText(businessDescription, 120)}
        </p>
        
        {/* Services */}
        <div className="flex flex-wrap gap-2 mb-4">
          {services?.slice(0, 3).map((service, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
            >
              {service.name || service.category}
            </span>
          ))}
          {services?.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              +{services.length - 3} more
            </span>
          )}
        </div>
        
        {/* Rating */}
        {ratings?.average > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(ratings.average) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {ratings.average.toFixed(1)} ({ratings.count} reviews)
            </span>
          </div>
        )}
        
        <div className="flex gap-2">
          <Link to={`/providers/${_id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Profile
            </Button>
          </Link>
          <Button size="sm" className="px-4">
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderCard; 