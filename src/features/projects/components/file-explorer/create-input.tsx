import { FileIcon, FolderIcon } from '@react-symbols/icons/utils'
import { ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';
import { getItemPadding } from './constants';

export const CreateInput = ({ type, level, onSubmit, onCancel }: { type: 'file' | 'folder', level: number, onSubmit: (name: string) => void, onCancel: () => void }) => {
        const [value, setValue] = useState('');

        const handleSubmit = () => {
                const trimmedValue = value.trim();
                if (trimmedValue) {
                        onSubmit(trimmedValue);
                } else {
                        onCancel();
                }
        }
        return (
                <div className="w-full flex items-center gap-2 h-8 bg-accent/30" style={{ paddingLeft: getItemPadding(level, type === 'file') }}>
                        <div className="flex items-center gap-2">
                                {type === 'folder' && (
                                        <ChevronRightIcon className='size-4 shrink-0 text-muted-foreground' />
                                )}
                                {type === 'file' && (
                                        <FileIcon fileName={value} autoAssign className='size-4' />
                                )}
                                {type === 'folder' && (
                                        <FolderIcon folderName={value} className='size-4' />
                                )}
                        </div>
                        <input
                                autoFocus
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className='flex-1 bg-transparent text-sm outline-none focus:ring-1 focus:ring-inset focus:ring-ring'
                                onBlur={handleSubmit}
                                onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                                handleSubmit();
                                        }
                                }}
                                onKeyUp={(e) => {
                                        if (e.key === 'Escape') {
                                                onCancel();
                                        }
                                }}
                        />
                </div>
        )
}