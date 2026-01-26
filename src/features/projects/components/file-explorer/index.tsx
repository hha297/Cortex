import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils";
import { ChevronRightIcon, CopyMinusIcon, FilePlusCornerIcon, FolderPlusIcon } from "lucide-react";
import { useState } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useGetProjectById } from "../../hooks/use-projects";
import { Button } from "@/components/ui/button";
import { useCreateFile, useCreateFolder, useFolderContents } from "../../hooks/use-files";
import { CreateInput } from "./create-input";
import { LoadingRow } from "./loading-row";
import { Tree } from "./tree";


export const FileExplorer = ({ projectId }: { projectId: Id<'projects'> }) => {
        const [isOpen, setIsOpen] = useState(false);
        const [collapseKey, setCollapseKey] = useState(0);
        const [creating, setCreating] = useState<'file' | 'folder' | null>(null);
        const project = useGetProjectById(projectId);

        const rootFiles = useFolderContents({ projectId, enabled: isOpen });
        const createFile = useCreateFile();
        const createFolder = useCreateFolder();

        const handleCreate = (name: string) => {
                setCreating(null);

                if (creating === 'file') {
                        createFile({ projectId, name, content: '', parentId: undefined });
                } else if (creating === 'folder') {
                        createFolder({ projectId, name, parentId: undefined });
                }
        }
        return (
                <div className="h-full bg-sidebar">
                        <ScrollArea>
                                <div role='button' onClick={() => setIsOpen(value => !value)} className="group/project cursor-pointer w-full px-2 text-left flex items-center gap-1 h-8 bg-accent font-bold">
                                        <ChevronRightIcon className={cn("size-4 shrink-0 text-muted-foreground", isOpen && "rotate-90")} />
                                        <p className="text-xs uppercase line-clamp-1">{project?.name}</p>
                                        <div className="opacity-0 group-hover/project:opacity-100 transition-none duration-0 flex items-center gap-1 ml-auto">
                                                <Button onClick={(e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        setIsOpen(true);
                                                        setCreating('file');
                                                }}
                                                        variant="highlight"
                                                        size="icon-xs"
                                                >
                                                        <FilePlusCornerIcon className="size-4" />
                                                </Button>
                                                <Button onClick={(e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        setIsOpen(true);
                                                        setCreating('folder');
                                                }}
                                                        variant="highlight"
                                                        size="icon-xs"
                                                >
                                                        <FolderPlusIcon className="size-4" />
                                                </Button>
                                                <Button onClick={(e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        setCollapseKey(prev => prev + 1);

                                                }}
                                                        variant="highlight"
                                                        size="icon-xs"
                                                >
                                                        <CopyMinusIcon className="size-4" />
                                                </Button>
                                        </div>
                                </div>
                                {isOpen && (
                                        <>
                                                {rootFiles === undefined && <LoadingRow level={0} />}
                                                {creating && (
                                                        <CreateInput type={creating} level={0} onSubmit={handleCreate} onCancel={() => setCreating(null)} />
                                                )}
                                                {rootFiles?.map((item) => (
                                                        <Tree key={`${item._id}-${collapseKey}`} item={item} level={0} projectId={projectId} />
                                                ))}
                                        </>
                                )}
                        </ScrollArea>
                </div>
        )
}