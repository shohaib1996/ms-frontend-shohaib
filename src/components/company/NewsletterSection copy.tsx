'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'sonner';

type NewsletterBenefit = {
    icon: React.ReactNode;
    title: string;
    description: string;
};

const newsletterBenefits: NewsletterBenefit[] = [
    {
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
                <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' />
                <polyline points='14 2 14 8 20 8' />
                <path d='M16 13H8' />
                <path d='M16 17H8' />
                <path d='M10 9H8' />
            </svg>
        ),
        title: 'Exclusive Content',
        description:
            'Get access to learning resources, tutorials, and guides not available anywhere else.',
    },
    {
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
                <path d='M5.5 8.5 9 12l-1.5 1.5' />
                <path d='m12 12 1.5 1.5' />
                <path d='M8 18h8' />
                <path d='M2 8h2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8h2' />
                <path d='M6 4h12a2 2 0 0 1 2 2v2H4V6a2 2 0 0 1 2-2Z' />
            </svg>
        ),
        title: 'Industry Insights',
        description:
            'Stay updated with the latest trends, technologies, and best practices in your field.',
    },
    {
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
                <path d='M6 9H4.5a2.5 2.5 0 0 1 0-5H6' />
                <path d='M18 9h1.5a2.5 2.5 0 0 0 0-5H18' />
                <path d='M4 22h16' />
                <path d='M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22' />
                <path d='M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22' />
                <path d='M18 2H6v7a6 6 0 0 0 12 0V2Z' />
            </svg>
        ),
        title: 'Special Offers',
        description:
            'Receive exclusive discounts and early access to new courses and programs.',
    },
];

