'use client';

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@/components/ui/breadcrumb";
import { Id } from "../../../../convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { useGetProjectById, useRenameProject } from "../hooks/use-projects";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CloudCheckIcon, Loader2Icon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";



export const Navbar = ({ projectId }: { projectId: Id<'projects'> }) => {
        const project = useGetProjectById(projectId);
        const renameProject = useRenameProject();

        const [isRenaming, setIsRenaming] = useState(false);
        const [name, setName] = useState('');

        const handleRename = () => {
                if (!project) return;
                setName(project.name);
                setIsRenaming(true);
        }

        const handleSubmit = () => {
                if (!project) return;
                setIsRenaming(false);

                const trimmedName = name.trim();
                if (!trimmedName || trimmedName === project.name) return;

                renameProject({ projectId, name: trimmedName });
        }

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                        handleSubmit();
                } else if (e.key === 'Escape') {
                        setIsRenaming(false);
                }
        }

        return (
                <nav className="flex items-center justify-between gap-x-2 p-2 bg-sidebar border-b border-sidebar-border">
                        <div className="flex items-center gap-x-2">
                                <Breadcrumb>
                                        <BreadcrumbList className="gap-0">
                                                <BreadcrumbItem>
                                                        <BreadcrumbLink className="flex items-center gap-2" href="/" asChild>
                                                                <Link href="/" className="p-1 pr-2 hover:bg-background rounded-xl">
                                                                        <Image src="/logo.svg" alt="Cortex" width={12} height={12} className='md:size-10' />
                                                                        <h1 className={cn("text-sm md:text-xl font-bold font-mono", "group-hover/logo:text-primary")}>Cortex</h1>
                                                                </Link>
                                                        </BreadcrumbLink>
                                                </BreadcrumbItem>
                                                <BreadcrumbSeparator className="ml-0!" />
                                                <BreadcrumbItem>
                                                        {isRenaming ? (
                                                                <input
                                                                        autoFocus
                                                                        value={name}
                                                                        onChange={(e) => setName(e.target.value)}
                                                                        onFocus={(e) => e.target.select()}
                                                                        onBlur={handleSubmit}
                                                                        onKeyDown={handleKeyDown}
                                                                        className="text-sm bg-transparent rounded-xl px-2 py-2 text-foreground outline-none focus:ring-1 focus:ring-inset focus:ring-ring font-medium max-w-40 truncate"

                                                                />
                                                        )

                                                                : (
                                                                        <BreadcrumbPage onClick={handleRename} className="text-sm px-2 py-1 cursor-pointer hover:text-primary font-medium max-w-40 truncate">
                                                                                {project?.name ?? 'Untitled Project'}
                                                                        </BreadcrumbPage>
                                                                )}
                                                </BreadcrumbItem>
                                        </BreadcrumbList>
                                </Breadcrumb>
                                {project?.importStatus === 'importing' ? (
                                        <Tooltip>
                                                <TooltipTrigger asChild>
                                                        <Loader2Icon className="size-4 animate-spin" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                        <p>Importing...</p>
                                                </TooltipContent>
                                        </Tooltip>
                                ) : (project?.updatedAt && (
                                        <Tooltip>
                                                <TooltipTrigger asChild>
                                                        <CloudCheckIcon className="size-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                        Saved {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
                                                </TooltipContent>
                                        </Tooltip>
                                ))}
                        </div>
                        <div className="flex items-center gap-2">
                                <UserButton />
                        </div>
                </nav>
        );
}