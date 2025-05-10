
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BookingRequest } from '../types/api';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface BookingFormProps {
  restaurantId: string;
  date: Date;
  time: string;
  onSubmit: (data: BookingRequest) => void;
  isSubmitting: boolean;
}

const bookingFormSchema = z.object({
  partySize: z.coerce
    .number()
    .min(1, { message: 'Party size must be at least 1' })
    .max(12, { message: 'Party size cannot exceed 12' }),
  customerName: z.string().min(2, { message: 'Name is required' }),
  customerEmail: z.string().email({ message: 'Invalid email address' }),
  customerPhone: z.string().min(7, { message: 'Valid phone number is required' }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingForm: React.FC<BookingFormProps> = ({ 
  restaurantId, 
  date, 
  time, 
  onSubmit,
  isSubmitting
}) => {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      partySize: 2,
      customerName: '',
      customerEmail: '',
      customerPhone: '',
    },
  });

  const handleSubmit = (values: BookingFormValues) => {
    const bookingData: BookingRequest = {
      restaurantId,
      date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      time,
      partySize: values.partySize,
      customerName: values.customerName,
      customerEmail: values.customerEmail,
      customerPhone: values.customerPhone,
    };
    
    onSubmit(bookingData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Complete Your Booking</h3>
      <div className="mb-4 p-3 bg-dineflex-offwhite rounded-md">
        <p className="font-medium">Reservation Details:</p>
        <p className="text-sm">Date: {date.toLocaleDateString()}</p>
        <p className="text-sm">Time: {time}</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="partySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Guests</FormLabel>
                <FormControl>
                  <Input type="number" min="1" max="12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="customerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="customerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+353 87 123 4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-dineflex-burgundy hover:bg-dineflex-burgundy/90 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Complete Booking"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
