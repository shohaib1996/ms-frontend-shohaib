import Ceo from '@/components/founder/CEO';
import FounderStory from '@/components/founder/FounderStory';
import type { Metadata } from 'next';
import { jsonLdScriptProps } from 'react-schemaorg';
import type { BreadcrumbList, Article, Person, WithContext } from 'schema-dts';

export const metadata: Metadata = {
    title: 'Story Of The Founder | Shiblu Ahmad | SkillBNK Founder',
    description:
        'Discover SkillBNK, founded by visionary leaders. Join us to revolutionize education today!',
    keywords:
        'SkillBNK, SkillBNK Vision, Founder Story SkillBNK, Shiblu Ahmad, SkillBNK Education, EdTech, Schools IT Experience, Innovation SkillBNK, Student Engagement, Automated Processes, Career Transition, SkillBNK Founder',
    openGraph: {
        title: 'Story Of The Founder | Shiblu Ahmad | SkillBNK Founder',
        description:
            'Discover SkillBNK, founded by visionary leaders. Join us to revolutionize education today!',
        url: 'https://www.bootcampshub.ai/founder',
        images: [
            {
                url: 'https://staging.biyekorun.us/about-us/shiblu-boss-image-1.png',
                width: 1200,
                height: 630,
                alt: 'Shiblu Ahmad - SkillBNK Founder',
            },
        ],
        type: 'profile',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Story Of The Founder | Shiblu Ahmad | SkillBNK Founder',
        description:
            'Discover SkillBNK, founded by visionary leaders. Join us to revolutionize education today!',
        images: [
            'https://staging.biyekorun.us/about-us/shiblu-boss-image-1.png',
        ],
    },
};

export default function FounderPage() {
    const clientUrl =
        process.env.NEXT_PUBLIC_CLIENT_URL || 'https://www.bootcampshub.ai';

    const breadcrumbSchema: WithContext<BreadcrumbList> = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'SkillBNK Founder',
                item: 'https://www.bootcampshub.ai/founder',
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
            '@id': 'https://www.bootcampshub.ai/schools-hub-founder',
        },
        headline: 'SkillBNK Founder',
        description:
            'Discover SkillBNK, founded by visionary leaders. Join us to revolutionize education today!',
        image: 'https://staging.biyekorun.us/about-us/shiblu-boss-image-1.png',
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

    const personSchema: WithContext<Person> = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Shiblu Ahmad',
        url: 'https://www.bootcampshub.ai/schools-hub-founder',
        image: 'https://staging.biyekorun.us/about-us/shiblu-boss-image-1.png',
        sameAs: [
            'https://www.linkedin.com/in/shiblu-a-935b6393/',
            'https://www.facebook.com/ShibluFAhmad',
        ],
        jobTitle: 'Founder and CEO',
        worksFor: {
            '@type': 'Organization',
            name: 'SkillBNK, Tech Serve4 U, Agile Alm',
        },
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
            <script
                {...jsonLdScriptProps<Person>(personSchema)}
                type='application/ld+json'
            />

            <main>
                <Ceo />
                <FounderStory />
            </main>
        </>
    );
}
