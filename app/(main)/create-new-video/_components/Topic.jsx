"use client" 
import { Button } from '@/components/ui/button'; 
import { Input } from '@/components/ui/input' 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" 
import { Textarea } from "@/components/ui/textarea" 
import { SparkleIcon } from 'lucide-react';
import { useState } from 'react'

const Topic = ({onHandleInputChange}) => {
    const [selectedTopic, setSelectedTopic] = useState('') // Initialize with empty string
    const [isLoading, setIsLoading] = useState(false) // Add loading state
    const [scripts, setScripts] = useState([]) // Initialize scripts state with correct variable name
  
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
    
    const GenerateScript = async() => {
      // Validate if topic is selected
      if (!selectedTopic || selectedTopic.trim() === '') {
        alert("Please select or enter a topic first");
        return;
      }
      
      console.log("[topic: '" + selectedTopic + "']");
      setIsLoading(true); // Start loading
      
      try {
        const response = await fetch('/api/generate-script', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topic: selectedTopic })
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          console.error("API error:", response.status, result);
          throw new Error(`API error: ${response.status} - ${result.error || 'Unknown error'}`);
        }
        
        // Store scripts in state
        if (result && result.scripts && result.scripts.length > 0) {
          setScripts(result.scripts);
          
          // If there's a parent handler, pass the scripts up
          if (typeof onHandleInputChange === 'function') {
            onHandleInputChange('scripts', result.scripts);
          }
          
          // Display success message
          alert("Scripts generated successfully!");
        } else {
          throw new Error("Invalid response format from API");
        }
        
      } catch (error) {
        console.error("Error generating script:", error);
        alert("Failed to generate script: " + error.message);
      } finally {
        setIsLoading(false); // End loading regardless of outcome
      }
    }

    return (
        <div>
            <div>
                <h1>Project Title</h1>
                <Input placeholder="Enter project title" onChange= {(event)=> onHandleInputChange('title', event?.target.value)}/>
            </div>
            
            <div className="mt-4">
                <h1>Video Topic</h1>
                <p>Select topic for your video</p>
                
                <Tabs defaultValue="suggestions">
                    <TabsList>
                        <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                        <TabsTrigger value="topic">Your Topic</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="suggestions">
                      <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            onClick={() => {
                              setSelectedTopic(suggestion);
                              onHandleInputChange('topic', suggestion);
                            }}
                            variant={suggestion === selectedTopic ? "secondary" : "outline"}
                            className={`m-1 transition-colors ${
                              suggestion === selectedTopic ? 'border border-white' : ''
                            }`}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
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
                
                {/* Display generated scripts */}
                {scripts.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Generated Scripts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {scripts.map((item, index) => (
                        <div key={index} className="p-4 border rounded-md"> 
                          <h3 className="font-bold mb-2">Script {index + 1}</h3>
                          <p>{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
            
            <Button 
              className="mt-3" 
              size="sm" 
              onClick={GenerateScript}
              disabled={isLoading}
            > 
              <SparkleIcon className="mr-2" />
              {isLoading ? 'Generating...' : 'Generate Script'} 
            </Button>
        </div>
    )
}

export default Topic