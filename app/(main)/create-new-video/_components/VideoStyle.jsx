import { Image as ImageIcon } from 'lucide-react'
import React, { useState } from 'react'

const options = [
  {
    name: 'Realistic',
    image: '/realistic.png'
  },
  {
    name: 'Cinematic',
    image: '/cinematic.png'
  },
  {
    name: 'Cartoon',
    image: '/cartoon.png'
  },
  {
    name: 'Watercolor',
    image: '/watercolor.png'
  },
  {
    name: 'Cyberpunk',
    image: '/cyberpunk.png'
  },
  {
    name: 'GTA',
    image: '/gta.png'
  },
]

const VideoStyle = ({ onHandleInputChange }) => {
  const [selectedStyle, setSelectedStyle] = useState('')
  
  const handleStyleSelect = (optionName) => {
    setSelectedStyle(optionName);
    onHandleInputChange('style', optionName);
  }

  return (
    <div>
      <h1>VideoStyle</h1>
      <p className='text-sm text-gray-400 mb-1'>Select video style</p>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2'>
        {options?.map((option, index) => (
          <div 
            key={index}
            onClick={() => handleStyleSelect(option.name)}
            className="cursor-pointer relative group"
          >
            {option.image ? (
              <div className="relative">
                <img 
                  src={option.image} 
                  alt={option.name}
                  className={`object-cover h-[70px] lg:h-[90px] xl:h-[180px] w-full rounded 
                    group-hover:border-2 group-hover:border-white
                    ${option.name === selectedStyle ? 'border-2 border-white' : ''}`}
                />
                <h2 className='absolute bottom-1 left-0 right-0 text-center text-white text-sm bg-black bg-opacity-50 px-1'>
                  {option.name}
                </h2>
              </div>
            ) : (
              <div className={`flex flex-col items-center justify-center h-[70px] lg:h-[90px] xl:h-[180px] bg-gray-100 rounded 
                group-hover:border-2 group-hover:border-gray-300
                ${option.name === selectedStyle ? 'border-2 border-gray-500' : ''}`}>
                <ImageIcon className="text-gray-500" />
                <h2 className='text-center text-sm mt-1'>{option.name}</h2>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoStyle