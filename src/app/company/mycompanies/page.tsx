import React from 'react';
import MyOrganizations from './MycompaniesComp';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Companies - SkillBNK | Manage and Explore Your Organizations',
    description:
        'View and manage your companies on SkillBNK. Access important company details, track progress, and explore features to enhance your organizational success.',
    keywords:
        'my companies, SkillBNK companies, manage companies, organization management, company dashboard, business success, track company progress, view companies, organizational growth, company details, edtech companies',
    openGraph: {
        title: 'My Companies - SkillBNK',
        description:
            'Manage and explore your companies on SkillBNK. Stay informed on important company metrics, organizational insights, and more.',
        url: 'https://www.bootcampshub.ai/my-companies',
        images: [
            {
                url: '/IT-courses/it-course-hero.svg',
                width: 1200,
                height: 630,
                alt: 'My Companies - SkillBNK',
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.bootcampshub.ai/my-companies',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'My Companies - SkillBNK',
        description:
            'Manage and explore your companies. Track progress, access insights, and more with SkillBNK.',
        images: ['/IT-courses/it-course-hero.svg'],
    },
};

const MyOrganizationsPage = () => {
    return (
        <>
            <MyOrganizations />
        </>
    );
};

export default MyOrganizationsPage;
