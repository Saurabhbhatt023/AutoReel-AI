import { Image as ImageIcon } from 'lucide-react'
import React from 'react'

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
  return (
    <div>
      <h1>VideoStyle</h1>
      <p className='text-sm text-gray-400 mb-1'>Select video style</p>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2'>
        {options?.map((option, index) => (
          <div 
            key={index}
            onClick={() => onHandleInputChange('style', option.name)}
            className="cursor-pointer"
          >
            {option.image ? (
              <img 
                src={option.image} 
                alt={option.name}
                className='object-cover h-[70px] lg:h-[90px] xl:h-[180px] w-full rounded'
              />
            ) : (
              <div className='flex items-center justify-center h-[70px] lg:h-[90px] xl:h-[180px] bg-gray-100 rounded'>
                <ImageIcon className='text-gray-400' />
              </div>
            )}
            <p className='text-center mt-1 text-sm'>{option.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoStyle