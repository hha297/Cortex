import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { verifyAuth } from "./auth";
import { Id } from "./_generated/dataModel";



export const getFiles = query({
        args: {
                projectId: v.id('projects'),
        },
        handler: async (ctx, args) => {
                const identity = await verifyAuth(ctx);
                const project = await ctx.db.get('projects', args.projectId);

                if (!project) {
                        throw new Error('Project not found');
                }
                if (project.ownerId !== identity.subject) {
                        throw new Error('Unauthorized');
                }
                return await ctx.db.query('files').withIndex('by_project', q => q.eq('projectId', args.projectId)).collect();
        }
})

export const getFile = query({
        args: {
                fileId: v.id('files'),
        },
        handler: async (ctx, args) => {
                const identity = await verifyAuth(ctx);
                const file = await ctx.db.get('files', args.fileId);
                if (!file) {
                        throw new Error('File not found');
                }

                const project = await ctx.db.get('projects', file.projectId);
                if (!project) {
                        throw new Error('Project not found');
                }
                if (project.ownerId !== identity.subject) {
                        throw new Error('Unauthorized');
                }
                return file;
        }
})

export const getFolderContents = query({
        args: {
                projectId: v.id('projects'),
                parentId: v.optional(v.id('files')),
        },
        handler: async (ctx, args) => {
                const identity = await verifyAuth(ctx);
                const project = await ctx.db.get('projects', args.projectId);
                if (!project) {
                        throw new Error('Project not found');
                }
                if (project.ownerId !== identity.subject) {
                        throw new Error('Unauthorized');
                }

                const files = await ctx.db.query('files').withIndex('by_project_parent', q => q.eq('projectId', args.projectId).eq('parentId', args.parentId)).collect();

                // Sort: Folders first, then files, alphabetically
                return files.sort((a, b) => {
                        if (a.type === 'folder' && b.type === 'file') return -1;
                        if (a.type === 'file' && b.type === 'folder') return 1;
                        // Within same type, sort alphabetically
                        return a.name.localeCompare(b.name);
                });

        }
})

export const createFile = mutation({
        args: {
                projectId: v.id('projects'),
                parentId: v.optional(v.id('files')),
                name: v.string(),
                content: v.optional(v.string()),
        },
        handler: async (ctx, args) => {
                const identity = await verifyAuth(ctx);
                const project = await ctx.db.get('projects', args.projectId);
                if (!project) {
                        throw new Error('Project not found');
                }
                if (project.ownerId !== identity.subject) {
                        throw new Error('Unauthorized');
                }

                // Check if file with this name already exists
                const files = await ctx.db.query('files').withIndex('by_project_parent', q => q.eq('projectId', args.projectId).eq('parentId', args.parentId)).collect();

                const existingFile = files.find(file => file.name === args.name && file.type === 'file');
                if (existingFile) {
                        throw new Error('File with this name already exists');
                }

                await ctx.db.insert('files', {
                        projectId: args.projectId,
                        parentId: args.parentId,
                        name: args.name,
                        type: 'file',
                        content: args.content,
                        updatedAt: Date.now(),
                });
                await ctx.db.patch('projects', project._id, {
                        updatedAt: Date.now(),
                });
        }
})


export const createFolder = mutation({
        args: {
                projectId: v.id('projects'),
                parentId: v.optional(v.id('files')),
                name: v.string(),
        },
        handler: async (ctx, args) => {
                const identity = await verifyAuth(ctx);
                const project = await ctx.db.get('projects', args.projectId);
                if (!project) {
                        throw new Error('Project not found');
                }
                if (project.ownerId !== identity.subject) {
                        throw new Error('Unauthorized');
                }

                // Check if folder with this name already exists
                const files = await ctx.db.query('files').withIndex('by_project_parent', q => q.eq('projectId', args.projectId).eq('parentId', args.parentId)).collect();
                const existingFolder = files.find(file => file.name === args.name && file.type === 'folder');
                if (existingFolder) {
                        throw new Error('Folder with this name already exists');
                }

                await ctx.db.insert('files', {
                        projectId: args.projectId,
                        parentId: args.parentId,
                        name: args.name,
                        type: 'folder',
                        updatedAt: Date.now(),
                });
                await ctx.db.patch('projects', project._id, {
                        updatedAt: Date.now(),
                });
        }
})

export const renameFile = mutation({
        args: {
                fileId: v.id('files'),
                newName: v.string(),
        },
        handler: async (ctx, args) => {
                const identity = await verifyAuth(ctx);
                const file = await ctx.db.get('files', args.fileId);
                if (!file) {
                        throw new Error('File not found');
                }

                const project = await ctx.db.get('projects', file.projectId);
                if (!project) {
                        throw new Error('Project not found');
                }
                if (project.ownerId !== identity.subject) {
                        throw new Error('Unauthorized');
                }

                // Check if file with the new name already exists in the same parent folder
                const siblings = await ctx.db.query('files').withIndex('by_project_parent', q => q.eq('projectId', file.projectId).eq('parentId', file.parentId)).collect();
                const existingSibling = siblings.find(sibling => sibling.name === args.newName && sibling.type === file.type && sibling._id !== args.fileId);
                if (existingSibling) {
                        throw new Error(`A ${file.type} with this name already exists in this location`);
                }

                // Update the file name
                await ctx.db.patch('files', args.fileId, {
                        name: args.newName,
                        updatedAt: Date.now(),
                });
                await ctx.db.patch('projects', project._id, {
                        updatedAt: Date.now(),
                });
        }
})


export const deleteFile = mutation({
        args: {
                fileId: v.id('files'),
        },
        handler: async (ctx, args) => {
                const identity = await verifyAuth(ctx);
                const file = await ctx.db.get('files', args.fileId);
                if (!file) {
                        throw new Error('File not found');
                }
                const project = await ctx.db.get('projects', file.projectId);
                if (!project) {
                        throw new Error('Project not found');
                }
                if (project.ownerId !== identity.subject) {
                        throw new Error('Unauthorized');
                }

                // Recursively delete file/folder and all children
                const deleteRecursive = async (fileId: Id<'files'>) => {
                        const file = await ctx.db.get('files', fileId);
                        if (!file) {
                                throw new Error('File not found');
                        }
                        if (file.type === 'folder') {
                                const children = await ctx.db.query('files').withIndex('by_project_parent', q => q.eq('projectId', file.projectId).eq('parentId', fileId)).collect();
                                for (const child of children) {
                                        await deleteRecursive(child._id);
                                }
                        }

                        // Delete binary file if it exists
                        if (file.storageId) {
                                await ctx.storage.delete(file.storageId);
                        }

                        // Delete the file
                        await ctx.db.delete('files', fileId);
                };

                await deleteRecursive(args.fileId);
                await ctx.db.patch('projects', project._id, {
                        updatedAt: Date.now(),
                });
        }
})


export const updateFile = mutation({
        args: {
                fileId: v.id('files'),
                content: v.optional(v.string()),
        },
        handler: async (ctx, args) => {
                const identity = await verifyAuth(ctx);
                const file = await ctx.db.get('files', args.fileId);
                if (!file) {
                        throw new Error('File not found');
                }
                const project = await ctx.db.get('projects', file.projectId);
                if (!project) {
                        throw new Error('Project not found');
                }
                if (project.ownerId !== identity.subject) {
                        throw new Error('Unauthorized');
                }

                const now = Date.now();
                // Update the file content
                await ctx.db.patch('files', args.fileId, {
                        content: args.content,
                        updatedAt: now,
                });
                await ctx.db.patch('projects', project._id, {
                        updatedAt: now,
                });
        }
})
