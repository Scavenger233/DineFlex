
import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AvailableSlot } from '@/types/api';

interface AvailabilitySelectorProps {
  date: Date;
  setDate: (date: Date) => void;
  slots: AvailableSlot[];
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
  isLoading: boolean;
}

const AvailabilitySelector: React.FC<AvailabilitySelectorProps> = ({ 
  date, 
  setDate, 
  slots, 
  selectedTime, 
  setSelectedTime, 
  isLoading 
}) => {
  // Group slots by type for display
  const earlyBirdSlots = slots.filter(slot => slot.type === 'earlyBird');
  const regularSlots = slots.filter(slot => slot.type === 'regular');
  const lastMinuteSlots = slots.filter(slot => slot.type === 'lastMinute');

  const getTimeButtonClass = (slot: AvailableSlot) => {
    let baseClasses = "rounded-full px-4 py-2 text-sm font-medium transition-colors";
    
    if (selectedTime === slot.time) {
      // Selected state
      switch (slot.type) {
        case 'earlyBird':
          return cn(baseClasses, "bg-dineflex-burgundy text-white");
        case 'lastMinute':
          return cn(baseClasses, "bg-dineflex-gold text-dineflex-charcoal");
        default:
          return cn(baseClasses, "bg-dineflex-charcoal text-white");
      }
    }
    
    // Default state
    switch (slot.type) {
      case 'earlyBird':
        return cn(baseClasses, "border border-dineflex-burgundy text-dineflex-burgundy hover:bg-dineflex-burgundy hover:text-white");
      case 'lastMinute':
        return cn(baseClasses, "border border-dineflex-gold text-dineflex-charcoal hover:bg-dineflex-gold");
      default:
        return cn(baseClasses, "border border-dineflex-charcoal text-dineflex-charcoal hover:bg-dineflex-charcoal hover:text-white");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Check Availability</h3>
      
      <div className="mb-6">
        <p className="mb-2 font-medium">Select a date:</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              disabled={(date) => date < new Date()}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-2"></div>
          <div className="flex flex-wrap gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {earlyBirdSlots.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-dineflex-burgundy mb-2">Early Bird Offers</h4>
              <div className="flex flex-wrap gap-2">
                {earlyBirdSlots.map(slot => (
                  <button
                    key={slot.time}
                    className={getTimeButtonClass(slot)}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {regularSlots.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-dineflex-charcoal mb-2">Regular Times</h4>
              <div className="flex flex-wrap gap-2">
                {regularSlots.map(slot => (
                  <button
                    key={slot.time}
                    className={getTimeButtonClass(slot)}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {lastMinuteSlots.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-dineflex-gold mb-2">Last Minute Deals</h4>
              <div className="flex flex-wrap gap-2">
                {lastMinuteSlots.map(slot => (
                  <button
                    key={slot.time}
                    className={getTimeButtonClass(slot)}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    {slot.time} {slot.discount && `(-${slot.discount})`}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {slots.length === 0 && (
            <p className="text-center py-4 text-gray-500">No availability for this date. Please try another date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailabilitySelector;
