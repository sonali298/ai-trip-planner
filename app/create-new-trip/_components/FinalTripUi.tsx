'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface FinalTripUiProps {
  router: AppRouterInstance;
}

function FinalTripUi({ router }: FinalTripUiProps) {
  const onViewTripClick = () => {
    router.push('/view-trip');
  };

  return (
    <div className='mt-5 p-4 border rounded-lg bg-white shadow text-center'>
      <p className='text-lg'>✈️ Planning your dream trip...</p>
      <p className='text-gray-500 mt-2'>
        Gathering best destinations, activities, and travel details for you.
      </p>
      <Button className='w-full mt-4' onClick={onViewTripClick}>
        View Trip
      </Button>
    </div>
  );
}

export default FinalTripUi;