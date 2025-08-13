import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

const GlobalTitle = ({
    color = 'black',
    title,
    subTitle,
    className,
    ngClass,
}: {
    color?: 'black' | 'white';
    title: string;
    subTitle?: string | ReactNode;
    className?: string;
    ngClass?: string;
}) => {
    return (
        <div className='flex flex-col gap-1 items-center justify-center text-center'>
            <div
                className={cn(
                    `title lg:text-5xl md:text-3xl text-xl  text-${color} font-bold leading-[1.1] text-center`,
                    className,
                )}
            >
                {title}
            </div>
            <div
                className={cn(
                    `title text-[22px] text-center text-${color}`,
                    ngClass,
                )}
            >
                {subTitle}
            </div>
        </div>
    );
};

export default GlobalTitle;
