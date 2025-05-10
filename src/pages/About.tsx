
import React from 'react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-dineflex-offwhite">
      <Header />
      
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">About DineFlex</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            DineFlex connects diners with restaurants offering special deals during off-peak hours, 
            helping both customers save money and restaurants fill tables that would otherwise remain empty.
          </p>
          <p>
            Our platform specializes in two types of dining opportunities:
          </p>
          <ul className="list-disc pl-5 mt-4 mb-6 space-y-2">
            <li>
              <span className="font-semibold text-dineflex-burgundy">Early Bird Specials</span>
              : Discounted menus for those who dine earlier in the evening, typically between 5:00 PM and 7:00 PM.
            </li>
            <li>
              <span className="font-semibold text-dineflex-gold">Last-Minute Deals</span>
              : Special prices for same-day bookings, helping restaurants fill unexpected vacancies.
            </li>
          </ul>
          
          <div className="bg-gray-50 p-4 rounded-md border-l-4 border-dineflex-burgundy mb-6">
            <p className="italic">
              "Our goal is to make fine dining more accessible while helping restaurants maximize their capacity 
              throughout service hours."
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-dineflex-offwhite rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-dineflex-burgundy">1</span>
              </div>
              <h3 className="font-semibold mb-2">Browse Restaurants</h3>
              <p className="text-gray-600 text-sm">
                Explore restaurants in your area offering early bird or last-minute dining deals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-dineflex-offwhite rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-dineflex-burgundy">2</span>
              </div>
              <h3 className="font-semibold mb-2">Check Availability</h3>
              <p className="text-gray-600 text-sm">
                Select a date and see available time slots with special pricing.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-dineflex-offwhite rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-dineflex-burgundy">3</span>
              </div>
              <h3 className="font-semibold mb-2">Book & Enjoy</h3>
              <p className="text-gray-600 text-sm">
                Make your reservation and enjoy your meal at a discounted price.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/">
              <Button className="bg-dineflex-burgundy hover:bg-dineflex-burgundy/90 text-white">
                Find a Restaurant
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4">For Restaurant Owners</h2>
          <p className="mb-6">
            If you own a restaurant and would like to partner with DineFlex to fill your 
            empty tables during off-peak hours, we'd love to hear from you. Our platform can help:
          </p>
          
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>Increase revenue during traditionally slower periods</li>
            <li>Attract new customers who may become regular patrons</li>
            <li>Manage inventory more efficiently by spreading out service times</li>
            <li>Gain visibility through our marketing and platform</li>
          </ul>
          
          <p className="text-center text-gray-600 italic">
            Contact us at partners@dineflex.ie to learn more about becoming a partner restaurant.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
