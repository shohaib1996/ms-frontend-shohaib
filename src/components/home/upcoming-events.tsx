'use client';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import GlobalTitle from '../global/GlobalTitle';
import DocumentSvg from '../shared/Svg/DocumentSvg';
import { useCallback } from 'react';

// Event data array
const events = [
    {
        date: 'Jan 30, 2024',
        time: '12:30 PM EST',
        title: 'Mastering High-Ticket Sales: Closing Strategies That Work',
        registerLink: '#',
    },
    {
        date: 'Jan 30, 2024',
        time: '12:30 PM EST',
        title: 'Student Engagement: Keeping Completion Rates Above 90%',
        registerLink: '#',
    },
    {
        date: 'Jan 30, 2024',
        time: '12:30 PM EST',
        title: 'Platform Demo: See SkillBNK in Action',
        registerLink: '#',
    },
];

export default function UpcomingEvents() {
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
        <section className='bg-foreground w-full'>
            <div className='my-container'>
                <div className='my-10'>
                    <div className='flex justify-center items-center mb-2'>
                        <Button
                            className='h-[26px] rounded-full border-none shadow-md flex items-center gap-1 mb-2'
                            variant={'primary_light'}
                        >
                            <DocumentSvg className='size-4 stroke-primary-white' />
                            Join Us
                        </Button>
                    </div>

                    <GlobalTitle
                        title='Upcoming Events and Webinars'
                        subTitle='Learn directly from our experts and successful coaching clients'
                    />
                </div>

                <div className='grid md:grid-cols-3 gap-6 mb-10'>
                    {events.map((event, index) => (
                        <div
                            key={index}
                            className='bg-primary-foreground rounded-lg p-6 border shadow-sm flex flex-col'
                        >
                            <div className='w-auto inline-block'>
                                <div className='flex items-center mb-4 text-primary-white bg-foreground px-2 py-1 rounded-full'>
                                    <Calendar className='h-4 w-4 mr-2' />
                                    <span className='text-sm'>
                                        {event.date} | {event.time}
                                    </span>
                                </div>
                            </div>
                            <h3 className='font-semibold text-lg mb-6 text-black'>
                                {event.title}
                            </h3>
                            <Link href={event.registerLink} className='mt-auto'>
                                <Button
                                    onClick={() => scrollToSection('faq')}
                                    variant='link'
                                    className='text-primary-white w-full bg-foreground p-0 font-medium'
                                >
                                    Register Now
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className='flex justify-center mb-10'>
                    <Button
                        className='inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-pure-white transition-colors hover:bg-blue-50'
                        size='sm'
                    >
                        View All Events
                        <ArrowRight size={16} />
                    </Button>
                </div>
            </div>
        </section>
    );
}
