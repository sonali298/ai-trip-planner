'use client'
import React from 'react';

// The data list for traveler options
export const SelectTravelersList = [
  { id: 1, title: 'Just Me', desc: 'A sole traveler in exploration', icon: '✈️', people: '1' },
  { id: 2, title: 'A Couple', desc: 'Two travelers in tandem', icon: '🥂', people: '2 People' },
  { id: 3, title: 'Family', desc: 'A group of fun loving adventurers', icon: '🏡', people: '3 to 5 People' },
  { id: 4, title: 'Friends', desc: 'A bunch of thrill-seekers', icon: '🏕️', people: '5 to 10 People' },
];

// Define the component's props
interface GroupSizeUiProps {
  onSelect: (selectedValue: string) => void;
}

function GroupSizeUi({ onSelect }: GroupSizeUiProps) {
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-lg'>Who's traveling?</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-3'>
        {SelectTravelersList.map((item, index) => (
          // Add an onClick handler to each item
          <div 
            key={index} 
            onClick={() => onSelect(item.title)}
            className='p-3 border rounded-lg bg-white hover:border-primary cursor-pointer text-center'
          >
            <h2 className='text-3xl'>{item.icon}</h2>
            <h2 className='font-semibold text-sm mt-1'>{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupSizeUi;