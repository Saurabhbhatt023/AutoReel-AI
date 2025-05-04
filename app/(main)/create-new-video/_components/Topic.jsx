"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { SparkleIcon } from 'lucide-react';
import { useState } from 'react'

const Topic = ({ onHandleInputChange }) => {
    const [selectedTopic, setSelectedTopic] = useState('') // Initialize with empty string
    const [isLoading, setIsLoading] = useState(false) // Add loading state
    const [scripts, setScripts] = useState([]) // Initialize scripts state
    const [selectedScriptIndex, setSelectedScriptIndex] = useState(null) // Initialize selected script state
    const suggestions = [
        "Historic Story", "Kids Story", "Movie Stories", "AI Innovations",
        "Space Mysteries", "Horror Stories", "Mythological Tales", "Tech Breakthroughs",
        "True Crime Stories", "Fantasy Adventures", "Science Experiments", "Motivational Stories",
    ];

    // Helper function to clean script content
    const cleanScriptContent = (content) => {
        if (!content) return '';
        
        // Remove any JSON formatting or code blocks
        return content
            .replace(/```json.*?```/gs, '') // Remove code blocks
            .replace(/^\s*\{\s*"scripts"\s*:\s*\[\s*\{\s*"content"\s*:\s*"/, '') // Remove JSON start
            .replace(/"\s*\}\s*,?\s*\{\s*"content"\s*:\s*"/, '') // Remove middle JSON
            .replace(/"\s*\}\s*\]\s*\}\s*$/, '') // Remove JSON end
            .trim();
    };

    const GenerateScript = async () => {
        // Validate if topic is selected
        if (!selectedTopic || selectedTopic.trim() === '') {
            alert("Please select or enter a topic first");
            return;
        }

        console.log("[topic: '" + selectedTopic + "']");
        setIsLoading(true); // Start loading
        setSelectedScriptIndex(null) // Reset script selection
        setScripts([]); // Clear previous scripts immediately (optional, but good UX)

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
            // Ensure result.scripts is actually an array
            if (result && Array.isArray(result.scripts) && result.scripts.length > 0) {
                // Clean each script content before setting
                const cleanedScripts = result.scripts.map(script => ({
                    content: cleanScriptContent(script.content)
                }));
                
                setScripts(cleanedScripts);

                // If there's a parent handler, pass the scripts up
                if (typeof onHandleInputChange === 'function') {
                    onHandleInputChange('scripts', cleanedScripts);
                }
            } else {
                 // Handle cases where scripts might be empty or format is wrong
                console.warn("API returned no scripts or invalid format:", result);
                setScripts([]); // Ensure scripts state is an empty array
                alert("No scripts were generated for this topic, or the format was unexpected.");
            }

        } catch (error) {
            console.error("Error generating script:", error);
            alert("Failed to generate script: " + error.message);
            setScripts([]); // Ensure scripts are cleared on error
        } finally {
            setIsLoading(false); // End loading regardless of outcome
        }
    }

    return (
        <div>
            <div>
                <h1>Project Title</h1>
                <Input placeholder="Enter project title" onChange={(event) => onHandleInputChange('title', event?.target.value)} />
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
                                    className={`m-1 transition-colors ${suggestion === selectedTopic ? 'border border-white' : ''
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
                                value={selectedTopic} // Controlled component
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setSelectedTopic(value);
                                    onHandleInputChange('topic', value);
                                }}
                            />
                        </div>
                    </TabsContent>
                </Tabs>

                 {/* Show button only if scripts array is empty */}
                 { scripts.length === 0 &&
                    <Button
                        className="mt-3"
                        size="sm"
                        onClick={GenerateScript}
                        disabled={isLoading || !selectedTopic || selectedTopic.trim() === ''} // Also disable if no topic
                    >
                        <SparkleIcon className="h-4 w-4 mr-2" /> {/* Ensure icon size */}
                        {isLoading ? 'Generating...' : 'Generate Script'}
                    </Button>
                 }


                {/* Display generated scripts - Clean display of scripts */}
                {scripts.length > 0 && (
                    <div className='mt-6'>
                        <h1 className="text-xl font-bold mb-4">Select the Script</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {scripts.map((item, index) => (
                                <div
                                    key={index}
                                    className={`p-4 border rounded-lg cursor-pointer hover:border-gray-400 ${selectedScriptIndex === index ? 'border-white bg-secondary' : 'border-gray-600'}`}
                                    onClick={() => {
                                        setSelectedScriptIndex(index);
                                        if (typeof onHandleInputChange === 'function' && item && item.content) {
                                            onHandleInputChange('selectedScript', item.content);
                                        }
                                     }}
                                >
                                    <h3 className="font-bold mb-2">Script {index + 1}</h3>
                                    <p className="text-sm text-gray-300">
                                        {item && item.content ? item.content : 'Invalid script format'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Topic;