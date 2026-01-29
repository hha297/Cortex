'use client';

import { ConversationSidebar } from '@/features/conversations/components/conversation-sidebar';
import { Id } from '../../../../convex/_generated/dataModel';
import { Navbar } from './navbar';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

const MIN_SIDEBAR_WIDTH = 200;
const MAX_SIDEBAR_WIDTH = 800;
const DEFAULT_CONVERSATION_SIDEBAR_WIDTH = 400;
const DEFAULT_MAIN_SIDE = 1000;

export const ProjectIdLayout = ({ projectId, children }: { projectId: Id<'projects'>; children: React.ReactNode }) => {
        return (
                <div className="w-full h-screen flex flex-col">
                        <Navbar projectId={projectId} />

                        <div className="flex-1 flex overflow-hidden">
                                <Allotment className="flex-1" defaultSizes={[DEFAULT_CONVERSATION_SIDEBAR_WIDTH, DEFAULT_MAIN_SIDE]}>
                                        <Allotment.Pane
                                                snap
                                                minSize={MIN_SIDEBAR_WIDTH}
                                                maxSize={MAX_SIDEBAR_WIDTH}
                                                preferredSize={DEFAULT_CONVERSATION_SIDEBAR_WIDTH}
                                        >
                                                <ConversationSidebar projectId={projectId} />
                                        </Allotment.Pane>
                                        <Allotment.Pane preferredSize={DEFAULT_MAIN_SIDE}>{children}</Allotment.Pane>
                                </Allotment>
                        </div>
                </div>
        );
};
