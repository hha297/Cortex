/* eslint-disable react-hooks/purity */
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"
import { Project } from "next/dist/build/swc/types"



export const useGetProjects = () => {
        return useQuery(api.projects.get)
}

export const useGetPartialProjects = (limit: number) => {
        return useQuery(api.projects.getPartial, { limit })
}

export const useGetProjectById = (projectId: Id<'projects'>) => {
        return useQuery(api.projects.getById, { projectId })
}

export const useCreateProject = () => {

        return useMutation(api.projects.create).withOptimisticUpdate((localStore, args) => {
                const existingProjects = localStore.getQuery(api.projects.get);
                if (existingProjects !== undefined) {
                        const now = Date.now();
                        const newProject = {
                                _id: crypto.randomUUID() as Id<"projects">,
                                _creationTime: now,
                                name: args.name,
                                ownerId: 'anonymous',
                                updatedAt: now,
                        }

                        localStore.setQuery(api.projects.get, {}, [...existingProjects, newProject]);
                }
        })
}

export const useRenameProject = (projectId: Id<'projects'>) => {
        return useMutation(api.projects.rename).withOptimisticUpdate((localStore, args) => {
                const existingProject = localStore.getQuery(api.projects.getById, { projectId });
                if (existingProject !== undefined && existingProject !== null) {
                        localStore.setQuery(api.projects.getById, { projectId }, {
                                ...existingProject,
                                name: args.name,
                                updatedAt: Date.now(),
                        });
                }

                const existingProjects = localStore.getQuery(api.projects.get);
                if (existingProjects !== undefined) {
                        localStore.setQuery(api.projects.get, {}, existingProjects.map(project => project._id === args.projectId ? {
                                ...project,
                                name: args.name,
                                updatedAt: Date.now(),
                        } : project));
                }
        })
}
