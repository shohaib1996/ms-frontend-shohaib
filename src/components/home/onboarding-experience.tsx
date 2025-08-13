'use client';

import { Rocket } from 'lucide-react';
import GlobalTitle from '../global/GlobalTitle';
import { Button } from '@/components/ui/button';
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    type Variants,
} from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface TimelineStep {
    number: number;
    title: string;
    day: string;
    items: string[];
    titlePosition: 'left' | 'right';
    itemsPosition: 'left' | 'right';
}

interface TimelineStepProps {
    step: TimelineStep;
    index: number;
}

const timelineSteps: TimelineStep[] = [
    {
        number: 1,
        title: 'Discovery Call',
        day: 'Day 1',
        items: [
            'We learn about your coaching style and goals',
            'You see a personalized demo of the platform',
            'Together we identify your specific requirements',
        ],
        titlePosition: 'left',
        itemsPosition: 'right',
    },
    {
        number: 2,
        title: 'Customization Phase',
        day: 'Days 2-14',
        items: [
            'Your branding is set up with your branding',
            'We customize the platform to your teaching methodology',
            'Your landing page and enrollment forms are created',
        ],
        titlePosition: 'right',
        itemsPosition: 'left',
    },
    {
        number: 3,
        title: 'Content Integration',
        day: 'Days 15-21',
        items: [
            'We upload your existing content',
            'Your calendar and communication channels are established',
            'Your assessment tools are configured',
        ],
        titlePosition: 'left',
        itemsPosition: 'right',
    },
    {
        number: 4,
        title: 'Launch Preparation',
        day: 'Days 22-29',
        items: [
            'Complete platform testing',
            'Coach training and orientation',
            'Marketing support for your first cohort',
        ],
        titlePosition: 'right',
        itemsPosition: 'left',
    },
    {
        number: 5,
        title: 'First Cohort Launch',
        day: 'Day 30+',
        items: [
            'Hands-on support during first student onboarding',
            'Real-time assistance during initial sessions',
            'Ongoing optimization based on feedback',
        ],
        titlePosition: 'left',
        itemsPosition: 'right',
    },
];

export default function OnboardingExperience() {
    // Ref for the entire section
    const sectionRef = useRef<HTMLElement>(null);

    // Parallax effect for background gradient
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const gradientY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const gradientScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    return (
        <motion.section
            ref={sectionRef}
            className='w-full relative overflow-hidden pb-8 bg-primary-foreground'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Animated background gradient */}
            <motion.div
                style={{
                    y: gradientY,
                    scale: gradientScale,
                }}
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                }}
                className='absolute inset-0 bg-gradient-to-br from-purple-500/30 via-purple-500/20 to-purple-500/5 top-[10%] -left-[400px] z-0 rounded-full h-1/2 w-1/2 blur-3xl'
            ></motion.div>

            <div className='my-container relative z-10 px-4 md:px-6'>
                <motion.div
                    className='mb-8 mt-8'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className='flex flex-col gap-1 items-center justify-center text-center'>
                        <div
                            className={cn(
                                `title lg:text-5xl md:text-3xl text-xl font-bold leading-[1.1] text-black text-center`,
                            )}
                        >
                            Your{' '}
                            <span className='text-primary'>
                                Onboarding Timeline
                            </span>
                        </div>
                        <div
                            className={cn(
                                `title text-[22px] text-black text-center `,
                            )}
                        >
                            Your journey from sign-up to your first successful
                            cohort
                        </div>
                    </div>
                </motion.div>

                <div className='relative flex justify-center'>
                    {/* Timeline container with fixed width to center everything */}
                    <div className='relative max-w-5xl w-full'>
                        {/* Animated timeline line */}
                        <TimelineLine />

                        {/* Timeline steps */}
                        <div className='relative z-10'>
                            {timelineSteps.map((step, index) => (
                                <TimelineStep
                                    key={index}
                                    step={step}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

// Animated timeline line component
function TimelineLine() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end end'],
    });

    const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <div
            ref={ref}
            className='absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200'
        >
            <motion.div
                style={{ height }}
                className='w-full bg-primary-white origin-top'
            />
        </div>
    );
}

