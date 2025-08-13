import { FolderOpen } from 'lucide-react';

interface EmptyProps {
    description?: string;
}

export function Empty({ description = 'No data available' }: EmptyProps) {
    return (
        <div className='flex flex-col items-center justify-center py-10 text-center'>
            <div className='rounded-full bg-muted p-3 mb-4'>
                <FolderOpen className='h-6 w-6 text-muted-foreground' />
            </div>
            <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
    );
}
