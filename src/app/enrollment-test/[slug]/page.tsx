import React from 'react';
import BootcampEnrollmentTestComp from '../_Components/BootcampEnrollmentTestComp';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Take the Enrollment Test to Assess Your Readiness for SkillBNK Programs',
    description:
        'Evaluate your skills and get matched with the right learning path. Start your enrollment test today and take the first step toward career success!',
    keywords:
        'enrollment test,skill assessment,SkillBNK,readiness check,career test,student evaluation,career readiness,ai powered test,personalized path,student success,interview preparation,job readiness,education tools,real-world skills,edtech platform,career alignment,test your skills,learning journey,career boost,tech career test',
    openGraph: {
        title: 'Enrollment Test - SkillBNK',
        description:
            'Evaluate your skills and get matched with the right learning path. Start your enrollment test today and take the first step toward career success!',
        url: 'https://www.bootcampshub.ai/enrollment-test',
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
        canonical: 'https://www.bootcampshub.ai/enrollment-test',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Enrollment Test - SkillBNK',
        description:
            'Evaluate your skills and get matched with the right learning path. Start your enrollment test today and take the first step toward career success!',
        images: [
            '/ai-images/final-ai-images/company-training-and-onboarding.jpg',
        ],
    },
};

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    return (
        <>
            <BootcampEnrollmentTestComp slug={slug} />
        </>
    );
};

export default page;
