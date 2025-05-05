'use client'
import { ScrollArea } from "@/components/ui/scroll-area";

import React from 'react';
import { useState } from 'react';

function getVoiceOptions() {
    const voiceOptions = [
        {
            "value": "af_sarah",
            "name": "🇺🇸 Sarah (Female)" 
        },
        {
            "value": "af_sky",
            "name": "🇬🇧 Sky (Female)"
        },
        {
            "value": "am_adam",
            "name": "🇺🇸 Adam (Male)",
            "selected": true
        },
        {
            "value": "hf_alpha",
            "name": "🇺🇸 Alpha (Female)"
        },
        {
            "value": "am_fenrir",
            "name": "🇳🇴 Fenrir (Male)"
        },
        {
            "value": "am_liam",
            "name": "🇮🇪 Liam (Male)"
        },
        {
            "value": "am_michael",
            "name": "🇺🇸 Michael (Male)"
        },
        {
            "value": "am_onyx",
            "name": "🇬🇧 Onyx (Male)"
        },
        {
            "value": "hf_beta",
            "name": "🇺🇸 Beta (Female)"
        }
    ];
    
    return voiceOptions;
}

const Voice = ({onHandleInputChange}) => {
    const [selectedVoice, setSelectedVoice] = useState("")
    const voiceOptions = getVoiceOptions();
  
    return (
        <div className='mt-5'>
            <h1>Video Voice</h1>
            <p className='text-sm text-gray-400'>Select voice for your video</p>
            
            <ScrollArea className='h-[250px] w-full mt-3'>
                <div className='grid grid-cols-2 gap-3'>
                    {voiceOptions.map((voice, index) => (
                        <div 
                            key={index}
                            className={`cursor-pointer p-3 bg-slate-900 border rounded-lg hover:border-blue-500 ${selectedVoice === voice.value ? 'border-white' : 'border-gray-700'}`}
                            onClick={() => {
                                setSelectedVoice(voice.value);
                                onHandleInputChange('voice', voice.value);
                            }}
                        >    
                            {voice.name}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

export default Voice;