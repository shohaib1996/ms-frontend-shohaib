'use client';
import type React from 'react';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { cn } from '@/lib/utils';
import MessagePreview from '../global/MarkdownPreview';

interface CertificationData {
    title?: string;
    description?: string;
}

interface ObtainCertificationProps {
    obtainCertification: CertificationData;
    index: number;
    className?: string;
}

const ObtainCertification: React.FC<ObtainCertificationProps> = ({
    obtainCertification,
    index,
    className,
}) => {
    const isMobile = useMediaQuery({
        query: '(max-width: 768px)',
    });

    if (!obtainCertification?.title && !obtainCertification?.description) {
        return null;
    }

    return (
        <section
            className={cn(
                'xl:py-8 py-6 bg-gradient-to-br dark:from-slate-950 dark:to-blue-950 from-slate-100 to-blue-100',
                className,
            )}
        >
            <div className='my-container'>
                <div
                    className={cn(
                        'grid lg:grid-cols-2 gap-12 lg:gap-16 items-center',
                        index % 2 === 0 && !isMobile
                            ? 'lg:[&>div:first-child]:order-last'
                            : '',
                    )}
                >
                    <div className='space-y-3'>
                        {obtainCertification?.title && (
                            <div className='relative'>
                                <div className='absolute -left-3 top-0 bottom-0 w-1 bg-emerald-500 rounded-full'></div>
                                <h2 className='text-3xl md:text-4xl font-bold text-black leading-tight'>
                                    {obtainCertification.title}
                                </h2>
                            </div>
                        )}

                        {obtainCertification?.description && (
                            <div className='max-w-none text-dark-gray lg:text-lg'>
                                <MessagePreview
                                    text={obtainCertification.description}
                                />
                            </div>
                        )}
                    </div>

                    <div
                        className={cn(
                            'relative bg-background rounded-lg',
                            isMobile ? 'order-first' : '',
                        )}
                    >
                        <div className='absolute inset-0 bg-gradient-to-tr dark:from-emerald-900 dark:to-blue-950 from-emerald-100 to-blue-100 rounded-3xl transform -rotate-2 opacity-70'></div>
                        <div className='relative overflow-hidden rounded-2xl shadow-lg'>
                            <div className='aspect-[4/3] relative'>
                                <Image
                                    fill
                                    src='/landing_page/obtain-certifications.png'
                                    alt='Certification visualization'
                                    className='object-contain'
                                />
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className='absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl'></div>
                        <div className='absolute -top-4 -left-4 w-16 h-16 bg-blue-500/20 rounded-full blur-lg'></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ObtainCertification;
