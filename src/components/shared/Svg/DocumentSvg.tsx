import { cn } from '@/lib/utils';
import React from 'react';

const DocumentSvg = ({ className }: { className?: string }) => {
    return (
        <svg
            viewBox='0 0 31 31'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={cn('size-6 stroke-primary', className)}
        >
            <path
                d='M27.125 9.04183V21.9585C27.125 25.8335 25.1875 28.4168 20.6667 28.4168H10.3333C5.8125 28.4168 3.875 25.8335 3.875 21.9585V9.04183C3.875 5.16683 5.8125 2.5835 10.3333 2.5835H20.6667C25.1875 2.5835 27.125 5.16683 27.125 9.04183Z'
                strokeWidth='2'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M18.7292 5.8125V8.39583C18.7292 9.81667 19.8917 10.9792 21.3125 10.9792H23.8958'
                strokeWidth='2'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M10.3333 16.7915H15.5'
                strokeWidth='2'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M10.3333 21.9585H20.6667'
                strokeWidth='2'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

export default DocumentSvg;
