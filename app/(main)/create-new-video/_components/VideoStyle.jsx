"use client"
import React, { useState } from 'react'
import Image from 'next/image'

// Export these options so Preview component can import them
export const options = [
    {
        name: 'Realistic',
        value: 'realistic',
        image: '/realistic.png'
    },
    {
        name: 'Cinematic',
        value: 'cinematic',
        image: '/cinematic.png'
    },
    {
        name: 'Cartoon',
        value: 'cartoon',
        image: '/cartoon.png'
    },
    {
        name: 'Watercolor',
        value: 'watercolor',
        image: '/watercolor.png'
    },
    {
        name: 'Cyberpunk',
        value: 'cyberpunk',
        image: '/cyberpunk.png'
    },
    {
        name: 'GTA',
        value: 'gta',
        image: '/gta.png'
    },
    
]

const VideoStyle = ({ onHandleInputChange }) => {
    const [selectedStyle, setSelectedStyle] = useState('');

    return (
        <div className="mb-5">
            <h2 className="text-xl mb-2">Video Styles</h2>
            <p className="text-sm text-gray-500 mb-3">Select video style</p>
            
            <div className="grid grid-cols-3 gap-3 w-full">
                {options.map((item) => (
                    <div 
                        key={item.value}
                        className={`cursor-pointer border rounded-lg p-2 hover:border-blue-500 w-full ${selectedStyle === item.value ? 'border-white' : 'border-gray-700'}`}
                        onClick={() => {
                            setSelectedStyle(item.value);
                            onHandleInputChange('videoStyle', item.value);
                        }}
                    >
                        <Image 
                            src={item.image} 
                            alt={item.name} 
                            width={400} 
                            height={200}
                            className="w-full h-24 object-cover rounded mb-2"
                        />
                        <p className="text-center text-sm">{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VideoStyle