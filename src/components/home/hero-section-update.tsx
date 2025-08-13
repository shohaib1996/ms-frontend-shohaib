'use client';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Calendar,
    ChartNoAxesColumnIncreasing,
    ChartPie,
    Check,
    CheckCircle,
    CircleAlert,
    Clock,
    Layers,
    Play,
    Power,
    Quote,
    Scale,
    Star,
    Users,
    Zap,
} from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const HeroSectionUpdate = () => {
    const [api, setApi] = React.useState<any>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const items = [
        {
            icon: <Layers className='text-white' />,
            title: 'No More Tool Sprawl',
            subTitle: 'Combine LMS, CRM, and scheduling into one system',
            bgColor: 'bg-gradient-to-r from-[#2B7FFF]  to-[#155DFC]',
        },
        {
            title: 'Data-Backed & Efficient',
            subTitle: 'Track progress & predict outcomes with AI',
            icon: <ChartNoAxesColumnIncreasing className='text-white' />,
            bgColor: 'bg-gradient-to-r from-[#AD46FF]  to-[#9810FA]',
        },
        {
            icon: <Scale className='text-white' />,
            title: 'Focus on Students',
            subTitle: 'Automate student onboarding, reminders & follow - ups',
            bgColor: 'bg-gradient-to-r from-[#2B7FFF]  to-[#155DFC]',
        },
        {
            icon: <CircleAlert className='text-white' />,
            title: 'Adaptability',
            subTitle: 'Launch new programs fast with zero technical overhead',
            bgColor: 'bg-gradient-to-r from-[#00B8DB]  to-[#0092B8]',
        },
        {
            icon: <ChartPie className='text-white' />,
            title: 'Customization',
            subTitle: 'White-labelled and fully branded for your school',
            bgColor: 'bg-gradient-to-r from-[#F6339A]  to-[#E60076]',
        },
        {
            icon: <Clock className='text-white' />,
            title: 'Built for Growth',
            subTitle: 'Ready to scale when you are',
            bgColor: 'bg-gradient-to-r from-[#AD46FF]  to-[#9810FA]',
        },
    ];
    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
            },
        },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    return (
        <>
            <section className='bg-white  dark:bg-black w-full text-black'>
                <div className='relative  mx-auto'>
                    <motion.div
                        className='w-72 h-72 hidden md:block rounded-full top-28 left-40 bg-blue-200 absolute'
                        animate={{
                            y: [0, -20, 0],
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'easeInOut',
                        }}
                    />
                    <motion.div
                        className='w-40 h-40 hidden md:block rounded-full bottom-24 left-96 bg-red-200 absolute'
                        animate={{
                            y: [0, 15, 0],
                            scale: [1, 0.95, 1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'easeInOut',
                            delay: 1,
                        }}
                    />

                    <div className='w-full bg-white/40  dark:bg-gray-900/90 backdrop-blur-xl  py-20 pt-32 flex items-center relative z-10'>
                        <div className='my-container'>
                            <div className='grid gap-20 lg:grid-cols-2'>
                                <motion.div
                                    className='space-y-4'
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: 'easeOut',
                                    }}
                                >
                                    <motion.div
                                        className='py-1 sm:py-3 px-3 sm:px-8 rounded-[50px] inline-flex items-center border-[#DBEAFE] border-2 bg-gradient-to-l backdrop-blur-lg from-[#F3E8FF] to-[#DBEAFE] dark:from-[#1d1861] dark:border-transparent dark:to-[#2f2866] gap-4'
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.2,
                                        }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <motion.span
                                            className='h-3 w-3 rounded-full sm:inline-flex hidden bg-green-500'
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{
                                                duration: 2,
                                                repeat: Number.POSITIVE_INFINITY,
                                            }}
                                        />
                                        <svg
                                            width='17'
                                            height='17'
                                            viewBox='0 0 17 17'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M7.52469 10.7433C7.46517 10.5126 7.34492 10.3021 7.17644 10.1336C7.00796 9.9651 6.79741 9.84485 6.56669 9.78533L2.47669 8.73066C2.40691 8.71086 2.3455 8.66883 2.30177 8.61096C2.25804 8.55309 2.23438 8.48253 2.23438 8.41C2.23438 8.33746 2.25804 8.2669 2.30177 8.20903C2.3455 8.15116 2.40691 8.10914 2.47669 8.08933L6.56669 7.034C6.79732 6.97453 7.00782 6.85438 7.17629 6.68602C7.34477 6.51767 7.46507 6.30726 7.52469 6.07666L8.57936 1.98666C8.59896 1.91661 8.64095 1.85489 8.69891 1.81093C8.75686 1.76696 8.82761 1.74316 8.90036 1.74316C8.9731 1.74316 9.04385 1.76696 9.10181 1.81093C9.15977 1.85489 9.20175 1.91661 9.22136 1.98666L10.2754 6.07666C10.3349 6.30738 10.4551 6.51793 10.6236 6.68641C10.7921 6.85489 11.0026 6.97515 11.2334 7.03466L15.3234 8.08866C15.3937 8.10806 15.4557 8.15 15.4999 8.20805C15.5441 8.26609 15.5681 8.33704 15.5681 8.41C15.5681 8.48296 15.5441 8.5539 15.4999 8.61195C15.4557 8.66999 15.3937 8.71193 15.3234 8.73133L11.2334 9.78533C11.0026 9.84485 10.7921 9.9651 10.6236 10.1336C10.4551 10.3021 10.3349 10.5126 10.2754 10.7433L9.22069 14.8333C9.20109 14.9034 9.1591 14.9651 9.10114 15.0091C9.04319 15.053 8.97244 15.0768 8.89969 15.0768C8.82695 15.0768 8.7562 15.053 8.69824 15.0091C8.64028 14.9651 8.5983 14.9034 8.57869 14.8333L7.52469 10.7433Z'
                                                stroke='#1447E6'
                                                strokeWidth='1.33333'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                            <path
                                                d='M14.2334 2.41V5.07667'
                                                stroke='#1447E6'
                                                strokeWidth='1.33333'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                            <path
                                                d='M15.5671 3.74333H12.9004'
                                                stroke='#1447E6'
                                                strokeWidth='1.33333'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                            <path
                                                d='M3.56738 11.7433V13.0767'
                                                stroke='#1447E6'
                                                strokeWidth='1.33333'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                            <path
                                                d='M4.23372 12.41H2.90039'
                                                stroke='#1447E6'
                                                strokeWidth='1.33333'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                        <span className='text-primary font-semibold text-xs dark:text-white'>
                                            One Platform for Everything
                                        </span>
                                        <motion.span
                                            className='rounded-2xl py-[2px] px-2 sm:px-3 bg-primary inline-flex items-center sm:gap-2 text-white'
                                            animate={{
                                                boxShadow: [
                                                    '0 0 0 0 rgba(20, 71, 230, 0.4)',
                                                    '0 0 0 8px rgba(20, 71, 230, 0)',
                                                    '0 0 0 0 rgba(20, 71, 230, 0)',
                                                ],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Number.POSITIVE_INFINITY,
                                            }}
                                        >
                                            <svg
                                                width='15'
                                                height='15'
                                                viewBox='0 0 13 13'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path
                                                    d='M6.34082 1.41L7.88582 4.54L11.3408 5.045L8.84082 7.48L9.43082 10.92L6.34082 9.295L3.25082 10.92L3.84082 7.48L1.34082 5.045L4.79582 4.54L6.34082 1.41Z'
                                                    stroke='white'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                            </svg>
                                            New
                                        </motion.span>
                                    </motion.div>

                                    <motion.h1
                                        className='text-4xl sm:text-5xl 2xl:text-[60px] leading-none font-bold'
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.4,
                                        }}
                                    >
                                        <motion.span
                                            className='bg-gradient-to-r from-[#0635D0] via-[#9810FA] to-[#5926D9] bg-clip-text text-transparent'
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.6,
                                            }}
                                        >
                                            One Platform.
                                        </motion.span>
                                        <br />
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.8,
                                            }}
                                        >
                                            Every Tool You Need
                                        </motion.span>
                                        <br className='hidden 2xl:block' />
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 1.0,
                                            }}
                                        >
                                            to{' '}
                                            <span className='bg-gradient-to-r from-[#0635D0] via-[#9810FA] to-[#5926D9] bg-clip-text text-transparent'>
                                                Run & Scale.
                                            </span>
                                        </motion.span>
                                        <br className='hidden' />
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 1.2,
                                            }}
                                        >
                                            Your Training School.
                                        </motion.span>
                                    </motion.h1>

                                    <motion.p
                                        className='text-gray'
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 1.4,
                                        }}
                                    >
                                        Tired of juggling{' '}
                                        <span className='text-[#FB2C36]'>
                                            5+ platforms?
                                        </span>{' '}
                                        SkillBNK replaces them all so you can
                                        focus on{' '}
                                        <span className='text-primary dark:text-[#FF8904]'>
                                            training students
                                        </span>
                                        , not managing software.
                                    </motion.p>

                                    <motion.div
                                        className='flex items-center flex-wrap gap-2 md:gap-3 2xl:gap-6'
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 1.6,
                                        }}
                                    >
                                        {[
                                            {
                                                icon: Users,
                                                text: '500+ Schools',
                                                color: 'text-primary dark:text-[#9810FA]',
                                            },
                                            {
                                                icon: Star,
                                                text: '4.9/5 Rating',
                                                color: 'text-[#EFB100]',
                                            },
                                            {
                                                icon: Star,
                                                text: '70% Time Saved',
                                                color: 'text-[#00C950]',
                                            },
                                        ].map((item, index) => (
                                            <motion.span
                                                key={index}
                                                className='inline-flex text-gray-700 dark:text-gray-200 font-semibold items-center gap-2'
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    duration: 0.4,
                                                    delay: 1.8 + index * 0.1,
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <item.icon
                                                    className={item.color}
                                                />
                                                {item.text}
                                            </motion.span>
                                        ))}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 2.1,
                                        }}
                                    >
                                        <motion.div whileTap={{ scale: 0.98 }}>
                                            <Button className='inline-flex justify-between rounded-3xl hover:text-white py-[10px] h-auto items-center bg-gradient-to-r from-[#0635D0] via-[#9810FA] to-[#4F22E5] px-5'>
                                                <Calendar />
                                                <span className='px-4'>
                                                    Schedule Demo
                                                </span>
                                                <motion.div
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Number.POSITIVE_INFINITY,
                                                    }}
                                                >
                                                    <ArrowRight />
                                                </motion.div>
                                            </Button>
                                        </motion.div>
                                    </motion.div>

                                    <motion.div
                                        className='flex items-center flex-wrap gap-2 sm:gap-2 2xl:gap-6'
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 2.3,
                                        }}
                                    >
                                        {[
                                            'Free 14-day trial',
                                            'No credit card required',
                                            'Setup in 24 hours',
                                        ].map((text, index) => (
                                            <motion.span
                                                key={index}
                                                className='inline-flex text-gray font-normal items-center gap-2'
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    duration: 0.4,
                                                    delay: 2.5 + index * 0.1,
                                                }}
                                            >
                                                <CheckCircle className='text-[#00C950] size-4' />
                                                {text}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </motion.div>

                                <motion.div
                                    className='sm:flex items-center justify-center'
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    <div className='relative'>
                                        <motion.span className='absolute inset-0 blur-2xl bg-gradient-to-r from-[#155DFC] via-[#9810FA] to-[#155DFC] opacity-50 -z-10' />

                                        <motion.div
                                            className='bg-gradient-to-r from-[#FF8904] to-[#FB2C36] absolute -bottom-14 left-0 sm:-left-10 md:-left-20 2xl:-left-32 z-10 rounded-2xl p-4'
                                            initial={{
                                                opacity: 0,
                                                y: 50,
                                                rotate: -5,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: [0, -10, 0],
                                                rotate: [-5, -3, -5],
                                            }}
                                            transition={{
                                                opacity: {
                                                    duration: 0.6,
                                                    delay: 1.0,
                                                },
                                                y: {
                                                    duration: 3,
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    ease: 'easeInOut',
                                                },
                                                rotate: {
                                                    duration: 3,
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    ease: 'easeInOut',
                                                },
                                            }}
                                            whileHover={{
                                                scale: 1.1,
                                                rotate: 0,
                                            }}
                                        >
                                            <p className='text-white text-xl font-bold text-center'>
                                                5-in-1
                                            </p>
                                            <p className='text-white text-center'>
                                                Platform Solution
                                            </p>
                                        </motion.div>

                                        <motion.div
                                            className='bg-gradient-to-r from-[#00BC7D] z-0 to-[#05DF72] absolute -top-16 right-0 sm:-right-4 md:-right-10 lg:right-0 xl:-right-2 2xl:-right-10 rounded-2xl p-4'
                                            initial={{
                                                opacity: 0,
                                                y: -50,
                                                rotate: 5,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: [0, 10, 0],
                                                rotate: [5, 3, 5],
                                            }}
                                            transition={{
                                                opacity: {
                                                    duration: 0.6,
                                                    delay: 1.2,
                                                },
                                                y: {
                                                    duration: 4,
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    ease: 'easeInOut',
                                                    delay: 1,
                                                },
                                                rotate: {
                                                    duration: 4,
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    ease: 'easeInOut',
                                                    delay: 1,
                                                },
                                            }}
                                            whileHover={{
                                                scale: 1.1,
                                                rotate: 0,
                                            }}
                                        >
                                            <p className='text-white text-xl font-bold text-center'>
                                                180+
                                            </p>
                                            <p className='text-white text-center'>
                                                Students Managed
                                            </p>
                                        </motion.div>

                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.9,
                                                y: 30,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.6,
                                            }}
                                        >
                                            <Card className='p-0 border border-none relative rounded-3xl w-full sm:w-[600px] lg:w-[450px] xl:w-[500px] 2xl:w-[600px] gap-0'>
                                                <CardHeader className='flex bg-[#F9FAFB] dark:bg-[#374655] border-b border-border px-5 rounded-t-3xl py-3 flex-row justify-between items-center gap-2'>
                                                    <div className='flex items-center gap-2'>
                                                        <div className='flex items-center gap-1'>
                                                            <motion.span
                                                                className='h-3 w-3 rounded-full bg-[#FB2C36] inline-flex'
                                                                animate={{
                                                                    scale: [
                                                                        1, 1.2,
                                                                        1,
                                                                    ],
                                                                }}
                                                                transition={{
                                                                    duration: 1.5,
                                                                    repeat: Number.POSITIVE_INFINITY,
                                                                    delay: 0,
                                                                }}
                                                            />
                                                            <motion.span
                                                                className='h-3 w-3 rounded-full bg-[#F0B100] inline-flex'
                                                                animate={{
                                                                    scale: [
                                                                        1, 1.2,
                                                                        1,
                                                                    ],
                                                                }}
                                                                transition={{
                                                                    duration: 1.5,
                                                                    repeat: Number.POSITIVE_INFINITY,
                                                                    delay: 0.2,
                                                                }}
                                                            />
                                                            <motion.span
                                                                className='h-3 w-3 rounded-full bg-[#00C950] inline-flex'
                                                                animate={{
                                                                    scale: [
                                                                        1, 1.2,
                                                                        1,
                                                                    ],
                                                                }}
                                                                transition={{
                                                                    duration: 1.5,
                                                                    repeat: Number.POSITIVE_INFINITY,
                                                                    delay: 0.4,
                                                                }}
                                                            />
                                                        </div>
                                                        <p className='text-[#4A5565] dark:text-gray-200'>
                                                            SkillBNK Platform
                                                            Demo
                                                        </p>
                                                    </div>
                                                    <motion.div
                                                        animate={{
                                                            scale: [1, 1.05, 1],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Number.POSITIVE_INFINITY,
                                                        }}
                                                    >
                                                        <span className='py-[2px] px-3 bg-green-100 rounded-3xl text-green-600 inline-flex items-center gap-2'>
                                                            <motion.span
                                                                className='h-3 w-3 rounded-full bg-green-600 inline-flex text-xs'
                                                                animate={{
                                                                    opacity: [
                                                                        1, 0.5,
                                                                        1,
                                                                    ],
                                                                }}
                                                                transition={{
                                                                    duration: 1,
                                                                    repeat: Number.POSITIVE_INFINITY,
                                                                }}
                                                            />
                                                            Live
                                                        </span>
                                                    </motion.div>
                                                </CardHeader>

                                                <CardContent className='flex items-end justify-center h-[330px] relative bg-gradient-to-tr from-[#E5E7EB] dark:from-[#102246] rounded-b-3xl to-[#E5E7EB00]'>
                                                    {[
                                                        {
                                                            position:
                                                                'top-5 left-5',
                                                            icon: Users,
                                                            iconBg: 'bg-blue-100',
                                                            iconColor:
                                                                'text-primary dark:text-[#FF8904]',
                                                            title: 'Active Students',
                                                            value: '1,247',
                                                            valueColor:
                                                                'text-primary dark:text-[#FF8904]',
                                                            delay: 1.4,
                                                        },
                                                        {
                                                            position:
                                                                'top-5 right-5',
                                                            icon: CheckCircle,
                                                            iconBg: 'bg-green-100',
                                                            iconColor:
                                                                'text-green-600',
                                                            title: 'Completion Rate',
                                                            value: '90%',
                                                            valueColor:
                                                                'text-[#00A63E]',
                                                            delay: 1.6,
                                                        },
                                                        {
                                                            position:
                                                                'bottom-2 left-5',
                                                            icon: Zap,
                                                            iconBg: 'bg-[#f4e4ff]',
                                                            iconColor:
                                                                'text-[#9810FA]',
                                                            title: 'Time Saved',
                                                            value: '70%',
                                                            valueColor:
                                                                'text-[#9810FA]',
                                                            delay: 1.8,
                                                        },
                                                    ].map((card, index) => (
                                                        <motion.div
                                                            key={index}
                                                            className={`bg-white dark:bg-gray-900 rounded-xl p-3 flex gap-2 absolute ${card.position} items-center`}
                                                            initial={{
                                                                opacity: 0,
                                                                scale: 0.8,
                                                                y: 20,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                scale: 1,
                                                                y: 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.5,
                                                                delay: card.delay,
                                                            }}
                                                            whileHover={{
                                                                scale: 1.05,
                                                                y: -5,
                                                            }}
                                                        >
                                                            <div>
                                                                <span
                                                                    className={`h-12 w-12 rounded-xl ${card.iconBg} flex items-center justify-center`}
                                                                >
                                                                    <card.icon
                                                                        className={
                                                                            card.iconColor
                                                                        }
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <p className='font-semibold text-sm'>
                                                                    {card.title}
                                                                </p>
                                                                <motion.p
                                                                    className={`${card.valueColor} text-2xl font-bold`}
                                                                    initial={{
                                                                        opacity: 0,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.5,
                                                                        delay:
                                                                            card.delay +
                                                                            0.3,
                                                                    }}
                                                                >
                                                                    {card.value}
                                                                </motion.p>
                                                            </div>
                                                        </motion.div>
                                                    ))}

                                                    <motion.div
                                                        className='h-24 w-24 left-2/4 top-1/4 -translate-y-0/4 cursor-pointer -translate-x-2/4 rounded-full flex items-center justify-center absolute bg-gradient-to-r from-[#155DFC] text-white to-[#9810FA]'
                                                        animate={{
                                                            opacity: 1,
                                                            boxShadow: [
                                                                '0 0 0 0 rgba(21, 93, 252, 0.4)',
                                                                '0 0 0 20px rgba(21, 93, 252, 0)',
                                                                '0 0 0 0 rgba(21, 93, 252, 0)',
                                                            ],
                                                        }}
                                                        transition={{
                                                            opacity: {
                                                                duration: 0.5,
                                                                delay: 2.0,
                                                            },
                                                            scale: {
                                                                duration: 0.5,
                                                                delay: 2.0,
                                                            },
                                                            boxShadow: {
                                                                duration: 2,
                                                                repeat: Number.POSITIVE_INFINITY,
                                                                delay: 2.5,
                                                            },
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                    >
                                                        <Play className='size-14' />
                                                    </motion.div>

                                                    <motion.div
                                                        className='absolute bottom-1/4 '
                                                        initial={{
                                                            opacity: 0,
                                                            y: 20,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.6,
                                                            delay: 2.2,
                                                        }}
                                                    >
                                                        <p className='text-gray-800 dark:text-gray-200 font-semibold text-center text-lg'>
                                                            Watch Platform Demo
                                                        </p>
                                                        <p className='text-base text-gray text-center'>
                                                            See how SkillBNK
                                                            transforms training
                                                            schools
                                                        </p>
                                                    </motion.div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-foreground w-full py-10'>
                <div className='bg-gradient-to-r from-[#EFF6FF]  to-[#FAF5FF] dark:from-foreground dark:via-[#203252] dark:to-foreground '>
                    <div className='my-container py-6'>
                        <div className='flex justify-center'>
                            <div className=''>
                                <p className='max-w-[800px] font-semibold text-2xl text-black text-center '>
                                    Launch faster, operate leaner, and scale
                                    smarter with{' '}
                                    <span className='text-primary dark:text-[#9810FA]'>
                                        zero code or tech staff needed.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full py-5 pb-10 bg-gradient-to-l from-[#FAF5FF]  to-[#DBEAFE] dark:from-[#121c57]  dark:to-[#0d1633]  '>
                <div className='my-container mx-auto'>
                    <div className='max-w-[500px] mx-auto'>
                        <div className='flex justify-center'>
                            <div className='py-2  px-5  rounded-[50px] inline-flex items-center  bg-gradient-to-l backdrop-blur-lg from-[#DBEAFE]  to-[#DBEAFE]  gap-2'>
                                <Star className='text-primary size-4' />
                                <span className='text-primary font-semibold text-center'>
                                    Customer Success Story
                                </span>
                            </div>
                        </div>
                        <h2 className='font-extrabold text-4xl text-black mt-2 text-center'>
                            Testimonial-style Proof
                        </h2>
                    </div>
                    <Tabs defaultValue='institutions' className='mt-3 '>
                        <div className='flex justify-center mb-4 '>
                            <TabsList className=' rounded-3xl  h-auto px-2 py-[6px] bg-gradient-to-r from-[#DBEAFE] to-[#F3E8FF]'>
                                <TabsTrigger
                                    value='institutions'
                                    className=' px-4 data-[state=active]:bg-primary rounded-3xl py-2 text-primary '
                                >
                                    Institutions
                                </TabsTrigger>
                                <TabsTrigger
                                    value='mentor'
                                    className=' px-4 data-[state=active]:bg-primary rounded-3xl py-2 text-primary '
                                >
                                    Mentors
                                </TabsTrigger>
                                <TabsTrigger
                                    value='student'
                                    className=' px-4 data-[state=active]:bg-primary rounded-3xl py-2 text-primary '
                                >
                                    Students
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value='institutions'>
                            <Carousel setApi={setApi} className='w-full'>
                                <CarouselContent>
                                    {[1, 2, 3].map((slide) => (
                                        <CarouselItem key={slide}>
                                            <div className='grid lg:grid-cols-2'>
                                                <div className='relative px-3 sm:px-10 md:px-20 order-2 lg:order-a'>
                                                    <div className='lg:absolute min-h-[80%] flex flex-col justify-center -mt-20 lg:mt-0 lg:top-2/4 -right-10 lg:-translate-y-2/4 bg-gradient-to-br space-y-3 from-[#0635D0] p-3  lg:p-8 rounded-md to-[#9810FA]'>
                                                        <div>
                                                            <Quote className='size-10 text-gray-300' />
                                                        </div>
                                                        <p className='md:text-[28px] text-white sm:text-xl text-base font-bold'>
                                                            {`"Before SkillBNK, we used 6 tools and still had constant dropouts and scheduling chaos. Now it just runs. We grew from 40 to 180 students in under a year."`}
                                                        </p>
                                                        <div className='flex items-center gap-2'>
                                                            <div>
                                                                <Image
                                                                    src={`/blogs/avatar.png`}
                                                                    width={50}
                                                                    height={50}
                                                                    alt='avater'
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className='text-lg font-semibold text-white'>
                                                                    Director
                                                                </p>
                                                                <p className='text-base text-gray-300'>
                                                                    Allied
                                                                    Health
                                                                    Training
                                                                    School
                                                                </p>
                                                                <div className='flex items-center gap-2'>
                                                                    {[
                                                                        1, 2, 3,
                                                                        4, 5,
                                                                    ].map(
                                                                        (
                                                                            item,
                                                                        ) => (
                                                                            <Star
                                                                                key={
                                                                                    item
                                                                                }
                                                                                className='size-5 text-[#FCC800]'
                                                                            />
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='order-1 lg:order-2'>
                                                    <Image
                                                        src={'/slider-img.jpg'}
                                                        width={800}
                                                        height={400}
                                                        alt='Image'
                                                        className='rounded-xl w-full lg:h-[500px] object-cover'
                                                    />
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>

                            {/* Pagination */}
                            <div className='flex justify-center gap-2 mt-4'>
                                {Array.from({ length: count }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => api?.scrollTo(i)}
                                        className={`h-3 w-3 rounded-full transition-all ${
                                            current === i
                                                ? 'bg-blue-600 w-6'
                                                : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value='student'>
                            <Carousel setApi={setApi} className='w-full'>
                                <CarouselContent>
                                    {[1, 2, 3].map((slide) => (
                                        <CarouselItem key={slide}>
                                            <div className='grid lg:grid-cols-2'>
                                                <div className='relative px-3 sm:px-10 md:px-20 order-2 lg:order-a'>
                                                    <div className='lg:absolute min-h-[80%] flex flex-col justify-center -mt-20 lg:mt-0 lg:top-2/4 -right-10 lg:-translate-y-2/4 bg-gradient-to-br space-y-3 from-[#0635D0] p-3  lg:p-8 rounded-md to-[#9810FA]'>
                                                        <div>
                                                            <Quote className='size-10 text-gray-300' />
                                                        </div>
                                                        <p className='md:text-[28px] text-white sm:text-xl text-base font-bold'>
                                                            {`"Before SkillBNK, we used 6 tools and still had constant dropouts and scheduling chaos. Now it just runs. We grew from 40 to 180 students in under a year."`}
                                                        </p>
                                                        <div className='flex items-center gap-2'>
                                                            <div>
                                                                <Image
                                                                    src={`/blogs/avatar.png`}
                                                                    width={50}
                                                                    height={50}
                                                                    alt='avater'
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className='text-lg font-semibold text-white'>
                                                                    Director
                                                                </p>
                                                                <p className='text-base text-gray-300'>
                                                                    Allied
                                                                    Health
                                                                    Training
                                                                    School
                                                                </p>
                                                                <div className='flex items-center gap-2'>
                                                                    {[
                                                                        1, 2, 3,
                                                                        4, 5,
                                                                    ].map(
                                                                        (
                                                                            item,
                                                                        ) => (
                                                                            <Star
                                                                                key={
                                                                                    item
                                                                                }
                                                                                className='size-5 text-[#FCC800]'
                                                                            />
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='order-1 lg:order-2'>
                                                    <Image
                                                        src={'/slider-img.jpg'}
                                                        width={800}
                                                        height={400}
                                                        alt='Image'
                                                        className='rounded-xl w-full lg:h-[500px] object-cover'
                                                    />
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>

                            {/* Pagination */}
                            <div className='flex justify-center gap-2 mt-4'>
                                {Array.from({ length: count }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => api?.scrollTo(i)}
                                        className={`h-3 w-3 rounded-full transition-all ${
                                            current === i
                                                ? 'bg-blue-600 w-6'
                                                : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value='mentor'>
                            <Carousel setApi={setApi} className='w-full'>
                                <CarouselContent>
                                    {[1, 2, 3].map((slide) => (
                                        <CarouselItem key={slide}>
                                            <div className='grid lg:grid-cols-2'>
                                                <div className='relative px-3 sm:px-10 md:px-20 order-2 lg:order-a'>
                                                    <div className='lg:absolute min-h-[80%] flex flex-col justify-center -mt-20 lg:mt-0 lg:top-2/4 -right-10 lg:-translate-y-2/4 bg-gradient-to-br space-y-3 from-[#0635D0] p-3  lg:p-8 rounded-md to-[#9810FA]'>
                                                        <div>
                                                            <Quote className='size-10 text-gray-300' />
                                                        </div>
                                                        <p className='md:text-[28px] sm:text-xl text-base font-bold'>
                                                            {`"Before SkillBNK, we used 6 tools and still had constant dropouts and scheduling chaos. Now it just runs. We grew from 40 to 180 students in under a year."`}
                                                        </p>
                                                        <div className='flex items-center gap-2'>
                                                            <div>
                                                                <Image
                                                                    src={`/blogs/avatar.png`}
                                                                    width={50}
                                                                    height={50}
                                                                    alt='avater'
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className='text-lg font-semibold'>
                                                                    Director
                                                                </p>
                                                                <p className='text-base text-gray-300'>
                                                                    Allied
                                                                    Health
                                                                    Training
                                                                    School
                                                                </p>
                                                                <div className='flex items-center gap-2'>
                                                                    {[
                                                                        1, 2, 3,
                                                                        4, 5,
                                                                    ].map(
                                                                        (
                                                                            item,
                                                                        ) => (
                                                                            <Star
                                                                                key={
                                                                                    item
                                                                                }
                                                                                className='size-5 text-[#FCC800]'
                                                                            />
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='order-1 lg:order-2'>
                                                    <Image
                                                        src={
                                                            '/blogs/placeholder.jpg'
                                                        }
                                                        width={800}
                                                        height={400}
                                                        alt='Image'
                                                        className='rounded-xl w-full lg:h-[500px] object-cover'
                                                    />
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>

                            {/* Pagination */}
                            <div className='flex justify-center gap-2 mt-4'>
                                {Array.from({ length: count }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => api?.scrollTo(i)}
                                        className={`h-3 w-3 rounded-full transition-all ${
                                            current === i
                                                ? 'bg-blue-600 w-6'
                                                : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            <div className='w-full py-10 bg-foreground'>
                <div className='my-container flex items-center flex-col'>
                    <motion.div
                        className='flex flex-col gap-1 items-center justify-center text-center'
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, amount: 0.3 }}
                        variants={titleVariants}
                    >
                        <motion.div
                            className={`title lg:text-5xl text-black md:text-3xl text-xl font-bold leading-[1.1] text-center`}
                            variants={titleVariants}
                        >
                            What can{' '}
                            <motion.span
                                className='text-primary dark:text-[#F6339A]'
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                SkillBNK
                            </motion.span>{' '}
                            do for you?
                        </motion.div>
                        <div className={`title text-[22px] text-center `}></div>
                    </motion.div>

                    <motion.div
                        className='grid lg:grid-cols-3 pt-8 md:grid-cols-2 grid-cols-1 gap-3 w-full'
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                    >
                        {items.map((item, index) => (
                            <motion.div
                                key={item.title}
                                variants={cardVariants}
                                whileTap={{ scale: 0.98 }}
                                className='md:p-6 p-3 shadow-lg rounded-xl py-10 hover:shadow-2xl transition-shadow duration-300'
                            >
                                <div className='text-center space-y-3'>
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.1 + 0.4,
                                            type: 'spring',
                                            stiffness: 200,
                                        }}
                                    >
                                        <Button
                                            variant={'primary_light'}
                                            className={cn(
                                                `rounded-xl size-16 bg-red-500 hover:scale-110 transition-transform duration-300`,
                                                item?.bgColor,
                                            )}
                                            size={'icon'}
                                        >
                                            <motion.div
                                                animate={{
                                                    rotate: [0, 10, -10, 0],
                                                    scale: [1, 1.1, 1],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    delay: index * 0.3,
                                                }}
                                            >
                                                {item.icon}
                                            </motion.div>
                                        </Button>
                                    </motion.div>

                                    <motion.h2
                                        className='text-black font-semibold text-2xl'
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1 + 0.6,
                                        }}
                                    >
                                        {item.title}
                                    </motion.h2>

                                    <motion.p
                                        className='text-gray text-2xl'
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1 + 0.8,
                                        }}
                                    >
                                        {item.subTitle}
                                    </motion.p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default HeroSectionUpdate;
