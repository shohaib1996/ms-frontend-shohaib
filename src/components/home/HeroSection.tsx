'use client';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Button } from '../ui/button';
import { AlertTriangle, ArrowRight, ArrowUpRight, Play, X } from 'lucide-react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const HeroSection = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 1,
        minutes: 28,
        seconds: 35,
    });

    // Add state for video modal
    // Remove this line:
    // const [videoModalOpen, setVideoModalOpen] = useState(false);

    // Add this instead:
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (
                    prevTime.hours === 0 &&
                    prevTime.minutes === 0 &&
                    prevTime.seconds === 0
                ) {
                    clearInterval(timer);
                    return prevTime;
                }

                let newSeconds = prevTime.seconds - 1;
                let newMinutes = prevTime.minutes;
                let newHours = prevTime.hours;

                if (newSeconds < 0) {
                    newSeconds = 59;
                    newMinutes -= 1;
                }

                if (newMinutes < 0) {
                    newMinutes = 59;
                    newHours -= 1;
                }

                return {
                    hours: newHours,
                    minutes: newMinutes,
                    seconds: newSeconds,
                };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Add effect to prevent body scrolling when modal is open
    // Remove this entire useEffect block
    // useEffect(() => {
    //     if (videoModalOpen) {
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflow = 'auto';
    //     }

    //     return () => {
    //         document.body.style.overflow = 'auto';
    //     };
    // }, [videoModalOpen]);
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

    // Add refs for scroll animations
    const headingRef = useRef(null);
    const subheadingRef = useRef(null);
    const buttonsRef = useRef(null);
    const videoRef = useRef(null);
    const bannerRef = useRef(null);

    // Set up useInView hooks with triggerOnce: false to allow re-animation
    const isHeadingInView = useInView(headingRef, { once: false, amount: 0.3 });
    const isSubheadingInView = useInView(subheadingRef, {
        once: false,
        amount: 0.3,
    });
    const isButtonsInView = useInView(buttonsRef, { once: false, amount: 0.3 });
    const isVideoInView = useInView(videoRef, { once: false, amount: 0.3 });
    const isBannerInView = useInView(bannerRef, { once: false, amount: 0.3 });

    return (
        <section className='w-full pb-12 pt-16 relative overflow-hidden bg-gradient-to-r from-blue-200 via-purple-50 to-purple-200 py-3 dark:from-blue-800/45 dark:via-purple-950/45 dark:to-purple-800/45'>
            <div className='my-container pt-12'>
                <div className='flex flex-col-reverse text-center lg:text-start lg:flex-row items-center gap-8 w-full justify-between'>
                    <div className='space-y-5'>
                        <motion.h1
                            ref={headingRef}
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                                isHeadingInView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 20 }
                            }
                            transition={{ duration: 1.2, delay: 0.3 }}
                            className='text-dark-gray max-w-[682px] font-bold xl:text-5xl md:text-3xl text-2xl leading-tight'
                        >
                            Stop{' '}
                            <motion.span
                                initial={{ color: '#000' }}
                                animate={{ color: '#0000FF' }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: 'reverse',
                                }}
                                className='text-primary'
                            >
                                Leaving $500k
                            </motion.span>{' '}
                            on the Table: Teach Only 50 Serious Students
                        </motion.h1>
                        <motion.h4
                            ref={subheadingRef}
                            initial={{ opacity: 0 }}
                            animate={
                                isSubheadingInView
                                    ? { opacity: 1 }
                                    : { opacity: 0 }
                            }
                            transition={{ duration: 1.2, delay: 0.6 }}
                            className='text-lg text-gray'
                        >
                            Build your brand, and keep 70% of revenue —without
                            paying a dime upfront
                        </motion.h4>
                        <motion.div
                            ref={buttonsRef}
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                                isButtonsInView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 20 }
                            }
                            transition={{ duration: 1.2, delay: 0.9 }}
                            className='flex flex-wrap lg:gap-4 gap-2'
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button onClick={() => scrollToSection('faq')}>
                                    Get Started Now
                                    <ArrowUpRight size={18} />
                                </Button>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    onClick={() => scrollToSection('faq')}
                                    variant={'secondary'}
                                >
                                    See How it Works
                                    <ArrowUpRight size={18} />
                                </Button>
                            </motion.div>
                        </motion.div>
                        <motion.h4
                            initial={{ opacity: 0 }}
                            animate={
                                isButtonsInView
                                    ? { opacity: 1 }
                                    : { opacity: 0 }
                            }
                            transition={{ duration: 1.2, delay: 1.2 }}
                            className='text-dark-gray text-sm font-medium max-w-[682px]'
                        >
                            Others Force You to Pay Monthly Fees + Do All the
                            Work. We Flip the Script:{' '}
                            <span className='text-primary font-bold'>
                                $0 Upfront
                            </span>
                            , Done:{' '}
                            <span className='font-bold'>For-You Setup</span>,
                            and{' '}
                            <span className='font-bold'>
                                Al Tools That Automate 80%
                            </span>{' '}
                            of Your Admin
                        </motion.h4>
                    </div>

                    {/* Video Section */}
                    <motion.div
                        ref={videoRef}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={
                            isVideoInView
                                ? { opacity: 1, scale: 1 }
                                : { opacity: 0, scale: 0.9 }
                        }
                        transition={{
                            type: 'spring',
                            stiffness: 70,
                            damping: 20,
                            delay: 0.6,
                            duration: 1.5,
                        }}
                        className='w-[380px] h-[380px] rounded-md bg-primary relative overflow-hidden'
                    >
                        {!isVideoPlaying ? (
                            // Video Thumbnail with Play Button
                            <div
                                className='w-full h-full relative cursor-pointer group'
                                onClick={() => setIsVideoPlaying(true)}
                            >
                                {/* Video Thumbnail */}
                                <div className='w-full h-full relative'>
                                    <Image
                                        src='/hero-thumbnail.jpg'
                                        alt='Video thumbnail'
                                        fill
                                        className='object-cover transition-transform duration-300 group-hover:scale-105'
                                    />
                                </div>

                                {/* Play Button Overlay */}
                                <div className='absolute inset-0 flex items-center justify-center transition-colors'>
                                    <motion.div
                                        className='bg-pure-white/90 backdrop-blur-lg border-[8px] border-blue-500/70 rounded-full p-3 shadow-lg'
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        animate={{
                                            scale: [1, 1.05, 1],
                                            boxShadow: [
                                                '0px 0px 0px rgba(59, 130, 246, 0.5)',
                                                '0px 0px 20px rgba(59, 130, 246, 0.7)',
                                                '0px 0px 0px rgba(59, 130, 246, 0.5)',
                                            ],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            repeatType: 'loop',
                                        }}
                                    >
                                        <Play className='h-8 w-8 text-primary fill-primary' />
                                    </motion.div>
                                </div>
                            </div>
                        ) : (
                            // Video Player
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className='w-full h-full relative'
                            >
                                <button
                                    className='absolute top-2 right-2 z-10 bg-black/50 text-white p-2 rounded-full transition-colors hover:bg-black/70'
                                    onClick={() => setIsVideoPlaying(false)}
                                    aria-label='Close video'
                                >
                                    <X className='h-4 w-4' />
                                </button>
                                <iframe
                                    src='https://player.vimeo.com/video/1077328497?h=960b739b0d&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1'
                                    frameBorder='0'
                                    allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media'
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#000000',
                                    }}
                                    title='SkillBNK'
                                ></iframe>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Remove this entire Video Modal section */}
            {/*{videoModalOpen && (*/}
            {/*    <div className='fixed inset-0 z-50 flex items-center justify-center bg-pure-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200'>*/}
            {/*        <div className='relative w-full max-w-4xl aspect-video bg-pure-black rounded-lg overflow-hidden'>*/}
            {/*            /!* Close button *!/*/}
            {/*            <button*/}
            {/*                className='absolute top-4 right-4 z-10  text-danger p-2 rounded-full transition-colors'*/}
            {/*                onClick={() => setVideoModalOpen(false)}*/}
            {/*                aria-label='Close video'*/}
            {/*            >*/}
            {/*                <X className='h-6 w-6' />*/}
            {/*            </button>*/}

            {/*            /!* Video iframe *!/*/}
            {/*            <iframe*/}
            {/*                src='https://player.vimeo.com/video/1077328497?h=960b739b0d&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1'*/}
            {/*                frameBorder='0'*/}
            {/*                allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media'*/}
            {/*                style={{*/}
            {/*                    position: 'absolute',*/}
            {/*                    top: '0',*/}
            {/*                    left: '0',*/}
            {/*                    width: '100%',*/}
            {/*                    height: '100%',*/}
            {/*                    backgroundColor: '#000000',*/}
            {/*                }}*/}
            {/*                title='SkillBNK'*/}
            {/*            ></iframe>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
        </section>
    );
};

export default HeroSection;
