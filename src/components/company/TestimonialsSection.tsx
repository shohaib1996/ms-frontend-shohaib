'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NotFoundSection from './NotFoundSection';

const sampleTestimonials = [
    {
        id: '1',
        user: {
            profilePicture: '/avatar.png',
            fullName: 'Sarah Johnson',
        },
        role: 'Software Engineer',
        company: 'Google',
        text: 'This program completely transformed my career. The instructors were knowledgeable and the curriculum was exactly what I needed to land my dream job at Google. I highly recommend this to anyone looking to break into tech.',
    },
    {
        id: '2',
        user: {
            profilePicture: '/avatar.png',
            fullName: 'Michael Chen',
        },
        role: 'Full Stack Developer',
        company: 'Microsoft',
        text: 'Amazing experience! The hands-on projects and mentorship helped me build a strong portfolio.',
    },
    {
        id: '3',
        user: {
            profilePicture: '/avatar.png',
            fullName: 'Emily Rodriguez',
        },
        role: 'Frontend Developer',
        company: 'Meta',
        text: 'The best investment I made for my career. The support system and community are incredible. I learned more in 6 months than I did in 2 years of self-study. The instructors are industry professionals who really care about your success.',
    },
    {
        id: '4',
        user: {
            profilePicture: '/avatar.png',
            fullName: 'David Kim',
        },
        role: 'Backend Developer',
        company: 'Amazon',
        text: 'Excellent program with real-world applications. Got hired within 3 months of completion!',
    },
    {
        id: '5',
        user: {
            profilePicture: '/avatar.png',
            fullName: 'Lisa Thompson',
        },
        role: 'DevOps Engineer',
        company: 'Netflix',
        text: 'The curriculum is up-to-date with industry standards and the career support is outstanding. I was able to transition from a completely different field into tech successfully. The networking opportunities alone made this program worth it.',
    },
];

interface User {
    profilePicture: string;
    fullName: string;
}

interface Testimonial {
    id: string;
    user: User;
    role: string;
    company: string;
    text: string;
}

interface TestimonialsSectionProps {
    reviews: Testimonial[];
}

export function TestimonialsSection({ reviews }: TestimonialsSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    console.log('reviews', reviews);
    // Responsive items per view
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerView(1);
            } else if (window.innerWidth < 1280) {
                setItemsPerView(2);
            } else {
                setItemsPerView(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Use provided reviews or fallback to sample data
    const displayReviews = reviews && reviews.length > 0 ? reviews : [];

    // Auto-slide functionality
    useEffect(() => {
        if (displayReviews.length <= itemsPerView) {
            return;
        }

        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev + itemsPerView >= displayReviews.length ? 0 : prev + 1,
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [displayReviews.length, itemsPerView]);

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev + itemsPerView >= displayReviews.length ? 0 : prev + 1,
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0
                ? Math.max(0, displayReviews.length - itemsPerView)
                : prev - 1,
        );
    };

    const truncateText = (text: string, maxLength = 120) => {
        return text.length > maxLength
            ? text.substring(0, maxLength) + '...'
            : text;
    };

    return (
        <section className='py-3 bg-primary'>
            <div className='my-container mx-auto'>
                <h2 className='text-3xl text-pure-white font-bold mb-8 text-center'>
                    Student Testimonials
                </h2>

                {displayReviews?.length !== 0 ? (
                    <div className='relative'>
                        {/* Navigation Buttons */}
                        {displayReviews.length > itemsPerView && (
                            <>
                                <Button
                                    variant='outline'
                                    size='icon'
                                    className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/10 border-white/20 text-white hover:bg-white/20'
                                    onClick={prevSlide}
                                >
                                    <ChevronLeft className='h-4 w-4' />
                                </Button>
                                <Button
                                    variant='outline'
                                    size='icon'
                                    className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/10 border-white/20 text-white hover:bg-white/20'
                                    onClick={nextSlide}
                                >
                                    <ChevronRight className='h-4 w-4' />
                                </Button>
                            </>
                        )}

                        {/* Testimonials Container */}
                        <div className='overflow-hidden'>
                            <motion.div
                                className='flex'
                                animate={{
                                    x: `-${(currentIndex * 100) / itemsPerView}%`,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 30,
                                }}
                            >
                                {displayReviews?.map((testimonial) => (
                                    <motion.div
                                        key={testimonial.id}
                                        className={`flex-shrink-0 px-2 ${
                                            itemsPerView === 1
                                                ? 'w-full'
                                                : itemsPerView === 2
                                                  ? 'w-1/2'
                                                  : 'w-1/3'
                                        }`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Card className='h-full bg-white/10 flex flex-col border-none'>
                                            <CardContent className='pt-6 flex-grow'>
                                                <div className='flex items-center gap-4 mb-4'>
                                                    <Image
                                                        src={
                                                            testimonial.user
                                                                .profilePicture ||
                                                            '/avatar.png'
                                                        }
                                                        alt={
                                                            testimonial.user
                                                                .fullName
                                                        }
                                                        width={40}
                                                        height={40}
                                                        className='rounded-full size-10 object-cover'
                                                    />
                                                    <div>
                                                        <h4 className='font-semibold text-pure-white'>
                                                            {
                                                                testimonial.user
                                                                    .fullName
                                                            }
                                                        </h4>
                                                        <p className='text-sm text-gray-400'>
                                                            {testimonial.role}{' '}
                                                            at{' '}
                                                            {
                                                                testimonial.company
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <p className='italic text-pure-white cursor-help'>
                                                                &quot;
                                                                {truncateText(
                                                                    testimonial.text,
                                                                )}
                                                                &quot;
                                                            </p>
                                                        </TooltipTrigger>
                                                        {testimonial.text
                                                            .length > 120 && (
                                                            <TooltipContent
                                                                className='max-w-sm p-4 bg-gray-900 text-white border-gray-700'
                                                                side='top'
                                                            >
                                                                <p className='text-sm leading-relaxed'>
                                                                    &quot;
                                                                    {
                                                                        testimonial.text
                                                                    }
                                                                    &quot;
                                                                </p>
                                                            </TooltipContent>
                                                        )}
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Dots Indicator */}
                        {displayReviews.length > itemsPerView && (
                            <div className='flex justify-center mt-6 gap-2'>
                                {Array.from({
                                    length: Math.ceil(
                                        displayReviews.length / itemsPerView,
                                    ),
                                }).map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-colors ${
                                            Math.floor(
                                                currentIndex / itemsPerView,
                                            ) === index
                                                ? 'bg-white'
                                                : 'bg-white/40'
                                        }`}
                                        onClick={() =>
                                            setCurrentIndex(
                                                index * itemsPerView,
                                            )
                                        }
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <NotFoundSection
                        itemText='No testimonial found'
                        className='text-white'
                    />
                )}
            </div>
        </section>
    );
}
