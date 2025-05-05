import React from 'react'
import { useState } from 'react'




const options = [
  {
    name: 'Youtuber',
    style:
      'text-yellow-400 text-3xl font-extrabold uppercase tracking-wide drop-shadow-md px-3 py-1',
  },
  {
    name: 'Supreme',
    style:
      'text-white text-3xl font-bold italic drop-shadow-lg px-3 py-1 rounded-lg',
  },
  {
    name: 'Neon',
    style:
      'text-green-500 text-3xl font-extrabold uppercase tracking-wide drop-shadow-lg px-3 py-1 rounded-lg',
  },
  {
    name: 'Glitch',
    style:
      'text-pink-500 text-3xl font-extrabold uppercase tracking-wide drop-shadow-[4px_4px_0_rgb(0,0,0)] px-3 py-1 rounded-lg',
  },
  {
    name: 'Fire',
    style:
      'text-red-600 text-3xl font-extrabold uppercase tracking-wide drop-shadow-[4px_4px_0_rgb(0,0,0)] px-3 py-1 rounded-lg',
  }, 
];


const Captions = ({onHandleInputChange}) => {
    const [selectedCaptionStyle , setSelectedCaptionStyle] = useState('')
  return (
    <div className='mt-5'>
      <h1>Caption Style</h1>
      <p className='text-sm text-gray-400'>Select Caption Style </p>
   
    <div className='flex flex-wrap gap-4'> 
        {options.map((option,index) => (
            <div key ={index} 
              onClick={() =>{ setSelectedCaptionStyle(option.name)
                onHandleInputChange( option)}
              }
            className={`p-2 hover:border border-gray-300 cursor-pointer rounded-lg ${selectedCaptionStyle==option.name && 'border '}`}> 

        <h2 className={option.style}> {option.name}</h2>
 
            </div>
        ))}

    </div>
    </div>
  )
}

export default Captions
