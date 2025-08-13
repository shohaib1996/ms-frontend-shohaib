import React from 'react';
import PrivacyPolicyComp from './PrivacyPolicyComp';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - SkillBNK | Your Data, Our Responsibility',
    description:
        'Learn how SkillBNK collects, uses, and protects your personal information. Your privacy matters to us.',
    keywords:
        'privacy policy,SkillBNK,data protection,user privacy,personal data,information security,policy statement,secure learning,edtech privacy,terms of use,user consent,data collection policy,student data safety,online privacy,trust and transparency,data usage rights,responsible data handling,user information,secure platform,privacy compliance',
    openGraph: {
        title: 'Privacy Policy - SkillBNK',
        description:
            'Learn how SkillBNK collects, uses, and protects your personal information. Your privacy matters to us.',
        url: 'https://www.bootcampshub.ai/privacy-policy',
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
        canonical: 'https://www.bootcampshub.ai/privacy-policy',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Privacy Policy - SkillBNK',
        description:
            'Learn how SkillBNK collects, uses, and protects your personal information. Your privacy matters to us.',
        images: [
            '/ai-images/final-ai-images/company-training-and-onboarding.jpg',
        ],
    },
};

const PrivacyPolicy = () => {
    return (
        <>
            <PrivacyPolicyComp />
        </>
    );
};

export default PrivacyPolicy;
