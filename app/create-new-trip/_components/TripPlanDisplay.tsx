'use client';
import React from 'react';
import Image from 'next/image';

// Types ko yahin define rakha hai, jaisa aapke original code mein tha
export type Hotel = {
  hotel_name?: string | null;
  hotel_address?: string | null;
  price_per_night?: string | null;
  hotel_image_url?: string | null; // AI URL ab ignore hoga
  rating?: number | null;
  description?: string | null;
};
export type Activity = {
  place_name?: string | null;
  place_details?: string | null;
  place_image_url?: string | null; // AI URL ab ignore hoga
  place_address?: string | null;
  ticket_pricing?: string | null;
  best_time_to_visit?: string | null;
};
export type ItineraryItem = {
  day?: number | null;
  day_plan?: string | null;
  activities: Activity[];
};
export type TripPlan = {
  destination?: string | null;
  duration?: string | null;
  origin?: string | null;
  budget?: string | null;
  group_size?: string | null;
  hotels: Hotel[];
  itinerary: ItineraryItem[];
};

type TripPlanDisplayProps = {
  plan: TripPlan;
};

// ### MINIMAL CHANGE HERE: Simplified Helper Function ###
// Yeh function ab AI ke URL ko ignore karega aur hamesha placeholder dega
const getImageUrl = (type: 'hotel' | 'activity', details?: string | null): string => {
  if (type === 'hotel') {
    return '/hotel-placeholder.jpg'; // Hamesha hotel placeholder
  } else {
    // Activity ke liye details check karke guess karo
    const lowerDetails = (details || '').toLowerCase();
    if (lowerDetails.includes('restaurant') || lowerDetails.includes('cafe') || lowerDetails.includes('food') || lowerDetails.includes('cuisine') || lowerDetails.includes('eat') || lowerDetails.includes('dinner') || lowerDetails.includes('lunch') || lowerDetails.includes('breakfast')) {
        return '/food-placeholder.jpg'; // Food placeholder
    }
    // Default activity placeholder (landmark/city)
    return '/landmark-placeholder.jpg';
  }
};


function TripPlanDisplay({ plan }: TripPlanDisplayProps) {
  return (
    <div className="space-y-8 overflow-y-auto h-full p-2">
      {/* Header Section */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-2">Your Trip to {plan.destination || 'your destination'}</h2>
        <p className="text-gray-600">A personalized {plan.duration || 'trip'} itinerary for a {plan.group_size || 'group'} trip with a {plan.budget || 'specified'} budget, starting from {plan.origin || 'your origin'}.</p>
      </section>

      {/* Hotel Section */}
      <section>
        <h3 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">🏨 Hotel Recommendations</h3>
        <div className="space-y-4">
          {plan.hotels?.map((hotel, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm flex flex-col sm:flex-row gap-4">
              <Image
                // ### MINIMAL CHANGE HERE: Ab AI ka URL input hi nahi karte ###
                src={getImageUrl('hotel')} // Sirf type bheja
                alt={hotel.hotel_name || 'Hotel image'}
                width={150}
                height={150}
                className="rounded-md object-cover w-full sm:w-[150px] flex-shrink-0"
                // onError fallback ab bhi hotel placeholder hi rahega
                onError={(e) => e.currentTarget.src = '/hotel-placeholder.jpg'}
              />
              {/* ... Hotel details ... */}
               <div>
                <h4 className="font-bold text-lg">{hotel.hotel_name || 'Hotel Name Unavailable'}</h4>
                <p className="text-sm text-gray-500">{hotel.hotel_address || 'Address unavailable'}</p>
                <p className="mt-1"><strong>Rating:</strong> {hotel.rating ? `${hotel.rating} / 5` : 'N/A'}</p>
                <p><strong>Price:</strong> {hotel.price_per_night || 'N/A'}</p>
                <p className="text-sm mt-2">{hotel.description || 'No description available.'}</p>
              </div>
            </div>
          ))}
          {(!plan.hotels || plan.hotels.length === 0) && <p className="text-gray-500">No hotel recommendations available.</p>}
        </div>
      </section>

      {/* Itinerary Section */}
      <section>
        <h3 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">🗺️ Daily Itinerary</h3>
        <div className="space-y-6">
          {plan.itinerary?.map((day, index) => (
            <div key={index}>
              <h4 className="text-xl font-semibold">Day {day.day || index + 1}: {day.day_plan || 'Day Plan'}</h4>
              <div className="mt-2 space-y-4 border-l-2 border-gray-200 pl-4 ml-2">
                {day.activities?.map((activity, actIndex) => (
                  <div key={actIndex} className="p-4 bg-gray-50 rounded-lg flex flex-col sm:flex-row gap-4">
                     <Image
                       // ### MINIMAL CHANGE HERE: Ab AI ka URL input hi nahi karte ###
                       src={getImageUrl('activity', activity.place_details)} // Sirf type aur details bheje
                       alt={activity.place_name || 'Activity image'}
                       width={120}
                       height={120}
                       className="rounded-md object-cover w-full sm:w-[120px] flex-shrink-0"
                       // onError fallback ab getImageUrl se aayega
                       onError={(e) => e.currentTarget.src = getImageUrl('activity', activity.place_details)}
                     />
                     {/* ... Activity details ... */}
                      <div>
                        <h5 className="font-bold">{activity.place_name || 'Activity Name Unavailable'}</h5>
                        <p className="text-sm mt-1">{activity.place_details || 'No details available.'}</p>
                        <p className="text-xs mt-2"><strong>Address:</strong> {activity.place_address || 'N/A'}</p>
                        <p className="text-xs mt-1"><strong>Best Time:</strong> {activity.best_time_to_visit || 'N/A'}</p>
                        <p className="text-xs"><strong>Tickets:</strong> {activity.ticket_pricing || 'N/A'}</p>
                     </div>
                  </div>
                ))}
                 {(!day.activities || day.activities.length === 0) && <p className="text-gray-500">No activities planned for this day.</p>}
              </div>
            </div>
          ))}
          {(!plan.itinerary || plan.itinerary.length === 0) && <p className="text-gray-500">No itinerary details available.</p>}
        </div>
      </section>
    </div>
  );
}

export default TripPlanDisplay;
// Export types if they are defined in this file
