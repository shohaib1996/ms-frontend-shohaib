'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useCallback, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

export default function CoachingLanding() {
    // Refs for scroll animations
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const checklistRef = useRef<HTMLUListElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    // Set up useInView hooks
    const isSectionInView = useInView(sectionRef, { once: false, amount: 0.2 });
    const isTitleInView = useInView(titleRef, { once: false, amount: 0.5 });
    const isChecklistInView = useInView(checklistRef, {
        once: false,
        amount: 0.3,
    });
    const isCtaInView = useInView(ctaRef, { once: false, amount: 0.5 });

    // Animation variants
    const fadeInUpVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    const titleVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
            },
        },
    };

    const buttonVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
        hover: {
            scale: 1.05,
            boxShadow:
                '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.95 },
    };

    const checklistContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const checklistItemVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
    };

    const iconVariants: Variants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 10,
                delay: 0.2,
            },
        },
        hover: {
            scale: 1.2,
            rotate: [0, 10, -10, 0],
            transition: {
                duration: 0.5,
                ease: 'easeInOut',
            },
        },
    };

    const ctaButtonVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: 0.5,
            },
        },
        hover: {
            scale: 1.05,
            boxShadow:
                '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.95 },
        pulse: {
            scale: [1, 1.05, 1],
            boxShadow: [
                '0 0 0 0 rgba(7, 54, 209, 0.2)',
                '0 0 0 10px rgba(7, 54, 209, 0)',
                '0 0 0 0 rgba(7, 54, 209, 0)',
            ],
            transition: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
            },
        },
    };

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
        <motion.div
            ref={sectionRef}
            initial='hidden'
            animate={isSectionInView ? 'visible' : 'hidden'}
            className='bg-foreground w-full relative overflow-hidden'
        >
            {/* Animated background gradients */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0.05, 0.1, 0.05],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                }}
                className='absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-400/10 via-blue-400/5 to-transparent blur-3xl z-0'
            ></motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0.05, 0.1, 0.05],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                    delay: 1,
                }}
                className='absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-blue-500/10 via-blue-400/5 to-transparent blur-3xl z-0'
            ></motion.div>

            <div className='container flex flex-col items-center justify-center px-4 py-12 mx-auto text-center max-w-3xl relative z-10'>
                <motion.div
                    className='mb-10'
                    initial='hidden'
                    animate={isSectionInView ? 'visible' : 'hidden'}
                    variants={buttonVariants}
                    // whileHover='hover'
                    whileTap='tap'
                >
                    <Button
                        variant='secondary'
                        className='rounded-full bg-background text-primary hover:bg-primary-foreground dark:bg-white'
                    >
                        <motion.span
                            className='flex items-center gap-1.5'
                            animate={{ y: [0, -2, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 2,
                            }}
                        >
                            <motion.svg
                                width='14.000000'
                                height='14.000000'
                                viewBox='0 0 14 14'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatDelay: 3,
                                }}
                            >
                                <desc>Created with Pixso.</desc>
                                <defs>
                                    <clipPath id='clip19_1059'>
                                        <rect
                                            id='Frame'
                                            rx='0.000000'
                                            width='13.000000'
                                            height='13.000000'
                                            transform='translate(0.500000 0.500000)'
                                            fill='white'
                                            fillOpacity='0'
                                        />
                                    </clipPath>
                                </defs>
                                <rect
                                    id='Frame'
                                    rx='0.000000'
                                    width='13.000000'
                                    height='13.000000'
                                    transform='translate(0.500000 0.500000)'
                                    fill='#FFFFFF'
                                    fillOpacity='0'
                                />
                                <g clipPath='url(#clip19_1059)'>
                                    <path
                                        id='Vector'
                                        d='M1.45 12.54C1.45 12.54 3.63 12.25 4.37 11.37C4.78 10.88 4.78 10.13 4.32 9.67C4.09 9.46 3.79 9.33 3.48 9.32C3.17 9.31 2.86 9.42 2.62 9.62C1.75 10.36 1.45 12.54 1.45 12.54Z'
                                        stroke='#0736D1'
                                        strokeOpacity='1.000000'
                                        strokeWidth='1.500000'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        id='Vector'
                                        d='M5.25 7C5.56 6.19 5.95 5.42 6.41 4.69C7.09 3.6 8.04 2.71 9.16 2.09C10.28 1.47 11.55 1.15 12.83 1.16C12.83 2.75 12.37 5.54 9.33 7.58C8.59 8.04 7.81 8.44 7 8.75L5.25 7Z'
                                        stroke='#0736D1'
                                        strokeOpacity='1.000000'
                                        strokeWidth='1.500000'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        id='Vector'
                                        d='M5.25 7L2.33 7C2.33 7 2.65 5.23 3.5 4.66C4.44 4.03 6.41 4.66 6.41 4.66'
                                        stroke='#0736D1'
                                        strokeOpacity='1.000000'
                                        strokeWidth='1.500000'
                                        strokeLinejoin='round'
                                        strokeLinecap='round'
                                    />
                                    <path
                                        id='Vector'
                                        d='M7 8.75L7 11.66C7 11.66 8.76 11.34 9.33 10.5C9.96 9.55 9.33 7.58 9.33 7.58'
                                        stroke='#0736D1'
                                        strokeOpacity='1.000000'
                                        strokeWidth='1.500000'
                                        strokeLinejoin='round'
                                        strokeLinecap='round'
                                    />
                                </g>
                            </motion.svg>
                            Get Started
                        </motion.span>
                    </Button>
                </motion.div>

                <motion.div
                    ref={titleRef}
                    initial='hidden'
                    animate={isTitleInView ? 'visible' : 'hidden'}
                >
                    <motion.h1
                        variants={titleVariants}
                        className='text-4xl md:text-5xl font-bold tracking-tight text-black mb-4'
                    >
                        Ready to Transform Your
                        <br />
                        Coaching Business?
                    </motion.h1>

                    <motion.p
                        variants={fadeInUpVariants}
                        className='text-lg text-black mb-8 max-w-2xl'
                    >
                        Book a personalized demo to see how SkillBNK can help
                        you scale your coaching business.
                    </motion.p>
                </motion.div>

                <motion.div
                    className='w-full bg-primary-foreground rounded-lg p-6 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                        isChecklistInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{
                        boxShadow:
                            '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        transition: { duration: 0.3 },
                    }}
                >
                    <motion.ul
                        ref={checklistRef}
                        variants={checklistContainerVariants}
                        initial='hidden'
                        animate={isChecklistInView ? 'visible' : 'hidden'}
                        className='space-y-4 text-left'
                    >
                        {[
                            'See a personalized demo of the platform',
                            'Discuss your specific coaching requirements',
                            'Get a customized implementation plan',
                            'No pressure, no obligations',
                        ].map((item, index) => (
                            <motion.li
                                key={index}
                                variants={checklistItemVariants}
                                custom={index}
                                className='flex items-start'
                            >
                                <motion.div
                                    variants={iconVariants}
                                    whileHover='hover'
                                >
                                    <CheckCircle className='h-6 w-6 text-primary mr-2 shrink-0' />
                                </motion.div>
                                <motion.span
                                    className='text-black'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        delay: 0.3 + index * 0.1,
                                        duration: 0.5,
                                    }}
                                >
                                    {item}
                                </motion.span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>

                <motion.div
                    ref={ctaRef}
                    className='flex flex-col sm:flex-row gap-4 w-full max-w-lg'
                    initial='hidden'
                    animate={isCtaInView ? 'visible' : 'hidden'}
                    variants={fadeInUpVariants}
                >
                    <motion.div
                        variants={ctaButtonVariants}
                        // whileHover='hover'
                        whileTap='tap'
                        animate={['visible', 'pulse']}
                        className='w-full'
                    >
                        <Button
                            onClick={() => scrollToSection('faq')}
                            className='bg-primary hover:bg-blue-700 hover:text-white text-white py-6 px-6 rounded-full w-full'
                        >
                            <span className='flex items-center justify-center gap-2'>
                                Schedule Your Free Demo
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatDelay: 2,
                                    }}
                                >
                                    <ArrowRight className='h-5 w-5' />
                                </motion.div>
                            </span>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}
