'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Clock, Calendar, AlertCircle } from 'lucide-react';
import instance from '@/lib/axios';
import { Rating } from '@smastrom/react-rating';
import GlobalTooltip from '../global/GlobalTooltip';

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface ReviewUser {
    fullName?: string;
    profilePicture?: string;
}

interface Review {
    _id: string;
    starCount: number;
    text: string;
    videoUrl?: string;
    createdAt: string;
    user?: ReviewUser;
    reviewedBy?: ReviewUser;
}

interface Category {
    name: string;
    count?: number;
}

interface CustomerReviewProps {
    id: string;
    className?: string;
}

const CustomerReview: React.FC<CustomerReviewProps> = ({ id, className }) => {
    const [reviewsData, setReviewsData] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (options: any) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await instance.get(`/course/review/get/${id}`, {
                params: options,
            });

            if (res?.data?.categories) {
                setCategories(res?.data?.categories);
            }

            setReviewsData(res?.data?.reviews || []);
            setCategory(res?.data?.category || '');
            setTotalPages(Math.ceil((res?.data?.count || 0) / 10));
        } catch (err) {
            console.error(err);
            setError('Failed to load reviews. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCategoryChange = (categoryName: string) => {
        setCategory(categoryName);
        setCurrentPage(1);
        fetchData({
            fields: ['reviews'],
            page: 1,
            limit: 3,
            category: categoryName,
        });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchData({
            fields: ['reviews'],
            page,
            limit: 3,
            category,
        });
    };

    useEffect(() => {
        fetchData({
            fields: ['categories', 'reviews'],
            page: 1,
            limit: 10,
            category: '',
        });
    }, [id]);

    return (
        <section
            className={cn(
                'py-6 bg-gradient-to-r dark:from-gray-950 dark:to-emerald-950 from-gray-50 to-emerald-50',
                className,
            )}
        >
            <div className='container mx-auto px-4 md:px-6'>
                <div className='text-center mb-4'>
                    <h2 className='text-3xl md:text-4xl font-bold text-black mb-2'>
                        Student Reviews
                    </h2>
                    <div className='w-20 h-1 bg-emerald-500 mx-auto rounded-full'></div>
                </div>

                {categories.length > 0 && (
                    <div className='flex flex-wrap justify-center gap-2 mb-8'>
                        {categories.map((cat, index) => (
                            <Button
                                key={index}
                                variant={
                                    category === cat.name
                                        ? 'default'
                                        : 'outline'
                                }
                                size='sm'
                                onClick={() => handleCategoryChange(cat.name)}
                                className={
                                    category === cat.name
                                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                        : 'border-emerald-200 hover:bg-emerald-50 text-emerald-700'
                                }
                            >
                                {cat.name}
                                {cat.count && (
                                    <span className='ml-1 text-xs'>
                                        ({cat.count})
                                    </span>
                                )}
                            </Button>
                        ))}
                    </div>
                )}

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {isLoading ? (
                        // Loading skeletons
                        Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className='bg-foreground rounded-xl shadow-sm p-4 space-y-4 border border-foreground'
                            >
                                <div className='flex justify-between items-start'>
                                    <div className='flex items-center gap-3'>
                                        <Skeleton className='h-12 bg-background w-12 rounded-full' />
                                        <Skeleton className='h-6 bg-background w-32' />
                                    </div>
                                    <Skeleton className='h-4 bg-background w-20' />
                                </div>
                                <Skeleton className='h-4 bg-background w-32' />
                                <Skeleton className='h-20 bg-background w-full' />
                            </div>
                        ))
                    ) : error ? (
                        <div className='flex flex-col items-center justify-center py-12 text-center col-span-full'>
                            <AlertCircle className='h-12 w-12 text-red-500 mb-4' />
                            <p className='text-gray'>{error}</p>
                        </div>
                    ) : reviewsData.length === 0 ? (
                        <div className='flex flex-col items-center justify-center py-12 text-center col-span-full'>
                            <Star className='h-12 w-12 text-slate-300 mb-4' />
                            <p className='text-gray'>
                                No reviews available for this course yet.
                            </p>
                        </div>
                    ) : (
                        reviewsData.map((review) => (
                            <div
                                key={review._id}
                                className='bg-foreground rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full border border-forground-border hover:border-violet-400/35 hover:translate-y-[-2px]'
                            >
                                <div className='p-5'>
                                    <div className='flex justify-between items-start mb-3'>
                                        <div className='flex items-center gap-3'>
                                            <div className='relative h-12 w-12 rounded-full overflow-hidden border-2 border-emerald-100'>
                                                <Image
                                                    src={
                                                        review?.user
                                                            ?.profilePicture ||
                                                        review?.reviewedBy
                                                            ?.profilePicture ||
                                                        '/avatar.png'
                                                    }
                                                    alt={
                                                        review?.user
                                                            ?.fullName ||
                                                        review?.reviewedBy
                                                            ?.fullName ||
                                                        'User'
                                                    }
                                                    fill
                                                    className='object-cover'
                                                />
                                            </div>
                                            <div>
                                                <h3 className='font-medium text-dark-gray'>
                                                    {review?.user?.fullName ||
                                                        review?.reviewedBy
                                                            ?.fullName ||
                                                        'Anonymous User'}
                                                </h3>
                                                <div className='flex items-center mt-1'>
                                                    <Rating
                                                        radius='large'
                                                        readOnly
                                                        style={{
                                                            maxWidth: 120,
                                                        }}
                                                        value={
                                                            review?.starCount
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-center text-sm text-gray'>
                                            <Clock className='w-3.5 h-3.5 mr-1' />
                                            <span>
                                                {moment(
                                                    review.createdAt,
                                                ).fromNow()}
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            review.videoUrl
                                                ? 'grid md:grid-cols-2 gap-4'
                                                : ''
                                        }
                                    >
                                        <div className='space-y-2'>
                                            <div className='flex items-center text-sm text-gray mb-1'>
                                                <Calendar className='w-3.5 h-3.5 mr-1' />
                                                <span>
                                                    {moment(
                                                        review.createdAt,
                                                    ).format('LL')}
                                                </span>
                                            </div>
                                            <GlobalTooltip
                                                className='max-w-60'
                                                tooltip={review?.text}
                                            >
                                                <p className='text-dark-gray line-clamp-3 italic'>
                                                    {review?.text}
                                                </p>
                                            </GlobalTooltip>
                                        </div>

                                        {review.videoUrl && (
                                            <div className='aspect-video rounded-lg overflow-hidden bg-slate-100'>
                                                <ReactPlayer
                                                    url={review.videoUrl}
                                                    controls
                                                    width='100%'
                                                    height='100%'
                                                    className='react-player'
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {totalPages > 1 && (
                    <div className='flex justify-center mt-8'>
                        <div className='flex gap-1'>
                            {Array.from({ length: totalPages }).map(
                                (_, index) => (
                                    <Button
                                        key={index}
                                        variant={
                                            currentPage === index + 1
                                                ? 'default'
                                                : 'outline'
                                        }
                                        size='sm'
                                        onClick={() =>
                                            handlePageChange(index + 1)
                                        }
                                        className={
                                            currentPage === index + 1
                                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white w-9 h-9 p-0'
                                                : 'border-emerald-200 hover:bg-emerald-50 text-emerald-700 w-9 h-9 p-0'
                                        }
                                    >
                                        {index + 1}
                                    </Button>
                                ),
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CustomerReview;
