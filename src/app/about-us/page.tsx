import AboutHero from '@/components/about-us/AboutHero';
import type { Metadata } from 'next';
import { jsonLdScriptProps } from 'react-schemaorg';
import { Article, LocalBusiness, WithContext } from 'schema-dts';
// import type { LocalBusiness, Article } from "schema-dts"

export const metadata: Metadata = {
    title: 'Become Efficient And Productive By Working Smart, Not Hard | About SkillBNK',
    description:
        'Discover SkillBNK: your go-to platform for educational resources, bootcamps, and daily activity tracking. Join now to enhance learning and stay ahead!',
    keywords:
        'SkillBNK, Career Readiness, Technical Assessment, Technical Tests, Skill Development, EdTech, Smart Learning, Career Transformation, Learning Management System, Agile Mindset',
    openGraph: {
        title: 'Become Efficient And Productive By Working Smart, Not Hard | About SkillBNK',
        description:
            'Discover SkillBNK: your go-to platform for educational resources, bootcamps, and daily activity tracking. Join now to enhance learning and stay ahead!',
        url: 'https://www.bootcampshub.ai/about-us',
        images: [
            {
                url: '/about-us/about-us.png',
                width: 1200,
                height: 630,
                alt: 'About SkillBNK',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Become Efficient And Productive By Working Smart, Not Hard | About SkillBNK',
        description:
            'Discover SkillBNK: your go-to platform for educational resources, bootcamps, and daily activity tracking. Join now to enhance learning and stay ahead!',
        images: ['/about-us/about-us.png'],
    },
};

export default function AboutPage() {
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
            '@id': 'https://www.bootcampshub.ai/about-us',
        },
        headline: 'About SkillBNK',
        description:
            'Discover SkillBNK: your go-to platform for educational resources, bootcamps, and daily activity tracking. Join now to enhance learning and stay ahead!',
        image: 'https://www.bootcampshub.ai/multischool/about-us.png',
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
                <AboutHero />
            </main>
        </>
    );
}
