'use client';
import Image from 'next/image';
import type React from 'react';
import Marquee from 'react-fast-marquee';
import { cn } from '@/lib/utils';

interface AlumniData {
    title?: string;
    images?: string[];
}

interface BootcampProps {
    alumni?: AlumniData;
    [key: string]: any;
}

interface IndustryProps {
    bootcamp: BootcampProps;
    className?: string;
}

const Industry: React.FC<IndustryProps> = ({ bootcamp, className }) => {
    // Return early if no images to display
    if (!bootcamp?.alumni?.images?.length) {
        return null;
    }

    return (
        <section className={cn('xl:py-6 py-6 bg-foreground', className)}>
            <div className='my-container'>
                {bootcamp?.alumni?.title && (
                    <div className='text-center mb-10'>
                        <h2 className='text-3xl font-bold text-black mb-4'>
                            {bootcamp.alumni.title}
                        </h2>
                        <div className='w-20 h-1 bg-emerald-500 mx-auto rounded-full'></div>
                    </div>
                )}

                <div className='relative overflow-hidden rounded-xl shadow-md bg-slate-50 dark:bg-slate-800 p-8'>
                    {/* Decorative elements */}
                    <div className='absolute top-0 left-0 w-20 h-20 bg-emerald-100 dark:bg-emerald-800 rounded-br-3xl opacity-70'></div>
                    <div className='absolute bottom-0 right-0 w-20 h-20 bg-emerald-100 dark:bg-emerald-800 rounded-tl-3xl opacity-70'></div>

                    <Marquee
                        speed={40}
                        gradientWidth={50}
                        gradientColor={'245, 247, 250'}
                        className='py-4'
                    >
                        <div className='flex items-center gap-12'>
                            {bootcamp?.alumni?.images?.map(
                                (imageUrl, index) => (
                                    <div
                                        key={index}
                                        className='relative h-20 md:h-24 aspect-auto flex-shrink-0 group'
                                    >
                                        <Image
                                            src={imageUrl || '/placeholder.svg'}
                                            alt={`Alumni company ${index + 1}`}
                                            width={200}
                                            height={80}
                                            className='object-contain h-full w-auto filter grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110'
                                        />
                                    </div>
                                ),
                            )}
                        </div>
                    </Marquee>
                </div>
            </div>
        </section>
    );
};

export default Industry;
