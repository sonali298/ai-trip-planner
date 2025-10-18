'use client'
import React from 'react';

export const SelectBudgetOptions = [
  { id: 1, title: 'Cheap', desc: 'Stay conscious of costs', icon: '💵', color: 'bg-green-50 text-green-700' },
  { id: 2, title: 'Moderate', desc: 'Keep cost on the average side', icon: '💰', color: 'bg-yellow-50 text-yellow-700' },
  { id: 3, title: 'Luxury', desc: 'Don\'t worry about cost', icon: '💎', color: 'bg-purple-50 text-purple-700' },
];

interface BudgetUiProps {
  onSelect: (selectedValue: string) => void;
}

function BudgetUi({ onSelect }: BudgetUiProps) {
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-lg'>What's your budget?</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-3'>
        {SelectBudgetOptions.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onSelect(item.title)}
            // Minimal Changes: Added h-36 (fixed height) and ensured text is centered.
            className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer 
                        flex flex-col items-center justify-center gap-2 h-36 
                        ${item.color}`}
          >
            <p className='text-4xl'>{item.icon}</p>
            <h3 className='font-bold text-lg'>{item.title}</h3>
            <p className='text-sm text-gray-500'>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BudgetUi;