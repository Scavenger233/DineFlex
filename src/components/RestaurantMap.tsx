
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface RestaurantMapProps {
  address: string;
  name: string;
}

const RestaurantMap: React.FC<RestaurantMapProps> = ({ address, name }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // In a real application, you would integrate with a mapping API like Google Maps or Mapbox
  // For now, we'll create a simple placeholder map
  useEffect(() => {
    if (mapRef.current) {
      // In a real implementation, this is where we would initialize the map
      console.log(`Initializing map for ${name} at ${address}`);
    }
  }, [address, name]);

  return (
    <div className="relative rounded-lg overflow-hidden shadow-md h-64 bg-gray-100">
      <div ref={mapRef} className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-8 w-8 mx-auto text-dineflex-burgundy mb-2" />
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-600">{address}</p>
          <p className="text-xs text-gray-500 mt-2 italic">Map view would appear here with real API integration</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMap;
