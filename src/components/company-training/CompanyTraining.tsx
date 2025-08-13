'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from 'react-responsive';

interface FeatureItem {
    title: string;
    description: string;
}

const features: FeatureItem[] = [
    {
        title: 'Centralized Training Management',
        description:
            "SkillBNK's SaaS platform is designed for easy and quick implementation, ensuring that schools and organizations can start benefiting from its features without extensive setup time.",
    },
    {
        title: 'Rich Features',
        description:
            "The integration of OpenAI's capabilities within SkillBNK enables the platform to produce fast and efficient results. OpenAI's AI technology can enhance various aspects of the platform, such as content generation, assistance, and management.",
    },
    {
        title: 'AI-Powered Assistance',
        description:
            'SkillBNK stands out as a new and different solution in the education technology landscape. Its innovative approach to centralized and distributed features for schools and students makes it distinct from other options.',
    },
    {
        title: 'Better Employee Understanding',
        description:
            "The platform's centralized and distributed approach, coupled with its focus on delivering amazing outcomes for schools and students, positions it as a superior choice when compared to other alternatives in the market.",
    },
    {
        title: 'Outcome Measurement',
        description:
            'SkillBNK addresses a significant problem in education by providing a centralized platform that fulfills the desires of schools, students, and management. This solves various challenges related to managing and enhancing the educational experience.',
    },
    {
        title: 'Integration with OpenAI',
        description:
            'Thanks to its automated features for schools and AI capabilities for assistance and content management, SkillBNK can produce substantial and desirable results. This includes streamlined processes, improved learning outcomes, and efficient school management.',
    },
];

const CompanyTraining: React.FC = () => {
    const [showContent, setShowContent] = useState(false);
    const router = useRouter();
    const isDesktop = useMediaQuery({ query: '(min-width: 592px)' });

    useEffect(() => {
        setShowContent(false);
    }, []);

    const handleBookDemo = () => {
        router.push('/book-a-demo');
    };

    return (
        <section className='xl:py-20 py-16 bg-gradient-to-b from-slate-50 dark:from-slate-900 dark:to-slate-950 to-white'>
            <div className='my-container pt-10'>
                <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
                    <div className='space-y-6 order-2 lg:order-1'>
                        <h1 className='text-4xl md:text-5xl font-bold text-black dark:text-white leading-tight'>
                            Company Training and{' '}
                            <span className='text-primary-white'>
                                Onboarding
                            </span>
                        </h1>

                        <p className='text-lg text-dark-gray dark:text-slate-300'>
                            Saas-based platforms like SkillBNK address various
                            training needs within companies. Such platforms can
                            offer numerous benefits to organizations seeking to
                            improve their training programs. Here are some key
                            advantages of using a platform like SkillBNK for
                            corporate training:
                        </p>

                        <div className='space-y-4'>
                            {features
                                .slice(0, isDesktop ? 6 : 3)
                                .map((feature, index) => (
                                    <div
                                        key={index}
                                        className='flex items-start gap-3'
                                    >
                                        <div className='bg-primary/10 p-2 rounded-full mt-0.5'>
                                            <Rocket className='h-4 w-4 text-primary' />
                                        </div>
                                        <div>
                                            <p className='font-semibold text-black dark:text-white'>
                                                {feature.title}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        <Button onClick={handleBookDemo} className='mt-6'>
                            Book A Demo &rarr;
                        </Button>
                    </div>

                    <div className='relative order-1 lg:order-2'>
                        <div className='absolute inset-0 bg-gradient-to-tr from-emerald-100 to-sky-100 dark:from-emerald-900/30 dark:to-sky-900/30 rounded-3xl transform rotate-2 opacity-70'></div>
                        <div className='relative overflow-hidden rounded-2xl shadow-lg'>
                            <Image
                                src='/ai-images/final-ai-images/company-training-and-onboarding.jpg'
                                alt='Company Training and Onboarding'
                                width={1080}
                                height={720}
                                className='w-full h-auto object-cover'
                            />
                        </div>
                    </div>
                </div>

                <div className='mt-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 md:p-8'>
                    <div className='mb-6'>
                        {showContent ? (
                            <p className='text-dark-gray dark:text-slate-300'>
                                Ultimately, the goal of any training program is
                                to achieve effective outcomes for both the
                                company and its employees. Saas-based platforms
                                can help align training efforts with business
                                goals and ensure employees are better equipped
                                to contribute to the organization&apos;s growth.
                            </p>
                        ) : (
                            <p className='text-dark-gray dark:text-slate-300'>
                                Ultimately, the goal of any training program is
                                to achieve effective outcomes for both the
                                company and its employees. Saas-based platforms
                                can help align training efforts with business
                                goals and ensure employees are better equipped
                                to...
                                <button
                                    onClick={() => setShowContent(true)}
                                    className='ml-2 text-primary hover:underline font-medium'
                                >
                                    See more &rarr;
                                </button>
                            </p>
                        )}
                    </div>

                    {showContent && (
                        <div className='space-y-6'>
                            {features.map((feature, index) => (
                                <div key={index} className='flex gap-4'>
                                    <div className='bg-primary/10 p-2 rounded-full mt-1 flex-shrink-0'>
                                        <Rocket className='h-4 w-4 text-primary' />
                                    </div>
                                    <div>
                                        <h3 className='font-semibold text-black dark:text-white mb-1'>
                                            {feature.title}
                                        </h3>
                                        <p className='text-dark-gray dark:text-slate-300'>
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!isDesktop && !showContent && (
                        <div className='mt-6 space-y-4'>
                            {features.slice(3).map((feature, index) => (
                                <div
                                    key={index}
                                    className='flex items-start gap-3'
                                >
                                    <div className='bg-primary/10 p-2 rounded-full mt-0.5'>
                                        <Rocket className='h-4 w-4 text-primary' />
                                    </div>
                                    <div>
                                        <p className='font-semibold text-black dark:text-white'>
                                            {feature.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CompanyTraining;
