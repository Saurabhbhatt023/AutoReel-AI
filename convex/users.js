import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewUser = mutation({
  args:{
    name: v.string(),
    email: v.string(),
    pictureURL: v.string(),
  },
  handler: async(ctx, args) => {
    const user = await ctx.db.query('users')
    .filter(q => q.eq(q.field('email'), args.email))
    .collect()

    if(!user[0]?.email){
        const userData = {
            name: args.name,
            email: args.email,
            pictureURL: args?.pictureURL,
            credits: 3,
        }
        const result = await ctx.db.insert('users', userData)
        return userData
    }
    return user[0]
  }
});

export const GetUserData = query({
  args:{
    email: v.string(),
  },
  handler: async(ctx, args) => {
    const user = await ctx.db.query('users')
    .filter(q => q.eq(q.field('email'), args.email))
    .first()

    return user
  }
});

export const UpdateUserCredits = mutation({
  args:{
    userId: v.id("users"),
    credits: v.number(),
  },
  handler: async(ctx, args) => {
    return await ctx.db.patch(args.userId, { credits: args.credits })
  }
});