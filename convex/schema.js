import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    pictureURL: v.string(),
    credits: v.number(),
  }),

  videoData: defineTable({
    userId: v.id("users"),
    title: v.string(),
    prompt: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    status: v.string(), // "pending", "processing", "completed", "failed"
    createdAt: v.number(),
  }),

  uploads: defineTable({
    userId: v.id("users"),
    videoDataId: v.optional(v.id("videoData")),
    status: v.string(), // "pending", "processing", "completed", "failed"
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
});