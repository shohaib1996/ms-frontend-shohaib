'use client';

import { ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import GlobalTitle from '../global/GlobalTitle';
import {
    motion,
    useInView,
    useMotionValue,
    useTransform,
    type Variants,
} from 'framer-motion';
import { useEffect, useRef } from 'react';

// Counter component for animating numbers
const AnimatedCounter = ({ value }: { value: number }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.8 });

    useEffect(() => {
        if (isInView) {
            const controls = animate();
            return controls;
        }
    }, [isInView]);

    const animate = () => {
        const animation = count.set(0);
        const controls = window.setTimeout(() => {
            count.set(value);
        }, 300);
        return () => window.clearTimeout(controls);
    };

    return <motion.div ref={ref}>{rounded}</motion.div>;
};

const certifications = [
    {
        title: 'Schedule a Demo',
        description:
            'Book a personalized demo to see how SkillBNK can work for your specific coaching business.',
    },
    {
        title: 'Customize Your Platform',
        description:
            'Our team will set up and customize your platform based on your coaching methodology and branding.',
    },
    {
        title: 'Launch Your Program',
        description:
            'With everything in place, you are ready to launch your first cohort with our full support.',
    },
];

export default function GetStartedSection() {
    // Refs for animations
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    // Check if elements are in view
    const isSectionInView = useInView(sectionRef, { once: false, amount: 0.2 });
    const isTitleInView = useInView(titleRef, { once: false, amount: 0.5 });
    const isCardsInView = useInView(cardsRef, { once: false, amount: 0.1 });

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
                duration: 0.8,
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
                delay: 0.2,
            },
        },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 70,
                damping: 15,
                delay: i * 0.2,
            },
        }),
    };

    const buttonVariants: Variants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: 0.8,
            },
        },
        hover: {
            scale: 1.05,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.95 },
    };

    const iconVariants: Variants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20,
            },
        },
        hover: {
            rotate: [0, -10, 10, 0],
            transition: {
                duration: 0.6,
            },
        },
    };

    const backgroundVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1.5,
            },
        },
    };

    return (
        <motion.section
            ref={sectionRef}
            initial='hidden'
            animate={isSectionInView ? 'visible' : 'hidden'}
            variants={backgroundVariants}
            className='w-full bg-primary py-12 text-pure-white relative overflow-hidden'
        >
            {/* Animated background gradients */}
            <motion.div
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                }}
                className='absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-400/30 via-blue-400/20 to-transparent blur-3xl z-0'
            ></motion.div>

            <motion.div
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                    delay: 1,
                }}
                className='absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-blue-500/30 via-blue-400/20 to-transparent blur-3xl z-0'
            ></motion.div>

            <div className='my-container mx-auto px-4 relative z-10'>
                <motion.div
                    ref={titleRef}
                    initial='hidden'
                    animate={isTitleInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className='mb-5 text-center'
                >
                    <motion.div
                        variants={buttonVariants}
                        whileHover='hover'
                        whileTap='tap'
                    >
                        <Button
                            className='bg-white/10 rounded-full'
                            size={'sm'}
                        >
                            <motion.div
                                variants={iconVariants}
                                whileHover='hover'
                                className='flex items-center justify-center'
                            >
                                <svg
                                    width='15'
                                    height='14'
                                    viewBox='0 0 15 14'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <g clipPath='url(#clip0_19_1053)'>
                                        <path
                                            d='M9.97334 4.52637L8.92101 7.68278C8.86373 7.85462 8.76723 8.01077 8.63915 8.13885C8.51107 8.26693 8.35493 8.36343 8.18309 8.4207L5.02667 9.47303L6.07901 6.31662C6.13628 6.14478 6.23278 5.98863 6.36086 5.86055C6.48894 5.73247 6.64508 5.63597 6.81692 5.5787L9.97334 4.52637Z'
                                            stroke='white'
                                            strokeWidth='1.5'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                        />
                                        <path
                                            d='M7.50002 12.8337C10.7217 12.8337 13.3334 10.222 13.3334 7.00033C13.3334 3.77866 10.7217 1.16699 7.50002 1.16699C4.27836 1.16699 1.66669 3.77866 1.66669 7.00033C1.66669 10.222 4.27836 12.8337 7.50002 12.8337Z'
                                            stroke='white'
                                            strokeWidth='1.5'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id='clip0_19_1053'>
                                            <rect
                                                width='14'
                                                height='14'
                                                fill='white'
                                                transform='translate(0.5)'
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <span className='ml-2'>Simple Process</span>
                            </motion.div>
                        </Button>
                    </motion.div>

                    <motion.div variants={titleVariants}>
                        <GlobalTitle
                            title='How to Get Started'
                            subTitle='Three simple steps to transform your coaching business'
                            className='text-white'
                            ngClass='text-white'
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    ref={cardsRef}
                    initial='hidden'
                    animate={isCardsInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className='mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
                >
                    {certifications.map((item, idx) => (
                        <motion.div
                            key={idx}
                            custom={idx}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                boxShadow:
                                    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                transition: {
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 10,
                                },
                            }}
                            className='flex flex-col items-center rounded-lg border border-primary bg-white/10 p-6 text-center'
                        >
                            <motion.div
                                className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl font-bold'
                                initial={{ scale: 0 }}
                                animate={{
                                    scale: 1,
                                    transition: {
                                        type: 'spring',
                                        stiffness: 260,
                                        damping: 20,
                                        delay: 0.3 + idx * 0.2,
                                    },
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    transition: {
                                        type: 'spring',
                                        stiffness: 400,
                                        damping: 10,
                                    },
                                }}
                            >
                                <AnimatedCounter value={idx + 1} />
                            </motion.div>

                            <motion.h3
                                className='mb-2 text-lg font-semibold'
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        delay: 0.4 + idx * 0.2,
                                        duration: 0.5,
                                    },
                                }}
                            >
                                {item.title}
                            </motion.h3>

                            <motion.p
                                className='text-sm text-blue-100'
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        delay: 0.5 + idx * 0.2,
                                        duration: 0.5,
                                    },
                                }}
                            >
                                {item.description}
                            </motion.p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className='flex justify-center'
                    initial='hidden'
                    animate={isCardsInView ? 'visible' : 'hidden'}
                    variants={buttonVariants}
                    whileHover='hover'
                    whileTap='tap'
                >
                    <Button
                        className='inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-primary transition-colors hover:bg-blue-50'
                        size='sm'
                    >
                        Schedule Your Demo
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 2,
                            }}
                        >
                            <ArrowUpRight size={16} />
                        </motion.div>
                    </Button>
                </motion.div>
            </div>
        </motion.section>
    );
}
