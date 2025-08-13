'use client';

import { Shield, Award } from 'lucide-react';
import { Button } from '../ui/button';
import GlobalTitle from '../global/GlobalTitle';
import { useCallback, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

interface Certification {
    title: string;
    description: string;
}

const certifications: Certification[] = [
    {
        title: 'ISO 27001 Certified',
        description:
            'We meet international standards for information security management',
    },
    {
        title: 'GDPR Compliant',
        description:
            'Your data and your students data are protected to the highest standards',
    },
    {
        title: 'ICF Aligned',
        description:
            'Our platform supports International Coach Federation best practices',
    },
    {
        title: 'SOC 2 Compliant',
        description:
            'We maintain rigorous controls for data security and privacy',
    },
];

export default function CertificationsSection() {
    // Refs for scroll animations
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    // Set up useInView hooks
    const isSectionInView = useInView(sectionRef, { once: false, amount: 0.2 });
    const isHeaderInView = useInView(headerRef, { once: false, amount: 0.5 });
    const isCardsInView = useInView(cardsRef, { once: false, amount: 0.1 });

    // Animation variants
    const fadeInUpVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    const buttonVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
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

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
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
                delay: i * 0.1,
            },
        }),
        hover: {
            y: -10,
            boxShadow:
                '0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10,
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
                stiffness: 260,
                damping: 20,
            },
        },
        hover: {
            rotate: [0, 10, -10, 0],
            scale: 1.2,
            transition: {
                duration: 0.6,
                ease: 'easeInOut',
            },
        },
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
        <motion.section
            ref={sectionRef}
            initial='hidden'
            animate={isSectionInView ? 'visible' : 'hidden'}
            className='w-full bg-primary py-12 text-pure-white relative overflow-hidden'
        >
            {/* Animated background gradients */}
            <motion.div
                initial={{ opacity: 0 }}
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
                initial={{ opacity: 0 }}
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
                    ref={headerRef}
                    initial='hidden'
                    animate={isHeaderInView ? 'visible' : 'hidden'}
                    className='mb-5 text-center'
                >
                    <motion.div
                        variants={buttonVariants}
                        whileHover='hover'
                        whileTap='tap'
                        className='inline-block mb-3'
                    >
                        <Button
                            className='bg-foreground text-black rounded-full'
                            size={'sm'}
                        >
                            <motion.div
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatDelay: 3,
                                }}
                            >
                                <Shield size={16} />
                            </motion.div>
                            Trust & Credibility
                        </Button>
                    </motion.div>

                    <motion.div variants={fadeInUpVariants}>
                        <GlobalTitle
                            title='Professional Certifications and Partnerships'
                            subTitle='We maintain the highest standards in coaching technology and data security'
                            className='text-pure-white'
                            ngClass='text-pure-white'
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    ref={cardsRef}
                    variants={containerVariants}
                    initial='hidden'
                    animate={isCardsInView ? 'visible' : 'hidden'}
                    className='mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
                >
                    {certifications.map((item, idx) => (
                        <motion.div
                            key={idx}
                            custom={idx}
                            variants={cardVariants}
                            whileHover='hover'
                            className='flex flex-col items-center rounded-lg border border-primary bg-white/10 p-6 text-center'
                        >
                            <motion.div
                                variants={iconVariants}
                                whileHover='hover'
                                className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10'
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -3, 0],
                                        filter: [
                                            'drop-shadow(0 0 0 rgba(255, 255, 255, 0.5))',
                                            'drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))',
                                            'drop-shadow(0 0 0 rgba(255, 255, 255, 0.5))',
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatDelay: idx * 0.5,
                                    }}
                                >
                                    <Award size={24} />
                                </motion.div>
                            </motion.div>
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    delay: 0.3 + idx * 0.1,
                                    duration: 0.5,
                                }}
                                className='mb-2 text-lg font-semibold'
                            >
                                {item.title}
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    delay: 0.4 + idx * 0.1,
                                    duration: 0.5,
                                }}
                                className='text-sm text-blue-100'
                            >
                                {item.description}
                            </motion.p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Uncomment if you want to add the button */}
                {/* <motion.div
          initial="hidden"
          animate={isCardsInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="flex justify-center"
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={() => scrollToSection("faq")}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-primary-white transition-colors"
              size="sm"
            >
              View Our Credentials
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
              >
                <ArrowUpRight size={16} />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div> */}
            </div>
        </motion.section>
    );
}
