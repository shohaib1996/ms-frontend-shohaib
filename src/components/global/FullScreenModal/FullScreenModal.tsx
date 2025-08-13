'use client';
import React, { ReactNode, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { createPortal } from 'react-dom';
import GlobalTooltip from '../GlobalTooltip';
import { useSearchParams } from 'next/navigation';

type TProps = {
    open: boolean;
    children?: ReactNode;
    title?: string | ReactNode;
    className?: string;
    customTitle?: string | ReactNode;
    buttons?: ReactNode;
    subTitle?: string;
    setOpen: (_: boolean) => void;
};

const FullScreenModal = React.forwardRef<HTMLDivElement, TProps>(
    (
        {
            open,
            children,
            setOpen,
            title = 'Full Screen Modal',
            className,
            subTitle,
            customTitle,
            buttons,
            ...rest
        },
        ref,
    ) => {
        useEffect(() => {
            const handleEscapeKey = (e: KeyboardEvent) => {
                if (e.key === 'Escape' && open) {
                    setOpen(false);
                }
            };

            if (open) {
                document.body.style.overflow = 'hidden';
                document.addEventListener('keydown', handleEscapeKey);
            }

            return () => {
                document.body.style.overflow = '';
                document.removeEventListener('keydown', handleEscapeKey);
            };
        }, [open, setOpen]);
        const searchParams = useSearchParams();

        const mode = searchParams.get('mode');

        return (
            <>
                {createPortal(
                    open && (
                        <div
                            ref={ref}
                            className='fixed inset-0 bg-pure-black/10 backdrop-blur-sm flex items-center justify-center z-40 animate-in fade-in-0'
                        >
                            <div
                                className={cn(
                                    'bg-foreground w-full h-full max-h-full max-w-full relative flex flex-col',
                                    className,
                                )}
                            >
                                {/* Header */}
                                {customTitle ? (
                                    customTitle
                                ) : (
                                    <div className='flex flex-col md:flex-row md:items-center justify-between border-b border-forground-border px-3 sm:px-5 py-2 sm:py-3 sticky top-0 bg-foreground gap-2 md:gap-4'>
                                        <div className='flex items-center gap-2 sm:gap-3'>
                                            <GlobalTooltip tooltip='Back'>
                                                <ArrowLeft
                                                    className='text-black cursor-pointer'
                                                    size={24}
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }
                                                />
                                            </GlobalTooltip>
                                            <div>
                                                <h3 className='text-black font-medium text-lg sm:text-xl'>
                                                    {title}
                                                </h3>
                                                {subTitle && (
                                                    <p className='text-xs text-gray font-light'>
                                                        {subTitle}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            {buttons}
                                        </div>
                                    </div>
                                )}

                                {/* Body */}
                                <div className='px-3 sm:px-5 pb-4 flex-1 h-full min-h-20 overflow-y-auto'>
                                    {children}
                                </div>
                            </div>
                        </div>
                    ),
                    document.body,
                )}
            </>
        );
    },
);

FullScreenModal.displayName = 'FullScreenModal';

export default FullScreenModal;
