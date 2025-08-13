'use client';

import { useCallback, useState, useEffect, useRef } from 'react';
import GlobalTooltip from '../global/GlobalTooltip';
import { Button } from '../ui/button';
import GlobalTitle from '../global/GlobalTitle';
import {
    ArrowUpRight,
    LineChartIcon as ChartLine,
    CircleCheckBig,
} from 'lucide-react';
import {
    motion,
    useInView,
    useMotionValue,
    useTransform,
    animate,
} from 'framer-motion';

// Counter component for animating numbers
const Counter = ({
    from,
    to,
    duration = 2,
    formatter = (value: number) => value.toFixed(0),
}: {
    from: number;
    to: number;
    duration?: number;
    formatter?: (value: number) => string;
}) => {
    const nodeRef = useRef(null);
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => formatter(latest));

    useEffect(() => {
        const controls = animate(count, to, { duration });
        return controls.stop;
    }, [count, to, duration]);

    return <motion.span ref={nodeRef}>{rounded}</motion.span>;
};

// Currency formatter
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

const SuccessFormula = () => {
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

    // Refs for scroll animations
    const sectionRef = useRef(null);
    const leftCardRef = useRef(null);
    const rightCardRef = useRef(null);

    // Set up useInView hooks
    const isSectionInView = useInView(sectionRef, { once: false, amount: 0.2 });
    const isLeftCardInView = useInView(leftCardRef, {
        once: false,
        amount: 0.3,
    });
    const isRightCardInView = useInView(rightCardRef, {
        once: false,
        amount: 0.3,
    });

    // Progress bar animation states
    const [studentsProgress, setStudentsProgress] = useState(0);
    const [priceProgress, setPriceProgress] = useState(0);

    // Animate progress bars when in view
    useEffect(() => {
        if (isRightCardInView) {
            setTimeout(() => setStudentsProgress(50), 500);
            setTimeout(() => setPriceProgress(70), 1000);
        } else {
            setStudentsProgress(0);
            setPriceProgress(0);
        }
    }, [isRightCardInView]);

    return (
        <motion.div
            ref={sectionRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className='py-12 relative w-full overflow-hidden bg-foreground'
        >
            <div className='my-container flex flex-col items-center gap-5'>
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                        isSectionInView
                            ? { scale: 1, opacity: 1 }
                            : { scale: 0, opacity: 0 }
                    }
                    transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                        duration: 0.8,
                    }}
                >
                    <GlobalTooltip tooltip='Proven Approach'>
                        <Button
                            variant={'primary_light'}
                            className='rounded-full w-fit'
                            icon={<ChartLine size={18} />}
                        >
                            Proven Approach
                        </Button>
                    </GlobalTooltip>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                        isSectionInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <GlobalTitle
                        title='The Success Formula'
                        subTitle='How Our Coaches are Generating $500,000+ Annually'
                    />
                </motion.div>

                <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-3 w-full z-50'>
                    <motion.div
                        ref={leftCardRef}
                        initial={{
                            opacity: 0,
                            rotateY: 25,
                            perspective: 1000,
                            transformStyle: 'preserve-3d',
                        }}
                        animate={
                            isLeftCardInView
                                ? {
                                      opacity: 1,
                                      rotateY: 0,
                                      transition: {
                                          type: 'spring',
                                          stiffness: 70,
                                          damping: 15,
                                          duration: 1,
                                      },
                                  }
                                : {
                                      opacity: 0,
                                      rotateY: 25,
                                  }
                        }
                        className='w-full border border-indigo-200/50 rounded-md bg-primary-light p-4 space-y-3'
                    >
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={
                                isLeftCardInView
                                    ? { opacity: 1 }
                                    : { opacity: 0 }
                            }
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className='border-b border-forground-border pb-4 text-2xl text-black font-semibold'
                        >
                            The Winning Strategy
                        </motion.h2>

                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={
                                isLeftCardInView
                                    ? { opacity: 1 }
                                    : { opacity: 0 }
                            }
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className='text-xl text-dark-gray font-semibold'
                        >
                            Our proven framework allows coaches to:
                        </motion.h2>

                        {[
                            'Coach 50 students per year at $10,000 each',
                            'Generate $500,000 annually—while keeping their full-time job',
                            'Focus solely on coaching, not platform management',
                            'Scale their business without hiring additional staff',
                        ].map((item, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                animate={
                                    isLeftCardInView
                                        ? { opacity: 1, x: 0 }
                                        : { opacity: 0, x: -50 }
                                }
                                transition={{
                                    duration: 0.5,
                                    delay: 0.7 + index * 0.2,
                                }}
                                className='text-gray flex gap-2 items-center'
                            >
                                <motion.span
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={
                                        isLeftCardInView
                                            ? {
                                                  scale: 1,
                                                  rotate: 0,
                                                  transition: {
                                                      type: 'spring',
                                                      stiffness: 260,
                                                      damping: 20,
                                                      delay: 0.9 + index * 0.2,
                                                  },
                                              }
                                            : {
                                                  scale: 0,
                                                  rotate: -180,
                                              }
                                    }
                                    className='size-9 rounded-full flex items-center justify-center bg-foreground border border-forground-border'
                                >
                                    <CircleCheckBig
                                        size={18}
                                        className='text-primary-white'
                                    />
                                </motion.span>
                                {item}
                            </motion.p>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                                isLeftCardInView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 20 }
                            }
                            transition={{ duration: 0.5, delay: 1.5 }}
                            className='border-t border-forground-border'
                        >
                            <Button
                                onClick={() => scrollToSection('faq')}
                                className='rounded-full w-fit mt-3'
                                size={'lg'}
                            >
                                Join Our Success Story
                                <ArrowUpRight size={18} />
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        ref={rightCardRef}
                        initial={{
                            opacity: 0,
                            rotateY: -25,
                            perspective: 1000,
                            transformStyle: 'preserve-3d',
                        }}
                        animate={
                            isRightCardInView
                                ? {
                                      opacity: 1,
                                      rotateY: 0,
                                      transition: {
                                          type: 'spring',
                                          stiffness: 70,
                                          damping: 15,
                                          duration: 1,
                                      },
                                  }
                                : {
                                      opacity: 0,
                                      rotateY: -25,
                                  }
                        }
                        className='w-full border text-sm border-indigo-200/50 rounded-md bg-gradient-to-r from-primary-light to-white/30 dark:to-slate-950/30 p-4 space-y-3'
                    >
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={
                                isRightCardInView
                                    ? { opacity: 1 }
                                    : { opacity: 0 }
                            }
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className='border-b border-forground-border pb-4 text-2xl text-black font-semibold'
                        >
                            The Winning Strategy
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                                isRightCardInView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 20 }
                            }
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className='text-dark-gray'
                        >
                            <h2 className='flex justify-between font-semibold pb-2'>
                                Number of Students{' '}
                                <motion.span
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={
                                        isRightCardInView
                                            ? { scale: 1, opacity: 1 }
                                            : { scale: 0.8, opacity: 0 }
                                    }
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                    className='bg-foreground rounded-full px-2 text-primary'
                                >
                                    {isRightCardInView ? (
                                        <Counter
                                            from={0}
                                            to={50}
                                            duration={1.5}
                                        />
                                    ) : (
                                        '0'
                                    )}
                                </motion.span>
                            </h2>
                            <motion.div className='bg-foreground h-3 rounded-full overflow-hidden'>
                                <motion.div
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${studentsProgress}%` }}
                                    transition={{
                                        duration: 1,
                                        ease: 'easeOut',
                                    }}
                                    className='bg-primary h-full rounded-full'
                                />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                                isRightCardInView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 20 }
                            }
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className='text-dark-gray'
                        >
                            <h2 className='flex justify-between font-semibold pb-2'>
                                Price per Students ($){' '}
                                <motion.span
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={
                                        isRightCardInView
                                            ? { scale: 1, opacity: 1 }
                                            : { scale: 0.8, opacity: 0 }
                                    }
                                    transition={{ duration: 0.5, delay: 0.9 }}
                                    className='bg-foreground rounded-full px-2'
                                >
                                    {isRightCardInView ? (
                                        <Counter
                                            from={0}
                                            to={10000}
                                            duration={1.5}
                                            formatter={(value) =>
                                                `$${value.toFixed(0)}`
                                            }
                                        />
                                    ) : (
                                        '$0'
                                    )}
                                </motion.span>
                            </h2>
                            <motion.div className='bg-foreground h-3 rounded-full overflow-hidden'>
                                <motion.div
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${priceProgress}%` }}
                                    transition={{
                                        duration: 1,
                                        ease: 'easeOut',
                                    }}
                                    className='bg-primary h-full rounded-full'
                                />
                            </motion.div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={
                                isRightCardInView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 10 }
                            }
                            transition={{ duration: 0.5, delay: 1.1 }}
                            className='flex justify-between text-gray border-b border-forground-border pb-3'
                        >
                            Total Revenue:{' '}
                            <span>
                                {isRightCardInView ? (
                                    <Counter
                                        from={0}
                                        to={500000}
                                        duration={2}
                                        formatter={formatCurrency}
                                    />
                                ) : (
                                    '$0.00'
                                )}
                            </span>
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={
                                isRightCardInView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 10 }
                            }
                            transition={{ duration: 0.5, delay: 1.3 }}
                            className='flex justify-between text-gray border-b border-forground-border pb-3'
                        >
                            Total Earnings (70%){' '}
                            <span>
                                {isRightCardInView ? (
                                    <Counter
                                        from={0}
                                        to={350000}
                                        duration={2}
                                        formatter={formatCurrency}
                                    />
                                ) : (
                                    '$0.00'
                                )}
                            </span>
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={
                                isRightCardInView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 10 }
                            }
                            transition={{ duration: 0.5, delay: 1.5 }}
                            className='flex justify-between text-gray'
                        >
                            Platform Fee (30%){' '}
                            <span>
                                {isRightCardInView ? (
                                    <Counter
                                        from={0}
                                        to={150000}
                                        duration={2}
                                        formatter={formatCurrency}
                                    />
                                ) : (
                                    '$0.00'
                                )}
                            </span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                                isRightCardInView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 20 }
                            }
                            transition={{ duration: 0.5, delay: 1.7 }}
                            className='border-t border-forground-border'
                        >
                            <Button
                                onClick={() => scrollToSection('faq')}
                                className='rounded-full w-fit mt-3'
                                size={'lg'}
                            >
                                Schedule Demo to Learn More
                                <ArrowUpRight size={18} />
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={isSectionInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className='absolute z-10 -top-[50px] blur-3xl h-[1000px] md:w-[800px] w-[500px] -right-[100px] bg-gradient-to-bl rounded-full from-blue-400/30 to-transparent'
            ></motion.div>
        </motion.div>
    );
};

export default SuccessFormula;
