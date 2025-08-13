'use client';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlobalTitle from '../global/GlobalTitle';
import DocumentSvg from '../shared/Svg/DocumentSvg';
import { useCallback } from 'react';

// Update the testimonials array to use image logos
const testimonials = [
    {
        quote: 'Bank registration typically refers to the process by which a financial institution obtains the necessary licenses Bank registration typically refers to the process by which a financial.',
        source: 'EdTech Magazine',
        logoUrl: '/image 30.png?height=40&width=40', // Replace with actual EdTech Magazine logo
    },
    {
        quote: 'Bank registration typically refers to the process by which a financial institution obtains the necessary licenses Bank registration typically refers to the process by which a financial.',
        source: 'TechCrunch',
        logoUrl: '/imagelogo2.png?height=40&width=40', // Replace with actual TechCrunch logo
    },
    {
        quote: 'Bank registration typically refers to the process by which a financial institution obtains the necessary licenses Bank registration typically refers to the process by which a financial.',
        source: 'Forbes',
        logoUrl: '/imagelogo3.png?height=40&width=40', // Replace with actual Forbes logo
    },
];

export default function MediaAndPress() {
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
        <section className='bg-primary-foreground w-full'>
            <div className='my-container  '>
                <div className='my-10'>
                    <div className='flex justify-center'>
                        {' '}
                        <Button
                            className='bg-foreground rounded-full text-primary-white mb-5'
                            size={'sm'}
                        >
                            <DocumentSvg className='size-4 stroke-primary-white' />
                            Trust & Credibility
                        </Button>
                    </div>
                    <GlobalTitle
                        title='Media and Press'
                        subTitle='See what experts are saying about SkillBNK'
                    />
                </div>

                <div className='grid md:grid-cols-3 gap-6 mb-10'>
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className='bg-foreground rounded-lg p-6 border shadow-sm'
                        >
                            <blockquote className='mb-4'>
                                <svg
                                    width='27'
                                    height='18'
                                    viewBox='0 0 27 18'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M16.1557 18H26.7787C26.9027 18 27 17.9035 27 17.7805V7.24417C27 7.12119 26.9027 7.02467 26.7787 7.02467H20.9629C21.7508 2.46796 25.0883 0.430685 25.1233 0.404221C25.2028 0.360123 25.2473 0.254776 25.2206 0.158257C25.1939 0.0705509 25.1055 0 25.0082 0C18.5635 0 16.6957 4.51306 16.1557 7.19957C15.9344 8.24418 15.9344 8.97331 15.9344 8.99977V17.7805C15.9344 17.9035 16.0318 18 16.1557 18Z'
                                        fill='#563AEF'
                                        fillOpacity='0.2'
                                    />
                                    <path
                                        d='M0.221333 18H10.8443C10.9683 18 11.0656 17.9035 11.0656 17.7805V7.24417C11.0656 7.12119 10.9683 7.02467 10.8443 7.02467H5.02847C5.8164 2.46796 9.15384 0.430685 9.18887 0.404221C9.2684 0.360123 9.31286 0.254776 9.28619 0.158257C9.25951 0.0705509 9.17108 0 9.07376 0C2.62905 0 0.761311 4.51306 0.22131 7.19957C-1.90735e-06 8.24418 0 8.97331 0 8.99977V17.7805C0 17.9035 0.0973396 18 0.221333 18Z'
                                        fill='#563AEF'
                                        fillOpacity='0.2'
                                    />
                                </svg>

                                <p className='text-gray'>{testimonial.quote}</p>
                            </blockquote>
                            <hr className='mb-2' />
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <span className=' mr-2 text-black font-semibold'>
                                        — {testimonial.source}
                                    </span>
                                </div>

                                <div className='h-10 w-auto'>
                                    <Image
                                        src={
                                            testimonial.logoUrl ||
                                            '/placeholder.svg'
                                        }
                                        alt={`${testimonial.source} logo`}
                                        width={40}
                                        height={40}
                                        className='object-contain'
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className='flex justify-center mb-10'>
                    <Button
                        onClick={() => scrollToSection("faq")}
                        className='inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-pure-white transition-colors '
                        size='sm'
                    >
                        View Press Center
                        <ArrowUpRight size={16} />
                    </Button>
                </div> */}
            </div>
        </section>
    );
}
