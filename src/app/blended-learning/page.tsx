import type { Metadata } from 'next';
import BlendedLearning from './blended-learning';

export const metadata: Metadata = {
    title: 'A learning journey is a continuous process of growth, discovery, and skill development.',
    description:
        'Join our platform to enhance your learning journey with personalized insights and growth tools. Start today!',
    keywords:
        'blended learning, SkillBNK, centralized management, content distribution, learning journey, teacher peace of mind, content accessibility, effectiveness, engagement, scalability, edtech, 24x7 connectivity, aiintegration, student success, learning journey',
    alternates: {
        canonical: 'https://www.bootcampshub.ai/blended-learning',
    },
};

export default function BlendedLearningPage() {
    return (
        <>
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org/',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Blended Learning Journey',
                                item: 'https://www.bootcampshub.ai/blended-learning',
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'Contact SkillBNK',
                                item: 'https://www.bootcampshub.ai/contact',
                            },
                        ],
                    }),
                }}
            />
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        mainEntityOfPage: {
                            '@type': 'WebPage',
                            '@id': 'https://www.bootcampshub.ai/blended-learning',
                        },
                        headline: 'Blended Learning Journey',
                        description:
                            'Join our platform to enhance your learning journey with personalized insights and growth tools. Start today!',
                        image: 'https://www.bootcampshub.ai/ai-images/final-ai-images/blended-learning.jpg',
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
                    }),
                }}
            />
            <main>
                <BlendedLearning />
            </main>
        </>
    );
}
