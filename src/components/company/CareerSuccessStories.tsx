'use client';

import type { SuccessStore } from '@/types';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import NotFoundSection from './NotFoundSection';

type SuccessStory = {
    id: number;
    name: string;
    previousRole: string;
    role: string;
    company: string;
    courseCompleted: string;
    salaryIncrease: string;
    testimonial: string;
    avatar: string;
    companyLogo: string;
};

const staticSuccessStories: SuccessStory[] = [
    {
        id: 2,
        name: 'David Chen',
        previousRole: 'Retail Manager',
        role: 'Full Stack Developer',
        company: 'InnovateSoft',
        courseCompleted: 'Full Stack Web Development Bootcamp',
        salaryIncrease: '112%',
        testimonial:
            'After 8 years in retail, I was looking for a complete career change. The bootcamp was intense but worth every minute. The career coaching and portfolio development helped me secure multiple job offers within weeks of graduating.',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsp2_53glUyRUJR4LnI5qMbfROnLIbKkFPNw&s',
        companyLogo:
            'https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/enrollment/1747897406726-images-removebg-preview.png',
    },
    {
        id: 1,
        name: 'Sarah Johnson',
        previousRole: 'Marketing Assistant',
        role: 'Senior Digital Marketing Specialist',
        company: 'TechGrowth Inc.',
        courseCompleted: 'Digital Marketing Mastery',
        salaryIncrease: '87%',
        testimonial:
            'The practical skills I gained through the Digital Marketing Mastery course completely transformed my career trajectory. Within 3 months of graduation, I landed a senior role with nearly double my previous salary.',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdGMqxrl30ZSHtB3Wv_zn24qp5-EzPfdFlhA&s',
        companyLogo:
            'https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/enrollment/1747897406726-images-removebg-preview.png',
    },

    {
        id: 3,
        name: 'Maya Patel',
        previousRole: 'Elementary School Teacher',
        role: 'UX/UI Designer',
        company: 'DesignForward',
        courseCompleted: 'UX/UI Design Professional Certificate',
        salaryIncrease: '65%',
        testimonial:
            'I never thought I could transition from education to tech design so smoothly. The course projects became the foundation of my portfolio, and the industry mentors provided invaluable guidance throughout my job search.',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuVSS82IpyjoQIX7vq3Yncq-LX7p900_g12uhM-1tZg4Q6aktcQ-_d8V1CVLMGaitnApM&usqp=CAU',
        companyLogo:
            'https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/enrollment/1747897406726-images-removebg-preview.png',
    },
    {
        id: 4,
        name: 'James Wilson',
        previousRole: 'Sales Representative',
        role: 'Data Scientist',
        company: 'AnalyticsPro',
        courseCompleted: 'Data Science & Machine Learning Immersive',
        salaryIncrease: '94%',
        testimonial:
            "The hands-on projects with real-world datasets prepared me for exactly the kind of work I'm doing now. The career transition was challenging but the ongoing support from alumni and instructors made all the difference.",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrBsm5vacYPVALOEkkj_l4UY4hRDtDxKtsoqnQ7nLX_AFY4L2PqNnKur3nJwh42y9FIfo&usqp=CAU',
        companyLogo:
            'https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/enrollment/1747897406726-images-removebg-preview.png',
    },
];

interface successStoriesProps {
    successStories?: SuccessStore[];
}

