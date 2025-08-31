'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Globe2, Plane, Landmark, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ChatBox from './_components/ChatBox';
import axios from 'axios';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
  ui?: string;
};

const suggestions = [
    { title: 'Create new trip', icon: <Globe2 className='h-8 w-8 text-blue-400' /> },
    { title: 'Inspire me where to go', icon: <Plane className='h-8 w-8 text-green-500' /> },
    { title: 'Discover hidden gems', icon: <Landmark className='h-8 w-8 text-orange-500' /> },
    { title: 'Adventure destination', icon: <Globe2 className='h-8 w-8 text-yellow-600' /> }
];

function CreateNewTrip() {
  const [showChatBox, setShowChatBox] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    setLoading(true);
    const newUserMessage: Message = { role: 'user', content: messageContent };
    
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);

    try {
      const result = await axios.post('/api/aimodel', { messages: updatedMessages });
      const aiMessage: Message = {
        role: 'assistant',
        content: result.data.resp,
        ui: result.data.ui
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = { role: 'assistant', content: 'Sorry, something went wrong.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  const startNewChat = () => {
    if (messages.length === 0) {
        const initialMessage: Message = {
        role: 'assistant',
        content: 'Hi! To help plan your trip, could you please tell me your starting location?',
      };
      setMessages([initialMessage]);
    }
    setShowChatBox(true);
  };
  
  const startChatFromInput = () => {
      if(!userInput.trim()) return;
      setShowChatBox(true);
      sendMessage(userInput);
      setUserInput('');
  }

  const landingPageContent = (
    <div>
      <h2 className='font-bold text-3xl'>
        Start Planning new <span className='text-orange-500'>Trip</span> using AI
      </h2>
      <p className='text-gray-500 mt-2'>
        Discover personalized travel itineraries and dream destinations with the power of AI. Our smart assistant
        <br />
        handles the hard work, so you can focus on the journey.
      </p>
      <div className='mt-8 space-y-4'>
        {suggestions.map((item, index) => (
          <div
            key={index}
            onClick={() => { if (item.title === 'Create new trip') startNewChat(); }}
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
            placeholder='i want to travel from delhi to paris'
            className='h-20 w-full resize-none border-none bg-gray-50 shadow-none focus-visible:ring-0 rounded-lg p-4'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button
            size={'icon'}
            className='absolute bottom-4 right-4'
            onClick={startChatFromInput}
            disabled={loading || !userInput.trim()}
          >
            <Send className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className='p-10 grid grid-cols-1 md:grid-cols-3 gap-10'>
      <div className='lg:col-span-2'>
        {showChatBox 
          ? <ChatBox 
              messages={messages}
              loading={loading}
              sendMessage={sendMessage}
              router={router}
            /> 
          : landingPageContent}
      </div>
      <div>Map and trip Plan to Display</div>
    </div>
  );
}

export default CreateNewTrip;