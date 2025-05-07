"use client"
import React, { useState } from 'react'
import Topic from './_components/Topic'
import VideoStyle from './_components/VideoStyle'
import Voice from './_components/Voice'
import Captions from './_components/Captions'
import { Button } from '@/components/ui/button'
import { WandSparkles, Loader2 as Loader } from 'lucide-react'
import Preview from './_components/Preview'
import axios from 'axios'

const CreateNewVideo = () => {
    const [formData, setFormData] = useState({})
    const [isGenerating, setIsGenerating] = useState(false)
    const [audioUrl, setAudioUrl] = useState(null)
   
    const onHandleInputChange = (fieldName, fieldValue) => {
        const updatedData = {
            ...formData,
            [fieldName]: fieldValue
        }
        setFormData(updatedData)
        console.log(`Updated ${fieldName}:`, typeof fieldValue === 'string' && fieldValue.length > 50 ? 
            fieldValue.substring(0, 50) + "..." : 
            fieldValue)
    }

    const GenerateVideo = async () => {
        // Check required fields
        if (!formData?.topic || !formData?.videoStyle || !formData?.voice || !formData?.caption || !formData?.script) {
            alert("Please fill all the fields");
            return;
        }
        
        setIsGenerating(true);
        
        try {
            console.log("Sending data to generate audio:", {
                voice: formData.voice,
                scriptLength: formData.script.length,
                topic: formData.topic,
                videoStyle: formData.videoStyle
            });
            
            // Make API call to generate audio
            const result = await axios.post('/api/generate-video-data', {
                script: formData.script,
                voice: formData.voice,
                title: formData.topic,
                caption: formData.caption,
                videoStyle: formData.videoStyle
            });
            
            console.log("API response:", result.data);
            
            if (result.data.success) {
                // If audio URL is directly available
                if (result.data.audioUrl) {
                    setAudioUrl(result.data.audioUrl);
                    alert("Audio generated successfully!");
                } else {
                    // Otherwise, show message about background processing
                    alert("Audio generation request sent successfully! Processing in background.");
                }
            }
        } catch (error) {
            console.error("Error generating audio:", error);
            
            // Show specific error message if available
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert("Failed to generate audio. Please try again.");
            }
        } finally {
            setIsGenerating(false);
        }
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
                    
                    <Button 
                        className='w-full mt-5 mb-5' 
                        onClick={GenerateVideo}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <>
                                <Loader className="mr-2 h-5 w-5 animate-spin" />
                                Generating Audio...
                            </>
                        ) : (
                            <>
                                <WandSparkles className="mr-2" /> Generate Video
                            </>
                        )}
                    </Button>
                    
                    {audioUrl && (
                        <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                            <h3 className="text-lg mb-2">Generated Audio</h3>
                            <audio controls className="w-full">
                                <source src={audioUrl} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}
                </div>
                <div>
                    <Preview formData={formData} />
                </div>
            </div>
        </div>
    )
}

export default CreateNewVideo