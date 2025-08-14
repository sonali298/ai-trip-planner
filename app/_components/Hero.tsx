"use client"
import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/nextjs';
import { ArrowDown, Globe2, Landmark, Plane, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';


const suggestions = [
  {
    title: 'Create new trip ',
    icon: <Globe2 className='h-5 w-5 text-blue-400' />
  },
  {
    title: 'Inspire me where to go ',
    icon: <Plane className='h-5 w-5 text-green-500' />
  },
  {
    title: 'Discovery hidden gems ',
    icon: <Landmark className='h-5 w-5 text-orange-500' />
  },
  {
    title: 'Adventure destination ',
    icon: <Globe2 className='h-5 w-5 text-yellow-600' />
  }
]
function Hero() {

  const {user} =useUser();
  const router =useRouter();

  const onSend =() => {
    if(!user){
      router.push('/sign-in')
      return;
    }
    //Navigate to Trip planner web screen
  }
  return (
    <div className='mt-24 flex w-full justify-center'>
      {/* The content, input box, and button are now all inside this single div */}
      <div className='w-full max-w-3xl space-y-6 text-center'>

        {/* Text Content */}
        <h1 className='whitespace-nowrap text-xl font-bold md:text-5xl'>
          Hey I'am Your Personal{' '}
          <span className='text-primary'>Trip Planner</span>
        </h1>
        <p className='text-lg'>
          Tell me what you want, and I will handle the rest: Flights, Hotels,
          Trip Planning - all in one second
        </p>

        {/* Input Box & Button */}
        <div className='relative rounded-2xl border p-4 shadow'>
          <Textarea placeholder='Create a trip for Paris from New York'
            className='h-28 w-full resize-none border-none bg-transparent shadow-none focus-visible:ring-0' />
          <Button size={'icon'} className='absolute bottom-6 right-6 '  onClick={() => onSend()}>
            <Send className=' h-4 w-4' />
          </Button>
        </div>
        {/* suggestions list */}
        <div className='flex gap-5'>
          {suggestions.map((suggestion, index) => (
            <div key={index} className='flex cursor-pointer items-center gap-2 rounded-full border p-2
               hover:bg-primary hover:text-white'>
              {suggestion.icon}
              <h2 className='text-sm'>{suggestion.title}</h2>
            </div>
          ))}
        </div>
        {/* 👇 Added justify-center and items-center to this h2 tag */}
        <h2 className='my-7 mt-14 flex items-center justify-center gap-2 text-center'> Not sure where to start ? <strong> See how it works</strong> <ArrowDown /></h2>
        {/* video section  */}
        <div className='flex flex-column items-center justify-center'>
          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="from-center"
            videoSrc="https://www.example.com/dummy-video"
            thumbnailSrc="https://images.pexels.com/photos/371633/pexels-photo-371633.jpeg"
            thumbnailAlt="Dummy Video Thumbnail"
          />
        </div>

      </div>
    </div>
  );
}

export default Hero;