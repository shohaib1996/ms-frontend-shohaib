import CompanyTraining from '@/components/company-training/CompanyTraining';
import type { Metadata } from 'next';
import { jsonLdScriptProps } from 'react-schemaorg';
import type { BreadcrumbList, Article, WithContext } from 'schema-dts';

export const metadata: Metadata = {
    title: 'Company Training And Onboarding Ensure New Hires Adapt Quickly, Enhancing Skills And Integration.',
    description:
        "Enhance your team's skills with our comprehensive company training programs. Join now for success!",
    keywords:
        'company training,automated mock interviews,SkillBNK,interview preparation,customized question sets,convenience and accessibility,ai powered assistance,student success,career readiness,job preparation,skill development,interview skills,educational tools,confidence boost,holistic preparation,edtech,mock interviews,student empowerment,career advancement,innovative education,real interview prep,personalized learning,flexible learning,ai integration,competitive edge',
    openGraph: {
        title: 'Company Training And Onboarding - SkillBNK',
        description:
            "Enhance your team's skills with our comprehensive company training programs. Join now for success!",
        url: 'https://www.bootcampshub.ai/company-training-and-onboarding',
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
        canonical:
            'https://www.bootcampshub.ai/company-training-and-onboarding',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Company Training And Onboarding - SkillBNK',
        description:
            "Enhance your team's skills with our comprehensive company training programs. Join now for success!",
        images: [
            '/ai-images/final-ai-images/company-training-and-onboarding.jpg',
        ],
    },
};

export default function CompanyTrainingPage() {
    const clientUrl =
        process.env.NEXT_PUBLIC_CLIENT_URL || 'https://www.bootcampshub.ai';

    const breadcrumbSchema: WithContext<BreadcrumbList> = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Company Training and Onboarding',
                item: 'https://www.bootcampshub.ai/company-training-and-onboarding',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Contact SkillBNK',
                item: 'https://www.bootcampshub.ai/contact',
            },
        ],
    };

    const articleSchema: WithContext<Article> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.bootcampshub.ai/company-training-and-onboarding',
        },
        headline: 'Company Training and Onboarding',
        description:
            "Enhance your team's skills with our comprehensive company training programs. Join now for success!",
        image: 'https://www.bootcampshub.ai/ai-images/final-ai-images/company-training-and-onboarding.jpg',
        author: {
            '@type': 'Person',
            name: 'Shiblu Ahmad',
            url: 'https://www.bootcampshub.ai/founder',
        },
        publisher: {
            '@type': 'Organization',
            name: 'SkillBNK',
            logo: {
                '@type': 'ImageObject',
                url: 'https://www.bootcampshub.ai/multischool/new-folder/SchoolHubs-logo-final.png',
            },
        },
        datePublished: '2024-06-08',
        dateModified: '2044-02-09',
    };

    return (
        <>
            <script
                {...jsonLdScriptProps<BreadcrumbList>(breadcrumbSchema)}
                type='application/ld+json'
            />
            <script
                {...jsonLdScriptProps<Article>(articleSchema)}
                type='application/ld+json'
            />

            <main>
                <CompanyTraining />
            </main>
        </>
    );
}
