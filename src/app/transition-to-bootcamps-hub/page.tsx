import type { Metadata } from 'next';
import TransitionSchoolsHub from './TransitionSchoolsHub';

export const metadata: Metadata = {
    title: 'Modern Education Emphasizes Technology, Critical Thinking, And Personalized Learning Experiences.',
    description:
        'Explore modern education with SkillBNK! Embrace innovation, technology, and inclusive learning. Join us now!',
    keywords:
        'modern education,transition to bootcampshub,saas platform,network of bootcamps,quick implementation,open ai integration,fast results,novel and unique,superior solution,solving problems,big results,desirable outcomes,current demands,edtech innovation,streamlined processes,improved learning,efficient management,modern education,educational advancement,ai enhanced learning,centralized platform,effective solutions',
    alternates: {
        canonical: 'https://www.bootcampshub.ai/transition-to-bootcamps-hub',
    },
};

export default function TransitionToBootcampsHubPage() {
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
                                name: 'Transition To SkillBNK Modern Education',
                                item: 'https://www.bootcampshub.ai/transition-to-bootcamps-hub',
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
                            '@id': 'https://www.bootcampshub.ai/transition-to-bootcamps-hub',
                        },
                        headline: 'Transition Modern Education',
                        description:
                            'Explore modern education with BootcampsHub! Embrace innovation, technology, and inclusive learning. Join us now!',
                        image: 'https://www.bootcampshub.ai/ai-images/final-ai-images/transition-to-bootcamps-hub.jpg',
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
                <TransitionSchoolsHub />
            </main>
        </>
    );
}
