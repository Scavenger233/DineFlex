
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Restaurant } from '../types/api';
import { apiService } from '../services/api';
import RestaurantGrid from '../components/RestaurantGrid';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'earlyBird' | 'lastMinute'>('all');

  const { data: restaurants, isLoading } = useQuery({
    queryKey: ['restaurants'],
    queryFn: apiService.getRestaurants
  });

  // Filter restaurants based on search term and filter type
  useEffect(() => {
    if (!restaurants) return;

    let filtered = restaurants;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        restaurant => 
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (selectedFilter === 'earlyBird') {
      filtered = filtered.filter(restaurant => restaurant.hasEarlyBird);
    } else if (selectedFilter === 'lastMinute') {
      filtered = filtered.filter(restaurant => restaurant.hasLastMinute);
    }
    
    setFilteredRestaurants(filtered);
  }, [restaurants, searchTerm, selectedFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-dineflex-offwhite">
      <motion.div 
        className="max-w-7xl mx-auto px-4 py-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-dineflex-charcoal">
            Find Your Perfect <span className="text-dineflex-burgundy">Dining</span> Experience
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover restaurants offering early bird and last-minute dining deals across Ireland.
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="max-w-md mx-auto relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search restaurants, cuisines, or locations" 
              className="pl-10 py-6 bg-white shadow-sm hover:shadow transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex justify-center gap-2 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === 'all'
                  ? 'bg-dineflex-charcoal text-white shadow-md'
                  : 'bg-white text-dineflex-charcoal hover:bg-gray-100'
              }`}
            >
              All Restaurants
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter('earlyBird')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === 'earlyBird'
                  ? 'bg-dineflex-burgundy text-white shadow-md'
                  : 'bg-white text-dineflex-burgundy hover:bg-gray-100'
              }`}
            >
              Early Bird Offers
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter('lastMinute')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === 'lastMinute'
                  ? 'bg-dineflex-gold text-dineflex-charcoal shadow-md'
                  : 'bg-white text-dineflex-charcoal hover:bg-gray-100'
              }`}
            >
              Last Minute Deals
            </motion.button>
          </div>
        </motion.div>
        
        <RestaurantGrid 
          restaurants={filteredRestaurants || []} 
          isLoading={isLoading}
        />
      </motion.div>
    </div>
  );
};

export default Index;
