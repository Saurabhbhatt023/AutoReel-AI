import { Inngest } from "inngest";

// Create a client with your API key
export const inngest = new Inngest({ 
  id: "ai-video-generator",
  // Optional: Enable logging in development
  logger: process.env.NODE_ENV !== "production"
});