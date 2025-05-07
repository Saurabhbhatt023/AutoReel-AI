import { NextResponse } from 'next/server';
import { inngest } from '@/inngest/client';

// This should be in app/api/generate-video-data/route.js

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields for audio generation
    if (!body.script || !body.voice) {
      return NextResponse.json(
        { error: 'Missing required fields: script and voice are required' },
        { status: 400 }
      );
    }
    
    console.log("Sending event to Inngest for audio generation:", {
      voice: body.voice,
      scriptLength: body.script.length,
      title: body.title || "Untitled Audio"
    });
    
    // Send event to Inngest with focus on audio generation
    const result = await inngest.send({
      name: "generate-video-data", // Keep this event name as it's already configured in your Inngest setup
      data: {
        script: body.script,
        title: body.title || "Untitled Audio",
        caption: body.caption || "",
        videoStyle: body.videoStyle || "default", // Include but not critical
        voice: body.voice // Critical for audio generation
      }
    });
    
    return NextResponse.json({
      success: true,
      message: "Audio generation request sent successfully",
      eventId: result.ids[0]
    });
    
  } catch (error) {
    console.error("Error generating audio:", error);
    return NextResponse.json(
      { error: "Failed to generate audio", details: error.message },
      { status: 500 }
    );
  }
}