'use client';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Rocket } from 'lucide-react';
import { useState, MouseEvent, ReactNode } from 'react';
const lms = '/lms.png';

export default function LmsComparison() {
    const [showMore, setShowMore] = useState<boolean>(false);

    // Additional text to show when "See more" is clicked
    const additionalText: string = `Ultimately, the goal of any training program is to achieve effective outcomes for both the company and its employees. Saas-based platforms can help align training efforts with business goals and ensure employees are better equipped to contribute to the organization's growth.
**Centralized Training Management: **SkillBNK's SaaS platform is designed for easy and quick implementation, ensuring that schools and organizations can start benefiting from its features without extensive setup time.
**Rich Features: **The integration of OpenAI's capabilities within SkillBNK enables the platform to produce fast and efficient results. OpenAI's AI technology can enhance various aspects of the platform, such as content generation, assistance, and management.
**AI-Powered Assistance:** SkillBNK stands out as a new and different solution in the education technology landscape. Its innovative approach to centralized and distributed features for schools and students makes it distinct from other options.
**Better Employee Understanding:** The platform's centralized and distributed approach, coupled with its focus on delivering amazing outcomes for schools and students, positions it as a superior choice when compared to other alternatives in the market.
**Outcome Measurement:** SkillBNK addresses a significant problem in education by providing a centralized platform that fulfills the desires of schools, students, and management. This solves various challenges related to managing and enhancing the educational experience.
**Integration with OpenAI:** Thanks to its automated features for schools and AI capabilities for assistance and content management, SkillBNK can produce substantial and desirable results. This includes streamlined processes, improved learning outcomes, and efficient school management.`;

    // Function to toggle the visibility of additional text
    const toggleShowMore = (e: MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        setShowMore(true); // Only set to true, no toggling back
    };

    // Format the additional text with proper formatting for markdown-style content
    const formatAdditionalText = (text: string): ReactNode[] => {
        return text.split('\n').map((paragraph, index) => {
            if (paragraph.includes('**')) {
                const parts = paragraph.split('**');
                return (
                    <div key={index} className='mt-3 flex'>
                        <div className=' p-1 rounded mr-2 flex-shrink-0'>
                            <Rocket className='h-5 w-5 text-primary' />
                        </div>
                        <p className='mt-0.5'>
                            <strong>{parts[1]}</strong>
                            {parts[2]}
                        </p>
                    </div>
                );
            }
            return (
                <p key={index} className='mt-2'>
                    {paragraph}
                </p>
            );
        });
    };

    return (
        <div className='my-container mx-auto px-4 py-8 mt-20 '>
            <div className='grid md:grid-cols-2 gap-8'>
                <div className='space-y-6'>
                    <div>
                        <h1 className='text-3xl font-bold text-black'>
                            LMS Vs SkillBNK
                        </h1>
                        <p className='mt-2 text-black'>
                            Highlighting several differences between a typical
                            Learning Management System (LMS) and SkillBNK.
                            Let&apos;s summarize the key points of comparison:
                        </p>
                    </div>

                    <div className='space-y-3'>
                        {[
                            'Design and User-Friendliness',
                            'Outcome-Oriented Approach',
                            'Comprehensive Features',
                            'Integrated Document Management',
                            'Presentation and Content Creation',
                            'Communication and Collaboration',
                            'AI Integration',
                            'Student-Centric Approach',
                            'Motivation and Engagement',
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className='flex items-center gap-2'
                            >
                                <CheckCircle2 className='h-5 w-5 text-primary flex-shrink-0' />
                                <span className='text-black font-medium'>
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div>
                        <Link
                            href='#'
                            className='inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors'
                        >
                            Book A Demo →
                        </Link>
                    </div>

                    <div className='text-black'>
                        <p>
                            SkillBNK appears to offer a more modern, integrated,
                            and outcome-driven approach to learning compared to
                            traditional LMSs. However, the choice between these
                            systems should depend on the specific needs and
                            goals of the educational institution or{' '}
                            {!showMore && (
                                <Link
                                    href='#'
                                    onClick={toggleShowMore}
                                    className='text-green-600 font-medium hover:underline'
                                >
                                    See more
                                </Link>
                            )}
                        </p>

                        {showMore && (
                            <div className='mt-4 text-black transition-all duration-300'>
                                {formatAdditionalText(additionalText)}
                            </div>
                        )}
                    </div>
                </div>

                <div className=''>
                    <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-tr from-emerald-100 to-sky-100 rounded-3xl transform rotate-2 opacity-70'></div>
                        <div className='relative overflow-hidden rounded-2xl shadow-lg'>
                            <Image
                                src={lms}
                                alt='About SkillBNK'
                                width={600}
                                height={400}
                                className='w-full h-auto object-cover'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
