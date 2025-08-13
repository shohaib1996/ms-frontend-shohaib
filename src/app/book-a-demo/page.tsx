import BookDemoForm from '@/components/book-a-demo/BookDemoForm';
import type { Metadata } from 'next';
import { jsonLdScriptProps } from 'react-schemaorg';
import type { BreadcrumbList, Article, Event, WithContext } from 'schema-dts';

export const metadata: Metadata = {
    title: 'SkillBNK Demo Showcases Features Enhancing Education Through Innovative, User-friendly Tools.',
    description:
        'Discover SkillBNK with our demo! Explore features, track progress, and enhance learning today.',
    keywords:
        'SkillBNK demo,exceptional experience,student success,book a demo,SkillBNK,exceptional experience,student experience,school experience ,edtech demo ,see it in action ,transform education ,demo request ,experience bootcampshub ,educational innovation ,future of education ,interactive demo ,education revolution ,upgrade your school ,student success ,school success ,demo today',
    openGraph: {
        title: 'Book A Demo - SkillBNK',
        description:
            'Discover SkillBNK with our demo! Explore features, track progress, and enhance learning today.',
        url: 'https://www.bootcampshub.ai/book-a-demo',
        images: [
            {
                url: '/IT-courses/it-course-hero.svg',
                width: 1200,
                height: 630,
                alt: 'Book A Demo - SkillBNK',
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.bootcampshub.ai/book-a-demo',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Book A Demo - SkillBNK',
        description:
            'Discover SkillBNK with our demo! Explore features, track progress, and enhance learning today.',
        images: ['/IT-courses/it-course-hero.svg'],
    },
};

export default function BookDemoPage() {
    const clientUrl =
        process.env.NEXT_PUBLIC_CLIENT_URL || 'https://www.bootcampshub.ai';

    const breadcrumbSchema: WithContext<BreadcrumbList> = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Book A Demo',
                item: 'https://www.bootcampshub.ai/book-a-demo',
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
            '@id': 'https://www.bootcampshub.ai/book-a-demo',
        },
        headline: 'Book A SkillBNK Demo',
        description:
            'Discover SkillBNK with our demo! Explore features, track progress, and enhance learning today.',
        image: 'https://www.bootcampshub.ai/IT-courses/it-course-hero.svg',
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

    const eventSchema: WithContext<Event> = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: 'Book A Call',
        description:
            "You're on the path to offering an exceptional school and student experience via the SkillBNK",
        image: 'https://www.bootcampshub.ai/IT-courses/it-course-hero.svg',
        startDate: '2024-06-01',
        endDate: '2040-01-24',
        eventStatus: 'https://schema.org/EventMovedOnline',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        location: {
            '@type': 'VirtualLocation',
            url: 'https://www.bootcampshub.ai/book-a-demo',
        },
        performer: { '@type': 'Person', name: 'Shiblu Ahmad' },
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
                {...jsonLdScriptProps<Event>(eventSchema)}
                type='application/ld+json'
            />
            <main>
                <BookDemoForm />
            </main>
        </>
    );
}
