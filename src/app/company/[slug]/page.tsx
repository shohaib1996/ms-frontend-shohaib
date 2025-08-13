import React from 'react';
import axios from 'axios';

import { HeroSection } from '@/components/company/HeroSection';
import { StatsOverview } from '@/components/company/StatsOverview';
import { AboutSection } from '@/components/company/AboutSection';
import { ProgramsSection } from '@/components/company/ProgramsSection';
import { AnalyticsSection } from '@/components/company/AnalyticsSection';
import { DocumentsAccreditationSection } from '@/components/company/DocumentsAccreditationSection';
import { InstructorsSection } from '@/components/company/InstructorsSection';
import { TestimonialsSection } from '@/components/company/TestimonialsSection';
import { ContactSection } from '@/components/company/ContactSection';
import {
    // accreditationData,
    COLORS,
    courseCompletionData,
    coursesData,
    documentsData,
    // enrollmentData,
    instructorsData,
    programsData,
} from '@/components/company/organizationData';

// export { generateMetadata }
import { Metadata } from 'next';
import { FAQSection } from '@/components/company/FAQSection';
import { CareerSuccessStories } from '@/components/company/CareerSuccessStories';
import { LearningMethodology } from '@/components/company/LearningMethodology';
import { NewsletterSection } from '@/components/company/NewsletterSection';
import { CourseRoadmap } from '@/components/company/CourseRoadmap';
import { BackToTopButton } from '@/components/company/BackToTopButton';

export const metadata: Metadata = {
    title: 'Company - SkillBNK | Empowering Education with Innovative Solutions',
    description:
        'Explore the details of the company at SkillBNK. Learn about our impact, educational programs, and how we empower students through innovative tools and solutions.',
    keywords:
        'SkillBNK, company profile, education innovation, edtech solutions, student success, educational programs, courses, enrollment, accreditation, instructors, education revolution, edtech company, empowerment through education',
    openGraph: {
        title: 'Company - SkillBNK',
        description:
            'Explore the details of the company at SkillBNK. Learn about our impact, educational programs, and how we empower students through innovative tools and solutions.',
        url: 'https://www.bootcampshub.ai/company',
        images: [
            {
                url: '/company-image.jpg', // Replace with your desired image
                width: 1200,
                height: 630,
                alt: 'Company - SkillBNK',
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.bootcampshub.ai/company',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Company - SkillBNK',
        description:
            'Learn more about SkillBNK, our impact on education, and the innovative solutions we provide to empower students.',
        images: ['/company-image.jpg'], // Replace with your desired image
    },
};

async function getCompanyData(slug: string) {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/organization/details/${slug}`,
        );

        console.log('reviews: ', res?.data);
        // console.log('socialLinks: ', res?.data?.company?.data?.socialLinks);
        // console.log('data', res?.data?.company);

        return {
            company: res?.data?.company,
            studentCount: res?.data?.studentCount,
            instructorCount: res?.data?.instructors?.length,
            reviewsCount: res?.data?.reviews?.length,
            branches: res?.data?.branches,
            programCount: res?.data?.totalProgram,
            instructors: res?.data?.instructors || [],
            faqs: res?.data?.company?.pageData?.faqs || [],
            documents: res?.data?.company?.pageData?.documents || [],
            accreditations: res?.data?.company?.pageData?.accreditations || [],
            successStories: res?.data?.company?.pageData?.successStories || [],
            methodology: res?.data?.company?.pageData?.methodology || [],
            enrollmentData: res?.data?.monthlyEnrollment,
            socialLinks: res?.data?.company?.data?.socialLinks,
            reviews: res.data?.reviews || [],
            address: res.data?.company?.data?.address || null,
            error: null,
        };
    } catch (error: any) {
        console.error(error);
        // Access specific error message from axios response if available
        const errorMessage =
            error?.response?.data?.error ||
            'Failed to fetch company data. Please try again later.';
        return {
            company: null,
            studentCount: 0,
            instructorCount: 0,
            reviewsCount: 0,
            branches: [],
            programCount: 0,
            instructors: [],
            documents: [],
            accreditations: [],
            successStories: [],
            methodology: [],
            faqs: [],
            reviews: [],
            enrollmentData: [],
            socialLinks: {},
            address: null,
            error: errorMessage,
        };
    }
}

const CompanyPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    const normalizedSlug =
        slug !== slug.toLowerCase() ? slug.toLowerCase() : slug;
    const {
        company,
        studentCount,
        programCount,
        instructors,
        address,
        branches,
        reviews,
        documents,
        accreditations,
        successStories,
        methodology,
        enrollmentData,
        instructorCount,
        reviewsCount,
        socialLinks,
        faqs,
        error,
    } = await getCompanyData(normalizedSlug);

    if (error || !company) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50'>
                <div className='bg-white p-8 rounded-xl shadow-md max-w-lg w-full text-center'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-16 w-16 text-red-500 mx-auto mb-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                        />
                    </svg>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                        Error Loading Company
                    </h2>
                    <p className='text-gray-600 mb-6'>
                        {error ||
                            'Company information could not be found. Please check the URL and try again.'}
                    </p>
                    <a
                        href='/'
                        className='inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors'
                    >
                        Return to Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div>
            <HeroSection
                organization={company}
                totalStudents={studentCount}
                totalInstructors={instructorCount || 0}
                totalReviews={reviewsCount || 0}
                totalPrograms={programCount}
                totalBranches={branches?.length || 0}
            />
            {/* <StatsOverview /> */}
            {/* <AboutSection organization={company} address={address} socialLinks={socialLinks} /> */}
            <ProgramsSection company={company} branches={branches} />
            {/* <AnalyticsSection
                enrollmentData={enrollmentData}
                courseCompletionData={courseCompletionData}
                colors={COLORS}
            /> */}
            <DocumentsAccreditationSection
                accreditationData={accreditations}
                documentsData={documents}
            />
            <InstructorsSection instructorsData={instructors} />
            <TestimonialsSection reviews={reviews} />
            <FAQSection faqsData={faqs} />
            <CareerSuccessStories successStories={successStories} />
            <LearningMethodology methodology={methodology} />
            <AboutSection
                organization={company}
                address={address}
                socialLinks={socialLinks}
            />
            {/* <CourseRoadmap /> */}
            <NewsletterSection />
            {/* <ContactSection organization={company} /> */}
            <BackToTopButton />
        </div>
    );
};

export default CompanyPage;