export function CareerSuccessStories({ successStories }: successStoriesProps) {
    const [activeStory, setActiveStory] = useState<number>(0);
    const [expanded, setExpanded] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
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

    const cardVariants = {
        initial: { scale: 0.95, opacity: 0 },
        animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
        exit: { scale: 0.95, opacity: 0, transition: { duration: 0.3 } },
        hover: {
            y: -8,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.3 },
        },
    };

    const statVariants = {
        initial: { scale: 0.8, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.5, delay: 0.2 },
        },
    };
    const allStories = successStories || [];
    // const displayStories = expanded && staticSuccessStories && staticSuccessStories.length > 0 ? staticSuccessStories?.slice(0, 2) : staticSuccessStories;
    const displayStories = expanded
        ? (allStories ?? [])
        : (allStories ?? []).slice(0, 2);

    const shouldShowViewAllButton = !expanded && allStories?.length > 2;
    return (
        <section
            ref={sectionRef}
            id='success-stories'
            className='py-3 bg-gradient-to-r from-violet-200 to-white
             dark:bg-gradient-to-r dark:from-violet-300 dark:to-violet-900 relative overflow-hidden'
        >
            <div className='my-container'>
                <motion.div
                    className='text-center mb-4'
                    initial='hidden'
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                >
                    <motion.h2
                        variants={itemVariants}
                        className='text-3xl md:text-4xl font-bold text-black mb-2'
                    >
                        Career Success Stories
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className='text-dark-gray max-w-2xl mx-auto'
                    >
                        Real transformations from our graduates who turned their
                        education into remarkable career achievements.
                    </motion.p>
                </motion.div>

                {displayStories.length === 0 ? (
                    <NotFoundSection itemText='No Success Story found' />
                ) : (
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                        <div className='order-2 lg:order-1'>
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={displayStories[activeStory]?.id}
                                    variants={cardVariants}
                                    initial='initial'
                                    animate='animate'
                                    exit='exit'
                                    className='bg-gradient-to-r from-white to-white dark:from-[#1e1f2e] dark:to-indigo-950/80 rounded-xl shadow-lg overflow-hidden'
                                >
                                    <div className='p-3'>
                                        <div className='flex items-center mb-3'>
                                            <div className='relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-primary'>
                                                <Image
                                                    src={
                                                        displayStories[
                                                            activeStory
                                                        ]?.avatar &&
                                                        displayStories[
                                                            activeStory
                                                        ].avatar.trim() !== ''
                                                            ? displayStories[
                                                                  activeStory
                                                              ].avatar
                                                            : '/avatar.png'
                                                    }
                                                    alt={
                                                        displayStories[
                                                            activeStory
                                                        ]?.name || 'Avatar'
                                                    }
                                                    fill
                                                    className='object-cover'
                                                />
                                            </div>
                                            <div>
                                                <h3 className='text-xl font-semibold text-black'>
                                                    {
                                                        displayStories[
                                                            activeStory
                                                        ]?.name
                                                    }
                                                </h3>
                                                <p className='text-primary-white text-sm'>
                                                    {
                                                        displayStories[
                                                            activeStory
                                                        ]?.role
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className='mb-3'>
                                            <div className='flex items-center mb-4'>
                                                <div className='w-12 h-12 flex items-center bg-primary-light justify-center rounded-full mr-3'>
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
                                                        className='text-primary-white'
                                                    >
                                                        <path d='M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z' />
                                                        <path d='M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12' />
                                                        <path d='M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17' />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className='text-sm text-dark-gray'>
                                                        Previous Role
                                                    </p>
                                                    <p className='font-medium text-black'>
                                                        {
                                                            displayStories[
                                                                activeStory
                                                            ]?.previousRole
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='flex items-center mb-4'>
                                                <div className='w-12 h-12 flex items-center justify-center bg-primary-light rounded-full mr-3'>
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
                                                        className='text-primary-white'
                                                    >
                                                        <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className='text-sm text-dark-gray'>
                                                        Course Completed
                                                    </p>
                                                    <p className='font-medium text-black'>
                                                        {
                                                            displayStories[
                                                                activeStory
                                                            ]?.courseCompleted
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <motion.div
                                                variants={statVariants}
                                                initial='initial'
                                                animate='animate'
                                                className='bg-primary-light rounded-lg p-3 mb-3'
                                            >
                                                <p className='text-sm text-dark-gray mb-1'>
                                                    Salary Increase
                                                </p>
                                                <p className='text-2xl font-bold text-primary-white'>
                                                    {
                                                        displayStories[
                                                            activeStory
                                                        ]?.salaryIncrease
                                                    }
                                                </p>
                                            </motion.div>
                                        </div>

                                        <blockquote className='italic text-dark-gray border-l-4 border-primary pl-4 py-2'>
                                            &quot;
                                            {
                                                displayStories[activeStory]
                                                    ?.testimonial
                                            }
                                            &quot;
                                        </blockquote>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className='order-1 lg:order-2'>
                            <motion.div
                                initial='hidden'
                                animate={isInView ? 'visible' : 'hidden'}
                                variants={containerVariants}
                                className='space-y-4'
                            >
                                <motion.h3
                                    variants={itemVariants}
                                    className='text-2xl font-semibold text-black mb-6'
                                >
                                    Browse Success Stories
                                </motion.h3>

                                {displayStories?.map((story, index) => (
                                    <motion.div
                                        key={story?.id}
                                        variants={cardVariants}
                                        whileHover='hover'
                                        onClick={() => setActiveStory(index)}
                                        className={`cursor-pointer p-4 rounded-lg transition-all duration-300 ${
                                            activeStory === index
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-gradient-to-r from-white to-white dark:from-[#1e1f2e] dark:to-indigo-950/80 hover:bg-primary/10 text-dark-gray'
                                        }`}
                                    >
                                        <div className='flex items-center'>
                                            <div className='relative w-12 h-12 rounded-full overflow-hidden mr-3 border border-border-primary-light'>
                                                <Image
                                                    src={
                                                        story?.avatar ||
                                                        '/avatar.png'
                                                    }
                                                    alt={story?.name || 'User'}
                                                    fill
                                                    className='object-cover'
                                                />
                                            </div>
                                            <div>
                                                <h4
                                                    className={`font-medium ${activeStory === index ? 'text-pure-white' : 'text-black'}`}
                                                >
                                                    {story?.name}
                                                </h4>
                                                <p
                                                    className={`text-sm ${activeStory === index ? 'text-pure-white' : 'text-black'}`}
                                                >
                                                    {story?.previousRole} →{' '}
                                                    {story?.role}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {shouldShowViewAllButton && (
                                    <motion.div
                                        variants={itemVariants}
                                        className='mt-8 text-center'
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <button
                                            onClick={() => setExpanded(true)}
                                            className='inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-pure-white transition-colors'
                                        >
                                            View all success stories
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
                                                className='ml-2'
                                            >
                                                <path d='M5 12h14' />
                                                <path d='m12 5 7 7-7 7' />
                                            </svg>
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
