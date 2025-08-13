'use client';

import type React from 'react';
import {
    ArrowUpRight,
    CircleCheckBig,
    FileText,
    Sparkles,
    Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface TabContentProps {
    activeTab: string;
    data: {
        title: string;
        description: string;
        benefits: string[];
        image: string;
        callout?: {
            text: string;
            value: string;
        };
        icon: React.ReactNode;
    };
}

const TabContent = ({ activeTab, data }: TabContentProps) => {
    const scrollToSection = useCallback((elementId: string) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, []);

    // Refs for animations
    const contentRef = useRef(null);
    const imageRef = useRef(null);
    const isContentInView = useInView(contentRef, { once: false, amount: 0.3 });
    const isImageInView = useInView(imageRef, { once: false, amount: 0.3 });

    // Log for debugging
    useEffect(() => {
        console.log('Active Tab:', activeTab);
        console.log('Data:', data);
    }, [activeTab, data]);

    // Tab transition variants
    const tabVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
        exit: {
            opacity: 0,
            x: 20,
            transition: {
                duration: 0.3,
            },
        },
    };

    // Image reveal variants
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: 'easeOut',
            },
        },
    };

    // Benefit item variants
    const benefitItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.1 + 0.3,
                duration: 0.5,
                ease: 'easeOut',
            },
        }),
    };

    // Check icon variants
    const checkIconVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: (i: number) => ({
            scale: 1,
            opacity: 1,
            transition: {
                delay: i * 0.1 + 0.4,
                type: 'spring',
                stiffness: 300,
                damping: 15,
            },
        }),
    };

    return (
        <AnimatePresence mode='wait'>
            <motion.div
                key={activeTab}
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={tabVariants}
                className='flex flex-col lg:flex-row gap-8 items-start'
            >
                <motion.div
                    ref={contentRef}
                    initial='hidden'
                    animate='visible'
                    className='w-full lg:w-1/3 text-white'
                >
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className='flex items-center gap-2 mb-4'
                    >
                        <Button
                            size={'sm'}
                            variant={'primary_light'}
                            className='h-[26px] rounded-full bg-blue-500/50 text-white border-none shadow-md flex items-center gap-1'
                            icon={<FileText size={'14'} />}
                        >
                            Features Highlight
                        </Button>
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='text-2xl font-bold mb-2'
                    >
                        {data.title}
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className='text-blue-50/90 mb-6'
                    >
                        {data.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className='bg-blue-500/50 backdrop-blur-md rounded-xl p-5 mb-4 border border-blue-400'
                    >
                        <motion.h4
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className='text-xl font-semibold mb-2 border-b border-blue-300 pb-2'
                        >
                            Key Benefit
                        </motion.h4>
                        <ul className='space-y-4'>
                            {data.benefits.map((benefit, index) => (
                                <motion.li
                                    custom={index}
                                    variants={benefitItemVariants}
                                    initial='hidden'
                                    animate='visible'
                                    key={index}
                                    className='flex items-start gap-3'
                                >
                                    <motion.div
                                        custom={index}
                                        variants={checkIconVariants}
                                        initial='hidden'
                                        animate='visible'
                                        className='p-1 rounded-full bg-white/30 backdrop-md flex items-center justify-center'
                                    >
                                        <CircleCheckBig className='h-5 w-5 text-white shrink-0' />
                                    </motion.div>
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            delay: 0.6 + index * 0.1,
                                            duration: 0.5,
                                        }}
                                    >
                                        {benefit}
                                    </motion.span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.7 + data.benefits.length * 0.1,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={() => scrollToSection('faq')}
                            variant={'plain'}
                            className='bg-white text-primary rounded-full'
                        >
                            See this Features in Action
                            <ArrowUpRight className='h-4 w-4' />
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    ref={imageRef}
                    initial='hidden'
                    animate='visible'
                    variants={imageVariants}
                    className='w-full lg:w-2/3 relative'
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className='bg-foreground rounded-lg shadow-lg overflow-hidden'
                    >
                        <motion.div
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.2, delay: 0.4 }}
                        >
                            <Image
                                src={data.image || '/default_image.png'}
                                alt={data.title}
                                width={1920}
                                height={1432}
                                className='w-full h-auto rounded'
                            />
                        </motion.div>
                    </motion.div>

                    {data.callout && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className='absolute bottom-5 -left-8 bg-primary text-white px-4 py-2 rounded-lg hidden md:flex items-center gap-2 shadow-lg border border-blue-400'
                        >
                            <motion.div
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatDelay: 3,
                                }}
                                className='bg-blue-500/50 rounded-full p-2'
                            >
                                <Sparkles />
                            </motion.div>

                            <span>
                                {data.callout.text} <br />
                                by {data.callout.value}
                            </span>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                        className='hidden md:flex absolute -top-4 -right-6 bg-primary text-white px-4 py-2 rounded-lg items-center gap-2 shadow-lg border border-blue-400'
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 2,
                            }}
                            className='bg-blue-500/50 rounded-full p-2'
                        >
                            <Zap />
                        </motion.div>

                        <span>
                            Save 15+ hours
                            <br />
                            weekly
                        </span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default TabContent;
