import axios from 'axios';
import {
  Restaurant,
  RestaurantDetail,
  AvailableSlot,
  BookingRequest,
  BookingResponse,
  RestaurantAvailability
} from '../types/api';

// Adaptation to deployment/development environments using variables in Vercel or local .envs
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Adding a JWT auto-attach interceptor
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('dineflexUser');
  if (user) {
    try {
      const { token } = JSON.parse(user);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.warn('Invalid dineflexUser format');
    }
  }
  return config;
});

// Response interceptor to handle expired/invalid token (403/401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 403 || status === 401) {
      localStorage.removeItem('dineflexUser');
      localStorage.removeItem('customer');
      alert('Your session has expired. Please sign in again.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock fallback
const USE_REAL_BACKEND = true;

// Get a list of all restaurants
const getRestaurants = async (): Promise<Restaurant[]> => {
  if (USE_REAL_BACKEND) {
    const response = await api.get<Restaurant[]>('/restaurants');
    return response.data;
  }
};

// Get Restaurant detail
const getRestaurantById = async (id: string): Promise<RestaurantDetail> => {
  const response = await api.get<RestaurantDetail>(`/restaurants/${id}`);
  return response.data;
};

// Get available slots
const getRestaurantAvailability = async (
  restaurantId: string,
  date: string
): Promise<RestaurantAvailability> => {
  const response = await api.get<RestaurantAvailability>(
    `/restaurants/${restaurantId}/availability`,
    { params: { date } }
  );
  return response.data;
};

// Make booking
const createBooking = async (booking: BookingRequest): Promise<BookingResponse> => {
  const response = await api.post<BookingResponse>('/bookings', booking);
  return response.data;
};

const getBookingById = async (id: string): Promise<BookingResponse> => {
  const response = await api.get<BookingResponse>(`/bookings/${id}`);
  return response.data;
};

export const loginCustomer = async (payload: {
  customerEmail: string;
  password: string;
}) => {
  const response = await api.post('/auth/login', payload);
  localStorage.setItem('dineflexUser', JSON.stringify(response.data));
  return response.data;
};

export const registerCustomer = async (payload: {
  customerName: string;
  customerEmail: string;
  phone: string;
  password: string;
}) => {
  const response = await api.post('/customers/register', payload);
  return response.data;
};

export const apiService = {
  getRestaurants,
  getRestaurantById,
  getRestaurantAvailability,
  createBooking,
  getBookingById
};
