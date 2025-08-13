'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import MessagePreview from '../global/MarkdownPreview';
import {
    PlayCircle,
    PenSquare,
    ClipboardList,
    Star,
    BookOpen,
    Users,
    Award,
    BadgeIcon as Certificate,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import instance from '@/lib/axios';
import { toast } from 'sonner';
import { useAppSelector } from '@/store';

interface Instructor {
    name: string;
    [key: string]: any;
}

interface Price {
    isFree: boolean;
    cost: {
        price: number;
        salePrice: number;
    };
}

interface Bootcamp {
    _id: string;
    title: string;
    description?: string;
    image?: string;
    price: Price;
    instructor?: Instructor;
    type?: 'program' | 'course' | 'interview' | 'professional-service';
    slug?: string;
    [key: string]: any;
}

interface Review {
    averageStarCount?: number;
    totalReviews?: number;
}

interface User {
    _id: string;
    [key: string]: any;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

interface DescriptionProps {
    bootcamp: Bootcamp;
    studentCount?: number;
    review?: Review;
    totalLesson?: number;
    className?: string;
}

const CourseDescription: React.FC<DescriptionProps> = ({
    bootcamp,
    studentCount = 0,
    review = { averageStarCount: 0, totalReviews: 0 },
    totalLesson = 0,
    className,
}) => {
    const [showMore, setShowMore] = useState(false);
    const router = useRouter();
    const [description, setDescription] = useState(
        bootcamp?.description?.slice(0, 1000) || '',
    );

    const toggleDescription = () => {
        setDescription(
            !showMore
                ? bootcamp.description || ''
                : bootcamp.description?.slice(0, 1000) || '',
        );
        setShowMore(!showMore);
    };

    const { user } = useAppSelector((s) => s.auth);

    const enrollNow = async (course: Bootcamp) => {
        // if (course.type === 'program' && course.slug) {
        // }
        router.push(`/enroll/${course.slug}`);
        return;

        // try {
        //     await instance.post('/order/create', { course: course._id });

        //     if (course.type === 'course') {
        //         router.push(
        //             `${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/program/my-purchased-items`,
        //         );
        //     } else if (course.type === 'interview') {
        //         router.push(
        //             `${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/program/my-purchased-items`,
        //         );
        //     } else if (course.type === 'professional-service') {
        //         router.push(
        //             `${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/program/my-purchased-items`,
        //         );
        //     }

        //     toast.success('Ordered Successfully');
        // } catch (err: any) {
        //     console.error(err);
        //     toast.error(err?.response?.data?.error || 'Something went wrong');
        // }
    };

    return (
        <section className={cn('py-6 bg-teal-50 dark:bg-teal-950', className)}>
            <div className='my-container'>
                <div className='grid lg:grid-cols-3 gap-10'>
                    {/* Description Column */}
                    <div className='lg:col-span-2'>
                        <div className='mb-3'>
                            <h2 className='text-3xl font-bold text-black'>
                                Description
                            </h2>
                        </div>

                        {bootcamp?.description ? (
                            <div className='space-y-4'>
                                <div
                                    className={cn(
                                        'prose text-dark-gray prose-slate max-w-none',
                                        !showMore && 'line-clamp-4',
                                    )}
                                >
                                    <MessagePreview text={description} />
                                </div>

                                {bootcamp.description.length > 1000 && (
                                    <Button
                                        variant='ghost'
                                        onClick={toggleDescription}
                                        className='text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 flex items-center gap-1'
                                    >
                                        {showMore ? (
                                            <>
                                                See Less
                                                <ChevronUp className='h-4 w-4' />
                                            </>
                                        ) : (
                                            <>
                                                See More
                                                <ChevronDown className='h-4 w-4' />
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <p className='text-gray italic'>
                                No description available
                            </p>
                        )}
                    </div>

                    {/* Course Preview Card */}
                    <div className='lg:col-span-1'>
                        <div className='bg-foreground rounded-xl shadow-md border border-forground-border overflow-hidden'>
                            {/* Price Section */}
                            <div className='bg-primary p-6 text-pure-white'>
                                <div className='flex items-center justify-between'>
                                    <h3 className='text-lg font-medium'>
                                        Course Price
                                    </h3>
                                    <div className='text-right'>
                                        {bootcamp.price.isFree ? (
                                            <Badge className='bg-white text-emerald-600 hover:bg-slate-100'>
                                                Free
                                            </Badge>
                                        ) : bootcamp.price.cost.salePrice >
                                          0 ? (
                                            <div className='flex flex-col items-end'>
                                                <span className='text-2xl font-bold'>
                                                    $
                                                    {
                                                        bootcamp.price.cost
                                                            .salePrice
                                                    }
                                                </span>
                                                <span className='text-sm line-through opacity-75'>
                                                    ${bootcamp.price.cost.price}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className='text-2xl font-bold'>
                                                ${bootcamp.price.cost.price}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Course Features */}
                            <div className='p-3'>
                                <h3 className='font-semibold text-dark-gray mb-2'>
                                    This Course Includes:
                                </h3>

                                <div className='space-y-3'>
                                    <div className='flex items-center gap-3'>
                                        <PlayCircle className='h-5 w-5 text-primary-white' />
                                        <span className='text-dark-gray'>
                                            100+ hours Lectures
                                        </span>
                                    </div>

                                    <div className='flex items-center gap-3'>
                                        <PenSquare className='h-5 w-5 text-primary-white' />
                                        <span className='text-dark-gray'>
                                            Instructor:{' '}
                                            <span className='font-medium'>
                                                {bootcamp?.instructor?.name ||
                                                    'N/A'}
                                            </span>
                                        </span>
                                    </div>

                                    <div className='flex items-center gap-3'>
                                        <ClipboardList className='h-5 w-5 text-primary-white' />
                                        <span className='text-dark-gray'>
                                            Assignment (300+)
                                        </span>
                                    </div>

                                    <div className='flex items-center gap-3'>
                                        <Star className='h-5 w-5 text-primary-white' />
                                        <span className='text-dark-gray'>
                                            Rating ({review?.totalReviews || 0})
                                        </span>
                                    </div>

                                    <div className='flex items-center gap-3'>
                                        <BookOpen className='h-5 w-5 text-primary-white' />
                                        <span className='text-dark-gray'>
                                            Lesson ({totalLesson})
                                        </span>
                                    </div>

                                    <div className='flex items-center gap-3'>
                                        <Users className='h-5 w-5 text-primary-white' />
                                        <span className='text-dark-gray'>
                                            Student ({studentCount})
                                        </span>
                                    </div>

                                    <div className='flex items-center gap-3'>
                                        <Award className='h-5 w-5 text-primary-white' />
                                        <span className='text-dark-gray'>
                                            Lifetime Access
                                        </span>
                                    </div>

                                    <div className='flex items-center gap-3'>
                                        <Certificate className='h-5 w-5 text-primary-white' />
                                        <span className='text-dark-gray'>
                                            Certificate of completion
                                        </span>
                                    </div>
                                </div>

                                <div className='mt-3 space-y-2'>
                                    {!user?._id ? (
                                        <Button
                                            className='w-full'
                                            onClick={() =>
                                                router.push(
                                                    `/auth/login?callback=${window.location.pathname}`,
                                                )
                                            }
                                        >
                                            Enroll Now
                                        </Button>
                                    ) : (
                                        <Button
                                            className='w-full'
                                            onClick={() => enrollNow(bootcamp)}
                                        >
                                            Enroll Now
                                        </Button>
                                    )}

                                    <Button
                                        variant='primary_light'
                                        className='w-full'
                                        onClick={() =>
                                            router.push(
                                                `/enrollment-test/${bootcamp?._id}`,
                                            )
                                        }
                                    >
                                        Take Enrollment Test
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseDescription;
