'use client';

import { useRef } from 'react';
import GlobalTooltip from '../global/GlobalTooltip';
import { Button } from '../ui/button';
import {
    BarChartIcon as ChartNoAxesColumnIncreasing,
    PieChartIcon as ChartPie,
    CircleAlert,
    Clock,
    Layers,
    Scale,
} from 'lucide-react';
import GlobalTitle from '../global/GlobalTitle';
import { motion, useInView } from 'framer-motion';

const items = [
    {
        icon: <Layers />,
        title: 'Tool Overload',
        subTitle:
            'Juggling WhatsApp, Google Forms, Drive,YouTube, Slack, and more',
    },
    {
        title: ' Progress Tracking',
        subTitle: 'Unable to measure student growth and engagement effectively',
        icon: <ChartNoAxesColumnIncreasing />,
    },
    {
        icon: <Scale />,
        title: 'Scaling Issues',
        subTitle:
            'Limited by administrative tasks instead of focusing on coaching',
    },
    {
        icon: <CircleAlert />,
        title: 'Platform Limitations',
        subTitle: 'Using platforms not designed for high-ticket coaching',
    },
    {
        icon: <ChartPie />,
        title: 'Revenue Ceiling',
        subTitle: 'Struggling to break through to six-figure coaching income',
    },
    {
        icon: <Clock />,
        title: 'Time Management',
        subTitle: 'Spending more time on administration than actual coaching',
    },
];

const CoachDilemma = () => {
    // Create refs for scroll animations
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef(null);

    // Set up useInView hooks with once: false to allow re-animation on scroll
    const isSectionInView = useInView(sectionRef, { once: false, amount: 0.2 });
    const isTitleInView = useInView(titleRef, { once: false, amount: 0.5 });
    const isCardsInView = useInView(cardsRef, { once: false, amount: 0.1 });

    // Container animation variants
    const containerVariants = {
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

    // Item animation variants
    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 70,
                damping: 15,
                duration: 1,
            },
        },
    };

    // Button animation variants
    const buttonVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                duration: 0.8,
            },
        },
    };

    // Title animation variants
    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.2,
            },
        },
    };

    return (
        <motion.div
            ref={sectionRef}
            initial='hidden'
            animate={isSectionInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className='w-full py-10 bg-foreground'
        >
            <div className='my-container flex items-center flex-col'>
                <motion.div variants={buttonVariants}>
                    <GlobalTooltip tooltip='Common Challenges'>
                        <Button
                            variant={'primary_light'}
                            className='rounded-full w-fit md:mb-5 mb-3'
                            icon={<CircleAlert size={18} />}
                        >
                            Common Challenges
                        </Button>
                    </GlobalTooltip>
                </motion.div>

                <motion.div
                    ref={titleRef}
                    initial='hidden'
                    animate={isTitleInView ? 'visible' : 'hidden'}
                    variants={titleVariants}
                >
                    <GlobalTitle
                        title="The Coach's Dilemma"
                        subTitle='Are you struggling with these everyday coaching challenges?'
                    />
                </motion.div>

                <motion.div
                    ref={cardsRef}
                    initial='hidden'
                    animate={isCardsInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className='grid lg:grid-cols-3 pt-8 md:grid-cols-2 grid-cols-1 gap-5 w-full'
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={item.title}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.3 },
                            }}
                            className='p-[2px] rounded-md h-full w-full bg-gradient-to-br from-blue-700 to-cyan-300'
                        >
                            <div className='text-center bg-primary-light md:p-6 p-3 rounded-md py-10 space-y-3'>
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{
                                        duration: 1.5,
                                        delay: index * 0.2 + 1,
                                        ease: 'easeInOut',
                                    }}
                                >
                                    <Button
                                        variant={'primary_light'}
                                        className='rounded-xl bg-indigo-200/50 size-14'
                                        size={'icon'}
                                    >
                                        <motion.div
                                            whileHover={{
                                                scale: 1.2,
                                                rotate: 5,
                                            }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 400,
                                                damping: 10,
                                            }}
                                        >
                                            {item.icon}
                                        </motion.div>
                                    </Button>
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                    className='text-black font-semibold text-2xl'
                                >
                                    {item.title}
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className='text-dark-gray text-sm'
                                >
                                    {item.subTitle}
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CoachDilemma;
