'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { PlaneTakeoff } from 'lucide-react';

interface FinalTripUiProps {
  router: AppRouterInstance;
}

function FinalTripUi({ router }: FinalTripUiProps) {
  const onViewTripClick = () => {
    router.push('/view-trip');
  };

  return (
    <div className='mt-5 p-6 border rounded-xl bg-white shadow-lg text-center'>
      <PlaneTakeoff className='h-10 w-10 text-orange-500 mx-auto mb-3' />
      <h3 className='text-xl font-semibold text-gray-800'>Planning your dream trip...</h3>
      <p className='text-gray-600 mt-2 text-sm'>
        Gathering best destinations, activities, and travel details for you.
      </p>
      <Button 
        className='w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white text-lg py-3 rounded-lg 
                   shadow-md hover:shadow-lg transition-all duration-300'
        onClick={onViewTripClick}
      >
        View Trip
      </Button>
    </div>
  );
}

export default FinalTripUi;