import axios from 'axios';
import { Restaurant, RestaurantDetail, AvailableSlot, BookingRequest, BookingResponse, RestaurantAvailability } from '../types/api';

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Sizzling Grill',
    cuisine: 'Steakhouse',
    location: 'Dublin',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
    hasEarlyBird: true,
    hasLastMinute: false,
  },
  {
    id: '2',
    name: 'Bella Italia',
    cuisine: 'Italian',
    location: 'Cork',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
    hasEarlyBird: false,
    hasLastMinute: true,
  },
  {
    id: '3',
    name: 'Sushi Zen',
    cuisine: 'Japanese',
    location: 'Galway',
    thumbnailUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop',
    hasEarlyBird: true,
    hasLastMinute: true,
  },
  {
    id: '4',
    name: 'Tapas Bar',
    cuisine: 'Spanish',
    location: 'Limerick',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?w=800&auto=format&fit=crop',
    hasEarlyBird: false,
    hasLastMinute: false,
  },
  {
    id: '5',
    name: 'The Curry House',
    cuisine: 'Indian',
    location: 'Waterford',
    thumbnailUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop',
    hasEarlyBird: true,
    hasLastMinute: false,
  },
  {
    id: '6',
    name: 'Fish & Chips Co.',
    cuisine: 'Seafood',
    location: 'Sligo',
    thumbnailUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&auto=format&fit=crop',
    hasEarlyBird: false,
    hasLastMinute: true,
  },
  {
    id: '7',
    name: 'Burger Palace',
    cuisine: 'American',
    location: 'Killarney',
    thumbnailUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop',
    hasEarlyBird: true,
    hasLastMinute: true,
  },
  {
    id: '8',
    name: 'Pizza Express',
    cuisine: 'Pizza',
    location: 'Dundalk',
    thumbnailUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop',
    hasEarlyBird: false,
    hasLastMinute: false,
  },
  {
    id: '9',
    name: 'Thai Orchid',
    cuisine: 'Thai',
    location: 'Athlone',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
    hasEarlyBird: true,
    hasLastMinute: false,
  },
  {
    id: '10',
    name: 'Mexican Fiesta',
    cuisine: 'Mexican',
    location: 'Wexford',
    thumbnailUrl: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=800&auto=format&fit=crop',
    hasEarlyBird: false,
    hasLastMinute: true,
  },
];

const mockRestaurantDetails: Record<string, RestaurantDetail> = {
  '1': {
    ...mockRestaurants[0],
    description: "Dublin's premier steakhouse offering the finest cuts of locally sourced beef.",
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579366948929-3b23abc88a84?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop'
    ],
    address: '42 Grafton Street, Dublin 2',
    phone: '+353 1 234 5678',
    openingHours: 'Mon-Fri: 17:00-23:00, Sat-Sun: 12:00-23:00',
    earlyBirdOffers: [
      {
        id: 'eb-1',
        title: 'Early Evening Special',
        description: '3 courses for €30',
        availableTimes: '17:00-19:00, Sun-Thu'
      }
    ],
    lastMinuteAvailable: false
  },
  '2': {
    ...mockRestaurants[1],
    description: "Authentic Italian cuisine in the heart of Cork, featuring homemade pasta and wood-fired pizza.",
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591459034470-d1e05d7b8b3f?w=800&auto=format&fit=crop'
    ],
    address: '15 Oliver Plunkett Street, Cork',
    phone: '+353 21 345 6789',
    openingHours: 'Daily: 12:00-22:30',
    earlyBirdOffers: [],
    lastMinuteAvailable: true
  },
  '3': {
    ...mockRestaurants[2],
    description: "Contemporary Japanese cuisine featuring the freshest seafood and skillful sushi preparation.",
    images: [
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=800&auto=format&fit=crop'
    ],
    address: '8 Quay Street, Galway',
    phone: '+353 91 456 7890',
    openingHours: 'Tue-Sun: 17:00-22:00',
    earlyBirdOffers: [
      {
        id: 'eb-3',
        title: 'Bento Box Special',
        description: 'Complete bento box with miso soup for €25',
        availableTimes: '17:00-18:30, Tue-Thu'
      }
    ],
    lastMinuteAvailable: true
  }
};

