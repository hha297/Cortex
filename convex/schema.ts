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

        files: defineTable({
                projectId: v.id('projects'),
                parentId: v.optional(v.id('files')),
                name: v.string(),
                type: v.union(v.literal('file'), v.literal('folder')),
                content: v.optional(v.string()), // Text file only
                storageId: v.optional(v.id('_storage')),
                updatedAt: v.number()
        }).index('by_project', ['projectId']).index('by_parent', ['parentId']).index('by_project_parent', ['projectId', 'parentId']),
});
