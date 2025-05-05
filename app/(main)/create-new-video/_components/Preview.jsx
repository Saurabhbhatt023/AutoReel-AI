"use client"
import Image from 'next/image'
import React from 'react'
import { options } from './VideoStyle' // Make sure this path is correct

const Preview = ({formData}) => {
    // Find the matching style for the selected video style
    const selectedVideoStyle = formData?.videoStyle && options?.find(item => 
        item.value === formData.videoStyle
    )
    
    return (
        <div className="mt-5 border rounded-xl p-5">
            <h2 className="text-xl mb-3">Preview</h2>
            
            {selectedVideoStyle?.image ? (
                <div className='relative'>
                    <h2 className='mb-3 text-2xl'>Preview</h2>
                    <div className="relative">
                        <Image 
                            src={selectedVideoStyle.image} 
                            alt={selectedVideoStyle.name || 'Video style preview'} 
                            width={800}
                            height={450}
                            className="w-full h-auto rounded-lg"
                            priority
                        />
                        
                        {/* Display caption if available */}
                        {formData?.caption && (
                            <div className="absolute bottom-4 text-center w-full">
                                <h2 className={formData.caption.style}>
                                    {formData.caption.name}
                                </h2>
                            </div>
                        )}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{selectedVideoStyle.name} style</p>
                </div>
            ) : (
                <div className="text-gray-500">No preview available</div>
            )}
        </div>
    )
}

export default Preview