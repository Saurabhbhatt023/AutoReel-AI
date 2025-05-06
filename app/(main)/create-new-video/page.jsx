"use client"
import React, { useState } from 'react'
import Topic from './_components/Topic'
import VideoStyle from './_components/VideoStyle'
import Voice from './_components/Voice'
import Captions from './_components/Captions'
import { Button } from '@/components/ui/button'
import { WandSparkles } from 'lucide-react'
import Preview from './_components/Preview'
import axios from 'axios'

const CreateNewVideo = () => {
    const [formData, setFormData] = useState({})
   
    const onHandleInputChange = (fieldName, fieldValue) => {
        const updatedData = {
            ...formData,
            [fieldName]: fieldValue
        }
        setFormData(updatedData)
        console.log(updatedData)
    }

    const GenerateVideo = async () => {
        if (!formData?.topic || !formData?.videoStyle || !formData?.voice || !formData?.caption || !formData?.script) {
            alert("Please fill all the fields");
            return;
        }
        const result = await axios.post('/api/generate-video-data', {
            ...formData
        });
        console.log(result);
    };
    

    return (
        <div className="p-4">
            <h2 className='text-3xl'>Create New Video</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 mt-8 gap-7 w-full'>
                <div className='col-span-2 p-7 border rounded-xl h-[80vh] overflow-auto w-full'>
                    <Topic onHandleInputChange={onHandleInputChange} />
                    <VideoStyle onHandleInputChange={onHandleInputChange} />
                    <Voice onHandleInputChange={onHandleInputChange} />
                    <Captions onHandleInputChange={onHandleInputChange} />
                    <Button className='w-full mt-5 mb-5' onClick= {GenerateVideo}>
                        <WandSparkles className="mr-2" /> Generate Video
                    </Button>
                </div>
                <div>
                    <Preview formData={formData} />
                </div>
            </div>
        </div>
    )
}

export default CreateNewVideo