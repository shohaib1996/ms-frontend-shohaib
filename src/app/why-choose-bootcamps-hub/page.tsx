import WhyChooseBootcampsHub from '@/components/whyChooseBootcamps/WhyChooseBootcampsHub';
import type { Metadata } from 'next';
import { jsonLdScriptProps } from 'react-schemaorg';
import { Article, LocalBusiness, WithContext } from 'schema-dts';

export const metadata: Metadata = {
    title: 'Why Choose SkillBNK | Modern Learning Management System',
    description:
        'Discover why SkillBNK stands out with its unified platform, modern interface, AI automation, and cost-effective solutions for educational institutions.',
    keywords:
        'SkillBNK, Learning Management System, LMS, AI in Education, Modern LMS, Educational Platform, Cost Reduction, Unified Learning Platform, EdTech Solution',
    openGraph: {
        title: 'Why Choose SkillBNK | Modern Learning Management System',
        description:
            'Discover why SkillBNK stands out with its unified platform, modern interface, AI automation, and cost-effective solutions for educational institutions.',
        url: 'https://www.bootcampshub.ai/why-choose',
        images: [
            {
                url: '/why-choose/why-choose.png',
                width: 1200,
                height: 630,
                alt: 'Why Choose SkillBNK',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Why Choose SkillBNK | Modern Learning Management System',
        description:
            'Discover why SkillBNK stands out with its unified platform, modern interface, AI automation, and cost-effective solutions for educational institutions.',
        images: ['/why-choose/why-choose.png'],
    },
};

export default function WhyChoosePage() {
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
            '@id': 'https://www.bootcampshub.ai/why-choose',
        },
        headline: 'Why Choose SkillBNK',
        description:
            'Discover why SkillBNK stands out with its unified platform, modern interface, AI automation, and cost-effective solutions for educational institutions.',
        image: 'https://www.bootcampshub.ai/multischool/why-choose.png',
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
                <WhyChooseBootcampsHub />
            </main>
        </>
    );
}
