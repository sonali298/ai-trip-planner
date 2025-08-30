'use client'
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, LoaderCircle } from 'lucide-react';

// The Message type should be defined in your parent component and imported here.
// For now, we'll define it here for clarity.
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// CHANGED: The component now receives data and functions as props.
interface ChatBoxProps {
  messages: Message[];
  loading: boolean;
  sendMessage: (messageContent: string) => void;
}

function ChatBox({ messages = [], loading, sendMessage }: ChatBoxProps) {
  // REMOVED: State management for messages, loading, and the useEffect hook.
  // This component now only manages the state of the text input field.
  const [userInput, setUserInput] = useState('');

  // CHANGED: This function now calls the sendMessage function from props.
  const handleSend = () => {
    if (!userInput.trim()) return;
    sendMessage(userInput);
    setUserInput(''); // Clear the local input
  };

  return (
    <div className='h-[85vh] flex flex-col'>
      <section className='flex-1 overflow-y-auto p-4 space-y-4'>
        {/* This now renders the messages passed down as a prop */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-lg px-4 py-2 rounded-lg break-words ${
                msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-black'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {/* The loading indicator is also controlled by a prop */}
        {loading && (
          <div className='flex justify-start'>
            <div className='p-2'><LoaderCircle className='animate-spin' /></div>
          </div>
        )}
      </section>

      <section className='p-4'>
        <div className='relative rounded-2xl border p-4 shadow'>
          <Textarea
            placeholder='Continue your trip planning...'
            className='h-20 w-full resize-none border-none bg-transparent shadow-none focus-visible:ring-0'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            size={'icon'}
            className='absolute bottom-6 right-6'
            onClick={handleSend}
            disabled={loading || !userInput.trim()}
          >
            <Send className='h-4 w-4' />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ChatBox;