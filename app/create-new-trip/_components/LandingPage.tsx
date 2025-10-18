'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Globe2, Plane, Landmark, Send } from 'lucide-react';

const suggestions = [
    { title: 'Create a new trip from scratch', action: () => {} },
    { title: 'Inspire me where to go', action: () => {} },
    // ... add other suggestions if needed
];

type LandingPageProps = {
  startChat: (initialUserInput: string) => void;
};

function LandingPage({ startChat }: LandingPageProps) {
  const [userInput, setUserInput] = useState('');

  return (
    <div>
      <h2 className='font-bold text-3xl'>
        Start Planning new <span className='text-orange-500'>Trip</span> using AI
      </h2>
      <p className='text-gray-500 mt-2'>
        Discover personalized travel itineraries and dream destinations with the power of AI.
      </p>
      <div className='mt-8 space-y-4'>
          <div
            onClick={() => startChat('')}
            className='p-4 border rounded-lg hover:shadow-md cursor-pointer flex items-center gap-5'
          >
            <Globe2 className='h-8 w-8 text-blue-400' />
            <span className='text-lg'>Create a new trip from scratch</span>
          </div>
      </div>
      <div className='mt-12'>
        <div className='relative'>
          <p className="font-bold mb-2">Or, start with your own idea:</p>
          <Textarea
            placeholder='I want to travel from Delhi to Paris for 3 days with a budget of 50k'
            className='h-20 w-full resize-none border-none bg-gray-50 shadow-none focus-visible:ring-0 rounded-lg p-4'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button
            size={'icon'}
            className='absolute bottom-4 right-4'
            onClick={() => startChat(userInput)}
            disabled={!userInput.trim()}
          >
            <Send className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;