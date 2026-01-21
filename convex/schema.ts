import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
        projects: defineTable({
                name: v.string(),
                ownerId: v.string(),
                importStatus: v.optional(v.union(v.literal('importing'), v.literal('completed'), v.literal('failed'))),
                exportStatus: v.optional(v.union(v.literal('exporting'), v.literal('completed'), v.literal('failed'), v.literal('cancelled'))),
                exportUrl: v.optional(v.string()),
                updatedAt: v.number()
        }).index('by_owner', ['ownerId']),
});
