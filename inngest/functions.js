import axios from "axios";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

const BASE_URL = 'https://aigurulab.tech';

export const GenerateVideoData = inngest.createFunction( 
  { id: "generate-video-data" },
  { event: "generate-video-data" },
  async ({ event, step }) => {
    const { script, title, caption, videoStyle, voice } = event?.data;
    
    console.log("Inngest function - Generate Audio started:", {
      title,
      voiceSelected: voice,
      scriptLength: script?.length || 0
    });

    // First generate the audio file from the script
    const audioResult = await step.run(
      "GenerateAudioFile",
      async () => {
        try {
          // Make sure we have the required fields
          if (!script || !voice) {
            throw new Error("Missing required fields: script and voice");
          }
          
          console.log(`Sending text-to-speech request with voice: ${voice}`);
          
          const result = await axios.post(
            `${BASE_URL}/api/text-to-speech`,
            {
              input: script,
              voice: voice,
            },
            {
              headers: {
                'x-api-key': process.env.NEXT_PUBLIC_AIGURULAB_API_KEY,
                'Content-Type': 'application/json',
              },
              timeout: 30000, // 30 second timeout for audio generation
            }
          );
          
          console.log("Audio generation successful, received URL:", result.data.audio);
          return {
            success: true,
            audioUrl: result.data.audio
          };
        } catch (error) {
          console.error("Error in audio generation:", error.message);
          return {
            success: false,
            error: error.message
          };
        }
      }
    );
    
    // If audio generation was successful and we have additional steps to perform
    if (audioResult.success && audioResult.audioUrl) {
      // Here you would add additional steps like video generation
      // For now, we're just returning the audio result
      
      // Example placeholder for future video processing:
      // const videoResult = await step.run("GenerateVideo", async () => {
      //   // Video generation logic here
      // });
      
      return {
        success: true,
        audioUrl: audioResult.audioUrl,
        title: title || "Untitled",
        // Add more processed data here as your application grows
      };
    }
    
    // If audio generation failed
    return {
      success: false,
      error: audioResult.error || "Unknown error in audio generation",
    };
  }
)