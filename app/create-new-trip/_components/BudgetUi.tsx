import React from 'react'

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: ' pauper',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '💰',
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Don\'t worry about cost',
    icon: 'Luxury',
    color: 'bg-purple-100 text-purple-600'
  },
];
function BudgetUi({OnSelect}:any) {
  return (
    <div>
        <div className='mt-5'>
              <h2 className='font-bold text-lg'>Who's traveling?</h2>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-3'>
                {SelectBudgetOptions.map((item, index) => (
                  // Add an onClick handler to each item
                  <div 
                    key={index} 
                    onClick={() => OnSelect(item.title)}
                    className='p-3 border rounded-lg bg-white hover:border-primary cursor-pointer text-center'
                  >
                    <h2 className='text-3xl'>{item.icon}</h2>
                    <h2 className='font-semibold text-sm mt-1'>{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>
    </div>
  )
}

export default BudgetUi