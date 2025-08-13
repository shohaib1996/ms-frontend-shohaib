'use client';

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '../ui/button';

// Custom hook for animated counting
const useAnimatedCounter = (
    end: number,
    duration = 2000,
    shouldStart = false,
) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!shouldStart) {
            return;
        }

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) {
                startTime = timestamp;
            }
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(end * easeOutQuart));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, shouldStart]);

    return count;
};

const IncreaseEnrollment = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Animated counters for each statistic
    const count70 = useAnimatedCounter(70, 2000, isInView);
    const count3 = useAnimatedCounter(3, 1800, isInView);
    const count47 = useAnimatedCounter(47, 2200, isInView);
    const count89 = useAnimatedCounter(89, 2400, isInView);
    const count42000 = useAnimatedCounter(42000, 2600, isInView);

    const statistics = [
        {
            value: `${count70}%`,
            description: 'Reduction in\nadministrative tasks',
            delay: 0.1,
        },
        {
            value: `${count3}X`,
            description: 'Increase in student\nengagement',
            delay: 0.2,
        },
        {
            value: `${count47}%`,
            description: 'Improvement in course\ncompletion rates',
            delay: 0.3,
        },
        {
            value: `${count89}%`,
            description: 'of coaches report\nhigher student\nsatisfaction',
            delay: 0.4,
        },
        {
            value: `$${count42000.toLocaleString()}`,
            description: 'Average increase in\nannual coaching\nrevenue',
            delay: 0.5,
        },
    ];

    return (
        <section className='bg-gradient-to-l from-[#F9FAFB] to-[#EFF6FF] w-full py-10 px-4 dark:from-foreground dark:to-foreground'>
            <div className='my-container mx-auto' ref={ref}>
                {/* Statistics Section */}
                <div className='text-center'>
                    <motion.h2
                        className='text-3xl md:text-4xl font-bold text-black mb-8'
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        What would you do with...
                    </motion.h2>

                    {/* Statistics Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8'>
                        {statistics.map((stat, index) => (
                            <motion.div
                                key={index}
                                className='flex flex-col items-center group cursor-pointer'
                                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                animate={
                                    isInView
                                        ? {
                                              opacity: 1,
                                              y: 0,
                                              scale: 1,
                                          }
                                        : {
                                              opacity: 0,
                                              y: 50,
                                              scale: 0.8,
                                          }
                                }
                                transition={{
                                    duration: 0.6,
                                    delay: stat.delay,
                                    ease: 'easeOut',
                                    type: 'spring',
                                    stiffness: 100,
                                }}
                            >
                                <motion.div
                                    className='text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                                    initial={{ scale: 0 }}
                                    animate={
                                        isInView ? { scale: 1 } : { scale: 0 }
                                    }
                                    transition={{
                                        duration: 0.5,
                                        delay: stat.delay + 0.3,
                                        type: 'spring',
                                        stiffness: 200,
                                    }}
                                >
                                    {stat.value}
                                </motion.div>
                                <motion.p
                                    className='text-sm md:text-base text-gray leading-tight group-hover:text-gray-700 transition-colors duration-200'
                                    initial={{ opacity: 0 }}
                                    animate={
                                        isInView
                                            ? { opacity: 1 }
                                            : { opacity: 0 }
                                    }
                                    transition={{
                                        duration: 0.4,
                                        delay: stat.delay + 0.6,
                                    }}
                                >
                                    {stat.description
                                        .split('\n')
                                        .map((line, lineIndex) => (
                                            <span key={lineIndex}>
                                                {line}
                                                {lineIndex <
                                                    stat.description.split('\n')
                                                        .length -
                                                        1 && <br />}
                                            </span>
                                        ))}
                                </motion.p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Text */}
                    <motion.div
                        className='mb-6'
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{
                            duration: 0.6,
                            delay: 0.8,
                            ease: 'easeOut',
                        }}
                    >
                        <motion.h3
                            className='text-xl md:text-2xl font-bold text-black mb-2'
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                        >
                            Schools using SkillBNK cut admin time by 70% and
                            increase enrollments.
                        </motion.h3>
                        <motion.p
                            className='text-base md:text-lg text-gray'
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                        >
                            All without hiring more staff.{' '}
                            <span className='font-semibold'>Interested?</span>
                        </motion.p>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={
                            isInView
                                ? {
                                      opacity: 1,
                                      y: 0,
                                      scale: 1,
                                  }
                                : {
                                      opacity: 0,
                                      y: 20,
                                      scale: 0.9,
                                  }
                        }
                        transition={{
                            duration: 0.5,
                            delay: 1.4,
                            type: 'spring',
                            stiffness: 150,
                        }}
                    >
                        <Button
                            size='lg'
                            className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform '
                        >
                            Book a Demo
                        </Button>
                    </motion.div>
                </div>

                {/* Floating background elements */}
                <motion.div
                    className='absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20'
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className='absolute bottom-10 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20'
                    animate={{
                        y: [0, 15, 0],
                        x: [0, -15, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'easeInOut',
                    }}
                />
            </div>
        </section>
    );
};

export default IncreaseEnrollment;
