'use client';

import { ArrowUpRight, LightbulbIcon } from 'lucide-react';
import BlogCard from './BlogCard';
import { Button } from '@/components/ui/button';
import GlobalTitle from '@/components/global/GlobalTitle';
import { useCallback } from 'react';

const blogPosts = [
    {
        date: 'Apr 20, 2024',
        title: 'The Future of Coaching in a Post-Pandemic World',
        description:
            'Discover how the coaching industry has evolved and what strategies will define successful programs in the coming years.',
        image: '/industry_insights/img_1.png',
        benefits: [
            { text: 'Rise of hybrid coaching models' },
            { text: 'Technology integration for personalized learning' },
            { text: 'Building community as a competitive advantage' },
        ],
        link: '#',
    },
    {
        date: 'Apr 20, 2024',
        title: 'Turning Your Expertise Into a Million-Dollar Coaching Business',
        description:
            'Learn the proven framework that successful coaches use to package their knowledge and create high-value coaching programs.',
        image: '/industry_insights/img_2.png',
        benefits: [
            { text: 'Identifying your unique expertise' },
            { text: 'Creating a signature system that sells' },
            { text: 'Pricing strategies for premium positioning' },
        ],
        link: '#',
    },
    {
        date: 'Apr 20, 2024',
        title: '7 Student Engagement Strategies That Prevent Dropouts',
        description:
            'Implement these proven tactics to boost student motivation, increase completion rates, and generate more referrals.',
        image: '/industry_insights/img_3.png',
        benefits: [
            { text: 'Gamification principles that drive action' },
            { text: 'Communication frameworks for accountability' },
            { text: 'Building peer support systems' },
        ],
        link: '#',
    },
];

const IndustryInsights = () => {
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
        <div className='my-container flex flex-col gap-5 items-center justify-center relative'>
            {/* Gradient effects */}
            <div className='absolute -top-20 -left-96 h-[70%] w-1/2 bg-gradient-to-br rounded-full from-yellow-400/50 via-yellow-400/20 to-yellow-100/10 blur-3xl z-[-1]'></div>
            <div className='absolute -bottom-40 -right-96 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-purple-500/30 via-purple-400/20 to-transparent blur-xl z-[-1]'></div>

            <Button
                onClick={() => scrollToSection('faq')}
                className='rounded-full mb-5 bg-blue-600 hover:bg-blue-700 hover:text-white text-white'
            >
                Explore All-in-One Solution{' '}
                <ArrowUpRight className='ml-1 h-4 w-4' />
            </Button>

            <div className='flex flex-col gap-2 items-center justify-center'>
                <Button
                    variant={'primary_light'}
                    className='h-[26px] rounded-full bg-foreground border-none shadow-md flex items-center gap-1'
                >
                    <LightbulbIcon className='h-3.5 w-3.5' />
                    Latest Insight
                </Button>
                <GlobalTitle
                    title='Industry Insights Blog'
                    subTitle='Expert resources to help you build and scale your coaching business'
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full'>
                {blogPosts.map((post, index) => (
                    <BlogCard
                        key={index}
                        date={post.date}
                        title={post.title}
                        description={post.description}
                        image={post.image}
                        benefits={post.benefits}
                        link={post.link}
                    />
                ))}
            </div>
            <Button
                className='rounded-full'
                onClick={() => scrollToSection('faq')}
            >
                View All Articles <ArrowUpRight className='ml-1 h-4 w-4' />
            </Button>
        </div>
    );
};

export default IndustryInsights;
