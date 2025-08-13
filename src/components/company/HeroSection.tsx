'use client';
import Image from 'next/image';
import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Organization } from '@/types';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface GlassCardProps {
    companyLogo?: string;
    name: string;
}

interface HeroSectionProps {
    organization: Organization;
    totalStudents?: number;
    totalBranches?: number;
    totalPrograms?: number;
    totalInstructors?: number;
    totalReviews?: number;
}

export function HeroSection({
    organization,
    totalStudents,
    totalBranches,
    totalPrograms,
    totalInstructors,
    totalReviews,
}: HeroSectionProps) {
    const { name, data } = organization;
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Calculate rotation based on mouse position relative to the card
    const calculateRotation = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setMousePosition({ x, y });
    };

    return (
        <section className='relative overflow-hidden'>
            {/* Background with overlay */}
            <div className='absolute inset-0 bg-primary'>
                <div
                    className='absolute inset-0 opacity-10'
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                        backgroundSize: '60px 60px',
                    }}
                ></div>
            </div>

            <div className='my-container mx-auto py-20 md:py-24 lg:pt-16 lg:pb-14 relative z-10'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-12 items-center'>
                    <div className='text-white space-y-2'>
                        <Badge className='bg-primary/20 text-pure-white hover:bg-primary/30 border-none px-3 py-1 text-sm mt-4'>
                            Leading Tech Education
                        </Badge>

                        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight pb-3 pt-2'>
                            Transform Your Career with{' '}
                            <span className='text-[#EAC808] relative'>
                                {name}
                                <svg
                                    className='absolute left-0 w-full -bottom-3'
                                    height='20'
                                    viewBox='0 0 100 10'
                                    preserveAspectRatio='none'
                                >
                                    <path
                                        d='M0 5 Q50 0, 100 5'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        className='text-warn'
                                    />
                                </svg>
                            </span>
                        </h1>

                        <p className='text-lg md:text-xl text-gray-300 max-w-xl'>
                            {data.about} Join thousands of successful graduates
                            who have launched rewarding careers in tech.
                        </p>

                        <div className='flex flex-wrap gap-4 pt-2'>
                            <Link href={'#programs'}>
                                <Button size='lg' className='bg-[#EAC808]'>
                                    Explore Programs{' '}
                                    <ArrowRight className='ml-2 h-4 w-4' />
                                </Button>
                            </Link>
                            <Link href={'/book-a-demo'}>
                                <Button variant='secondary' size='lg'>
                                    Request Info
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <div className='relative mt-6'>
                            {/* Decorative elements */}
                            <div className='absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-xl'></div>
                            <div className='absolute -bottom-6 -right-6 w-32 h-32 bg-primary/30 rounded-full blur-xl'></div>

                            {/* Logo container with glow effect */}
                            <motion.div
                                className='relative w-72 h-72 md:w-96 md:h-96 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden'
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    rotateX: isHovered
                                        ? `${mousePosition.y * 0.01}deg`
                                        : '0deg',
                                    rotateY: isHovered
                                        ? `${mousePosition.x * -0.01}deg`
                                        : '0deg',
                                }}
                                transition={{
                                    duration: 0.6,
                                    ease: 'easeOut',
                                }}
                                whileHover={{
                                    scale: 1.02,
                                }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onMouseMove={calculateRotation}
                            >
                                {/* Glass effect background */}
                                <motion.div
                                    className='absolute inset-0 bg-primary/30 backdrop-blur-md border border-white/20 rounded-2xl'
                                    animate={{
                                        backdropFilter: isHovered
                                            ? 'blur(16px)'
                                            : 'blur(12px)',
                                        backgroundColor: isHovered
                                            ? 'rgba(0, 0, 0, 0.35)'
                                            : 'rgba(0, 0, 0, 0.3)',
                                    }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Shine effect */}
                                <motion.div
                                    className='absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl'
                                    animate={{
                                        opacity: isHovered ? 0.3 : 0.2,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Moving shine effect */}
                                <motion.div
                                    className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl'
                                    initial={{ left: '-100%' }}
                                    animate={{
                                        left: isHovered ? '100%' : '-100%',
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        ease: 'easeInOut',
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: 'loop',
                                        repeatDelay: 0.5,
                                    }}
                                    style={{ width: '50%' }}
                                />

                                {/* Inner shadow for depth */}
                                <div className='absolute inset-0 shadow-inner rounded-2xl' />

                                {/* Content */}
                                <motion.div
                                    animate={{
                                        y: [0, -5, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        ease: 'easeInOut',
                                        repeat: Number.POSITIVE_INFINITY,
                                    }}
                                    className='relative z-10 w-full h-full'
                                >
                                    {/* Video container with proper cover styling */}
                                    <div className='absolute inset-0 w-full h-full'>
                                        <div className='relative w-full h-full'>
                                            <iframe
                                                className='absolute inset-0 w-full h-full object-cover rounded-2xl'
                                                src='https://www.youtube.com/embed/qeAe_iDSMbE'
                                                title='Join Revolutionary Private Bootcamp Today. Pay After Getting A Job!'
                                                frameBorder='0'
                                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                                referrerPolicy='strict-origin-when-cross-origin'
                                                allowFullScreen
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Key stats */}
                <div className='grid grid-cols-1 sm:grid-cols-5 gap-6 pt-6 mt-3'>
                    <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center'>
                        <p className='text-3xl font-bold text-pure-white'>
                            {totalStudents}
                        </p>
                        <p className='text-sm text-gray-300'>Total Students</p>
                    </div>
                    <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center'>
                        <p className='text-3xl font-bold text-pure-white'>
                            {totalBranches}
                        </p>
                        <p className='text-sm text-gray-300'>Branches</p>
                    </div>
                    <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center'>
                        <p className='text-3xl font-bold text-pure-white'>
                            {totalPrograms}
                        </p>
                        <p className='text-sm text-gray-300'>
                            Programs Offered
                        </p>
                    </div>
                    <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center'>
                        <p className='text-3xl font-bold text-pure-white'>
                            {totalInstructors}
                        </p>
                        <p className='text-sm text-gray-300'>
                            Total Instructors
                        </p>
                    </div>
                    <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center'>
                        <p className='text-3xl font-bold text-pure-white'>
                            {totalReviews}
                        </p>
                        <p className='text-sm text-gray-300'>Total Reviews</p>
                    </div>
                    {/* <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center'>
                                <p className='text-3xl font-bold text-pure-white'>
                                    {totalBranches}
                                </p>
                                <p className='text-sm text-gray-300'>
                                    Job Placement
                                </p>
                            </div>
                            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center'>
                                <p className='text-3xl font-bold text-pure-white'>
                                    {totalBranches}
                                </p>
                                <p className='text-sm text-gray-300'>
                                    Years Active
                                </p>
                            </div> */}
                </div>
                {/* Scroll indicator */}
                <div className='absolute -bottom-1.5 z-50 left-1/2 transform -translate-x-1/2 animate-bounce'>
                    <div className='w-7 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2'>
                        <div className='w-1 h-3 bg-white/60 rounded-full'></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
