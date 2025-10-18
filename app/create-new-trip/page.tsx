'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Globe2, Plane, Landmark, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ChatBox from './_components/ChatBox';
import axios from 'axios';
import TripPlanDisplay from './_components/TripPlanDisplay';

// ### FIX #1: Sabhi zaroori types yahan define kiye gaye hain ###
export type Hotel = {
  hotel_name: string; hotel_address: string; price_per_night: string;
  hotel_image_url: string; rating: number; description: string;
};
export type Activity = {
  place_name: string; place_details: string; place_image_url: string;
  place_address: string; ticket_pricing: string; best_time_to_visit: string;
};
export type ItineraryItem = {
  day: number; day_plan: string; activities: Activity[];
};
export type TripPlan = {
  destination: string; duration: string; origin: string;
  budget: string; group_size: string; hotels: Hotel[]; itinerary: ItineraryItem[];
};
export type Message = {
  role: 'user' | 'assistant';
  content: string;
  ui?: string;
};

// ### FIX #2: Suggestion object ke liye type define kiya ###
type Suggestion = {
  title: string;
  icon: React.ReactNode;
  action: string;
};

// Aur uss type ko yahan use kiya
const suggestions: Suggestion[] = [
    { title: 'Create new trip', icon: <Globe2 className='h-8 w-8 text-blue-400' />, action: 'new_trip' },
    { title: 'Inspire me where to go', icon: <Plane className='h-8 w-8 text-green-500' />, action: 'inspire' },
    { title: 'Discover hidden gems', icon: <Landmark className='h-8 w-8 text-orange-500' />, action: 'discover' },
    { title: 'Adventure destination', icon: <Globe2 className='h-8 w-8 text-yellow-600' />, action: 'adventure' }
];

const LandingPage = ({ onSuggestionClick, onUserInputSubmit, setUserInput, userInput, loading }: any) => (
  <div>
    <h2 className='font-bold text-3xl'>
      Start Planning new <span className='text-orange-500'>Trip</span> using AI
    </h2>
    <p className='text-gray-500 mt-2'>
      Discover personalized travel itineraries and dream destinations with the power of AI. 
      <br />
      handles the hard work, so you can focus on the journey.
    </p>
    <div className='mt-8 space-y-4'>
      {suggestions.map((item, index) => (
        <div
          key={index}
          onClick={() => onSuggestionClick(item.action, item.title)}
          className='p-4 border rounded-lg hover:shadow-md cursor-pointer flex items-center gap-5'
        >
          {item.icon}
          <span className='text-lg'>{item.title}</span>
        </div>
      ))}
    </div>
    <div className='mt-12'>
      <div className='relative'>
        <Textarea
          placeholder='Plan your Trip'
          className='h-20 w-full resize-none border-none bg-gray-50 shadow-none focus-visible:ring-0 rounded-lg p-4'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button
          size={'icon'}
          className='absolute bottom-4 right-4'
          onClick={onUserInputSubmit}
          disabled={loading || !userInput.trim()}
        >
          <Send className='h-4 w-4' />
        </Button>
      </div>
    </div>
  </div>
);

function CreateNewTrip() {
  const [showChatBox, setShowChatBox] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);

  const sendMessage = async (initialMessages: Message[]) => {
    if (initialMessages.length === 0) return;

    setShowChatBox(true);
    setLoading(true);
    setMessages(initialMessages);

    try {
      const result = await axios.post('/api/aimodel', { messages: initialMessages });
      
      if (result.data.trip_plan) {
        setTripPlan(result.data.trip_plan);
        const confirmationMessage: Message = { role: 'assistant', content: "Here is your personalized trip plan!" };
        setMessages(prev => [...prev, confirmationMessage]);
      } else {
        const aiMessage: Message = {
          role: 'assistant',
          content: result.data.resp,
          ui: result.data.ui
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = { role: 'assistant', content: 'Sorry, something went wrong.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSuggestionClick = (action: string, title: string) => {
    if (action === 'new_trip') {
      const initialMessage: Message = {
        role: 'assistant',
        content: 'Hi! To help plan your trip, could you please tell me your starting location?',
      };
      setMessages([initialMessage]);
      setShowChatBox(true);
    } else {
      const userMessage: Message = { role: 'user', content: title };
      sendMessage([userMessage]);
    }
  };
  
  const startChatFromInput = () => {
    if (!userInput.trim()) return;
    const initialAssistantMessage: Message = {
        role: 'assistant',
        content: 'Hi! To help plan your trip, could you please tell me your starting location?',
    };
    const userMessage: Message = { role: 'user', content: userInput };
    sendMessage([initialAssistantMessage, userMessage]);
    setUserInput('');
  };

  return (
    <div className='p-10 grid grid-cols-1 md:grid-cols-2 gap-10'>
      <div className='col-span-1'>
        {showChatBox 
          ? <ChatBox 
              messages={messages}
              loading={loading}
              sendMessage={async (messageContent) => {
                if (!messageContent.trim()) return;
                const newUserMessage: Message = { role: 'user', content: messageContent };
                const updatedMessages = [...messages, newUserMessage];
                setMessages(updatedMessages);
                setLoading(true);
                try {
                    const result = await axios.post('/api/aimodel', { messages: updatedMessages });
                    if (result.data.trip_plan) {
                        setTripPlan(result.data.trip_plan);
                        const confMessage: Message = { role: 'assistant', content: "Your personalized trip plan is ready on the right!" };
                        setMessages(prev => [...prev, confMessage]);
                    } else {
                        const aiMessage: Message = { role: 'assistant', content: result.data.resp, ui: result.data.ui };
                        setMessages((prev) => [...prev, aiMessage]);
                    }
                } catch (error) {
                    console.error("Error:", error);
                    setMessages((prev) => [...prev, {role: 'assistant', content: 'Sorry, an error occurred.'}]);
                } finally {
                    setLoading(false);
                }
              }}
              router={router}
            /> 
          : <LandingPage 
              onSuggestionClick={handleSuggestionClick}
              onUserInputSubmit={startChatFromInput}
              setUserInput={setUserInput}
              userInput={userInput}
              loading={loading}
            />
        }
      </div>
      <div className='col-span-1'>
        {tripPlan ? (
          <TripPlanDisplay plan={tripPlan} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Map and trip Plan to Display
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateNewTrip;