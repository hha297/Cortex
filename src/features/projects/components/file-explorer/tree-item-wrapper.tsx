import { ContextMenu, ContextMenuContent, ContextMenuTrigger, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut } from "@/components/ui/context-menu";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { getItemPadding } from "./constants";
import { cn } from "@/lib/utils";

export const TreeItemWrapper = ({
        item,
        children,
        level = 0,
        isActive,
        onClick,
        onDoubleClick,
        onRename,
        onDelete,
        onCreateFile,
        onCreateFolder
}: {
        item: Doc<'files'>,
        children: React.ReactNode,
        level?: number,
        isActive?: boolean,
        onClick?: () => void,
        onDoubleClick?: () => void,
        onRename?: () => void,
        onDelete?: () => void,
        onCreateFile?: () => void,
        onCreateFolder?: () => void
}) => {
        return (
                <ContextMenu>
                        <ContextMenuTrigger asChild>
                                <button onClick={onClick} onDoubleClick={onDoubleClick} onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                                e.preventDefault();
                                                onRename?.();
                                        }
                                }}
                                        className={cn('group flex items-center gap-1 w-full h-8 hover:bg-accent/30 outline-none focus:ring-1 focus:ring-inset focus:ring-ring', isActive && 'bg-accent/30')}
                                        style={{ paddingLeft: getItemPadding(level, item.type === 'file') }}
                                >
                                        {children}
                                </button>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64" onCloseAutoFocus={(e) => e.preventDefault()}>
                                {item.type === 'folder' && (
                                        <>

                                                <ContextMenuItem onClick={onCreateFile}>New File...</ContextMenuItem>
                                                <ContextMenuItem onClick={onCreateFolder}>New Folder...</ContextMenuItem>
                                                <ContextMenuSeparator />
                                        </>

                                )}
                                <ContextMenuItem onClick={onRename}>Rename...<ContextMenuShortcut>Enter</ContextMenuShortcut></ContextMenuItem>
                                <ContextMenuItem onClick={onDelete}>Delete...<ContextMenuShortcut>Delete</ContextMenuShortcut></ContextMenuItem>
                        </ContextMenuContent>
                </ContextMenu>
        )
}
