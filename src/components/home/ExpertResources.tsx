'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, Award, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResourceCard from './resource-card';
import ResourceCardSec from './ResourceCardSec';
import GlobalTitle from '../global/GlobalTitle';
import { useCallback, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const ExpertResources = () => {
    // State to track active tab for animations
    const [activeTab, setActiveTab] = useState('recourses');

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

    // Animation variants
    const tabContentVariants: Variants = {
        hidden: { opacity: 0, x: 20 },
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
            x: -20,
            transition: {
                duration: 0.3,
            },
        },
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 70,
                damping: 15,
            },
        },
    };

    const buttonVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
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
                '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.95 },
    };

    const resourcesData = [
        // Guides (3 items)
        {
            title: 'The Ultimate Guide to Designing High-Ticket Coaching Programs',
            subTitle:
                'A 50-page comprehensive guide covering everything you need to know about creating successful coaching programs.',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'Coaching',
            type: 'guide',
        },
        {
            title: 'Marketing Masterclass for Coaches: Client Acquisition Strategies',
            subTitle:
                'Learn proven marketing strategies specifically designed for coaches to attract high-quality clients consistently.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'Marketing',
            type: 'guide',
        },
        {
            title: 'Coaching Business Financial Blueprint: Pricing & Profitability',
            subTitle:
                'Master the financial aspects of your coaching business with this comprehensive guide to pricing, profit margins, and financial planning.',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'Finance',
            type: 'guide',
        },

        // Training (3 items)
        {
            title: 'Advanced Coaching Techniques: Transformation Accelerator',
            subTitle:
                'Master advanced coaching methodologies that help clients achieve breakthrough results in less time.',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'Coaching',
            type: 'training',
        },
        {
            title: 'Group Coaching Program Design Workshop',
            subTitle:
                'Learn how to design, launch, and facilitate effective group coaching programs that scale your impact and revenue.',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'Program Design',
            type: 'training',
        },
        {
            title: 'Virtual Coaching Mastery: Online Facilitation Skills',
            subTitle:
                'Master the art of virtual coaching with techniques for creating engaging online sessions that deliver powerful results.',
            image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'Virtual Skills',
            type: 'training',
        },
    ];

    const toolsData = [
        // Tools (3 items)
        {
            title: 'Student Engagement Toolkit',
            subTitle:
                'Complete toolkit with templates, scripts, and strategies to maximize student engagement and retention.',
            image: <Users className='text-primary-white' />,
            type: 'tool',
        },
        {
            title: 'Coaching Program Pricing Calculator',
            subTitle:
                'Interactive tool to help you determine the optimal pricing for your coaching programs based on value, market, and business goals.',
            image: <DollarSign className='text-primary-white' />,
            type: 'tool',
        },
        {
            title: 'Client Results Tracking System',
            subTitle:
                'A comprehensive system for tracking and showcasing client results, perfect for testimonials and case studies.',
            image: <Award className='text-primary-white' />,
            type: 'tool',
        },
    ];

    return (
        <section className='bg-primary-foreground w-full pb-12 relative overflow-hidden'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0.2, 0.3, 0.2],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                }}
                className='absolute bg-gradient-to-br from-purple-500/30 via-purple-500/20 to-purple-500/5 right-0 rounded-full h-1/2 w-1/2 blur-3xl -top-10'
            ></motion.div>
            <div className='my-container sticky top-0 left-0 px-4 md:px-6 space-y-2 z-20'>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='flex justify-center items-center mt-12'
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            size={'sm'}
                            className='bg-pure-white rounded-full text-primary'
                        >
                            <motion.div
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatDelay: 3,
                                }}
                            >
                                <Award className='size-4 mr-2' />
                            </motion.div>
                            Free Resources
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <GlobalTitle
                        title='Expert Resources Center'
                        subTitle='Download these free resources to level up your coaching business'
                    />
                </motion.div>

                <Tabs
                    defaultValue='recourses'
                    className='w-full flex flex-col justify-center overflow-hidden'
                    onValueChange={(value) => setActiveTab(value)}
                >
                    <>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <TabsList className='gap-1 overflow-x-auto pb-2 w-auto flex justify-center h-full'>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <TabsTrigger
                                        value='recourses'
                                        className={`rounded-full px-5 py-2 ml-[335px] sm:ml-[50px] ${
                                            activeTab === 'recourses'
                                                ? 'bg-primary text-white'
                                                : ''
                                        }`}
                                    >
                                        All Resources
                                    </TabsTrigger>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <TabsTrigger
                                        value='guides'
                                        className={`rounded-full px-5 py-2 ${activeTab === 'guides' ? 'bg-primary text-white' : ''}`}
                                    >
                                        Guides & Templates
                                    </TabsTrigger>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <TabsTrigger
                                        value='tools'
                                        className={`rounded-full px-5 py-2 ${activeTab === 'tools' ? 'bg-primary text-white' : ''}`}
                                    >
                                        Tools & Calculators
                                    </TabsTrigger>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <TabsTrigger
                                        value='training'
                                        className={`rounded-full px-5 py-2 ${activeTab === 'training' ? 'bg-primary text-white' : ''}`}
                                    >
                                        Training Materials
                                    </TabsTrigger>
                                </motion.div>
                            </TabsList>
                        </motion.div>
                    </>

                    <AnimatePresence mode='wait'>
                        {/* All Resources Tab */}
                        {activeTab === 'recourses' && (
                            <motion.div
                                key='recourses'
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                                variants={tabContentVariants}
                            >
                                <TabsContent
                                    value='recourses'
                                    className='mt-5 mb-5 overflow-hidden'
                                >
                                    <motion.div
                                        variants={containerVariants}
                                        initial='hidden'
                                        animate='visible'
                                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
                                    >
                                        {resourcesData
                                            .slice(0, 3)
                                            .map((data, i) => (
                                                <motion.div
                                                    key={i}
                                                    variants={itemVariants}
                                                    custom={i}
                                                >
                                                    <ResourceCard data={data} />
                                                </motion.div>
                                            ))}
                                    </motion.div>
                                    <motion.div
                                        variants={containerVariants}
                                        initial='hidden'
                                        animate='visible'
                                        className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
                                    >
                                        {toolsData
                                            .slice(0, 3)
                                            .map((data, i) => (
                                                <motion.div
                                                    key={i}
                                                    variants={itemVariants}
                                                    custom={i + 3}
                                                >
                                                    <ResourceCardSec
                                                        data={data}
                                                    />
                                                </motion.div>
                                            ))}
                                    </motion.div>
                                </TabsContent>
                            </motion.div>
                        )}

                        {/* Guides Tab */}
                        {activeTab === 'guides' && (
                            <motion.div
                                key='guides'
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                                variants={tabContentVariants}
                            >
                                <TabsContent
                                    value='guides'
                                    className='mt-5 mb-5 overflow-hidden'
                                >
                                    <motion.div
                                        variants={containerVariants}
                                        initial='hidden'
                                        animate='visible'
                                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
                                    >
                                        {resourcesData
                                            .filter(
                                                (item) => item.type === 'guide',
                                            )
                                            .map((data, i) => (
                                                <motion.div
                                                    key={i}
                                                    variants={itemVariants}
                                                    custom={i}
                                                >
                                                    <ResourceCard data={data} />
                                                </motion.div>
                                            ))}
                                    </motion.div>
                                </TabsContent>
                            </motion.div>
                        )}

                        {/* Tools Tab */}
                        {activeTab === 'tools' && (
                            <motion.div
                                key='tools'
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                                variants={tabContentVariants}
                            >
                                <TabsContent
                                    value='tools'
                                    className='mt-5 mb-5 overflow-hidden'
                                >
                                    <motion.div
                                        variants={containerVariants}
                                        initial='hidden'
                                        animate='visible'
                                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
                                    >
                                        {toolsData.map((data, i) => (
                                            <motion.div
                                                key={i}
                                                variants={itemVariants}
                                                custom={i}
                                            >
                                                <ResourceCardSec data={data} />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </TabsContent>
                            </motion.div>
                        )}

                        {/* Training Tab */}
                        {activeTab === 'training' && (
                            <motion.div
                                key='training'
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                                variants={tabContentVariants}
                            >
                                <TabsContent
                                    value='training'
                                    className='mt-5 mb-5 overflow-hidden'
                                >
                                    <motion.div
                                        variants={containerVariants}
                                        initial='hidden'
                                        animate='visible'
                                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
                                    >
                                        {resourcesData
                                            .filter(
                                                (item) =>
                                                    item.type === 'training',
                                            )
                                            .map((data, i) => (
                                                <motion.div
                                                    key={i}
                                                    variants={itemVariants}
                                                    custom={i}
                                                >
                                                    <ResourceCard data={data} />
                                                </motion.div>
                                            ))}
                                    </motion.div>
                                </TabsContent>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Tabs>

                <motion.div
                    initial='hidden'
                    animate='visible'
                    variants={buttonVariants}
                    // whileHover='hover'
                    whileTap='tap'
                    className='flex justify-center items-center my-5'
                >
                    <Button
                        onClick={() => scrollToSection('faq')}
                        size={'sm'}
                        className='rounded-full text-pure-white'
                    >
                        Browse Full Resource Library
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 2,
                            }}
                        >
                            <ArrowUpRight className='size-4 ml-2' />
                        </motion.div>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default ExpertResources;
