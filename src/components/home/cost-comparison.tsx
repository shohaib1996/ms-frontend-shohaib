'use client';
import { ArrowRight, Check, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlobalTitle from '../global/GlobalTitle';
import { useCallback } from 'react';

const comparisonItems = [
    {
        category: 'Upfront Cost',
        bootcampsHub: true,
        diyApproach: '$15,000 - $50,000',
    },
    {
        category: 'Monthly Maintenance',
        bootcampsHub: true,
        diyApproach: '$2,000 - $5,000',
    },
    {
        category: 'Technical Support',
        bootcampsHub: true,
        diyApproach: '$3,000+ monthly',
    },
    {
        category: 'Content Management',
        bootcampsHub: true,
        diyApproach: '20+ hours weekly',
    },
    {
        category: 'Platform Updates',
        bootcampsHub: true,
        diyApproach: '$10,000+ annually',
    },
    {
        category: 'Student Support',
        bootcampsHub: true,
        diyApproach: 'Additional staff needed',
    },
    {
        category: 'Time to Launch',
        bootcampsHub: true,
        diyApproach: '3-6 months',
    },
    {
        category: 'Focus Required',
        bootcampsHub: true,
        diyApproach: 'Platform + Coaching',
    },
];

export default function CostComparison() {
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
        <section className='w-full '>
            <div className='my-container mx-auto px-4 max-w-5xl'>
                <div className='mb-5 '>
                    {/* Header */}
                    <div className='p-12 text-center'>
                        <div className='flex justify-center mb-3'>
                            <Button className='rounded-full' size={'sm'}>
                                <DollarSign size={16} />
                                Cost Analysis
                            </Button>
                        </div>
                        <GlobalTitle
                            title='HSkillBNK vs. DIY Approach: The Real Cost'
                            subTitle='See how our revenue-sharing model saves you money compared to building your own solution'
                        />
                    </div>

                    {/* Table */}
                    <div className='bg-foreground p-6 rounded-t-lg'>
                        {/* Table Header */}
                        <div className='grid grid-cols-3 gap-4 py-4  text-black font-semibold'>
                            <div className='col-span-1'></div>
                            <div className='col-span-1 text-center'>
                                SkillBNK
                            </div>
                            <div className='col-span-1 text-center'>
                                Building Your Own Solution
                            </div>
                        </div>

                        {/* Table Rows */}
                        <div className='space-y-4'>
                            {comparisonItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`grid grid-cols-3 gap-4 py-4 bg-primary-foreground rounded-lg`}
                                >
                                    <div className='col-span-1 text-gray font-medium pl-2'>
                                        {item.category}
                                    </div>
                                    <div className='col-span-1 flex justify-center items-center'>
                                        {item.bootcampsHub && (
                                            <div className='w-6 h-6 rounded-full bg-primary flex items-center justify-center'>
                                                <Check
                                                    size={16}
                                                    className='text-pure-white'
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className='col-span-1 text-center text-gray'>
                                        {item.diyApproach}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className='bg-foreground pb-12 text-center rounded-b-md '>
                        <p className='text-gray mb-6 max-w-2xl mx-auto'>
                            With SkillBNK, you can launch your coaching business
                            in weeks instead of months, with zero upfront costs.
                        </p>

                        <Button
                            onClick={() => scrollToSection('faq')}
                            className='rounded-full'
                        >
                            Calculate Your Savings
                            <ArrowRight size={16} />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
