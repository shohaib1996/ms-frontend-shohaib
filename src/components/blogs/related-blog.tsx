'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Eye } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface Blog {
    _id: string;
    title: string;
    slug: string;
    thumbnail?: string;
    readCount: number;
    createdBy: {
        _id: string;
        fullName: string;
        profilePicture?: string;
    };
}

export default function RelatedBlog() {
    // Get the singleBlogCategory from Redux store
    const { singleBlogCategory } = useSelector((state: any) => state.blog);

    // State
    const [posts, setPosts] = useState<Blog[]>([]);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    // Fetch related articles
    const fetchArticles = (options: any) => {
        setIsLoading(true);
        axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/blog/articles`, options)
            .then((res) => {
                setPosts(res.data.articles);
                setTotal(res.data.count);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.error('Error fetching related blogs:', err);
                toast.error('Failed to load related blogs');
            });
    };

    // Fetch related blogs when singleBlogCategory changes
    useEffect(() => {
        if (singleBlogCategory) {
            fetchArticles({
                page: currentPage,
                limit,
                relatedId: singleBlogCategory,
                category: '',
                sort: 'latest',
                query: '',
                author: '',
            });
        }
    }, [singleBlogCategory, currentPage, limit]);

    // Calculate total pages for pagination
    const totalPages = Math.ceil(total / limit);

    return (
        <div className='space-y-4'>
            <Separator className='my-6' />

            <h3 className='text-xl font-semibold mb-4 text-black'>
                Related Blogs
            </h3>

            {isLoading ? (
                <div className='space-y-4'>
                    {[...Array(3)].map((_, i) => (
                        <Card key={i} className='overflow-hidden'>
                            <CardContent className='p-0'>
                                <div className='flex animate-pulse'>
                                    <div className='w-[100px] h-[100px] bg-muted'></div>
                                    <div className='p-3 flex-1'>
                                        <div className='h-4 bg-muted rounded w-3/4 mb-2'></div>
                                        <div className='h-4 bg-muted rounded w-1/2'></div>
                                        <div className='mt-4 flex justify-between'>
                                            <div className='h-6 bg-muted rounded w-1/3'></div>
                                            <div className='h-6 bg-muted rounded w-1/4'></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : posts.length === 0 ? (
                <Card>
                    <CardContent className='p-6 text-center text-muted-foreground'>
                        No related blogs found
                    </CardContent>
                </Card>
            ) : (
                <div className='space-y-3'>
                    {posts.map((blog) => (
                        <Link
                            key={blog._id}
                            href={`/blogs/${blog.slug}`}
                            className='block'
                        >
                            <Card className='overflow-hidden hover:shadow-md transition-shadow'>
                                <CardContent className='p-0'>
                                    <div className='flex'>
                                        <div className='relative w-[100px] h-[100px]'>
                                            <Image
                                                src={
                                                    blog.thumbnail ||
                                                    '/blogs/placeholder.jpg'
                                                }
                                                alt={blog.title}
                                                fill
                                                className='object-cover'
                                            />
                                        </div>

                                        <div className='p-3 flex flex-col justify-between flex-1'>
                                            <h4 className='font-medium line-clamp-2 text-sm'>
                                                {blog.title}
                                            </h4>

                                            <div className='flex justify-between items-center mt-2'>
                                                <div className='flex items-center gap-2'>
                                                    <Avatar className='h-6 w-6 border border-primary/20'>
                                                        <AvatarImage
                                                            src={
                                                                blog.createdBy
                                                                    ?.profilePicture ||
                                                                '/author.png'
                                                            }
                                                            alt={
                                                                blog.createdBy
                                                                    ?.fullName
                                                            }
                                                        />
                                                        <AvatarFallback>
                                                            {blog.createdBy?.fullName?.charAt(
                                                                0,
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className='text-xs text-muted-foreground'>
                                                        {
                                                            blog.createdBy
                                                                ?.fullName
                                                        }
                                                    </span>
                                                </div>

                                                <Badge
                                                    variant='outline'
                                                    className='flex items-center gap-1 text-xs'
                                                >
                                                    <Eye className='h-3 w-3' />
                                                    <span>
                                                        {blog.readCount || 0}
                                                    </span>
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination className='mt-4'>
                    <PaginationContent>
                        {currentPage > 1 && (
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                    className='cursor-pointer'
                                />
                            </PaginationItem>
                        )}

                        {[...Array(totalPages)].map((_, i) => {
                            const page = i + 1;
                            // Show first page, last page, and pages around current page
                            if (
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 1 &&
                                    page <= currentPage + 1)
                            ) {
                                return (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            isActive={page === currentPage}
                                            onClick={() => setCurrentPage(page)}
                                            className='cursor-pointer'
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            }

                            // Show ellipsis for skipped pages
                            if (page === 2 || page === totalPages - 1) {
                                return (
                                    <PaginationItem key={`ellipsis-${page}`}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }

                            return null;
                        })}

                        {currentPage < totalPages && (
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
                                    className='cursor-pointer'
                                />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}
