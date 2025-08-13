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
        title: 'Quick and Easy Implementation',
        description:
            "SkillBNK's SaaS platform is designed for easy and quick implementation, ensuring that schools and organizations can start benefiting from its features without extensive setup time.",
    },
    {
        title: 'Fast Results with OpenAI Integration',
        description:
            "The integration of OpenAI's capabilities within Schools Hub enables the platform to produce fast and efficient results. OpenAI's AI technology can enhance various aspects of the platform, such as content generation, assistance, and management.",
    },
    {
        title: 'Novel and Unique',
        description:
            'SkillBNK stands out as a new and different solution in the education technology landscape. Its innovative approach to centralized and distributed features for schools and students makes it distinct from other options.',
    },
    {
        title: 'Superior to Competitors',
        description:
            "The platform's centralized and distributed approach, coupled with its focus on delivering amazing outcomes for schools and students, positions it as a superior choice when compared to other alternatives in the market.",
    },
    {
        title: 'Solving Significant Problems',
        description:
            'SkillBNK addresses a significant problem in education by providing a centralized platform that fulfills the desires of schools, students, and management. This solves various challenges related to managing and enhancing the educational experience.',
    },
    {
        title: 'Big and Desirable Results',
        description:
            'Thanks to its automated features for schools and AI capabilities for assistance and content management, SkillBNK can produce substantial and desirable results. This includes streamlined processes, improved learning outcomes, and efficient school management.',
    },
    {
        title: 'Alignment with Current Demands',
        description:
            "The Schools Hub's natural alignment with the current demands and agility in the education sector ensures that it meets the needs and expectations of schools, management, and students. This adaptability is crucial in today's ever-evolving educational landscape.",
    },
];

export default function TransitionSchoolsHub() {
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
        'In summary, transitioning to SkillBNK as a SaaS-based platform offers a range of advantages, from its ease of implementation and integration with AI technology to its unique and superior approach to solving key challenges in education. This platform is well-positioned to meet the demands of modern education and provide valuable benefits for your company and the organizations it serves.';

    return (
        <div className='overflow-hidden'>
            {/* Background gradient effects */}
            <div className='fixed top-[100px] -left-36 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl' />
            <div className='fixed top-1/2 right-0 w-[500px] h-[400px] rounded-full bg-purple-400/30 blur-3xl' />

            <section className='py-12 px-4 md:px-6 lg:px-8 my-container mt-[60px] relative z-10'>
                <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 items-center'>
                    <div className='w-full lg:w-1/2 space-y-6'>
                        <h1 className='text-3xl md:text-4xl font-bold tracking-tight text-black'>
                            Transition Modern Education
                        </h1>

                        <p className='text-gray'>
                            The transition to SkillBNK as a SaaS-based platform,
                            referred to as a Network of Schools, offers several
                            compelling benefits for your company and
                            organization:
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
                            <Card className='absolute inset-0 z-10 overflow-hidden border-0 shadow-lg backdrop-blur-xl bg-primary-light transition-transform duration-500 ease-in-out group-hover:-translate-y-0'>
                                <CardContent className='p-0'>
                                    <Image
                                        src='/ai-images/final-ai-images/transition-to-schools-hub.jpg'
                                        alt='Transition to SkillBNK Modern Education'
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
                                        src='/ai-images/final-ai-images/transition-to-schools-hub.jpg'
                                        alt='Transition to SkillBNK Modern Education Shadow'
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
