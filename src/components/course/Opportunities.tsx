'use client';
import type React from 'react';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { cn } from '@/lib/utils';
import MessagePreview from '../global/MarkdownPreview';

interface OpportunitiesData {
    title?: string;
    description?: string;
}

interface OpportunitiesProps {
    opportunities: OpportunitiesData;
    index: number;
    className?: string;
}

const Opportunities: React.FC<OpportunitiesProps> = ({
    opportunities,
    index,
    className,
}) => {
    const isMobile = useMediaQuery({
        query: '(max-width: 768px)',
    });

    if (!opportunities?.title && !opportunities?.description) {
        return null;
    }

    return (
        <section className={cn('py-9 bg-foreground', className)}>
            <div className='container mx-auto px-4 md:px-6'>
                <div
                    className={cn(
                        'grid lg:grid-cols-2 gap-12 lg:gap-16 items-center',
                        index % 2 === 0 && !isMobile
                            ? 'lg:[&>div:first-child]:order-last'
                            : '',
                    )}
                >
                    <div className='space-y-3'>
                        {opportunities?.title && (
                            <h2 className='text-3xl md:text-4xl font-bold text-black leading-tight'>
                                {opportunities.title}
                            </h2>
                        )}

                        {opportunities?.description && (
                            <div className='prose text-dark-gray prose-slate max-w-none'>
                                <MessagePreview
                                    text={opportunities.description}
                                />
                            </div>
                        )}
                    </div>

                    <div
                        className={cn(
                            'relative',
                            isMobile ? 'order-first' : '',
                        )}
                    >
                        <div className='absolute inset-0 bg-gradient-to-tr from-emerald-100 to-sky-100 rounded-3xl transform rotate-2 opacity-70'></div>
                        <div className='relative overflow-hidden rounded-2xl shadow-lg'>
                            <Image
                                width={1080}
                                height={720}
                                src='/landing_page/career.png'
                                alt='Career opportunities'
                                className='w-full h-auto object-cover'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Opportunities;
