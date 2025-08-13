'use client';

import type React from 'react';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

type MethodologyStep = {
    id: number;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
};

const methodologySteps: MethodologyStep[] = [
    {
        id: 1,
        name: 'Concept Discovery',
        description:
            'Begin with interactive lectures and guided exploration to understand core concepts and theoretical foundations.',
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <circle cx='12' cy='12' r='10' />
                <path d='M12 16v-4' />
                <path d='M12 8h.01' />
            </svg>
        ),
        color: 'from-indigo-500 to-indigo-600',
    },
    {
        id: 2,
        name: 'Practical Application',
        description:
            'Apply concepts through hands-on projects and real-world scenarios to build practical skills and muscle memory.',
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' />
            </svg>
        ),
        color: 'from-blue-500 to-blue-600',
    },
    {
        id: 3,
        name: 'Collaborative Learning',
        description:
            'Engage with peers through group projects, discussions, and peer reviews to gain diverse perspectives and communication skills.',
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
                <circle cx='9' cy='7' r='4' />
                <path d='M23 21v-2a4 4 0 0 0-3-3.87' />
                <path d='M16 3.13a4 4 0 0 1 0 7.75' />
            </svg>
        ),
        color: 'from-purple-500 to-purple-600',
    },
    {
        id: 4,
        name: 'Expert Feedback',
        description:
            'Receive personalized guidance and feedback from industry professionals to refine your skills and correct misconceptions.',
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
            </svg>
        ),
        color: 'from-red-500 to-red-600',
    },
    {
        id: 5,
        name: 'Reflection & Mastery',
        description:
            'Consolidate learning through reflection exercises, knowledge assessments, and capstone projects that demonstrate mastery.',
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <path d='M12 20h9' />
                <path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' />
            </svg>
        ),
        color: 'from-green-500 to-green-600',
    },
];

const stepColors = [
    'from-blue-500 to-blue-600',
    'from-indigo-500 to-indigo-600',
    'from-purple-500 to-purple-600',
    'from-red-500 to-red-600',
    'from-green-500 to-green-600',
];

type MethodologyFeature = {
    title: string;
    description: string;
    icon: React.ReactNode;
};

const methodologyFeatures: MethodologyFeature[] = [
    {
        title: 'Industry-Aligned Curriculum',
        description:
            'Our curriculum is developed in collaboration with industry leaders to ensure you learn the most relevant and in-demand skills.',
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-primary-white'
            >
                <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
            </svg>
        ),
    },
    {
        title: 'Adaptive Learning Paths',
        description:
            'Our platform adapts to your progress, providing additional resources or challenges based on your individual performance.',
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-primary-white'
            >
                <path d='M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z' />
                <path d='M12 13v8' />
                <path d='M12 3v3' />
            </svg>
        ),
    },
    {
        title: 'Continuous Assessment',
        description:
            "Regular knowledge checks and project evaluations provide ongoing feedback, ensuring you're making steady progress toward your goals.",
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-primary-white'
            >
                <path d='M9 11l3 3L22 4' />
                <path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' />
            </svg>
        ),
    },
    {
        title: 'Mentorship & Support',
        description:
            'Access to mentors, teaching assistants, and a supportive community ensures you never get stuck and always have guidance when needed.',
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-primary-white'
            >
                <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                <circle cx='9' cy='7' r='4' />
                <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
                <path d='M16 3.13a4 4 0 0 1 0 7.75' />
            </svg>
        ),
    },
];

interface Methology {
    id: number;
    name: string;
    description: string;
    icon: string;
}

interface methologyProps {
    methodology: Methology[];
}

