'use client';

import React from 'react';

import { useRef } from 'react';
import GlobalTooltip from '../global/GlobalTooltip';
import { Button } from '../ui/button';
import { Check, Scale, X } from 'lucide-react';
import GlobalTitle from '../global/GlobalTitle';
import { motion, useInView, type Variants } from 'framer-motion';

const featureComparisonData = [
    {
        feature: 'High-ticket coaching focus',
        bootcampsHub: true,
        otherPlatforms: false,
    },
    {
        feature: 'Done-For-You operations',
        bootcampsHub: true,
        otherPlatforms: false,
    },
    {
        feature: 'AI-powered analytics',
        bootcampsHub: true,
        otherPlatforms: false,
    },
    {
        feature: 'Custom dashboards',
        bootcampsHub: true,
        otherPlatforms: false,
    },
    {
        feature: 'Integrated systems',
        bootcampsHub: true,
        otherPlatforms: false,
    },
    {
        feature: 'No upfront costs',
        bootcampsHub: true,
        otherPlatforms: false,
    },
    {
        feature: 'Zoom integration',
        bootcampsHub: true,
        otherPlatforms: false,
    },
    {
        feature: 'AI assessment tools',
        bootcampsHub: true,
        otherPlatforms: false,
    },
    {
        feature: 'Student engagement',
        bootcampsHub: true,
        otherPlatforms: false,
    },
];

