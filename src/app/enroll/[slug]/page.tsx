import React from 'react';
import EnrollComp from './EnrollComp';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Enroll Today to Begin Your Journey Toward Career Excellence with SkillBNK',
    description:
        'Secure your spot in our career-boosting programs. Enroll now and start building the future you deserve!',
    keywords:
        'enroll now,SkillBNK,student enrollment,career programs,join bootcamp,registration,career readiness,interview preparation,student success,ai powered learning,job preparation,skill enhancement,professional development,education platform,flexible learning,edtech solutions,career growth,personalized learning path,holistic preparation,real interview prep',
    openGraph: {
        title: 'Enroll Now - SkillBNK',
        description:
            'Secure your spot in our career-boosting programs. Enroll now and start building the future you deserve!',
        url: 'https://www.bootcampshub.ai/enroll',
        images: [
            {
                url: '/ai-images/final-ai-images/company-training-and-onboarding.jpg',
                width: 1200,
                height: 630,
                alt: 'Company Training and Onboarding',
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.bootcampshub.ai/enroll',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Enroll Now - SkillBNK',
        description:
            'Secure your spot in our career-boosting programs. Enroll now and start building the future you deserve!',
        images: [
            '/ai-images/final-ai-images/company-training-and-onboarding.jpg',
        ],
    },
};

const EnrollPage = () => {
    return (
        <>
            <EnrollComp />
        </>
    );
};

export default EnrollPage;
