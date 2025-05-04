import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Extract topic from request body
    const { topic } = await req.json();
    console.log("Received topic:", topic);
    
    if (!topic) {
      return NextResponse.json({ 
        error: "Topic is required",
        scripts: [
          { content: "Please provide a topic to generate scripts" },
          { content: "Topic is required for script generation" }
        ]
      }, { status: 400 });
    }
    
    // Use the working API that you confirmed in the curl command
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Write two different scripts for a 30-second video on the ${topic}.
                  
                  - Do not add scene description.  
                  - Do not add anything in braces. Just return the plain story in text.  
                  - Give me the response in JSON format and follow the schema:
                  
                  {
                    "scripts": [
                      {
                        "content": ""
                      },
                      {
                        "content": ""
                      }
                    ]
                  }`
                }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      console.error("API error:", response.status);
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Raw API response:", result);
    
    // Process the Gemini API response structure
    if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts) {
      const text = result.candidates[0].content.parts[0].text;
      
      // Try to parse as JSON
      try {
        const jsonData = JSON.parse(text);
        console.log("Parsed JSON data:", jsonData);
        return NextResponse.json(jsonData);
      } catch (error) {
        console.error("Failed to parse JSON response:", error);
        
        // If JSON parsing fails, format the response manually
        const formattedResponse = {
          scripts: [
            { content: text.substring(0, text.length/2) },
            { content: text.substring(text.length/2) }
          ]
        };
        
        console.log("Formatted response:", formattedResponse);
        return NextResponse.json(formattedResponse);
      }
    } else {
      throw new Error("Invalid response format from Gemini API");
    }
    
  } catch (error) {
    console.error("Error in script generation API route:", error);
    return NextResponse.json({ 
      error: "Failed to generate script",
      scripts: [
        { content: "Error generating script: " + error.message },
        { content: "Please try again" }
      ] 
    }, { status: 500 });
  }
}