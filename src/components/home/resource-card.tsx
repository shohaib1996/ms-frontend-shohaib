'use client';

import { Download } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

interface ResourceCardProps {
    data: {
        image: string;
        title: string;
        subTitle: string;
        category: string;
        type?: string;
    };
}

export default function ResourceCard({ data }: ResourceCardProps) {
    // Ref for animations
    const cardRef = useRef<HTMLDivElement>(null);
    const isCardInView = useInView(cardRef, { once: false, amount: 0.2 });

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

    const imageVariants: Variants = {
        hidden: { scale: 1.1, opacity: 0.8 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
            },
        },
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
            },
        },
    };

    const badgeVariants: Variants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.3,
                duration: 0.5,
            },
        },
    };

    const categoryVariants: Variants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.4,
                duration: 0.5,
            },
        },
    };

    const contentVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.2,
                duration: 0.5,
                staggerChildren: 0.1,
            },
        },
    };

    const textVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
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
        <motion.div
            ref={cardRef}
            initial='hidden'
            animate={isCardInView ? 'visible' : 'hidden'}
            whileHover='hover'
            variants={cardVariants}
            className='w-full overflow-hidden rounded-lg bg-foreground shadow'
        >
            <div className='relative h-[200px] overflow-hidden'>
                <motion.div variants={imageVariants}>
                    <Image
                        src={data?.image || '/placeholder.svg'}
                        width={400}
                        height={200}
                        alt='Resource cover image'
                        className='h-[200px] w-full object-cover'
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='absolute bg-[#000000]/50 top-0 w-full z-10 h-full'
                ></motion.div>
                <motion.div
                    variants={badgeVariants}
                    className='absolute right-3 top-3 z-[11] rounded-md bg-primary px-3 py-1 text-sm font-medium text-white'
                >
                    Featured
                </motion.div>
                <motion.div
                    variants={categoryVariants}
                    className='absolute bottom-3 z-[11] left-3 flex items-center gap-1.5 rounded-md bg-primary-foreground px-2 py-1 text-sm font-medium text-primary-white'
                >
                    <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 3,
                        }}
                        className='text-primary-white'
                    >
                        $
                    </motion.span>{' '}
                    {data?.category}
                </motion.div>
            </div>

            <motion.div
                variants={contentVariants}
                className='flex h-[250px] flex-col p-5'
            >
                <motion.h2
                    variants={textVariants}
                    className='mb-2 text-xl font-bold text-black line-clamp-2'
                >
                    {data?.title}
                </motion.h2>
                <motion.p
                    variants={textVariants}
                    className='text-gray mb-4 flex-grow line-clamp-3'
                >
                    {data?.subTitle}
                </motion.p>
                {/* Uncomment if you want to add the download button */}
                {/* <motion.hr variants={textVariants} className="mb-2" />
        <motion.button
          variants={textVariants}
          whileHover={{ scale: 1.03, backgroundColor: "rgba(239, 68, 68, 0.2)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollToSection("faq")}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-md bg-red-500/10 px-4 py-3 text-danger transition hover:bg-red-100"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
          >
            <Download size={18} />
          </motion.div>
          <span className="font-medium">Download Resource</span>
        </motion.button> */}
            </motion.div>
        </motion.div>
    );
}
