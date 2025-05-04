import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Extract topic from request body
    const { topic } = await req.json();
    console.log("[topic: '" + topic + "']");
    
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
                  - Do not add any JSON formatting or syntax.
                  - Do not include any code blocks or braces.
                  - Return two plain text scripts separated by "===SCRIPT_SEPARATOR==="
                  - Each script should be around 75-100 words.`
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
    
    // Process the Gemini API response
    if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts) {
      const text = result.candidates[0].content.parts[0].text;
      
      // Split by separator
      let scripts = [];
      if (text.includes("===SCRIPT_SEPARATOR===")) {
        const splitScripts = text.split("===SCRIPT_SEPARATOR===");
        scripts = [
          { content: splitScripts[0].trim() },
          { content: splitScripts[1].trim() }
        ];
      } else {
        // Fallback if no separator - try to split in half
        const midpoint = Math.floor(text.length / 2);
        let splitIndex = text.indexOf('.', midpoint);
        
        // If no period found near midpoint, just split at midpoint
        if (splitIndex === -1 || splitIndex > midpoint + 100) {
          splitIndex = midpoint;
        } else {
          splitIndex += 1; // Include the period in the first script
        }
        
        scripts = [
          { content: text.substring(0, splitIndex).trim() },
          { content: text.substring(splitIndex).trim() }
        ];
      }
      
      // Clean each script - remove any JSON syntax or formatting
      scripts = scripts.map(script => {
        let cleanContent = script.content;
        
        // Remove any JSON formatting
        cleanContent = cleanContent
          .replace(/^\s*```json.*$/m, '')
          .replace(/^\s*```.*$/m, '')
          .replace(/\{\s*"scripts"\s*:\s*\[\s*\{\s*"content"\s*:\s*"/, '')
          .replace(/"\s*\}\s*,?\s*\{\s*"content"\s*:\s*"/, '')
          .replace(/"\s*\}\s*\]\s*\}\s*$/, '');
          
        return { content: cleanContent.trim() };
      });
      
      // Log in the format shown in the screenshot
      console.log("[scripts: Array(2)]", scripts.length);
      console.log("▼ scripts: Array(2)");
      
      scripts.forEach((script, index) => {
        console.log(`▼ ${index}: {content: '${script.content.substring(0, 40)}...`);
      });
      
      console.log("▶ [[Prototype]]: Array(0)");
      console.log("▶ [[Prototype]]: Object");
      
      return NextResponse.json({ scripts });
      
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