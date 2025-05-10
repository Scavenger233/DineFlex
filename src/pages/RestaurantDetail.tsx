
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { apiService } from '../services/api';
import { AvailableSlot, BookingRequest } from '../types/api';
import AvailabilitySelector from '../components/AvailabilitySelector';
import BookingForm from '../components/BookingForm';
import RestaurantMap from '../components/RestaurantMap';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin } from 'lucide-react';

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState<boolean>(false);
  
  // Fetch restaurant details
  const { data: restaurant, isLoading: isLoadingRestaurant } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => apiService.getRestaurantById(id || ''),
    enabled: !!id
  });
  
  // Fetch availability for selected date
  const { data: availability, isLoading: isLoadingAvailability } = useQuery({
    queryKey: ['availability', id, format(selectedDate, 'yyyy-MM-dd')],
    queryFn: () => apiService.getRestaurantAvailability(
      id || '', 
      format(selectedDate, 'yyyy-MM-dd')
    ),
    enabled: !!id
  });
  
  // Handle booking creation
  const createBookingMutation = useMutation({
    mutationFn: (bookingData: BookingRequest) => apiService.createBooking(bookingData),
    onSuccess: (data) => {
      toast.success('Booking confirmed!');
      navigate(`/booking/${data.id}`);
    },
    onError: (error: any) => {
      console.error('Booking error:', error);
      if (error.code === 'VALIDATION_ERROR' && error.details?.fields) {
        error.details.fields.forEach((field: any) => {
          toast.error(`${field.field}: ${field.message}`);
        });
      } else {
        toast.error(error.message || 'Failed to create booking. Please try again.');
      }
    }
  });
  
  const handleContinueToBooking = () => {
    if (selectedTime) {
      setShowBookingForm(true);
    } else {
      toast.error('Please select a time to continue.');
    }
  };
  
  const handleBookingSubmit = (formData: BookingRequest) => {
    createBookingMutation.mutate(formData);
  };

  if (isLoadingRestaurant) {
    return (
      <div className="min-h-screen bg-dineflex-offwhite">
        <div className="container mx-auto px-4 py-10 max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-dineflex-offwhite">
        <div className="container mx-auto px-4 py-10 max-w-7xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Restaurant not found</h2>
          <Button onClick={() => navigate('/')}>
            Back to restaurants
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dineflex-offwhite">      
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to restaurants
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <span>{restaurant.location}</span>
            <span className="mx-2">•</span>
            <span>{restaurant.cuisine}</span>
          </div>
          
          <div className="relative h-80 rounded-lg overflow-hidden mb-6">
            <img 
              src={restaurant.images[0]} 
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <p className="text-lg mb-4">{restaurant.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Location & Contact</h3>
              <div className="flex items-start mb-2">
                <MapPin className="h-5 w-5 text-dineflex-burgundy mr-2 mt-0.5" />
                <p>{restaurant.address}</p>
              </div>
              <p className="mb-2"><span className="font-medium">Phone:</span> {restaurant.phone}</p>
              <p><span className="font-medium">Hours:</span> {restaurant.openingHours}</p>
              
              <div className="mt-4">
                <RestaurantMap address={restaurant.address} name={restaurant.name} />
              </div>
            </div>
            
            <div>
              {restaurant.earlyBirdOffers && restaurant.earlyBirdOffers.length > 0 && (
                <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border-l-4 border-dineflex-burgundy">
                  <h3 className="text-xl font-semibold mb-2 text-dineflex-burgundy">
                    Early Bird Special
                  </h3>
                  {restaurant.earlyBirdOffers.map(offer => (
                    <div key={offer.id}>
                      <p className="font-medium">{offer.title}</p>
                      <p>{offer.description}</p>
                      <p className="text-sm text-gray-600">Available: {offer.availableTimes}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Additional restaurant details could go here */}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <AvailabilitySelector
            date={selectedDate}
            setDate={setSelectedDate}
            slots={availability?.availableSlots || []}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            isLoading={isLoadingAvailability}
          />
          
          {showBookingForm ? (
            <BookingForm
              restaurantId={restaurant.id}
              date={selectedDate}
              time={selectedTime || ''}
              onSubmit={handleBookingSubmit}
              isSubmitting={createBookingMutation.isPending}
            />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-4">Reservation Details</h3>
                <p className="mb-2">
                  <span className="font-medium">Restaurant:</span> {restaurant.name}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Date:</span> {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </p>
                <p className="mb-6">
                  <span className="font-medium">Time:</span> {selectedTime || 'Not selected'}
                </p>
                <p className="text-sm text-gray-600 mb-8">
                  Select a date and time to check availability. Early bird and last-minute specials 
                  may offer different pricing.
                </p>
              </div>
              
              <Button 
                onClick={handleContinueToBooking}
                className="w-full bg-dineflex-burgundy hover:bg-dineflex-burgundy/90 text-white"
                disabled={!selectedTime}
              >
                Continue to Booking
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
