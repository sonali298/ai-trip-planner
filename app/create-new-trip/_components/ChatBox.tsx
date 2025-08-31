'use client'
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, LoaderCircle } from 'lucide-react';
import { Message } from '../page';
import GroupSizeUi from './GroupSizeUi';
import BudgetUi from './BudgetUi';
import TripDurationUi from './TripDurationUi';
import FinalTripUi from './FinalTripUi';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface ChatBoxProps {
  messages: Message[];
  loading: boolean;
  sendMessage: (messageContent: string) => void;
  router: AppRouterInstance;
}

function ChatBox({ messages = [], loading, sendMessage, router }: ChatBoxProps) {
  const [userInput, setUserInput] = useState('');

  const handleSend = () => {
    if (!userInput.trim()) return;
    sendMessage(userInput);
    setUserInput('');
  };

  const textInputSection = (
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
  );
  
  const renderInputSection = () => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'assistant' && lastMessage.ui) {
      switch (lastMessage.ui) {
        case 'groupSize':
          return <GroupSizeUi onSelect={(value: string) => sendMessage(value)} />;
        case 'budget':
          return <BudgetUi OnSelect={(value: string) => sendMessage(value)} />;
        case 'tripDuration':
          return <TripDurationUi onConfirm={(days: number) => sendMessage(`${days} Days`)} />;
        case 'final':
          return <FinalTripUi router={router} />;
        default:
          return textInputSection;
      }
    }
    return textInputSection;
  };

  return (
    <div className='h-[85vh] flex flex-col'>
      <section className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-lg px-4 py-2 rounded-lg break-words ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className='flex justify-start'>
            <div className='p-2'><LoaderCircle className='animate-spin' /></div>
          </div>
        )}
      </section>
      <section className='p-4'>
        {renderInputSection()}
      </section>
    </div>
  );
}

export default ChatBox;