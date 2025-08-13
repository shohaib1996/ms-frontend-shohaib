// This is a Server Component for Next.js App Router
import { Suspense } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import WhatWillLearn from '@/components/course/WhatWillLearn';
import Industry from '@/components/course/Industry';
import Opportunities from '@/components/course/Opportunities';
import SingleBootcampHero from '@/components/course/SingleBootcampHero';
import Role from '@/components/course/Role';
import BenefitsCourse from '@/components/course/BenefitsCourse';
import Recognition from '@/components/course/Recognition';
import ObtainCertification from '@/components/course/ObtainCertification';
import ClassDeliverBy from '@/components/course/ClassDeliverBy';
import JourneyForQuarter from '@/components/course/JourneyForQuater';
import CustomerReview from '@/components/course/CustomerReview';
import instance from '@/lib/axios';
import SingleFaqs from '@/components/course/SingleFaqs';
import CourseDescription from '@/components/course/Description';
import { ProgramsSection } from '@/components/company/ProgramsSection';
import CourseContent from '@/components/course/CourseContent';
import Requirements from '@/components/course/Requirements';
import { Metadata } from 'next';

/**
 * Helper function to replace shortcodes in string templates
 */

export const metadata: Metadata = {
    title: 'Explore Our Courses to Accelerate Career Growth and Skill Development',
    description:
        'Discover a wide range of expertly designed courses to help you achieve your career goals. Start learning today with SkillBNK!',
    keywords:
        'online courses,SkillBNK,career growth,skill development,student success,interactive learning,self-paced learning,ai powered education,job preparation,interview readiness,professional development,real-world skills,tech courses,personalized learning,career readiness,educational tools,edtech platform,flexible learning,industry-relevant skills,certification courses',
    openGraph: {
        title: 'Explore Our Courses - SkillBNK',
        description:
            'Discover a wide range of expertly designed courses to help you achieve your career goals. Start learning today with SkillBNK!',
        url: 'https://www.bootcampshub.ai/course',
        images: [
            {
                url: '/ai-images/final-ai-images/company-training-and-onboarding.jpg',
                width: 1200,
                height: 630,
                alt: 'Company Training and Onboarding',
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.bootcampshub.ai/course',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Explore Our Courses - SkillBNK',
        description:
            'Discover a wide range of expertly designed courses to help you achieve your career goals. Start learning today with SkillBNK!',
        images: [
            '/ai-images/final-ai-images/company-training-and-onboarding.jpg',
        ],
    },
};

function replaceShortcode(inputString: string, shortcode: any) {
    return inputString.replace(/{{(.*?)}}/g, (match, key) => {
        // Remove any additional whitespace from the key
        key = key.trim();

        // Check if the key starts with 'sc:'
        if (key.startsWith('sc:')) {
            // Return the replacement if the key exists in the shortcode object
            const value = shortcode[key];
            if (Array.isArray(value)) {
                return encodeURIComponent(JSON.stringify(value));
            } else if (value) {
                return value;
            }
        }

        // If no valid shortcode is found, return the original match
        return match;
    });
}

/**
 * Helper function to generate random number
 */
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

type SectionKey =
    | 'alumni'
    | 'whatYouLearn'
    | 'opportunities'
    | 'salary'
    | 'benefits'
    | 'recognition'
    | 'certificate'
    | 'instructurs'
    | 'roadmap'
    | 'reviews'
    | 'faqs';

export default async function ProgramDetails({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    try {
        // Fetch program data
        const courseRes = await instance.get(`/course/single/${slug}`);

        const program = courseRes.data.course;
        const roadmap = courseRes.data.roadmap;
        const studentCount = courseRes.data.studentCount;
        const totalDuration = courseRes.data.totalDuration;
        const review = courseRes.data.review;
        const totalLesson = courseRes.data.totalLesson;
        // Fetch page builder data if available
        let page = null;
        if (program?.pageBuilder) {
            const pageRes = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/organization/page/single/${program.pageBuilder}`,
            );
            page = pageRes.data.page;
        }

        // Create shortcode object for page builder
        const shortcode = {
            'sc:title': program?.title,
            'sc:short_details': program?.shortDetail,
            'sc:image': program?.image || '/placeholder2.jpg',
            'sc:review_average': 4.9,
            'sc:review_count': getRandomInt(100, 1000),
            'sc:student_count': studentCount,
            'sc:total_hour': totalDuration,
            'sc:last_update': dayjs(program?.updatedAt).format('DD-MM-YYYY'),
            'sc:language': program?.language,
            'sc:sale_price': program?.price?.cost.salePrice,
            'sc:slug': program?.slug,
            'sc:modules': [],
        };

        // Define all possible sections
        const allSections = (index: number) => {
            return {
                alumni: (program?.alumni?.title ||
                    program?.alumni?.images?.length > 0) && (
                    <Industry bootcamp={program} />
                ),
                whatYouLearn: program?.whatLearns?.length > 0 && (
                    <WhatWillLearn bootcamp={program} index={index} />
                ),
                opportunities: program?.opportunities && (
                    <Opportunities
                        opportunities={program?.opportunities}
                        index={index}
                    />
                ),
                courseContent: <CourseContent program={program} />,
                requirements: program?.requirements?.length > 0 && (
                    <Requirements requirements={program?.requirements} />
                ),
                salary: program?.salaryForThisRole && (
                    <Role data={program?.salaryForThisRole} index={index} />
                ),
                benefits: program?.benefits?.length > 0 && (
                    <BenefitsCourse
                        list={program?.benefits}
                        buttonShow={false}
                        title={'Benefits of the course'}
                        index={index}
                    />
                ),
                recognition: program?.recognition && (
                    <Recognition data={program?.recognition} index={index} />
                ),
                certificate: program?.obtainCertification && (
                    <ObtainCertification
                        obtainCertification={program?.obtainCertification}
                        index={index}
                    />
                ),
                instructurs: program?.instructors?.length > 0 && (
                    <ClassDeliverBy program={program} />
                ),
                roadmap: roadmap?.quarters?.length > 0 && (
                    <JourneyForQuarter program={program} />
                ),
                reviews: <CustomerReview id={program?._id} />,
                faqs: program?.faqs?.length > 0 && (
                    <SingleFaqs course={program} index={index} />
                ),
            };
        };

        return (
            <>
                {page ? (
                    <>
                        <style
                            dangerouslySetInnerHTML={{
                                __html: page?.data?.cssData,
                            }}
                        />
                        <div
                            dangerouslySetInnerHTML={{
                                __html: replaceShortcode(
                                    page?.data?.htmlData,
                                    shortcode,
                                ),
                            }}
                        />
                    </>
                ) : (
                    <>
                        <SingleBootcampHero
                            totalDuration={totalDuration}
                            studentCount={studentCount}
                            bootcamp={program}
                            course={program}
                            review={review}
                        />

                        <CourseDescription
                            totalLesson={totalLesson}
                            bootcamp={program}
                            studentCount={studentCount}
                            review={review}
                        />

                        {program?.layoutSections?.map(
                            (
                                section: { id: SectionKey; isVisible: boolean },
                                index: number,
                            ) => {
                                if (section?.isVisible) {
                                    return (
                                        <div key={section.id}>
                                            {allSections(index)?.[section.id]}
                                        </div>
                                    );
                                }
                                return null;
                            },
                        )}

                        <ProgramsSection company={program?.organization} />
                    </>
                )}
            </>
        );
    } catch (error) {
        console.error('Error fetching program details:', error);
        return (
            <div className='flex items-center justify-center min-h-[70vh] mt-[5%]'>
                {/* <Empty description="Program not found" /> */}
            </div>
        );
    }
}
