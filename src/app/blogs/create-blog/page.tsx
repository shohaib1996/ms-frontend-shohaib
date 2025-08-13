import React from 'react';
import CreateNewBlogComp from './CreateBlogComp';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Blog - SkillBNK | Publish Your Insights and Ideas',
    description:
        'Start creating your blog on SkillBNK. Share your educational insights, trends in EdTech, and inspiring stories with the world.',
    keywords:
        'create blog,SkillBNK create blog,blog creation,education blog,publish blog,edtech stories,create content,write for SkillBNK,edtech content,education writing,share your knowledge',
    openGraph: {
        title: 'Create Blog - SkillBNK',
        description:
            'Start creating your blog on SkillBNK. Share your educational insights, trends in EdTech, and inspiring stories with the world.',
        url: 'https://www.bootcampshub.ai/blogs/create-blog',
        images: [
            {
                url: '/IT-courses/it-course-hero.svg',
                width: 1200,
                height: 630,
                alt: 'Create Blog - SkillBNK',
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.bootcampshub.ai/blogs/create-blog',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Create Blog - SkillBNK',
        description:
            'Start creating your blog on SkillBNK. Share your educational insights, trends in EdTech, and inspiring stories with the world.',
        images: ['/IT-courses/it-course-hero.svg'],
    },
};

const page = () => {
    return (
        <>
            <CreateNewBlogComp />
        </>
    );
};

export default page;
