import { mutation, query } from "./_generated/server"
import { ConvexError, v } from "convex/values"

export const createFiles = mutation({
    args: {
        name: v.string(),
    },
    async handler(ctx, args) {
        const Identity = await ctx.auth.getUserIdentity()

        if (!Identity) {
            throw new ConvexError("You must be signed in to create a file")
        }

        await ctx.db.insert("files", {
            name: args.name,
        })
    }
}) 

export const getFiles = query({
    args: {},
    async handler(ctx, args) {
        const Identity = await ctx.auth.getUserIdentity()

        if (!Identity) {
           return []
        }

        return ctx.db.query("files").collect()
    }
})