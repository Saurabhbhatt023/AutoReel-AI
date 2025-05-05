"use client"
import React, { useState } from 'react'
import Topic from './_components/Topic'
import VideoStyle from './_components/VideoStyle'
import Voice from '../_components/Voice'
import Captions from '../_components/Captions'


const CreateNewVideo = () => {
    const[formData , setFormData] = useState({})
   
    const onHandleInputChange = (fieldName , fieldValue) => {
        const updatedData = {
         ...formData,
         [fieldName]: fieldValue
        }
        setFormData(updatedData)
        console.log(updatedData)
    }

  return (
    <div>
      <h2 className='text-3xl'>Create New Video</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-8'>
        <div className='col-span-2 p-7 border rounded-xl h-[72vh] overflow-auto'>
          <Topic onHandleInputChange={onHandleInputChange} /> {/* 👈 Move it here */}
            
             <VideoStyle onHandleInputChange={onHandleInputChange}/>
      
          <Voice  onHandleInputChange={onHandleInputChange}/>
            <Captions onHandleInputChange={onHandleInputChange}/>
        </div>
        <div>
          {/* Right section (optional content) */}
        </div>
      </div>
    </div>
  )
}

export default CreateNewVideo