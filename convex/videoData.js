import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateVideoData = mutation({
  args:{
    userId: v.id("users"),
    title: v.string(),
    prompt: v.string(),
  },
  handler: async(ctx, args) => {
    // Create a new video record
    const videoDataId = await ctx.db.insert('videoData', {
      userId: args.userId,
      title: args.title,
      prompt: args.prompt,
      status: "pending",
      createdAt: Date.now(),
    })

    return videoDataId
  }
});

export const UpdateUploadRecord = mutation({
  args:{
    recordId: v.id("uploads"),
    status: v.string(),
  },
  handler: async(ctx, args) => {
    return await ctx.db.patch(args.recordId, { 
      status: args.status,
      updatedAt: Date.now(),
    })
  }
});

export const AddVideoRecord = mutation({
  args:{
    userId: v.id("users"),
    videoUrl: v.string(),
    title: v.string(),
  },
  handler: async(ctx, args) => {
    // Add a completed video record
    const videoDataId = await ctx.db.insert('videoData', {
      userId: args.userId,
      videoUrl: args.videoUrl,
      title: args.title,
      status: "completed",
      createdAt: Date.now(),
    })

    return videoDataId
  }
});

export const GetUserVideos = query({
  args:{
    userId: v.id("users"),
  },
  handler: async(ctx, args) => {
    const videoData = await ctx.db.query('videoData')
    .filter(q => q.eq(q.field('userId'), args.userId))
    .collect()

    return videoData
  }
});

export const GetVideoById = query({
  args:{
    videoDataId: v.id("videoData"),
  },
  handler: async(ctx, args) => {
    const videoData = await ctx.db.get(args.videoDataId)

    return videoData
  }
});