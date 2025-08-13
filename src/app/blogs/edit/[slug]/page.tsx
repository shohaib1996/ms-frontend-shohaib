import React from 'react';
import EditBlogComp from './EditBlogComp';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit Blog - SkillBNK | Update Your EdTech Insights',
    description:
        'Edit your blog on SkillBNK. Update your educational insights, EdTech trends, and inspiring stories to keep your content fresh.',
    keywords:
        'edit blog,SkillBNK edit blog,update blog,education blog,edit content,edtech updates,education writing,blog management,write for SkillBNK',
    openGraph: {
        title: 'Edit Blog - SkillBNK',
        description:
            'Edit your blog on SkillBNK. Update your educational insights, EdTech trends, and inspiring stories to keep your content fresh.',
        url: 'https://www.bootcampshub.ai/blogs/edit-blog',
        images: [
            {
                url: '/IT-courses/it-course-hero.svg',
                width: 1200,
                height: 630,
                alt: 'Edit Blog - SkillBNK',
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.bootcampshub.ai/blogs/edit-blog',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Edit Blog - SkillBNK',
        description:
            'Edit your blog on SkillBNK. Update your educational insights, EdTech trends, and inspiring stories to keep your content fresh.',
        images: ['/IT-courses/it-course-hero.svg'],
    },
};

const EditBlogPage = () => {
    return (
        <>
            <EditBlogComp />
        </>
    );
};

export default EditBlogPage;
