import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
        projects: defineTable({
                name: v.string(),
                ownerId: v.string(),
                importStatus: v.union(v.literal('pending'), v.literal('imported'), v.literal('failed')),
        }),
});
