
import React from 'react';
import { Link } from 'react-router-dom';
import { Restaurant } from '../types/api';
import { Badge } from '@/components/ui/badge';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={restaurant.thumbnailUrl} 
            alt={restaurant.name} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-1">{restaurant.name}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span>{restaurant.location}</span>
            <span className="mx-2">•</span>
            <span>{restaurant.cuisine}</span>
          </div>
          <div className="flex-grow"></div>
          <div className="flex gap-2 mt-3 min-h-6">
            {restaurant.hasEarlyBird && (
              <Badge variant="outline" className="text-xs bg-dineflex-burgundy text-white border-dineflex-burgundy">
                Early Bird
              </Badge>
            )}
            {restaurant.hasLastMinute && (
              <Badge variant="outline" className="text-xs bg-dineflex-gold text-dineflex-charcoal border-dineflex-gold">
                Last Minute
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
