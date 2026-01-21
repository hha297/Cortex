'use client'

import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { useRouter } from "next/navigation"
import { FaGithub } from "react-icons/fa"
import { useGetProjects } from "../hooks/use-projects";
import { Doc } from "../../../../convex/_generated/dataModel";
import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react";

interface ProjectsCommandDialogProps {
        open: boolean;
        onOpenChange: (open: boolean) => void;
}
const getProjectIcon = (project: Doc<"projects">) => {
        if (project.importStatus === 'completed') {
                return <FaGithub className="size-4 text-muted-foreground" />;
        }

        if (project.importStatus === 'failed') {
                return <AlertCircleIcon className="size-4 text-muted-foreground" />;
        }

        if (project.importStatus === 'importing') {
                return <Loader2Icon className="size-4 text-muted-foreground animate-spin" />;
        }

        return <GlobeIcon className="size-4" />;
};
export const ProjectsCommandDialog = ({ open, onOpenChange }: ProjectsCommandDialogProps) => {
        const router = useRouter();
        const projects = useGetProjects();

        const handleSelect = (projectId: string) => {
                router.push(`/projects/${projectId}`);
                onOpenChange(false);
        }

        return (
                <CommandDialog open={open} onOpenChange={onOpenChange} title="Search projects..." description="Search and navigate to your projects">
                        <CommandInput placeholder="Search projects..." />
                        <CommandList>
                                <CommandEmpty>No projects found.</CommandEmpty>
                                <CommandGroup heading="Projects">
                                        {projects?.map((project) => (
                                                <CommandItem key={project._id} value={project.name} onSelect={() => handleSelect(project._id)}>
                                                        {getProjectIcon(project)}
                                                        <span className="truncate">{project.name}</span>
                                                </CommandItem>
                                        ))}
                                </CommandGroup>
                        </CommandList>
                </CommandDialog>
        )
}