// Add more restaurant details as needed for other IDs

const USE_REAL_BACKEND = true;

const getRestaurants = async (): Promise<Restaurant[]> => {
  if (USE_REAL_BACKEND) {
    const response = await axios.get<Restaurant[]>('http://localhost:8080/api/restaurants');
    console.log('API return data：', response.data); 
    return response.data;
  }
  return mockRestaurants;
};

const getRestaurantById = async (id: string): Promise<RestaurantDetail> => {

  const response = await axios.get<RestaurantDetail>(`http://localhost:8080/api/restaurants/${id}`);
  console.log("The restaurant details returned by the back end are:", response.data);
  return response.data;
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Check if we have detailed info for this restaurant
  const details = mockRestaurantDetails[id];
  
  // If we have detailed info, return it
  if (details) {
    return details;
  }
  
  // Otherwise, find the basic restaurant info
  const restaurant = mockRestaurants.find(r => r.id === id);
  
  // If found, create a basic detail object
  if (restaurant) {
    return {
      ...restaurant,
      description: `Enjoy a wonderful meal at ${restaurant.name}.`,
      images: [restaurant.thumbnailUrl, restaurant.thumbnailUrl],
      address: `${restaurant.location}, Ireland`,
      phone: '+353 1 000 0000',
      openingHours: 'Mon-Sun: 12:00-22:00',
      earlyBirdOffers: restaurant.hasEarlyBird ? [{
        id: `eb-${restaurant.id}`,
        title: 'Early Bird Special',
        description: 'Special menu at a reduced price',
        availableTimes: '17:00-19:00, Sun-Thu'
      }] : [],
      lastMinuteAvailable: restaurant.hasLastMinute
    };
  }
  
  // If restaurant not found, throw error
  throw new Error('Restaurant not found');
};

// Update the getAvailability method to match proper name
const getRestaurantAvailability = async (
  restaurantId: string,
  date: string
): Promise<RestaurantAvailability> => {
  if (USE_REAL_BACKEND) {
    const response = await axios.get<RestaurantAvailability>(
      `http://localhost:8080/api/restaurants/${restaurantId}/availability`,
      {
        params: { date } // ?date=2025-05-30
      }
    );
    console.log('✅ Real backend availability:', response.data);
    return response.data;
  }

  // fallback mock data
  return {
    restaurantId,
    date,
    availableSlots: [
      {
        time: "17:30",
        type: "EARLY_BIRD",
        offerId: "offer123"
      },
      {
        time: "18:00",
        type: "EARLY_BIRD",
        offerId: "offer456"
      },
      {
        time: "19:30",
        type: "REGULAR"
      },
      {
        time: "20:30",
        type: "LAST_MINUTE",
        discount: "20%"
      }
    ]
  };
};

// Rename to createBooking to match usage
const createBooking = async (booking: BookingRequest): Promise<BookingResponse> => {
  const response = await axios.post<BookingResponse>(
    "http://localhost:8080/api/bookings",
    booking
  );
  return response.data;
};

const getBookingById = async (id: string): Promise<BookingResponse> => {
  const response = await axios.get<BookingResponse>(`http://localhost:8080/api/bookings/${id}`);
  console.log('✅ Booking fetched from backend:', response.data);
  return response.data;
};

// Login API
export const loginCustomer = async (payload: {
  customerEmail: string;
  password: string;
}) => {
  const response = await axios.post("http://localhost:8080/api/auth/login", payload);

  // Storing login information
  localStorage.setItem("dineflexUser", JSON.stringify(response.data));

  return response.data; // Typically includes customer info and token
};

// Register API
export const registerCustomer = async (payload: {
  customerName: string;
  customerEmail: string;
  phone: string;
  password: string;
}) => {
  const response = await axios.post("http://localhost:8080/api/customers/register", payload);
  return response.data;
};

export const apiService = {
  getRestaurants,
  getRestaurantById,
  getRestaurantAvailability,
  createBooking,
  getBookingById
};
