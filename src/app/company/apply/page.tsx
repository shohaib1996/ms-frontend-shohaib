import React from 'react';
import ApplyComp from './ApplyComp';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Apply - SkillBNK | Start Your Journey with Education Excellence',
    description:
        'Apply now at SkillBNK and start your educational journey today. Our platform offers cutting-edge tools, programs, and resources for your success.',
    keywords:
        'apply SkillBNK, educational applications, start your journey, education programs, apply now, learning opportunities, educational success, online education, SkillBNK apply, education excellence, apply for bootcamps',
    openGraph: {
        title: 'Apply - SkillBNK',
        description:
            'Apply now at SkillBNK and start your educational journey today. Our platform offers cutting-edge tools, programs, and resources for your success.',
        url: 'https://www.bootcampshub.ai/apply',
        images: [
            {
                url: '/IT-courses/it-course-hero.svg',
                width: 1200,
                height: 630,
                alt: 'Apply - SkillBNK',
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.bootcampshub.ai/apply',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Apply - SkillBNK',
        description:
            'Start your journey with SkillBNK by applying now. Unlock access to transformative education and resources.',
        images: ['/IT-courses/it-course-hero.svg'],
    },
};

const Apply = () => {
    return (
        <>
            <ApplyComp />
        </>
    );
};

export default Apply;
