import React from 'react';
import TermsAndConditionComp from './TermsAndConditionComp';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Terms and Conditions - SkillBNK | Know Your Rights and Responsibilities',
    description:
        "Review the terms and conditions for using SkillBNK's platform and services. Transparency and fairness guaranteed.",
    keywords:
        'terms and conditions,SkillBNK,user agreement,platform rules,service terms,edtech platform policy,user rights,code of conduct,acceptable use,legal agreement,policy transparency,student guidelines,accountability,service usage,terms of service,responsible learning,online education policy,trust and safety,legal information,user obligations',
    openGraph: {
        title: 'Terms and Conditions - SkillBNK',
        description:
            "Review the terms and conditions for using SkillBNK's platform and services. Transparency and fairness guaranteed.",
        url: 'https://www.bootcampshub.ai/terms-and-condition',
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
        canonical: 'https://www.bootcampshub.ai/terms-and-condition',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Terms and Conditions - SkillBNK',
        description:
            "Review the terms and conditions for using SkillBNK's platform and services. Transparency and fairness guaranteed.",
        images: [
            '/ai-images/final-ai-images/company-training-and-onboarding.jpg',
        ],
    },
};

const TermsAndConditionPage = () => {
    return (
        <>
            <TermsAndConditionComp />
        </>
    );
};

export default TermsAndConditionPage;
