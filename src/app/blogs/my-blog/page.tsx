import MyBlogPage from '@/components/blogs/my-blogs/MyBlogs';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'My Blog - SkillBNK | Insights, Stories & Innovation in EdTech',
    description:
        'Welcome to My Blog by SkillBNK – your go-to source for insights, updates, and stories driving educational innovation and student success.',
    keywords:
        'SkillBNK my blog,edtech blog,education innovation,student stories,learning insights,education technology updates,elearning blog,SkillBNK articles,modern learning tools,student success,school transformation,teaching trends,my blog bootcampshub,education stories',
    openGraph: {
        title: 'My Blog - SkillBNK',
        description:
            'Explore My Blog for the latest in educational trends, innovation, and student-centered stories from SkillBNK.',
        url: 'https://www.bootcampshub.ai/my-blog',
        images: [
            {
                url: '/IT-courses/it-course-hero.svg',
                width: 1200,
                height: 630,
                alt: 'SkillBNK - My Blog',
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.bootcampshub.ai/my-blog',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'My Blog - SkillBNK',
        description:
            'Discover stories, insights, and EdTech updates on My Blog by SkillBNK. Join the learning revolution.',
        images: ['/IT-courses/it-course-hero.svg'],
    },
};

const MyBlogsPage = () => {
    return (
        <>
            <MyBlogPage />
        </>
    );
};

export default MyBlogsPage;
