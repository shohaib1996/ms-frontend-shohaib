'use client';

import type React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import { TCourse } from '@/types/course';

interface SingleFaqsProps {
    course: TCourse;
    index: number;
    className?: string;
}

const SingleFaqs: React.FC<SingleFaqsProps> = ({
    course,
    index,
    className,
}) => {
    const [activeItem, setActiveItem] = useState<string>('0');
    const [visibleFaqs, setVisibleFaqs] = useState<number>(4);
    const isMobile = useMediaQuery({
        query: '(max-width: 768px)',
    });

    const handleValueChange = (value: string) => {
        setActiveItem(value);
    };

    const handleSeeMore = () => {
        setVisibleFaqs(visibleFaqs + 4);
    };

    const handleSeeLess = () => {
        setVisibleFaqs(4);
    };

    // Return early if no FAQs to display
    if (!course?.faqs?.length) {
        return null;
    }

    const displayedFaqs = course.faqs.slice(0, visibleFaqs);
    const hasMoreFaqs = course.faqs.length > 4;
    const canShowMore = visibleFaqs < course.faqs.length;

    return (
        <section className={cn('xl:py-6 py-6 bg-foreground', className)}>
            <div className='my-container'>
                <div className='text-center mb-8'>
                    <h2 className='text-3xl md:text-4xl font-bold text-black mb-2'>
                        Frequently Asked Questions
                    </h2>
                    <div className='w-20 h-1 bg-primary mx-auto rounded-full'></div>
                </div>

                <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
                    <div
                        className={cn(
                            index % 2 === 0 && !isMobile ? 'lg:order-last' : '',
                        )}
                    >
                        <Accordion
                            type='single'
                            collapsible
                            value={activeItem}
                            onValueChange={handleValueChange}
                            className='space-y-2'
                        >
                            {displayedFaqs.map((faq) => (
                                <AccordionItem
                                    key={faq._id}
                                    value={faq._id}
                                    className='border border-forground-border bg-slate-50 dark:bg-slate-950 rounded-lg overflow-hidden shadow-sm'
                                >
                                    <AccordionTrigger
                                        className={cn(
                                            'px-5 py-4 text-lg hover:no-underline',
                                            activeItem === faq._id
                                                ? 'bg-primary-light text-primary-white font-semibold'
                                                : 'bg-gray-50 text-dark-gray dark:bg-gray-900',
                                        )}
                                    >
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className='px-5 py-4 text-dark-gray bg-gray-50 dark:bg-gray-900'>
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        {hasMoreFaqs && (
                            <div className='mt-4 flex justify-center'>
                                <Button
                                    onClick={
                                        canShowMore
                                            ? handleSeeMore
                                            : handleSeeLess
                                    }
                                >
                                    <span>
                                        {canShowMore ? 'See More' : 'See Less'}
                                    </span>
                                    {canShowMore ? (
                                        <ChevronDown className='ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform duration-300' />
                                    ) : (
                                        <ChevronUp className='ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform duration-300' />
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>

                    <div
                        className={cn(
                            'relative',
                            isMobile ? 'order-first' : '',
                        )}
                    >
                        <div className='absolute inset-0 bg-gradient-to-tr from-emerald-100 to-sky-100 rounded-3xl transform rotate-2 opacity-70'></div>
                        <div className='relative overflow-hidden rounded-2xl shadow-lg'>
                            <Image
                                src='/landing_page/faq.png'
                                alt='Frequently Asked Questions'
                                width={600}
                                height={450}
                                className='object-cover'
                            />
                        </div>

                        {/* Decorative elements */}
                        <div className='absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl'></div>
                        <div className='absolute -top-4 -left-4 w-16 h-16 bg-blue-500/20 rounded-full blur-lg'></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SingleFaqs;
