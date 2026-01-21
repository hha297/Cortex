'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SparkleIcon } from 'lucide-react';
import { Kbd } from '@/components/ui/kbd';
import { FaGithub } from 'react-icons/fa';
import { ProjectsList } from './projects-list';
import { useCreateProject } from '../hooks/use-projects';
import { adjectives, animals, colors, uniqueNamesGenerator } from 'unique-names-generator';
import { useEffect, useState } from 'react';
import { ProjectsCommandDialog } from './projects-command-dialog';
export const ProjectsView = () => {
        const createProject = useCreateProject()
        const [commandDialogOpen, setCommandDialogOpen] = useState(false);

        useEffect(() => {
                const handleKeyDown = (event: KeyboardEvent) => {
                        if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
                                event.preventDefault();
                                setCommandDialogOpen(true);
                        }
                };
                window.addEventListener('keydown', handleKeyDown);
                return () => window.removeEventListener('keydown', handleKeyDown);
        }, []);

        return (
                <>
                        <ProjectsCommandDialog open={commandDialogOpen} onOpenChange={setCommandDialogOpen} />
                        <div className="min-h-screen bg-sidebar flex flex-col items-center justify-center p-6 md:p-16">
                                <div className="w-full max-w-xl mx-auto flex flex-col gap-4 items-center">
                                        <div className="flex justify-between gap-4 w-full items-center">
                                                <div className="flex items-center gap-2 w-full group/logo">
                                                        <Image src="/logo.svg" alt="Cortex" width={32} height={32} className='md:size-12' />
                                                        <h1 className={cn("text-3xl md:text-5xl font-bold font-mono pb-2", "group-hover/logo:text-primary")}>Cortex</h1>
                                                </div>
                                        </div>
                                        <div className='flex flex-col gap-4 w-full'>
                                                <div className='grid grid-cols-2 gap-2'>
                                                        <Button variant='outline' className='h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none' onClick={() => {
                                                                const projectName = uniqueNamesGenerator({
                                                                        dictionaries: [adjectives, animals, colors],
                                                                        separator: '-',
                                                                        length: 3,
                                                                });
                                                                createProject({ name: projectName });
                                                        }}>
                                                                <div className='flex items-center justify-between w-full'>
                                                                        <SparkleIcon className='size-4' />
                                                                        <Kbd className='bg-accent border'>CTRL + N</Kbd>
                                                                </div>
                                                                <div>
                                                                        <span className='text-sm'>New project</span>
                                                                </div>
                                                        </Button>
                                                        <Button variant='outline' className='h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none' onClick={() => { }}>
                                                                <div className='flex items-center justify-between w-full'>
                                                                        <FaGithub className='size-4' />
                                                                        <Kbd className='bg-accent border'>CTRL + I</Kbd>
                                                                </div>
                                                                <div>
                                                                        <span className='text-sm'>Import a project from GitHub</span>
                                                                </div>
                                                        </Button>
                                                </div>

                                                <ProjectsList onViewAll={() => setCommandDialogOpen(true)} />
                                        </div>
                                </div>
                        </div>
                </>
        );
}