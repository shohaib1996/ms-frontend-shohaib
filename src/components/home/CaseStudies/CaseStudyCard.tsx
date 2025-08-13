'use client';

import Image from 'next/image';
import { CircleCheckBig } from 'lucide-react';
import { useCallback, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

interface CaseStudyCardProps {
    name: string;
    title: string;
    image: string;
    background: string;
    challenge: string;
    solutions: string[];
    results: string[];
    downloadLink: string;
}

const CaseStudyCard = ({
    name,
    title,
    image,
    background,
    challenge,
    solutions,
    results,
    downloadLink,
}: CaseStudyCardProps) => {
    // Refs for animations
    const cardRef = useRef<HTMLDivElement>(null);
    const isCardInView = useInView(cardRef, { once: false, amount: 0.1 });

    // Animation variants
    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 70,
                damping: 15,
                duration: 0.8,
            },
        },
        hover: {
            y: -10,
            boxShadow:
                '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10,
            },
        },
    };

    const imageContainerVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
            },
        },
        hover: {
            scale: 1.03,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
            },
        },
    };

    const overlayVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.3,
                duration: 0.5,
            },
        },
    };

    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2 + i * 0.1,
                duration: 0.5,
                ease: 'easeOut',
            },
        }),
    };

    const gridContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5,
            },
        },
    };

    const gridItemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
    };

    const listContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const listItemVariants: Variants = {
        hidden: { opacity: 0, x: -10 },
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

    const buttonVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.8,
                duration: 0.5,
            },
        },
        hover: {
            scale: 1.03,
            boxShadow:
                '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.97 },
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
            ref={cardRef}
            initial='hidden'
            animate={isCardInView ? 'visible' : 'hidden'}
            whileHover='hover'
            variants={cardVariants}
            className='bg-background border border-forground-border rounded-xl overflow-hidden shadow-lg flex flex-col h-full p-3'
        >
            {/* Coach image and info */}
            <motion.div
                variants={imageContainerVariants}
                className='relative h-[250px] rounded-lg overflow-hidden'
            >
                <motion.div
                    variants={{
                        hover: {
                            // scale: 1.05,
                            transition: {
                                duration: 0.4,
                                // ease: 'easeOut',
                            },
                        },
                    }}
                >
                    <Image
                        src={image || '/placeholder.svg'}
                        alt={name}
                        fill
                        className='object-cover rounded-lg'
                    />
                </motion.div>
                <motion.div
                    variants={overlayVariants}
                    className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-pure-black/70 to-transparent text-white rounded-br-lg rounded-bl-lg'
                >
                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className='font-bold text-lg'
                    >
                        {name}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className='text-sm'
                    >
                        {title}
                    </motion.p>
                </motion.div>
            </motion.div>

            {/* Case study content */}
            <motion.div className='flex flex-col flex-grow'>
                {/* Background */}
                <motion.div
                    custom={0}
                    variants={sectionVariants}
                    className='my-3 bg-gray-200 dark:bg-gray-800 p-[10px] rounded-lg'
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                    }}
                >
                    <motion.h4
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className='text-sm font-semibold text-dark-gray mb-1'
                    >
                        Background:
                    </motion.h4>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className='text-sm text-gray'
                    >
                        {background}
                    </motion.p>
                </motion.div>

                {/* Challenge */}
                <motion.div
                    custom={1}
                    variants={sectionVariants}
                    className='mb-3 bg-red-500/10 p-[10px] rounded-lg'
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                    }}
                >
                    <motion.h4
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className='text-sm font-semibold text-dark-gray mb-1'
                    >
                        Challenge:
                    </motion.h4>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className='text-sm text-gray'
                    >
                        {challenge}
                    </motion.p>
                </motion.div>

                {/* Solutions and Results */}
                <motion.div
                    variants={gridContainerVariants}
                    className='grid grid-cols-2 gap-3 mb-3'
                >
                    {/* Our Solution */}
                    <motion.div
                        variants={gridItemVariants}
                        whileHover={{
                            scale: 1.03,
                            boxShadow:
                                '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                            transition: { duration: 0.2 },
                        }}
                        className='bg-blue-600/20 p-3 rounded-lg'
                    >
                        <motion.h4
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className='text-sm font-semibold text-dark-gray mb-2'
                        >
                            Our Solution:
                        </motion.h4>
                        <motion.ul
                            variants={listContainerVariants}
                            className='space-y-2'
                        >
                            {solutions.map((solution, index) => (
                                <motion.li
                                    key={`solution-${index}`}
                                    variants={listItemVariants}
                                    className='flex items-start gap-2'
                                >
                                    <motion.div
                                        variants={iconVariants}
                                        whileHover='hover'
                                    >
                                        <CircleCheckBig className='h-4 w-4 text-primary shrink-0 mt-0.5' />
                                    </motion.div>
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            delay: 0.7 + index * 0.1,
                                            duration: 0.5,
                                        }}
                                        className='text-xs text-gray'
                                    >
                                        {solution}
                                    </motion.span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* Results */}
                    <motion.div
                        variants={gridItemVariants}
                        whileHover={{
                            scale: 1.03,
                            boxShadow:
                                '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                            transition: { duration: 0.2 },
                        }}
                        className='bg-green-500/10 p-3 rounded-lg'
                    >
                        <motion.h4
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className='text-sm font-semibold text-dark-gray mb-2'
                        >
                            Results:
                        </motion.h4>
                        <motion.ul
                            variants={listContainerVariants}
                            className='space-y-2'
                        >
                            {results.map((result, index) => (
                                <motion.li
                                    key={`result-${index}`}
                                    variants={listItemVariants}
                                    className='flex items-start gap-2'
                                >
                                    <motion.div
                                        variants={iconVariants}
                                        whileHover='hover'
                                    >
                                        <CircleCheckBig className='h-4 w-4 text-green-600 shrink-0 mt-0.5' />
                                    </motion.div>
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            delay: 0.7 + index * 0.1,
                                            duration: 0.5,
                                        }}
                                        className='text-xs text-gray'
                                    >
                                        {result}
                                    </motion.span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </motion.div>

                {/* Download button - Uncomment if needed */}
                {/* <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            variant="primary_light"
            className="w-full mt-auto border-blue-200 hover:bg-blue-50"
            onClick={() => scrollToSection("faq")}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
            >
              <Download className="h-4 w-4 mr-2" />
            </motion.div>
            Download Full Case Study
          </Button>
        </motion.div> */}
            </motion.div>
        </motion.div>
    );
};

export default CaseStudyCard;
