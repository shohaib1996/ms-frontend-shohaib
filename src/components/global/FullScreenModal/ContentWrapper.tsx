'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContentWrapperProps {
    children: ReactNode;
    className?: string;
}

const ContentWrapper = ({ children, className }: ContentWrapperProps) => {
    return (
        <div
            className={cn(
                'w-full mx-auto px-4 sm:px-6',
                'max-w-full 2xl:max-w-[1440px]',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default ContentWrapper;