const HowWeDifferent = () => {
    // Create refs for scroll animations
    const sectionRef = useRef(null);
    const tableRef = useRef(null);
    const titleRef = useRef(null);

    // Set up useInView hooks
    const isSectionInView = useInView(sectionRef, { once: false, amount: 0.2 });
    const isTableInView = useInView(tableRef, { once: false, amount: 0.1 });
    const isTitleInView = useInView(titleRef, { once: false, amount: 0.5 });

    // Header animations
    const headerVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
            },
        },
    };

    // Table header animations
    const tableHeaderVariants: Variants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                duration: 0.8,
            },
        },
    };

    // Row animations - slide in from sides
    const rowVariants: Variants = {
        hidden: (i: number) => ({
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
        }),
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 70,
                damping: 20,
                duration: 0.8,
            },
        },
    };

    // Check and X animations
    const checkVariants: Variants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 200,
                damping: 10,
                duration: 0.5,
            },
        },
    };

    // Feature text animation
    const featureTextVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <motion.div
            ref={sectionRef}
            initial='hidden'
            animate={isSectionInView ? 'visible' : 'hidden'}
            className='w-full py-12 bg-primary'
        >
            <div className='my-container flex flex-col items-center'>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                        isSectionInView
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: 0.8 }}
                >
                    <GlobalTooltip tooltip='Revolutionary Platform'>
                        <Button
                            variant={'primary_light'}
                            className='rounded-full w-fit mb-4'
                            icon={<Scale size={18} />}
                        >
                            Revolutionary Platform
                        </Button>
                    </GlobalTooltip>
                </motion.div>

                <motion.div
                    ref={titleRef}
                    variants={headerVariants}
                    initial='hidden'
                    animate={isTitleInView ? 'visible' : 'hidden'}
                >
                    <GlobalTitle
                        ngClass='text-gray-400'
                        className='text-pure-white'
                        color='white'
                        title="How We're Different"
                        subTitle={
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={
                                    isTitleInView
                                        ? { opacity: 1 }
                                        : { opacity: 0 }
                                }
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                See how SkillBNK stands apart from traditional
                                coaching platforms. <br /> Tap or hover over any
                                feature for more details
                            </motion.p>
                        }
                    />
                </motion.div>

                <motion.div
                    ref={tableRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                        isTableInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 30 }
                    }
                    transition={{ duration: 1, delay: 0.2 }}
                    className='w-full bg-foreground p-4 rounded-md mt-6'
                >
                    <div className='overflow-hidden'>
                        <div className='grid grid-cols-3 w-full space-y-2'>
                            {/* Table Headers */}
                            <motion.div
                                variants={tableHeaderVariants}
                                initial='hidden'
                                animate={isTableInView ? 'visible' : 'hidden'}
                                transition={{ delay: 0.4 }}
                                className='font-semibold text-dark-gray text-xl'
                            >
                                Features
                            </motion.div>
                            <motion.div
                                variants={tableHeaderVariants}
                                initial='hidden'
                                animate={isTableInView ? 'visible' : 'hidden'}
                                transition={{ delay: 0.5 }}
                                className='font-semibold text-dark-gray text-xl text-center truncate'
                            >
                                SkillBNK
                            </motion.div>
                            <motion.div
                                variants={tableHeaderVariants}
                                initial='hidden'
                                animate={isTableInView ? 'visible' : 'hidden'}
                                transition={{ delay: 0.6 }}
                                className='font-semibold text-dark-gray text-xl text-center truncate'
                            >
                                Other Platforms
                            </motion.div>

                            {featureComparisonData.map((item, index) => (
                                <React.Fragment key={index}>
                                    <motion.div
                                        custom={index}
                                        variants={rowVariants}
                                        initial='hidden'
                                        animate={
                                            isTableInView ? 'visible' : 'hidden'
                                        }
                                        transition={{
                                            delay: 0.3 + index * 0.1,
                                        }}
                                        className='md:p-4 p-2 md:py-5 rounded-l-lg bg-primary-light text-gray font-semibold truncate'
                                    >
                                        <motion.span
                                            variants={featureTextVariants}
                                            transition={{
                                                delay: 0.4 + index * 0.1,
                                            }}
                                        >
                                            {item.feature}
                                        </motion.span>
                                    </motion.div>

                                    <motion.div
                                        custom={index}
                                        variants={rowVariants}
                                        initial='hidden'
                                        animate={
                                            isTableInView ? 'visible' : 'hidden'
                                        }
                                        transition={{
                                            delay: 0.4 + index * 0.1,
                                        }}
                                        className='md:p-4 p-2 md:py-5 bg-primary-light flex justify-center'
                                    >
                                        {item.bootcampsHub ? (
                                            <motion.div
                                                variants={checkVariants}
                                                initial='hidden'
                                                animate={
                                                    isTableInView
                                                        ? {
                                                              scale: 1,
                                                              opacity: 1,
                                                              transition: {
                                                                  type: 'spring',
                                                                  stiffness: 200,
                                                                  damping: 10,
                                                                  duration: 0.5,
                                                                  delay:
                                                                      0.5 +
                                                                      index *
                                                                          0.1,
                                                              },
                                                          }
                                                        : {
                                                              scale: 0,
                                                              opacity: 0,
                                                          }
                                                }
                                                whileInView={{
                                                    scale: [0, 1.2, 1],
                                                    transition: {
                                                        type: 'keyframes',
                                                        times: [0, 0.6, 1],
                                                        duration: 0.8,
                                                        ease: 'easeOut',
                                                        delay:
                                                            0.5 + index * 0.1,
                                                    },
                                                }}
                                                className='w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center'
                                            >
                                                <Check className='w-4 h-4 text-white' />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                variants={checkVariants}
                                                initial='hidden'
                                                animate={
                                                    isTableInView
                                                        ? 'visible'
                                                        : 'hidden'
                                                }
                                                transition={{
                                                    delay: 0.5 + index * 0.1,
                                                }}
                                                className='w-6 h-6 rounded-full bg-red-500 flex items-center justify-center'
                                            >
                                                <X className='w-4 h-4 text-white' />
                                            </motion.div>
                                        )}
                                    </motion.div>

                                    <motion.div
                                        custom={index}
                                        variants={rowVariants}
                                        initial='hidden'
                                        animate={
                                            isTableInView ? 'visible' : 'hidden'
                                        }
                                        transition={{
                                            delay: 0.5 + index * 0.1,
                                        }}
                                        className='md:p-4 rounded-r-lg p-2 md:py-5 flex justify-center bg-primary-light'
                                    >
                                        {item.otherPlatforms ? (
                                            <motion.div
                                                variants={checkVariants}
                                                initial='hidden'
                                                animate={
                                                    isTableInView
                                                        ? {
                                                              scale: 1,
                                                              opacity: 1,
                                                              transition: {
                                                                  type: 'spring',
                                                                  stiffness: 200,
                                                                  damping: 10,
                                                                  duration: 0.5,
                                                                  delay:
                                                                      0.6 +
                                                                      index *
                                                                          0.1,
                                                              },
                                                          }
                                                        : {
                                                              scale: 0,
                                                              opacity: 0,
                                                          }
                                                }
                                                whileInView={{
                                                    scale: [0, 1.2, 1],
                                                    transition: {
                                                        type: 'keyframes',
                                                        times: [0, 0.6, 1],
                                                        duration: 0.8,
                                                        ease: 'easeOut',
                                                        delay:
                                                            0.6 + index * 0.1,
                                                    },
                                                }}
                                                className='w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center'
                                            >
                                                <Check className='w-4 h-4 text-white' />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                variants={checkVariants}
                                                initial='hidden'
                                                animate={
                                                    isTableInView
                                                        ? {
                                                              scale: 1,
                                                              opacity: 1,
                                                              transition: {
                                                                  type: 'spring',
                                                                  stiffness: 200,
                                                                  damping: 10,
                                                                  duration: 0.5,
                                                                  delay:
                                                                      0.6 +
                                                                      index *
                                                                          0.1,
                                                              },
                                                          }
                                                        : {
                                                              scale: 0,
                                                              opacity: 0,
                                                          }
                                                }
                                                whileInView={{
                                                    scale: [0, 1.2, 1],
                                                    transition: {
                                                        type: 'keyframes',
                                                        times: [0, 0.6, 1],
                                                        duration: 0.8,
                                                        ease: 'easeOut',
                                                        delay:
                                                            0.6 + index * 0.1,
                                                    },
                                                }}
                                                className='w-6 h-6 rounded-full bg-red-500 flex items-center justify-center'
                                            >
                                                <X className='w-4 h-4 text-white' />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default HowWeDifferent;
