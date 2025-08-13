import ContactForm from '@/components/contact/ContactForm';
import type { Metadata } from 'next';
import { jsonLdScriptProps } from 'react-schemaorg';
import type {
    BreadcrumbList,
    Article,
    ContactPage,
    WithContext,
} from 'schema-dts';

export const metadata: Metadata = {
    title: "Contact SkillBNK For Support: Email, Chat, Or Call. We're Here To Help You Succeed!",
    description:
        'Get in touch with SkillBNK to explore how we enhance learning with daily activities. Contact us now!',
    keywords:
        'contact us,customer support,get in touch,24 hour response,business days,we are here to help,call us,drop by anytime,happy to help,answering questions,customer service,support team,reach out,quick response,friendly support,enquiries welcome,here for you,contact bootcamps',
    openGraph: {
        title: "Contact SkillBNK For Support: Email, Chat, Or Call. We're Here To Help You Succeed!",
        description:
            'Get in touch with SkillBNK to explore how we enhance learning with daily activities. Contact us now!',
        url: 'https://www.bootcampshub.ai/contact',
        images: [
            {
                url: '/about-us/contact-us.png',
                width: 1200,
                height: 630,
                alt: 'Contact SkillBNK',
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.bootcampshub.ai/contact',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact SkillBNK For Support',
        description:
            'Get in touch with SkillBNK to explore how we enhance learning with daily activities. Contact us now!',
        images: ['/about-us/contact-us.png'],
    },
};

export default function Contact() {
    const clientUrl =
        process.env.NEXT_PUBLIC_CLIENT_URL || 'https://www.bootcampshub.ai';

    const breadcrumbSchema: WithContext<BreadcrumbList> = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Contact SkillBNK',
                item: 'https://www.bootcampshub.ai/contact',
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
            '@id': 'https://www.bootcampshub.ai/contact',
        },
        headline: 'Contact SkillBNK',
        description:
            'Get in touch with SkillBNK to explore how we enhance learning with daily activities. Contact us now!',
        image: 'https://www.bootcampshub.ai/multischool/new-folder/SchoolHubs-logo-final.png',
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

    const contactPageSchema: WithContext<ContactPage> = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.bootcampshub.ai/contact',
        },
        publisher: {
            '@type': 'LocalBusiness',
            '@id': 'https://www.bootcampshub.ai/',
            name: 'SkillBNK',
            logo: 'https://www.bootcampshub.ai/multischool/new-folder/SchoolHubs-logo-final.png',
            telephone: '+1 (586) 276-7347',
            email: 'hello@bootcampshub.ai',
            sameAs: [
                'https://www.linkedin.com/company/schools-hub/',
                'https://www.facebook.com/profile.php?id=61553006895822',
            ],
            url: 'https://www.bootcampshub.ai/',
            image: 'https://www.bootcampshub.ai/multischool/new-folder/SchoolHubs-logo-final.png',
            description:
                'SkillBNK offers a comprehensive set of features and benefits for educational institution, particularly those managing multiple schools under their company',
            address: {
                '@type': 'PostalAddress',
                streetAddress: '30500 Van Dyke Ave',
                addressLocality: 'Warren',
                addressRegion: 'Michigan',
                postalCode: '48093',
            },
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
                {...jsonLdScriptProps<ContactPage>(contactPageSchema)}
                type='application/ld+json'
            />

            <main>
                <ContactForm />
            </main>
        </>
    );
}
