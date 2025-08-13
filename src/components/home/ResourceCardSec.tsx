'use client';

import { Download } from 'lucide-react';
import type React from 'react';
import { useCallback } from 'react';

export default function ResourceCardSec({
    data,
}: {
    data: {
        image: string | React.ReactNode;
        title: string;
        subTitle: string;
        type?: string;
        category?: string;
    };
}) {
    const scrollToSection = useCallback((elementId: string) => {
        const element = document.getElementById(elementId);
        if (element) {
            // Prevent abrupt jumps by using smooth scrolling
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, []);
    return (
        <div className='w-full overflow-hidden rounded-lg bg-foreground shadow'>
            <div className='p-5 flex flex-col h-full'>
                <div className='mb-4 flex items-center gap-4'>
                    <div className='h-16 w-16 min-w-[64px] min-h-[64px] bg-primary-foreground flex items-center justify-center rounded-full'>
                        {typeof data.image === 'string' ? (
                            <img
                                src={data.image || '/placeholder.svg'}
                                alt='Icon'
                                className='h-10 w-10 object-contain'
                            />
                        ) : (
                            data.image
                        )}
                    </div>
                    <p className='text-xl font-bold text-black line-clamp-2'>
                        {data.title}
                    </p>
                </div>

                <p className='mb-6 text-gray flex-grow line-clamp-3'>
                    {data.subTitle}
                </p>
                {/* <hr className='mb-2' /> */}
                {/* <button onClick={() => scrollToSection("faq")} className='mt-auto flex w-full items-center justify-center gap-2 rounded-md bg-red-500/10 px-4 py-3 text-danger transition hover:bg-red-100'>
                    <Download size={18} />
                    <span className='font-medium'>Download Resource</span>
                </button> */}
            </div>
        </div>
    );
}