// Timeline step component
function TimelineStep({ step, index }: TimelineStepProps) {
    const stepRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(stepRef, { once: false, amount: 0.3 });

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const circleVariants: Variants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 15,
                delay: 0.2,
            },
        },
    };

    const contentVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 0.3,
            },
        },
    };

    const listVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4,
            },
        },
    };

    const listItemVariants: Variants = {
        hidden: { opacity: 0, x: step.itemsPosition === 'left' ? 20 : -20 },
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

    const checkmarkVariants: Variants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 15,
                delay: 0.1,
            },
        },
    };

    return (
        <motion.div
            ref={stepRef}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className='mb-16 relative'
        >
            {/* Timeline circle with number */}
            <motion.div
                variants={circleVariants}
                className='absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 md:top-1/3 z-10 flex justify-center'
            >
                <motion.div
                    className='flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-white dark:text-primary font-bold text-sm md:text-base'
                    whileHover={{
                        scale: 1.1,
                        boxShadow: '0px 0px 8px rgba(0,0,0,0.2)',
                    }}
                >
                    {step.number}
                </motion.div>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pl-16 md:pl-0'>
                {/* Left side content */}
                <motion.div
                    variants={contentVariants}
                    className={`md:text-right md:pr-8 md:pl-4 ${
                        step.titlePosition === 'right'
                            ? 'order-1 md:order-1'
                            : 'order-1 md:order-1'
                    }`}
                >
                    {step.titlePosition === 'left' ? (
                        <motion.div
                            className='mb-4 md:mb-0'
                            initial={{ opacity: 0, x: -20 }}
                            animate={
                                isInView
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: -20 }
                            }
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <motion.h3
                                className='font-bold text-lg text-black'
                                initial={{ opacity: 0 }}
                                animate={
                                    isInView ? { opacity: 1 } : { opacity: 0 }
                                }
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                {step.title}
                            </motion.h3>
                            <motion.p
                                className='text-sm text-primary'
                                initial={{ opacity: 0 }}
                                animate={
                                    isInView ? { opacity: 1 } : { opacity: 0 }
                                }
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                {step.day}
                            </motion.p>
                        </motion.div>
                    ) : (
                        <motion.ul
                            variants={listVariants}
                            className='space-y-2 bg-foreground rounded-lg shadow-lg p-4 md:p-5 md:ml-auto'
                        >
                            {step.itemsPosition === 'left' &&
                                step.items.map((item, itemIndex) => (
                                    <motion.li
                                        key={itemIndex}
                                        variants={listItemVariants}
                                        className='flex items-start gap-2 text-black md:justify-end'
                                    >
                                        <span className='text-sm md:text-base'>
                                            {item}
                                        </span>
                                        <motion.div
                                            variants={checkmarkVariants}
                                            className='min-w-4 h-4 mt-1 flex-shrink-0'
                                        >
                                            <svg
                                                className='w-4 h-4 text-primary'
                                                fill='currentColor'
                                                viewBox='0 0 20 20'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path
                                                    fillRule='evenodd'
                                                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                                    clipRule='evenodd'
                                                ></path>
                                            </svg>
                                        </motion.div>
                                    </motion.li>
                                ))}
                        </motion.ul>
                    )}
                </motion.div>

                {/* Right side content */}
                <motion.div
                    variants={contentVariants}
                    className={`md:text-left md:pl-8 md:pr-4 ${
                        step.titlePosition === 'right'
                            ? 'order-0 md:order-2'
                            : 'order-2 md:order-2'
                    }`}
                >
                    {step.titlePosition === 'right' ? (
                        <motion.div
                            className='mb-4 md:mb-0'
                            initial={{ opacity: 0, x: 20 }}
                            animate={
                                isInView
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: 20 }
                            }
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <motion.h3
                                className='font-bold text-lg text-black'
                                initial={{ opacity: 0 }}
                                animate={
                                    isInView ? { opacity: 1 } : { opacity: 0 }
                                }
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                {step.title}
                            </motion.h3>
                            <motion.p
                                className='text-sm text-primary'
                                initial={{ opacity: 0 }}
                                animate={
                                    isInView ? { opacity: 1 } : { opacity: 0 }
                                }
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                {step.day}
                            </motion.p>
                        </motion.div>
                    ) : (
                        <motion.ul
                            variants={listVariants}
                            className='space-y-2 bg-foreground rounded-lg shadow-lg p-4 md:p-5'
                        >
                            {step.itemsPosition === 'right' &&
                                step.items.map((item, itemIndex) => (
                                    <motion.li
                                        key={itemIndex}
                                        variants={listItemVariants}
                                        className='flex items-start gap-2 text-black'
                                    >
                                        <motion.div
                                            variants={checkmarkVariants}
                                            className='min-w-4 h-4 mt-1 flex-shrink-0'
                                        >
                                            <svg
                                                className='w-4 h-4 text-primary'
                                                fill='currentColor'
                                                viewBox='0 0 20 20'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path
                                                    fillRule='evenodd'
                                                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                                    clipRule='evenodd'
                                                ></path>
                                            </svg>
                                        </motion.div>
                                        <span className='text-sm md:text-base'>
                                            {item}
                                        </span>
                                    </motion.li>
                                ))}
                        </motion.ul>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}
