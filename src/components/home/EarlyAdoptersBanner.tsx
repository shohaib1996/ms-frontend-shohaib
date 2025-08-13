'use client';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
const wave = '/wave.png';

export default function EarlyAdoptersBanner() {
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
        <div className='bg-background w-full my-12'>
            <div className='my-container mx-auto px-6 '>
                <div className='relative overflow-hidden bg-primary rounded-2xl p-8 md:p-12 text-center'>
                    {/* Background */}
                    <div className='absolute inset-0 top-32 left-0 right-0'>
                        <Image
                            src={wave}
                            alt='img'
                            width={500}
                            height={500}
                            className='w-full absolute inset-0 bottom-0 left-0 right-0 animate-pulse'
                        />
                    </div>

                    {/* Content */}
                    <div className='relative z-10'>
                        {/* Limited Offer Badge */}
                        <div className='inline-flex items-center gap-1.5 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='lucide lucide-sparkles'
                            >
                                <path d='m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z' />
                            </svg>
                            Limited Offer
                        </div>

                        {/* Heading */}
                        <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
                            Join Our Early Adopters Program
                        </h2>

                        {/* Subtext */}
                        <p className='text-white/90 text-lg mb-8 max-w-2xl mx-auto'>
                            Get exclusive benefits including 90% revenue share,
                            priority support,
                            <br className='hidden md:block' /> and founding
                            member status.
                        </p>

                        {/* Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 justify-center mb-6'>
                            <button
                                onClick={() => scrollToSection('faq')}
                                className='inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors'
                            >
                                Claim Your Spot Now
                                <ArrowUpRight size={18} />
                            </button>
                            <button
                                onClick={() => scrollToSection('faq')}
                                className='inline-flex items-center justify-center gap-2 bg-transparent border border-white text-white font-medium px-6 py-3 rounded-full hover:bg-white/10 transition-colors'
                            >
                                See How It Works
                                <ArrowUpRight size={18} />
                            </button>
                        </div>

                        {/* Limited spots text */}
                        <p className='text-white/90 text-sm'>
                            <span className='font-medium'>
                                Limited spots available!
                            </span>{' '}
                            Once filled, standard 70% revenue share applies.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
