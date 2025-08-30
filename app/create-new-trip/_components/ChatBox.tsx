'use client'
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import axios from 'axios';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // This hook provides the initial welcome message from the AI.
  useEffect(() => {
    const initialMessage: Message = {
      role: 'assistant',
      content: 'Hi! To help plan your trip, could you please tell me your starting location?',
    };
    setMessages([initialMessage]);
  }, []); // The empty array [] ensures this runs only once on page load.

  const onSend = async () => {
    if (!userInput.trim()) return;

    // 1. Create the user's message and update the UI immediately.
    const newUserMessage: Message = {
      role: 'user',
      content: userInput,
    };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setUserInput('');
    setLoading(true); // Show the "Typing..." indicator

    try {
      // 2. Send the conversation history to your backend API.
      const result = await axios.post('/api/aimodel', {
        messages: updatedMessages,
      });

      // 3. The backend sends back a JSON object like { resp: "...", ui: "..." }.
      // We get the text content from the 'resp' key.
      const aiMessage: Message = {
        role: 'assistant',
        content: result.data.resp,
      };

      // 4. Add the AI's message to the chat.
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      // 5. Hide the "Typing..." indicator.
      setLoading(false);
    }
  };

  return (
    <div className='h-[85vh] flex flex-col'>
      {/* This section displays all the messages */}
      <section className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-lg px-4 py-2 rounded-lg break-words ${
                msg.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {/* Show a "Typing..." indicator while waiting for the AI */}
        {loading && (
          <div className='flex justify-start'>
            <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg animate-pulse'>
              Typing...
            </div>
          </div>
        )}
      </section>

      {/* This section contains the text input and send button */}
      <section className='p-4'>
        <div className='relative rounded-2xl border p-4 shadow'>
          <Textarea
            placeholder='Ask me to plan a trip...'
            className='h-20 w-full resize-none border-none bg-transparent shadow-none focus-visible:ring-0'
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                onSend();
              }
            }}
          />
          <Button
            size={'icon'}
            className='absolute bottom-6 right-6'
            onClick={onSend}
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