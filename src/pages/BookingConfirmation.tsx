
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { apiService } from '../services/api';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';

const BookingConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => apiService.getBookingById(id || ''),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dineflex-offwhite">
        <Header />
        <div className="container mx-auto px-4 py-10 max-w-2xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4 mx-auto"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-dineflex-offwhite">
        <Header />
        <div className="container mx-auto px-4 py-10 max-w-2xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Booking not found</h2>
          <Button onClick={() => navigate('/')}>
            Go back to restaurants
          </Button>
        </div>
      </div>
    );
  }

  // Format date for display
  const displayDate = booking.date ? format(new Date(booking.date), 'EEEE, MMMM d, yyyy') : '';

  return (
    <div className="min-h-screen bg-dineflex-offwhite">
      <Header />
      
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Find more restaurants
        </Button>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-dineflex-success p-6 text-center text-white">
            <div className="mx-auto mb-4 bg-white rounded-full h-16 w-16 flex items-center justify-center">
              <Check className="h-8 w-8 text-dineflex-success" />
            </div>
            <h2 className="text-2xl font-bold mb-1">Booking Confirmed!</h2>
            <p>Your reservation has been successfully confirmed.</p>
          </div>
          
          <div className="p-6">
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-500 mb-1">Confirmation Code</p>
              <p className="text-2xl font-bold font-mono tracking-wide">{booking.confirmationCode}</p>
            </div>
            
            <div className="border-t border-b border-gray-200 py-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Restaurant</span>
                <span className="font-semibold">{booking.restaurantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Date</span>
                <span>{displayDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Time</span>
                <span>{booking.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Party Size</span>
                <span>{booking.partySize} {booking.partySize === 1 ? 'guest' : 'guests'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Booking Name</span>
                <span>{booking.customerName}</span>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-4">
                Please save your confirmation code. You may need it if you need to modify or cancel your reservation.
              </p>
              <Button 
                onClick={() => navigate('/')}
                className="bg-dineflex-burgundy hover:bg-dineflex-burgundy/90 text-white"
              >
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
