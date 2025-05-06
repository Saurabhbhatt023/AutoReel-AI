'use client'
import { ScrollArea } from "@/components/ui/scroll-area";

import React from 'react';
import { useState } from 'react';

function getVoiceOptions() {
    const voiceOptions = [
        { value: "af_alloy", name: "🇺🇸 Alloy (Female)" },
        { value: "af_aoede", name: "🇺🇸 Aoede (Female)" },
        { value: "af_bella", name: "🇺🇸 Bella (Female)" },
        { value: "af_jessica", name: "🇺🇸 Jessica (Female)" },
        { value: "af_kore", name: "🇺🇸 Kore (Female)" },
        { value: "af_nicole", name: "🎧 Nicole (Female)" },
        { value: "af_nova", name: "🇺🇸 Nova (Female)" },
        { value: "af_river", name: "🇺🇸 River (Female)" },
        { value: "af_sarah", name: "🇺🇸 Sarah (Female)" },
        { value: "af_sky", name: "🇺🇸 Sky (Female)" },
        { value: "am_adam", name: "🇺🇸 Adam (Male)", selected: true }
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