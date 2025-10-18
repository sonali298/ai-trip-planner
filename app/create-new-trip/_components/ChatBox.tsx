'use client'
import React,{useState, useEffect, useRef} from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, LoaderCircle, Plane } from 'lucide-react';
import { Message } from '../page';
import GroupSizeUi from './GroupSizeUi';
import BudgetUi from './BudgetUi';
import TripDurationUi from './TripDurationUi';
// FinalTripUi ki ab zaroorat nahi hai
// import FinalTripUi from './FinalTripUi';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface ChatBoxProps {
  messages: Message[];
  loading: boolean;
  sendMessage: (messageContent: string) => void;
  router: AppRouterInstance;
}

function ChatBox({ messages = [], loading, sendMessage, router }: ChatBoxProps) {
  const [userInput, setUserInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Yeh chat ko hamesha neeche scroll karke rakhega
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    if (loading) return null; // Jab loading ho to input section hide kar do

    if (lastMessage?.role === 'assistant' && lastMessage.ui) {
      switch (lastMessage.ui) {
        case 'groupSize':
          return <GroupSizeUi onSelect={(value: string) => sendMessage(value)} />;
        case 'budget':
          return <BudgetUi onSelect={(value: string) => sendMessage(value)} />;
        case 'tripDuration':
          return <TripDurationUi onConfirm={(days: number) => sendMessage(`${days} Days`)} />;
        
        // ### YAHAN CHANGE KIYA GAYA HAI ###
        // 'final' case mein ab "View Trip" card dikhega
        case 'final':
          return (
            <div className="p-6 text-center bg-white rounded-lg shadow-md border border-gray-200">
              <Plane className="h-10 w-10 text-orange-500 mx-auto mb-2" />
              <h3 className="font-bold text-xl mb-2">Planning your dream trip...</h3>
              <p className="text-gray-500 mb-4">Gathering best destinations, activities, and travel details for you.</p>
              <Button onClick={() => sendMessage("generate the final trip plan")}>
                View Trip
              </Button>
            </div>
          );
        default:
          return textInputSection;
      }
    }
    return textInputSection;
  };

  // ### YAHAN CHANGE KIYA GAYA HAI ###
  // Yeh check karega ki final plan generate ho chuka hai ya nahi
  const isConversationComplete = messages.some(msg => msg.content.includes("Here is your personalized trip plan"));

  return (
    <div className='h-full flex flex-col'>
      <section className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((msg, index) => (
          <div key={index} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-lg px-4 py-2 rounded-2xl break-words ${
              msg.role === 'user' 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className='flex justify-start'>
            <div className='p-2'><LoaderCircle className='animate-spin' /></div>
          </div>
        )}
        <div ref={chatEndRef} />
      </section>
      
      {/* ### YAHAN CHANGE KIYA GAYA HAI ### */}
      {/* Agar conversation complete ho gayi hai to input box hide ho jayega */}
      {!isConversationComplete && (
        <section className='p-4'>
          {renderInputSection()}
        </section>
      )}
    </div>
  );
}

export default ChatBox;