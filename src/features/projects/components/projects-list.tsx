
import { Kbd } from "@/components/ui/kbd";
import { useGetPartialProjects } from "../hooks/use-projects";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { Doc } from "../../../../convex/_generated/dataModel";
import { AlertCircleIcon, ArrowRightIcon, GlobeIcon, Loader2Icon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface ProjectsListProps {
        onViewAll: () => void;
}

const formatTimestamp = (timestamp: number) => {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

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

export const ProjectsList = ({ onViewAll }: ProjectsListProps) => {
        const projects = useGetPartialProjects(10)
        if (projects === undefined) {
                return <Spinner className='size-4 text-ring' />
        }

        const [mostRecent, ...rest] = projects;
        return (
                <div className='flex flex-col gap-4'>
                        {mostRecent ? <ContinueCard project={mostRecent} /> : null}
                        {rest.length > 0 && (
                                <div className='flex flex-col gap-2'>
                                        <div className="flex items-center justify-between gap-2">
                                                <span className='text-sm font-medium text-muted-foreground'>Recent projects</span>
                                                <button className="flex items-center gap-2 text-muted-foreground text-xs hover:text-foreground transition-colors" onClick={onViewAll}>
                                                        <span>View All</span>
                                                        <Kbd className="bg-accent border">CTRL + K</Kbd>
                                                </button>
                                        </div>
                                        <ul>
                                                {rest.map((project) => (
                                                        <ProjectItem key={project._id} project={project} />
                                                ))}
                                        </ul>
                                </div>
                        )}
                </div>
        );
};

const ProjectItem = ({ project }: { project: Doc<"projects"> }) => {
        return (
                <Link href={`/projects/${project._id}`} className="text-sm text-foreground/60 font-medium hover:text-foreground py-1 flex items-center justify-between w-full group">
                        <div className="flex items-center gap-2">
                                {getProjectIcon(project)}
                                <span className="truncate">{project.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground group-hover:text-foreground/60 transition-colors">
                                {formatTimestamp(project.updatedAt)}
                        </span>
                </Link>
        );
};

const ContinueCard = ({ project }: { project: Doc<"projects"> }) => {
        return (
                <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-muted-foreground">Continue where you left off</span>
                        <Button variant="outline" size="sm" asChild className="h-auto items-start justify-start p-4 bg-background border rounded-none flex flex-col gap-2">
                                <Link href={`/projects/${project._id}`} className="group">
                                        <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                        {getProjectIcon(project)}
                                                        <span className="truncate font-medium">{project.name}</span>
                                                </div>
                                                <ArrowRightIcon className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                        <span className="text-xs text-muted-foreground group-hover:text-foreground/60 transition-colors">
                                                {formatTimestamp(project.updatedAt)}
                                        </span>
                                </Link>
                        </Button>
                </div>
        );
};