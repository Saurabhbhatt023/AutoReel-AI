"use client" 
import { Button } from '@/components/ui/button'; 
import { Input } from '@/components/ui/input' 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" 
import { Textarea } from "@/components/ui/textarea" 
import { SparkleIcon } from 'lucide-react';

const suggestions = [
    "Historic Story",
    "Kids Story",
    "Movie Stories",
    "AI Innovations",
    "Space Mysteries",
    "Horror Stories",
    "Mythological Tales",
    "Tech Breakthroughs",
    "True Crime Stories",
    "Fantasy Adventures",
    "Science Experiments",
    "Motivational Stories",
];

import React, { useState } from 'react'

const Topic = ({onHandleInputChange}) => {
    const [selectTopic, setSelectedTopic] = useState('') // Initialize with empty string
    
    return (
        <div>
            <div>
                <h1>Project Title</h1>
                <Input placeholder="Enter project title" onChange= {(event)=> onHandleInputChange('title', event?.target.value)}/>
            </div>
            
            <div>
                <h1>Video Topic</h1>
                <p>Select topic for your video</p>
                
                <Tabs defaultValue="suggestions">
                    <TabsList>
                        <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                        <TabsTrigger value="topic">Your Topic</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="suggestions">
  {suggestions.map((suggestion, index) => (
    <Button
      key={index}
      onClick={() => {
        setSelectedTopic(suggestion);
        onHandleInputChange('topic', suggestion);
      }}
      className={`m-2 transition-colors ${
        suggestion === selectTopic
          ? 'bg-secondary text-white border border-white hover:bg-secondary'
          : ''
      }`}
    >
      {suggestion}
    </Button>
  ))}
</TabsContent>
                    
                    <TabsContent value= "topic"> 
                        <div>
                          <h2>Enter your own topic</h2>
                          
                          <Textarea 
                            placeholder="Enter your topic"
                            onChange= {(event) => onHandleInputChange('topic', event.target.value)}
                          />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            <Button className="mt-3" size="small"> <SparkleIcon />Generate Script </Button>
        </div>
    )
}

export default Topic