'use client';

import { cn } from "@/lib/utils";
import { Id } from "../../../../convex/_generated/dataModel";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";


const Tab = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => {
        return (
                <div onClick={onClick} className={cn('flex items-center gap-2 h-full px-3 cursor-pointer text-muted-foreground border-r hover:bg-accent/30', isActive && 'bg-background text-foreground')}>
                        <span className="text-sm">{label}</span>
                </div>
        );
};
export const ProjectIdView = ({ projectId }: { projectId: Id<'projects'> }) => {
        const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
        return (
                <div className="h-full flex flex-col">
                        <nav className="h-10 flex items-center bg-sidebar border-b">
                                <Tab label="Editor" isActive={activeTab === 'editor'} onClick={() => setActiveTab('editor')} />
                                <Tab label="Preview" isActive={activeTab === 'preview'} onClick={() => setActiveTab('preview')} />
                                <div className="flex-1 flex justify-end h-full">
                                        <div className="flex items-center gap-2 h-full px-3 cursor-pointer text-muted-foreground border-l hover:bg-accent/30">
                                                <FaGithub className="size-4" />
                                                <span className="text-sm">Export</span>
                                        </div>
                                </div>
                        </nav>
                        <div className="flex-1 relative">
                                <div className={cn('absolute inset-0', activeTab === 'editor' ? 'visible' : 'invisible')}>
                                        <div>TODO: Editor</div>
                                </div>
                                <div className={cn('absolute inset-0', activeTab === 'preview' ? 'visible' : 'invisible')}>
                                        <div>TODO: Preview</div>
                                </div>
                        </div>
                </div>
        );
};