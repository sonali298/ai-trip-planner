'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface TripDurationUiProps {
  onConfirm: (days: number) => void;
}

function TripDurationUi({ onConfirm }: TripDurationUiProps) {
  const [days, setDays] = useState(3);

  const handleIncrement = () => {
    setDays(days + 1);
  };

  const handleDecrement = () => {
    if (days > 1) {
      setDays(days - 1);
    }
  };

  return (
    <div className='mt-5 p-4 border rounded-lg bg-white shadow'>
      <h2 className='font-bold text-lg'>How many days do you want to travel?</h2>
      <div className='flex items-center justify-center gap-4 mt-4'>
        <Button variant="outline" size="icon" onClick={handleDecrement}>-</Button>
        <span className='text-xl font-semibold'>{days} Days</span>
        <Button variant="outline" size="icon" onClick={handleIncrement}>+</Button>
      </div>
      <Button className='w-full mt-4' onClick={() => onConfirm(days)}>
        Confirm
      </Button>
    </div>
  );
}

export default TripDurationUi;