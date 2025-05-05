"use client"
import React, { useState } from 'react'

// Export options for use in the Preview component
export const options = [
  {
    name: 'YOUTUBER',
    style:
      'text-yellow-400 text-3xl font-extrabold uppercase tracking-wide drop-shadow-md px-3 py-1',
  },
  {
    name: 'Supreme',
    style:
      'text-white text-3xl font-bold italic drop-shadow-lg px-3 py-1 rounded-lg',
  },
  {
    name: 'NEON',
    style:
      'text-green-500 text-3xl font-extrabold uppercase tracking-wide drop-shadow-lg px-3 py-1 rounded-lg',
  },
  {
    name: 'GLITCH',
    style:
      'text-pink-500 text-3xl font-extrabold uppercase tracking-wide drop-shadow-[4px_4px_0_rgb(0,0,0)] px-3 py-1 rounded-lg',
  },
  {
    name: 'FIRE',
    style:
      'text-red-600 text-3xl font-extrabold uppercase tracking-wide drop-shadow-[4px_4px_0_rgb(0,0,0)] px-3 py-1 rounded-lg',
  },
  {
    name: 'Futuristic',
    style:
      'text-blue-400 text-3xl font-extrabold tracking-wide drop-shadow-lg px-3 py-1 rounded-lg',
  },
];

const Captions = ({onHandleInputChange}) => {
    const [selectedCaptionStyle, setSelectedCaptionStyle] = useState('')
    
    return (
        <div className='mt-5'>
            <h1>Caption Style</h1>
            <p className='text-sm text-gray-400'>Select Caption Style</p>
            
            <div className='grid grid-cols-3 gap-3 mt-3'> 
                {options.map((option, index) => (
                    <div 
                        key={index} 
                        onClick={() => { 
                            setSelectedCaptionStyle(option.name);
                            onHandleInputChange('caption', option);
                        }}
                        className={`p-3 border bg-slate-900 cursor-pointer rounded-lg hover:border-blue-500 ${selectedCaptionStyle === option.name ? 'border-white' : 'border-gray-700'}`}
                    > 
                        <h2 className={option.style}>{option.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Captions