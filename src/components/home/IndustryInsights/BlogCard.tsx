'use client';

import Image from 'next/image';
import { CircleCheckBig, Divide } from 'lucide-react';
import { motion } from 'framer-motion';

interface BenefitItem {
    text: string;
}

interface BlogCardProps {
    date: string;
    title: string;
    description: string;
    image: string;
    benefits: BenefitItem[];
    link: string;
}

const BlogCard = ({
    date,
    title,
    description,
    image,
    benefits,
    link,
}: BlogCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            className='bg-foreground rounded-xl shadow-md overflow-hidden flex flex-col h-full gap-3 p-3'
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
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
                        src={image || '/default_image.png'}
                        alt={title}
                        fill
                        className='object-cover rounded-lg'
                    />
                </motion.div>
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className='absolute border border-white/90 top-3 left-3 bg-pure-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-pure-white'
                >
                    {date}
                </motion.div>
            </motion.div>

            <motion.div className='flex flex-col flex-grow'>
                <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className='text-xl text-black font-bold mb-2'
                >
                    {title}
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className='text-gray text-sm mb-4'
                >
                    {description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className='mt-auto bg-blue-400/10 p-3 rounded-xl'
                >
                    <motion.h4
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className='font-semibold text-primary-white mb-2 text-xl'
                    >
                        Key Benefit
                    </motion.h4>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        style={{ originX: 0 }}
                    >
                        <Divide className='h-[1px] w-full bg-border my-3' />
                    </motion.div>
                    <motion.ul
                        initial='hidden'
                        animate='visible'
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.2,
                                    delayChildren: 0.7,
                                },
                            },
                        }}
                        className='space-y-2 mb-4'
                    >
                        {benefits.map((benefit, index) => (
                            <motion.li
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                        transition: {
                                            type: 'spring',
                                            stiffness: 100,
                                            damping: 15,
                                        },
                                    },
                                }}
                                className='flex items-start gap-2'
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 15,
                                        delay: 0.7 + index * 0.2,
                                    }}
                                >
                                    <CircleCheckBig className='h-5 w-5 text-primary-white shrink-0 mt-0.5' />
                                </motion.div>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.8 + index * 0.2,
                                    }}
                                    className='text-sm text-gray'
                                >
                                    {benefit.text}
                                </motion.span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
                {/* <Divide className='h-[1px] w-full bg-border my-3' />
        <Link
            href={link}
            className='inline-flex items-center text-primary-white font-medium text-sm'
        >
            Read Full Article <ArrowUpRight className='ml-1 h-4 w-4' />
        </Link> */}
            </motion.div>
        </motion.div>
    );
};

export default BlogCard;
