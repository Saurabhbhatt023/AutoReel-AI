'use client'
import { ScrollArea } from "@/components/ui/scroll-area";

import React from 'react';
import { useState } from 'react';

function getVoiceOptions() {
    const voiceOptions = [
        {
            "value": "af_sarah",      // US (default)
            "name": "🇺🇸 Sarah (Female)" 
        },
        {
            "value": "af_sky",        // UK (from 'sky' → British English)
            "name": "🇬🇧 Sky (Female)"
        },
        {
            "value": "am_adam",       // US (default)
            "name": "🇺🇸 Adam (Male)",
            "selected": true
        },
        {
            "value": "hf_alpha",      // US (default)
            "name": "🇺🇸 Alpha (Female)"
        },
        {
            "value": "am_fenrir",     // Norway (Fenrir → Norse mythology)
            "name": "🇳🇴 Fenrir (Male)"
        },
        {
            "value": "am_liam",       // Ireland (Liam → Irish name)
            "name": "🇮🇪 Liam (Male)"
        },
        {
            "value": "am_michael",    // US (default)
            "name": "🇺🇸 Michael (Male)"
        },
        {
            "value": "am_onyx",       // UK (Onyx → British-sounding)
            "name": "🇬🇧 Onyx (Male)"
        },
        {
            "value": "hf_beta",       // US (default)
            "name": "🇺🇸 Beta (Female)"
        }
    ];
    
    return voiceOptions;
}

const Voice = ({onHandleInputChange}) => {
    const[selectedVoice , setSelectedVoice] = useState()
  const voiceOptions = getVoiceOptions();
  
  return (
    <div className='mt-5'>
       <h1>Video Voice</h1>
       <p className='text-sm text-gray-400'>Select voice for your video</p>
    
       <ScrollArea className='h-[70px] w-full'>
      <div className='grid grid-cols-2 gap-3'>
        {voiceOptions.map((voice, index) => (
           <div key={index}> 
       <h1 className={`cursor-pointer p-3 dark:bg-slate-900 dark:border-white rounded-lg hover:border ${voice.name == selectedVoice && "border"} `} onClick={() => {setSelectedVoice(voice.name)
        onHandleInputChange('voice', voice.value)
       }} key={index}>    {voice.name}  </h1>   
           </div>
        ))}
      </div>
      </ScrollArea>
    </div>
    
  );
}

export default Voice;