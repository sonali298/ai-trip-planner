'use client'
import React from 'react';

export const SelectTravelersList = [
  { id: 1, title: 'Just Me', desc: 'A sole traveler', icon: '✈️' },
  { id: 2, title: 'A Couple', desc: 'Two travelers', icon: '🥂' },
  { id: 3, title: 'Family', desc: 'A group of adventurers', icon: '🏡' },
  { id: 4, title: 'Friends', desc: 'A bunch of thrill-seekers', icon: '🏕️' },
];

interface GroupSizeUiProps {
  onSelect: (selectedValue: string) => void;
}

function GroupSizeUi({ onSelect }: GroupSizeUiProps) {
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-lg'>Who's traveling?</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mt-3'>
        {SelectTravelersList.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onSelect(item.title)}
            className='p-4 border rounded-lg hover:shadow-lg cursor-pointer flex flex-col items-center gap-2'
          >
            <p className='text-4xl'>{item.icon}</p>
            <h3 className='font-semibold text-sm'>{item.title}</h3>
            <p className='text-xs text-gray-500'>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupSizeUi;