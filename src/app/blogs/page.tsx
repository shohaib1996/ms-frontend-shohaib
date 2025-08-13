import BlogsComponent from '@/components/blogs/BlogsComp';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'Blogs - SkillBNK | Explore EdTech Stories, Tips & Updates',
    description:
        'Dive into our collection of blogs at SkillBNK. Discover powerful stories, educational insights, and the latest trends in EdTech that inspire change.',
    keywords:
        'SkillBNK blogs,edtech blogs,education technology,student success stories,learning tips,education trends,elearning,teaching tools,edtech updates,education blog,school innovation,SkillBNK stories,transforming education,edtech content',
    openGraph: {
        title: 'Blogs - SkillBNK',
        description:
            'Explore the latest blogs from SkillBNK. Stay ahead with EdTech updates, educational strategies, and student-centered stories.',
        url: 'https://www.bootcampshub.ai/blogs',
        images: [
            {
                url: '/IT-courses/it-course-hero.svg',
                width: 1200,
                height: 630,
                alt: 'SkillBNK - Blogs',
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.bootcampshub.ai/blogs',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blogs - SkillBNK',
        description:
            'Stay informed with the latest from SkillBNK blogs. Get inspired by EdTech stories, innovations, and learning tips.',
        images: ['/IT-courses/it-course-hero.svg'],
    },
};

const BlogPage = () => {
    return (
        <div>
            <BlogsComponent />
        </div>
    );
};

export default BlogPage;
