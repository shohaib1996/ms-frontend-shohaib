'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from '@/components/ui/dialog';

export default function FullScreenDialogExample() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isFullScreen, setIsFullScreen] = React.useState(false);

    return (
        <div className='flex flex-col items-center justify-center gap-4 p-8'>
            <h1 className='text-2xl font-bold'>Dialog Examples</h1>

            {/* Regular Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => setIsFullScreen(false)}>
                        Open Regular Dialog
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Regular Dialog</DialogTitle>
                        <DialogDescription>
                            This is a regular dialog with default sizing and a
                            close button.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='py-4'>
                        <p>This dialog has the standard size and appearance.</p>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Full Screen Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => setIsFullScreen(true)}>
                        Open Full Screen Dialog
                    </Button>
                </DialogTrigger>
                <DialogContent fullScreen={isFullScreen}>
                    <DialogHeader>
                        <DialogTitle>Full Screen Dialog</DialogTitle>
                        <DialogDescription>
                            This dialog takes up the entire screen and has no
                            close button.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col items-center justify-center flex-1'>
                        <p className='mb-4'>
                            This dialog is in full screen mode with no close (X)
                            button.
                        </p>
                        <Button onClick={() => setIsOpen(false)}>
                            Close Dialog
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
