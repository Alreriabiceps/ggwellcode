import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers not showing in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons for different provider types
const createCustomIcon = (color = 'blue') => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        background-color: ${color === 'blue' ? '#3B82F6' : color === 'green' ? '#10B981' : '#EF4444'};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
      ">
        ${color === 'green' ? '✓' : '📍'}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Component to fit map bounds to markers
const FitBounds = ({ providers }) => {
  const map = useMap();

  useEffect(() => {
    if (providers && providers.length > 0) {
      const validProviders = providers.filter(
        provider => provider.location?.coordinates && 
        provider.location.coordinates.length === 2 &&
        !isNaN(provider.location.coordinates[0]) &&
        !isNaN(provider.location.coordinates[1])
      );

      if (validProviders.length > 0) {
        const bounds = L.latLngBounds(
          validProviders.map(provider => [
            provider.location.coordinates[1], // lat
            provider.location.coordinates[0]  // lng
          ])
        );
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }, [providers, map]);

  return null;
};

const LeafletMap = ({ providers = [], onProviderSelect, selectedProvider }) => {
  const [mapCenter] = useState([14.6760, 120.4842]); // Bataan, Philippines
  const [mapZoom] = useState(11);

  // Filter providers that have valid coordinates
  const validProviders = providers.filter(
    provider => provider.location?.coordinates && 
    provider.location.coordinates.length === 2 &&
    !isNaN(provider.location.coordinates[0]) &&
    !isNaN(provider.location.coordinates[1])
  );

  const handleMarkerClick = (provider) => {
    if (onProviderSelect) {
      onProviderSelect(provider);
    }
  };

  return (
    <div className="w-full h-96 relative">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Fit bounds to show all providers */}
        <FitBounds providers={validProviders} />
        
        {validProviders.map((provider) => {
          const isSelected = selectedProvider?._id === provider._id;
          const isVerified = provider.badges?.verified;
          const iconColor = isSelected ? 'red' : isVerified ? 'green' : 'blue';
          
          return (
            <Marker
              key={provider._id}
              position={[
                provider.location.coordinates[1], // lat
                provider.location.coordinates[0]  // lng
              ]}
              icon={createCustomIcon(iconColor)}
              eventHandlers={{
                click: () => handleMarkerClick(provider)
              }}
            >
              <Popup>
                <div className="p-2 max-w-xs">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {provider.businessName}
                  </h3>
                  
                  {provider.services && provider.services.length > 0 && (
                    <p className="text-sm text-gray-600 mb-2">
                      {provider.services.slice(0, 3).join(', ')}
                      {provider.services.length > 3 && '...'}
                    </p>
                  )}
                  
                  <p className="text-xs text-gray-500 mb-2">
                    📍 {provider.barangay}, {provider.municipality}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {provider.badges?.verified && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓ Verified
                      </span>
                    )}
                    {provider.badges?.featured && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        ⭐ Featured
                      </span>
                    )}
                    {provider.badges?.topRated && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        🏆 Top Rated
                      </span>
                    )}
                  </div>
                  
                  {provider.description && (
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {provider.description.length > 100 
                        ? provider.description.substring(0, 100) + '...'
                        : provider.description
                      }
                    </p>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(`/provider/${provider._id}`, '_blank')}
                      className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                    >
                      View Profile
                    </button>
                    
                    {provider.contact?.phone && (
                      <button
                        onClick={() => window.open(`tel:${provider.contact.phone}`)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                      >
                        📞 Call
                      </button>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md text-xs z-[1000]">
        <h4 className="font-semibold mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Verified Provider</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Standard Provider</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Selected Provider</span>
          </div>
        </div>
      </div>
      
      {/* Provider Count */}
      <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md text-xs z-[1000]">
        <span className="font-medium">
          {validProviders.length} provider{validProviders.length !== 1 ? 's' : ''} shown
        </span>
      </div>
    </div>
  );
};

export default LeafletMap; 