export function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            return toast.error('Enter your email');
        }
        const data = {
            email,
        };

        setLoading(true);
        axios
            .post('/marketing/newsletter/subscribe', data)
            .then((res) => {
                toast.success('Subscribed successfully');
                setEmail('');
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.response.data.error);
            });
    };

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

    return (
        <section
            ref={sectionRef}
            id='newsletter'
            className='py-3 relative overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-primary-light dark:from-indigo-950 dark:via-[#1a1c2e] dark:to-primary/10'
        >
            <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
                <div className='absolute -top-[30%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-200/30 to-transparent blur-3xl dark:from-indigo-700/20'></div>
                <div className='absolute top-[60%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tl from-primary/10 to-transparent blur-3xl'></div>
            </div>

            <div className='my-container relative z-10'>
                <div className='w-full mx-auto'>
                    <motion.div
                        initial='hidden'
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={containerVariants}
                        className='text-center mb-12'
                    >
                        <motion.h2
                            variants={itemVariants}
                            className='text-3xl md:text-4xl font-bold text-black mb-4'
                        >
                            Subscribe to Our Newsletter
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className='text-dark-gray max-w-2xl mx-auto'
                        >
                            Stay updated with the latest educational resources,
                            industry insights, and special offers delivered
                            directly to your inbox.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial='hidden'
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={containerVariants}
                        className='bg-gradient-to-r from-white to-indigo-50/80 dark:from-[#1e1f2e] dark:to-indigo-950/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-indigo-100/30 dark:border-indigo-800/30 p-8 md:p-10'
                    >
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                            <motion.div variants={itemVariants}>
                                <h3 className='text-2xl font-semibold text-black mb-6'>
                                    Join Our Mailing List
                                </h3>
                                <form
                                    onSubmit={handleSubscribe}
                                    className='space-y-4'
                                >
                                    <div className='space-y-2'>
                                        <label
                                            htmlFor='email'
                                            className='block text-sm font-medium text-dark-gray'
                                        >
                                            Email Address
                                        </label>
                                        <div className='relative'>
                                            <input
                                                id='email'
                                                type='email'
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                placeholder='you@example.com'
                                                required
                                                className='w-full px-4 py-3 rounded-lg border border-indigo-100 dark:border-indigo-800/50 bg-white/80 dark:bg-[#1a1c2e]/80 focus:outline-none focus:ring-2 focus:ring-primary text-black dark:text-white placeholder:text-gray'
                                                disabled={
                                                    loading ||
                                                    isSubmitting ||
                                                    isSuccess
                                                }
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type='submit'
                                        disabled={
                                            loading || isSubmitting || isSuccess
                                        }
                                        className={`w-full px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-indigo-600 text-white font-medium  transition-all ${
                                            loading || isSubmitting || isSuccess
                                                ? 'opacity-70 cursor-not-allowed'
                                                : ''
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <span className='flex items-center justify-center'>
                                                <svg
                                                    className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                >
                                                    <circle
                                                        className='opacity-25'
                                                        cx='12'
                                                        cy='12'
                                                        r='10'
                                                        stroke='currentColor'
                                                        strokeWidth='4'
                                                    ></circle>
                                                    <path
                                                        className='opacity-75'
                                                        fill='currentColor'
                                                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                                    ></path>
                                                </svg>
                                                Subscribing...
                                            </span>
                                        ) : isSuccess ? (
                                            <span className='flex items-center justify-center'>
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
                                                    className='mr-2'
                                                >
                                                    <path d='M20 6 9 17l-5-5' />
                                                </svg>
                                                Subscribed!
                                            </span>
                                        ) : (
                                            'Subscribe Now'
                                        )}
                                    </motion.button>

                                    {error && (
                                        <p className='text-danger text-sm mt-2'>
                                            {error}
                                        </p>
                                    )}
                                    {isSuccess && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className='text-shiny text-sm mt-2'
                                        >
                                            Thank you for subscribing!
                                        </motion.p>
                                    )}

                                    <p className='text-xs text-dark-gray mt-2'>
                                        We respect your privacy. Unsubscribe at
                                        any time.{' '}
                                        <a
                                            href='/privacy-policy'
                                            className='text-primary hover:underline'
                                        >
                                            Privacy Policy
                                        </a>
                                    </p>
                                </form>

                                <div className='mt-6 flex items-center'>
                                    <div className='flex -space-x-2 mr-3'>
                                        <div className=''>
                                            <Image
                                                className='w-8 h-8 rounded-full object-cover  border-2 border-white dark:border-[#1e1f2e]'
                                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuVSS82IpyjoQIX7vq3Yncq-LX7p900_g12uhM-1tZg4Q6aktcQ-_d8V1CVLMGaitnApM&usqp=CAU'
                                                alt='user1'
                                                width={32}
                                                height={32}
                                            />
                                        </div>
                                        <div className='w-8 h-8 rounded-full bg-primary-light border-2 border-white dark:border-[#1e1f2e]'>
                                            <Image
                                                className='w-8 h-8 rounded-full object-cover  border-2 border-white dark:border-[#1e1f2e]'
                                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP6RXH2cDixBE5bcZZHsLD087-z_Zc-0RU9w&s'
                                                alt='user1'
                                                width={32}
                                                height={32}
                                            />
                                        </div>
                                        <div className='w-8 h-8 rounded-full bg-indigo-300 border-2 border-white dark:border-[#1e1f2e]'>
                                            <Image
                                                className='w-8 h-8 rounded-full object-cover  border-2 border-white dark:border-[#1e1f2e]'
                                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqvH0IeOm_Ku35v0wNRDmwXp_YnselDTCALwlPScxY2gMUY2qO5W1fRkHRSJjGfBgAzLU&usqp=CAU'
                                                alt='user1'
                                                width={32}
                                                height={32}
                                            />
                                        </div>
                                    </div>
                                    <p className='text-sm text-dark-gray'>
                                        Join{' '}
                                        <span className='font-medium text-black'>
                                            1,000+
                                        </span>{' '}
                                        subscribers
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className='space-y-6'
                            >
                                <h3 className='text-xl font-semibold text-black mb-4'>
                                    What You&apos;ll Receive
                                </h3>

                                {newsletterBenefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ x: 5 }}
                                        className='flex items-start'
                                    >
                                        <div className='flex-shrink-0 w-10 h-10 rounded-full bg-primary-light dark:bg-primary/20 flex items-center justify-center mr-4'>
                                            <span className='text-primary-white'>
                                                {benefit.icon}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className='font-medium text-black'>
                                                {benefit.title}
                                            </h4>
                                            <p className='text-dark-gray text-sm'>
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}

                                <div className='bg-indigo-100/50 dark:bg-indigo-900/30 rounded-lg p-4 border border-indigo-200/50 dark:border-indigo-800/30'>
                                    <p className='text-dark-gray text-sm italic'>
                                        &quot;The newsletter has been invaluable
                                        for keeping up with industry trends and
                                        discovering new learning opportunities.
                                        The curated content saves me hours of
                                        research.&quot;
                                    </p>
                                    <p className='text-black text-sm font-medium mt-2'>
                                        — Michael Chen, Software Engineer
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
