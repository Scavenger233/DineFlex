
// Restaurant types
export interface Restaurant {
  id: string;
  name: string;
  thumbnailUrl: string;
  location: string;
  cuisine: string;
  hasEarlyBird: boolean;
  hasLastMinute: boolean;
}

export interface RestaurantDetail extends Restaurant {
  description: string;
  images: string[];
  address: string;
  phone: string;
  openingHours: string;
  earlyBirdOffers: Offer[];
  lastMinuteAvailable: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  availableTimes: string;
}

// Availability types
export type AvailableSlot = {
  time: string;
  type: "earlyBird" | "regular" | "lastMinute";
  offerId?: string;
  discount?: string;
};

export interface RestaurantAvailability {
  restaurantId: string;
  date: string;
  availableSlots: AvailableSlot[];
}

// Booking types
export interface BookingRequest {
  restaurantId: string;
  date: string;
  time: string;
  partySize: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface BookingResponse {
  id: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  restaurantId: string;
  restaurantName: string;
  date: string;
  time: string;
  partySize: number;
  customerName: string;
  confirmationCode: string;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: {
    fields?: {
      field: string;
      code: string;
      message: string;
    }[];
  };
}
