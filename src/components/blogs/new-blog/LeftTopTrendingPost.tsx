import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import { Eye } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

interface Blog {
    _id: string;
    title: string;
    slug: string;
    thumbnail?: string;
    createdBy: {
        _id: string;
        fullName: string;
        profilePicture?: string;
    };
    readCount: number;
    createdAt: string;
}

interface FetchArticlesOptions {
    page?: number;
    limit?: number;
    sort?: string;
}

function LeftTopTrendingPost() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [sort, setSort] = useState<string>('latest');
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(8);
    const [total, setTotal] = useState<number>(0);

    const fetchArticles = async (options: FetchArticlesOptions) => {
        setLoading(true);
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/blog/articles`,
                options,
            );
            setTotal(res?.data?.count);
            setBlogs(res?.data?.articles);
        } catch (err: any) {
            toast.error('Failed to load articles', {
                description:
                    err?.response?.data?.error || 'Something went wrong',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles({
            sort: sort,
            page: currentPage,
            limit: limit,
        });
    }, [sort, limit, currentPage]);

    const handleTabChange = (value: string) => {
        setSort(value === 'trending' ? 'latest' : 'top');
    };

    return (
        <Card className='mb-3'>
            <Separator className='mb-3' />

            <CardContent className='p-6 pt-3 '>
                <Tabs defaultValue='trending' onValueChange={handleTabChange}>
                    <TabsList className='w-full mb-3 '>
                        <TabsTrigger value='trending' className='flex-1'>
                            Trending Post
                        </TabsTrigger>
                        <TabsTrigger value='top' className='flex-1'>
                            Top Post
                        </TabsTrigger>
                    </TabsList>

                    <div className='px-0'>
                        {loading ? (
                            <div className='space-y-3'>
                                {Array(3)
                                    .fill(0)
                                    .map((_, index) => (
                                        <div
                                            key={index}
                                            className='flex space-x-3 border'
                                        >
                                            <Skeleton className='h-16 w-24 rounded-md' />
                                            <div className='space-y-2 flex-1'>
                                                <Skeleton className='h-4 w-full' />
                                                <Skeleton className='h-4 w-3/4' />
                                                <div className='flex justify-between'>
                                                    <Skeleton className='h-3 w-20' />
                                                    <Skeleton className='h-3 w-16' />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className='space-y-3'>
                                {blogs?.map((blog) => (
                                    <Link
                                        key={blog._id}
                                        href={`/blogs/${blog?.slug}`}
                                        className='flex items-start space-x-3 border p-3  rounded-md hover:bg-muted/50 transition-colors'
                                    >
                                        <div className='flex-shrink-0'>
                                            <Image
                                                src={
                                                    blog?.thumbnail ||
                                                    '/blogs/placeholder.jpg'
                                                }
                                                alt={blog.title}
                                                width={96}
                                                height={64}
                                                className='rounded-md object-cover h-16 w-24'
                                            />
                                        </div>

                                        <div className='flex flex-col justify-between flex-1 min-h-16'>
                                            <h3 className='text-sm font-medium line-clamp-2'>
                                                {blog?.title}
                                            </h3>

                                            <div className='flex justify-between items-center mt-2'>
                                                <div className='flex items-center gap-1.5'>
                                                    <Avatar className='h-5 w-5 border border-primary'>
                                                        <AvatarImage
                                                            src={
                                                                blog?.createdBy
                                                                    ?.profilePicture
                                                            }
                                                            alt={
                                                                blog?.createdBy
                                                                    ?.fullName
                                                            }
                                                        />
                                                        <AvatarFallback className='text-xs'>
                                                            {blog?.createdBy?.fullName?.charAt(
                                                                0,
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className='text-xs text-muted-foreground'>
                                                        {
                                                            blog?.createdBy
                                                                ?.fullName
                                                        }
                                                    </span>
                                                </div>

                                                <div className='flex items-center text-xs text-muted-foreground gap-1'>
                                                    <Eye className='h-3 w-3' />
                                                    <span>
                                                        {blog?.readCount} Views
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
}

export default LeftTopTrendingPost;
