import LmsComparison from '@/components/LmsComparison/LmsComparison';
import type { Metadata } from 'next';
import { jsonLdScriptProps } from 'react-schemaorg';
import { Article, LocalBusiness, WithContext } from 'schema-dts';

export const metadata: Metadata = {
    title: 'LMS vs SkillBNK | Modern Learning Management Solution Comparison',
    description:
        'Compare traditional Learning Management Systems with SkillBNK. Discover our AI-driven, user-friendly platform designed for better educational outcomes.',
    keywords:
        'LMS comparison, SkillBNK, Learning Management System, EdTech platform, AI in education, student engagement, outcome-oriented learning, educational software comparison',
    openGraph: {
        title: 'LMS vs SkillBNK | Modern Learning Management Solution Comparison',
        description:
            'Compare traditional Learning Management Systems with SkillBNK. Discover our AI-driven, user-friendly platform designed for better educational outcomes.',
        url: 'https://www.bootcampshub.ai/lms-comparison',
        images: [
            {
                url: '/lms-comparison/lms-vs-bootcamps.png',
                width: 1200,
                height: 630,
                alt: 'LMS vs SkillBNK Comparison',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LMS vs SkillBNK | Modern Learning Management Solution Comparison',
        description:
            'Compare traditional Learning Management Systems with SkillBNK. Discover our AI-driven, user-friendly platform designed for better educational outcomes.',
        images: ['/lms-comparison/lms-vs-bootcamps.png'],
    },
};

export default function LmsComparisonPage() {
    const clientUrl =
        process.env.NEXT_PUBLIC_CLIENT_URL || 'https://www.bootcampshub.ai';

    const localBusinessSchema: WithContext<LocalBusiness> = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'SkillBNK',
        image: `${clientUrl}/multischool/new-folder/SchoolHubs-logo-final.png`,
        '@id': 'Logo',
        url: clientUrl,
        telephone: '+1 (586) 276-7347',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '30500 Van Dyke, Ste - 201',
            addressLocality: 'Warren',
            addressRegion: 'MI',
            postalCode: '',
            addressCountry: 'US',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 42.5179399,
            longitude: -83.0278453,
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
            ],
            opens: '00:00',
            closes: '23:59',
        },
        sameAs: [
            'https://www.facebook.com/profile.php?id=61553006895822&mibextid=9R9pXO',
            'https://www.linkedin.com/company/schools-hub/',
            clientUrl,
        ],
    };

    const articleSchema: WithContext<Article> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.bootcampshub.ai/lms-comparison',
        },
        headline:
            'LMS vs SkillBNK: Modern Learning Management Solution Comparison',
        description:
            'Compare traditional Learning Management Systems with SkillBNK. Discover our AI-driven, user-friendly platform designed for better educational outcomes.',
        image: 'https://www.bootcampshub.ai/multischool/lms-comparison.png',
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
                {...jsonLdScriptProps<LocalBusiness>(localBusinessSchema)}
                type='application/ld+json'
            />
            <script
                {...jsonLdScriptProps<Article>(articleSchema)}
                type='application/ld+json'
            />

            <main>
                <LmsComparison />
            </main>
        </>
    );
}