export function LearningMethodology({ methodology }: methologyProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0.4, 1, 1, 0.4],
    );
    const scale = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0.8, 1, 1, 0.8],
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };
    const displayMethodology = methodology.length > 0 ? methodology : [];
    return (
        <section
            ref={sectionRef}
            id='methodology'
            className='py-3 pb-8 relative overflow-hidden '
        >
            <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
                <motion.div
                    style={{ opacity, scale }}
                    className='absolute -top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-indigo-200/30 to-transparent blur-3xl dark:from-indigo-700/20'
                ></motion.div>
                <motion.div
                    style={{ opacity, scale }}
                    className='absolute top-[60%] -left-[10%] w-[30%] h-[30%] rounded-full bg-gradient-to-tl from-primary/10 to-transparent blur-3xl'
                ></motion.div>
            </div>

            <div className='my-container relative z-10'>
                <motion.div
                    className='text-center mb-4'
                    initial='hidden'
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                >
                    <motion.h2
                        variants={itemVariants}
                        className='text-3xl md:text-4xl font-bold text-black mb-4'
                    >
                        Our Learning Methodology
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className='text-dark-gray max-w-2xl mx-auto'
                    >
                        We&apos;ve developed a proven approach to help you
                        master new skills effectively and efficiently, combining
                        theory with practical application and personalized
                        support.
                    </motion.p>
                </motion.div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-3'>
                    <div>
                        <motion.div
                            initial='hidden'
                            animate={isInView ? 'visible' : 'hidden'}
                            variants={containerVariants}
                            className='space-y-6'
                        >
                            <motion.h3
                                variants={itemVariants}
                                className='text-2xl font-semibold text-black mb-4'
                            >
                                The 5-Step Learning Cycle
                            </motion.h3>
                            <motion.p
                                variants={itemVariants}
                                className='text-dark-gray mb-8'
                            >
                                Our methodology follows a proven 5-step cycle
                                that ensures deep understanding and practical
                                mastery of every subject. Each step builds on
                                the previous one to create a comprehensive
                                learning experience.
                            </motion.p>
                            {/* className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-r ${step.color} mr-4`} */}
                            {/* {displayMethodology?.map((step) => (
                                <motion.div
                                    key={step.id}
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                    className='flex items-start p-4 rounded-lg bg-white/80 dark:bg-[#1e1f2e]/80 backdrop-blur-sm border border-indigo-100/30 dark:border-indigo-800/30 shadow-sm'
                                >
                                    <div

                                        className={`relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-r from-purple-500 to-purple-600 mr-4`}
                                    >

                                        {typeof step.icon === 'string' ? (
                                            <Image
                                                src={step.icon}
                                                alt={step?.name || 'Methology'}
                                                fill
                                                className='object-cover object-center rounded-full'
                                            />
                                        ) : (
                                            <span className='w-8 h-8 flex items-center justify-center'>
                                                {step.icon}
                                            </span>
                                        )}

                                    </div>
                                    <div>
                                        <h4 className='text-lg font-medium text-black mb-1'>
                                            {step.name}
                                        </h4>
                                        <p className='text-dark-gray'>
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))} */}
                            {/* const stepColors = [
                            'from-indigo-500 to-indigo-600',
                            'from-blue-500 to-blue-600',
                            'from-purple-500 to-purple-600',
                            'from-red-500 to-red-600',
                            'from-green-500 to-green-600'
                            ]; */}

                            {displayMethodology?.map((step, index) => (
                                <motion.div
                                    key={step.id}
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                    className='flex items-start p-4 rounded-lg bg-white/80 dark:bg-[#1e1f2e]/80 backdrop-blur-sm border border-indigo-100/30 dark:border-indigo-800/30 shadow-sm'
                                >
                                    <div
                                        className={`relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-r ${stepColors[index % stepColors.length]} mr-4`}
                                    >
                                        {typeof step.icon === 'string' ? (
                                            <Image
                                                src={step.icon}
                                                alt={
                                                    step?.name || 'Methodology'
                                                }
                                                fill
                                                className='object-cover object-center rounded-full'
                                            />
                                        ) : (
                                            <span className='w-8 h-8 flex items-center justify-center'>
                                                {step.icon}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className='text-lg font-medium text-black mb-1'>
                                            {step.name}
                                        </h4>
                                        <p className='text-dark-gray'>
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <div className='relative'>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={
                                isInView
                                    ? { opacity: 1, scale: 1 }
                                    : { opacity: 0, scale: 0.8 }
                            }
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className='relative z-10'
                        >
                            <div className='relative h-[500px] w-full rounded-xl overflow-hidden shadow-xl'>
                                <Image
                                    src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/learning-methodology-Qr03LsACcn2PS0T670Ua7ulJXpOv5i.png'
                                    alt='Learning methodology illustration'
                                    fill
                                    className='object-cover'
                                />
                            </div>
                            <div className='absolute -bottom-6 -right-6 bg-gradient-to-r from-indigo-600 to-primary p-6 rounded-lg shadow-lg max-w-xs'>
                                <div className='flex items-center mb-2'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='20'
                                        height='20'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        className='text-white mr-2'
                                    >
                                        <path d='M5.8 11.3 2 22l10.7-3.79' />
                                        <path d='M4 3h.01' />
                                        <path d='M22 8h.01' />
                                        <path d='M15 2h.01' />
                                        <path d='M22 20h.01' />
                                        <path d='m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10' />
                                        <path d='m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17' />
                                        <path d='m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7' />
                                        <path d='M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z' />
                                    </svg>
                                    <h4 className='text-white font-medium'>
                                        Proven Results
                                    </h4>
                                </div>
                                <p className='text-white/90 text-sm'>
                                    Our methodology has helped over 1,000
                                    students master new skills and transition to
                                    better careers.
                                </p>
                            </div>
                        </motion.div>

                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-indigo-300/20 to-primary/20 dark:from-indigo-700/10 dark:to-primary/10 rounded-full blur-3xl -z-10'></div>
                    </div>
                </div>

                {/* <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                    }
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'
                >
                    {methodologyFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className='bg-white/80 dark:bg-[#1e1f2e]/80 backdrop-blur-sm p-6 rounded-lg border border-indigo-100/30 dark:border-indigo-800/30 shadow-sm'
                        >
                            <div className='w-12 h-12 bg-primary-light dark:bg-primary rounded-full flex items-center justify-center mb-4'>
                                {feature.icon}
                            </div>
                            <h4 className='text-lg font-medium text-black mb-2'>
                                {feature.title}
                            </h4>
                            <p className='text-dark-gray text-sm'>
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div> */}
            </div>
        </section>
    );
}
