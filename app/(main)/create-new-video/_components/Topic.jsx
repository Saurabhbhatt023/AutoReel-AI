"use client" 
import { Button } from '@/components/ui/button'; 
import { Input } from '@/components/ui/input' 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" 
import { Textarea } from "@/components/ui/textarea" 
import { SparkleIcon } from 'lucide-react';
// Using native fetch instead of axios

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
    const [selectedTopic, setSelectedTopic] = useState('') // Initialize with empty string
    
     const GenerateScript = async() => {
      // Validate if topic is selected
      if (!selectedTopic || selectedTopic.trim() === '') {
        alert("Please select or enter a topic first");
        return;
      }
      
      console.log("Sending topic to API:", selectedTopic);
      
      try {
        const response = await fetch('/api/generate-script', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topic: selectedTopic })
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("API error:", response.status, errorText);
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("API Response:", result);
        
        // Check if we have scripts in the response
        if (result && result.scripts && result.scripts.length > 0) {
          // If there's a parent handler, pass the scripts up
          if (typeof onHandleInputChange === 'function') {
            onHandleInputChange('scripts', result.scripts);
          }
          
          // Display success message
          alert("Scripts generated successfully! Check the console for details.");
        } else {
          throw new Error("Invalid response format from API");
        }
      } catch (error) {
        console.error("Error generating script:", error);
        alert("Failed to generate script: " + error.message);
      }
     }

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
        suggestion === selectedTopic
          ? 'bg-secondary text-white border border-white hover:bg-secondary'
          : ''
      }`}
    >
      {suggestion}
    </Button>
  ))}
</TabsContent>
                    
                    <TabsContent value="topic"> 
                        <div>
                          <h2>Enter your own topic</h2>
                          
                          <Textarea 
                            placeholder="Enter your topic"
                            onChange={(event) => {
                              const value = event.target.value;
                              setSelectedTopic(value);
                              onHandleInputChange('topic', value);
                            }}
                          />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            <Button className="mt-3" size="sm" onClick={GenerateScript}> <SparkleIcon />Generate Script </Button>
        </div>
    )
}

export default Topic