import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { GenerateVideoData, helloWorld } from "@/inngest/functions";

// Create an API endpoint that serves your functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld ,
    GenerateVideoData
  ],
});