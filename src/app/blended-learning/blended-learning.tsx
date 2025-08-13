'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RocketIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useMobile } from '@/hooks/use-mobile';

interface FeatureItem {
    title: string;
    description?: string;
}

const features: FeatureItem[] = [
    {
        title: '24/7 Connectivity',
        description:
            'Both schools and students remain connected 24/7, fostering continuous learning and support. The integration of AI ensures that teachers and students have access to assistance and resources round the clock.',
    },
    {
        title: 'Centralized Management',
        description:
            'SkillBNK provides a centralized interface for managing multiple schools within an organization. This simplifies administrative tasks and ensures efficient coordination across the entire network of schools.',
    },
    {
        title: 'Content Distribution',
        description:
            'The platform allows for the distribution of educational content across the chain of schools, ensuring consistent access to materials and resources. Schools can share specific courses and classes as needed.',
    },
    {
        title: 'Blended Learning',
        description:
            "SkillBNK's blended learning system enables schools to offer a combination of online and in-person classes. This flexibility caters to diverse learning preferences and circumstances.",
    },
    {
        title: 'Learning Journey',
        description:
            'The platform simplifies the learning and career transformation journey for students. It offers support, resources, and access to classes at any time, making education more accessible and convenient.',
    },
    {
        title: 'Teacher Peace of Mind',
        description:
            "Teachers can rely on the platform's AI-supported features for class management and content delivery. This provides peace of mind, knowing that students have access to materials even if they miss a class.",
    },
    {
        title: 'Content Accessibility',
        description:
            'In-person classes can be recorded and easily uploaded through the school portal. This feature enables students to access class content they may have missed and review materials for better comprehension and revision.',
    },
    {
        title: 'Effectiveness and Engagement',
        description:
            "SkillBNK's blended learning process enhances the effectiveness, engagement, and productivity of both schools and students. It offers a dynamic and adaptable approach to education.",
    },
    {
        title: 'Scalability',
        description:
            'The platform is scalable and can be implemented across any number of schools and students, making it suitable for educational institutions of all sizes.',
    },
];

export default function BlendedLearning() {
    const [showContent, setShowContent] = useState(false);
    const router = useRouter();
    const isMobile = useMobile();

    useEffect(() => {
        setShowContent(false);
    }, []);

    const handleBookDemo = () => {
        router.push('/book-a-demo');
    };

    const summary =
        "In summary, SkillBNK's Blended Learning feature is a versatile and powerful tool for managing schools, distributing content, and providing flexible learning options. It leverages AI integration to enhance the learning experience, making education more accessible and effective for both schools and students, regardless of the learning environment.";

    return (
        <div className='overflow-hidden'>
            {/* Background gradient effects */}
            <div className='fixed top-[100px] -left-36 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl' />
            <div className='fixed top-1/2 right-0 w-[500px] h-[400px] rounded-full bg-purple-400/30 blur-3xl' />

            <section className='py-12 px-4 md:px-6 lg:px-8 my-container mt-[60px] relative z-10'>
                <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 items-center'>
                    <div className='w-full lg:w-1/2 space-y-6'>
                        <h1 className='text-3xl md:text-4xl font-bold tracking-tight text-black'>
                            Blended Learning
                        </h1>

                        <p className='text-gray'>
                            {`SkillBNK offers a centralized management solution for a network of schools, streamlining administrative
                            tasks and enhancing the learning experience. Here's a summary of its key features and benefits:`}
                        </p>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                            {features
                                .slice(0, isMobile ? 3 : features.length)
                                .map((feature, index) => (
                                    <div
                                        key={index}
                                        className='flex items-start gap-2'
                                    >
                                        <RocketIcon className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
                                        <span className='font-medium text-dark-gray'>
                                            {feature.title}
                                        </span>
                                    </div>
                                ))}
                        </div>

                        <Button
                            onClick={handleBookDemo}
                            variant='default'
                            className='bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--purple))] hover:from-[hsl(var(--primary))] hover:to-[hsl(var(--purple)_/_0.8)] text-white border-0'
                        >
                            Book A Demo →
                        </Button>
                    </div>

                    <div className='w-full lg:w-1/2'>
                        <div className='relative h-[400px] group'>
                            <Card className='absolute inset-0 z-10 overflow-hidden border-0 shadow-lg backdrop-blur-xl bg-primary-light transition-transform duration-500 ease-in-out group-hover:-translate-y-0 group-hover:shadow-xl'>
                                <CardContent className='p-0'>
                                    <Image
                                        src='/ai-images/final-ai-images/blended-learning.jpg'
                                        alt='Blended Learning Journey'
                                        width={1080}
                                        height={720}
                                        className='w-full h-auto'
                                        priority
                                    />
                                </CardContent>
                            </Card>
                            <Card className='absolute inset-0 rotate-3 translate-x-6 translate-y-6 z-0 overflow-hidden border-0 shadow-lg backdrop-blur-2xl bg-primary-light transition-all duration-700 ease-in-out delay-200 group-hover:rotate-0 group-hover:translate-x-0 group-hover:translate-y-0'>
                                <CardContent className='p-0'>
                                    <Image
                                        src='/ai-images/final-ai-images/blended-learning.jpg'
                                        alt='Blended Learning Journey Shadow'
                                        width={1080}
                                        height={720}
                                        className='w-full h-auto opacity-30'
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {isMobile && (
                    <div className='mt-8 grid grid-cols-1 gap-3'>
                        {features.slice(3).map((feature, index) => (
                            <div key={index} className='flex items-start gap-2'>
                                <RocketIcon className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
                                <span className='font-medium text-dark-gray'>
                                    {feature.title}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <div className='mt-12 space-y-6'>
                    <div>
                        {showContent ? (
                            <p className='text-gray'>{summary}</p>
                        ) : (
                            <p className='text-gray'>
                                {summary.slice(0, 250)}...
                                <Button
                                    variant='link'
                                    onClick={() => setShowContent(true)}
                                    className='text-[hsl(var(--primary))] hover:text-[hsl(var(--primary)_/_0.8)] p-0 h-auto font-medium'
                                >
                                    See more →
                                </Button>
                            </p>
                        )}
                    </div>

                    {showContent && (
                        <div className='grid grid-cols-1 gap-6 mt-6'>
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className='flex gap-3 bg-blue-700/20 backdrop-blur-2xl rounded-lg p-4 shadow-sm'
                                >
                                    <RocketIcon className='h-5 w-5 text-primary mt-1 flex-shrink-0' />
                                    <div>
                                        <p className='font-medium text-dark-gray'>
                                            {feature.title}:
                                        </p>
                                        <p className='text-gray'>
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
