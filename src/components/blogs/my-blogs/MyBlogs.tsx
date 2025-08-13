'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import dynamic from 'next/dynamic';
import { Search, PlusCircle } from 'lucide-react';
import { SpinnerCircularFixed } from 'spinners-react';
import { motion } from 'framer-motion';

// shadcn imports
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

// Local components
import LeftUserMenu from '@/components/blogs/new-blog/LeftUserMenu';
import TagsComponent from '@/components/blogs/new-blog/TagsComponent';
import DropDownMenu from '@/components/blogs/new-blog/DropDownMenu';
// Import useSearchParams instead of useRouter for accessing query params
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

// Dynamic imports
const NewBlogCard = dynamic(
    () => import('@/components/blogs/new-blog/NewBlogCard'),
    {
        ssr: true,
    },
);

// Empty placeholder component
const EmptyPlaceholder = ({ children }: { children: React.ReactNode }) => (
    <div className='flex flex-col items-center justify-center text-center p-8 rounded-lg border border-dashed'>
        {children}
    </div>
);

const EmptyPlaceholderIcon = ({ name }: { name: string }) => {
    return (
        <div className='p-3 rounded-full bg-muted'>
            {name === 'post' && (
                <Search className='h-6 w-6 text-muted-foreground' />
            )}
        </div>
    );
};

const EmptyPlaceholderTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className='mt-4 text-lg font-semibold'>{children}</h3>
);

const EmptyPlaceholderDescription = ({
    children,
}: {
    children: React.ReactNode;
}) => <p className='mt-2 text-sm text-muted-foreground'>{children}</p>;

// Types
interface Post {
    id: string;
    title: string;
    content: string;
    author: {
        id: string;
        name: string;
    };
}

interface Tag {
    id: string;
    name: string;
}

interface Category {
    _id: string;
    name: string;
}

interface FetchArticlesOptions {
    page: number;
    limit: number;
    sort?: string;
    category?: string;
    query?: string;
    tag?: string;
    author?: string;
}

// Custom pagination component using shadcn
const CustomPagination = ({
    currentPage,
    totalPages,
    onPageChange,
    variant = 'default',
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    variant?: 'default' | 'minimal' | 'rounded';
}) => {
    const displayPages = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={() => onPageChange(i)}
                            className={cn(
                                'transition-all duration-200 hover:scale-110 list-none ',
                                getPageItemStyles(i === currentPage, variant),
                            )}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>,
                );
            }
        } else {
            pages.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        onClick={() => onPageChange(1)}
                        className={cn(
                            'transition-all duration-200 hover:scale-110 list-none',
                            getPageItemStyles(currentPage === 1, variant),
                        )}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>,
            );

            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            if (startPage === 2) {
                endPage = Math.min(4, totalPages - 1);
            }
            if (endPage === totalPages - 1) {
                startPage = Math.max(2, totalPages - 3);
            }

            if (startPage > 2) {
                pages.push(
                    <PaginationItem key='ellipsis-start list-none'>
                        <PaginationEllipsis className='text-muted-foreground/70' />
                    </PaginationItem>,
                );
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={() => onPageChange(i)}
                            className={cn(
                                'transition-all duration-200 hover:scale-110',
                                getPageItemStyles(i === currentPage, variant),
                            )}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>,
                );
            }

            if (endPage < totalPages - 1) {
                pages.push(
                    <PaginationItem key='ellipsis-end'>
                        <PaginationEllipsis className='text-muted-foreground/70' />
                    </PaginationItem>,
                );
            }

            pages.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        onClick={() => onPageChange(totalPages)}
                        className={cn(
                            'transition-all duration-200 hover:scale-110',
                            getPageItemStyles(
                                currentPage === totalPages,
                                variant,
                            ),
                        )}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        return pages;
    };

    const getPageItemStyles = (isActive: boolean, variant: string) => {
        if (isActive) {
            switch (variant) {
                case 'minimal':
                    return 'bg-primary/10 text-primary font-bold border-b-2 border-primary';
                case 'rounded':
                    return 'bg-primary text-primary-foreground font-medium rounded-full shadow-md';
                default:
                    return 'bg-primary text-primary-foreground font-medium shadow-md';
            }
        }
        return '';
    };

    const getNavButtonStyles = (variant: string) => {
        switch (variant) {
            case 'minimal':
                return 'hover:bg-transparent hover:text-primary hover:scale-110';
            case 'rounded':
                return 'rounded-full hover:bg-primary/10';
            default:
                return 'hover:bg-primary/10';
        }
    };

    return (
        <Pagination className='pb-4'>
            <PaginationContent className='gap-1 md:gap-2'>
                {currentPage > 1 && (
                    <motion.div
                        initial={{ x: -5, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => onPageChange(currentPage - 1)}
                                className={cn(
                                    'transition-all duration-200',
                                    getNavButtonStyles(variant),
                                )}
                            />
                        </PaginationItem>
                    </motion.div>
                )}

                {displayPages()}

                {currentPage < totalPages && (
                    <motion.div
                        initial={{ x: 5, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => onPageChange(currentPage + 1)}
                                className={cn(
                                    'transition-all duration-200',
                                    getNavButtonStyles(variant),
                                )}
                            />
                        </PaginationItem>
                    </motion.div>
                )}
            </PaginationContent>
        </Pagination>
    );
};

const MyBlogPage: React.FC = () => {
    const { categories, category, tag, sort, authorId } = useSelector(
        (state: any) => state.blog,
    );
    const dispatch = useDispatch();

    // Use useSearchParams to get query parameters
    const searchParams = useSearchParams();

    const categoryQuery = searchParams.get('category');
    const tagQuery = searchParams.get('tag');

    // State
    const [posts, setPosts] = useState<Post[]>([]);
    const [topTags, setTopTags] = useState<Tag[]>([]);
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [sortText, setSortText] = useState<string>('');

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    // Handlers
    const handleSelect = (value: string) => {
        dispatch({
            type: 'SET_SORT',
            payload: value,
        });
        setSortText(value);
    };

    // API Calls
    const fetchArticles = async (options: FetchArticlesOptions) => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/blog/myarticles`,
                options,
            );
            setPosts(response.data.articles);
            setAllTags(response.data.tags);
            setTotal(response.data.count || 0);
        } catch (error: any) {
            console.error('Error fetching articles:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTags = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/blog/tags`,
            );
            setTopTags(response.data.tags);
        } catch (error: any) {
            console.error('Error fetching tags:', error);
        }
    };

    // Effects: Use searchParams.get() to get the tag and category query values
    useEffect(() => {
        if (categories && categories.length > 0) {
            if (categoryQuery) {
                const ct = categories.find(
                    (c: Category) => c?.name === categoryQuery,
                );
                if (ct) {
                    dispatch({
                        type: 'SET_CATEGORY',
                        payload: ct?._id,
                    });
                }
            }
            if (tagQuery) {
                dispatch({
                    type: 'SET_TAG',
                    payload: tagQuery,
                });
            }
        }
    }, [categories, searchParams, dispatch]);

    useEffect(() => {
        fetchArticles({
            page: currentPage,
            limit,
            sort: sort || sortText,
            category: category,
            query: searchText,
            tag: tag || tagQuery,
            author: authorId,
        });
        fetchTags();
    }, [
        sort,
        sortText,
        category,
        tag,
        searchText,
        tagQuery,
        authorId,
        limit,
        currentPage,
    ]);

    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setCurrentPage(1);
    };

    return (
        <>
            <section className='w-full mt-14 text-black'>
                <div className='my-container px-0 md:px-4 mx-auto pt-8 '>
                    <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
                        <h2 className='text-3xl font-bold text-black'>
                            {isMobile ? 'Blogs' : 'SkillBNK Blogs'}
                        </h2>

                        <div
                            className={`${isMobile ? 'hidden' : 'block'} w-full md:w-80`}
                        >
                            <div className='relative'>
                                <Input
                                    className='pl-10 bg-foreground'
                                    placeholder='Search...'
                                    onChange={(e) =>
                                        setSearchText(e.target.value)
                                    }
                                />
                                <Search className='absolute left-3 top-3 h-4 w-4 text-gray' />
                            </div>
                        </div>

                        {/* Mobile header with dropdown and create button */}
                        <div
                            className={`${isMobile ? 'flex' : 'hidden'} md:mt-0 mt-3 w-full justify-between items-center`}
                        >
                            <Select
                                onValueChange={handleSelect}
                                defaultValue='latest'
                            >
                                <SelectTrigger className='w-40'>
                                    <SelectValue placeholder='Trending Posts' />
                                </SelectTrigger>
                                <SelectContent className='p-2'>
                                    <SelectItem value='latest'>
                                        Trending Posts
                                    </SelectItem>
                                    <SelectItem value='top'>
                                        Top Posts
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Button asChild>
                                <PlusCircle className='h-5 w-5 mr-2' />
                                <Link href='/blogs/create-blog'>
                                    Create Post
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <Separator className='my-3' />

                    <div className=''>
                        <div className='border rounded-lg p-4 mb-3 shadow-sm bg-foreground'>
                            <div className='grid grid-cols-1 md:grid-cols-8 gap-x-3'>
                                <div className='md:col-span-2'>
                                    <div
                                        className={`${isMobile ? 'hidden' : 'block'}`}
                                    >
                                        <div className='relative'>
                                            <Input
                                                className='pl-10'
                                                placeholder='Search...'
                                                onChange={(e) =>
                                                    setSearchText(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <Search className='absolute left-3 top-3 h-4 w-4 text-gray' />
                                        </div>
                                    </div>
                                </div>

                                <div className='md:col-span-6'>
                                    <div className='flex h-auto justify-between items-center'>
                                        {!isMobile && (
                                            <h3 className='lg:text-xl font-medium text-lg'>
                                                {sortText === 'latest'
                                                    ? 'Trending Posts'
                                                    : sortText === 'top'
                                                      ? 'Top Posts'
                                                      : 'Trending Posts'}
                                            </h3>
                                        )}

                                        <div
                                            className={`w-full md:w-auto ${isMobile ? 'flex' : 'hidden'}`}
                                        >
                                            <div className='relative'>
                                                <Input
                                                    className='pl-10'
                                                    placeholder='Search...'
                                                    onChange={(e) =>
                                                        setSearchText(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <Search className='absolute left-3 top-3 h-4 w-4 text-gray' />
                                            </div>
                                        </div>

                                        {isMobile && <DropDownMenu />}

                                        <div
                                            className={`flex gap-4 ${isMobile ? 'hidden' : 'flex'}`}
                                        >
                                            <Select
                                                onValueChange={handleSelect}
                                                defaultValue='latest'
                                            >
                                                <SelectTrigger className='w-40 h-9'>
                                                    <SelectValue placeholder='Trending Posts' />
                                                </SelectTrigger>
                                                <SelectContent className='py-1 '>
                                                    <SelectItem value='latest'>
                                                        Trending Posts
                                                    </SelectItem>
                                                    <SelectItem value='top'>
                                                        Top Posts
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <Button asChild>
                                                <PlusCircle className='h-5 w-5 mr-2' />
                                                <Link href='/blogs/create-blog'>
                                                    Create Post
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-12 gap-3'>
                            <div className='md:col-span-3 order-2 md:order-1'>
                                {!isMobile && <LeftUserMenu />}
                                <TagsComponent />
                            </div>

                            <div className='md:col-span-9 order-1 md:order-2'>
                                {isLoading ? (
                                    <div className='flex justify-center items-center h-96'>
                                        <SpinnerCircularFixed
                                            size={100}
                                            thickness={150}
                                            speed={100}
                                            color='#27ac1f'
                                            secondaryColor='rgba(0, 0, 0, .05)'
                                        />
                                    </div>
                                ) : (
                                    <div style={{ minHeight: '800px' }}>
                                        {!posts?.length ? (
                                            <div className='flex justify-center items-center h-96'>
                                                <EmptyPlaceholder>
                                                    <EmptyPlaceholderIcon name='post' />
                                                    <EmptyPlaceholderTitle>
                                                        No blogs found
                                                    </EmptyPlaceholderTitle>
                                                    <EmptyPlaceholderDescription>
                                                        No blogs have been
                                                        created yet or match
                                                        your search criteria.
                                                    </EmptyPlaceholderDescription>
                                                </EmptyPlaceholder>
                                            </div>
                                        ) : (
                                            <div className='gap-3 grid grid-cols-1 xl:grid-cols-2'>
                                                {posts.map((post) => (
                                                    <NewBlogCard
                                                        key={post.id}
                                                        blog={post}
                                                        isMy={true}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {posts?.length > 0 && (
                                    <div className='flex items-center flex-col lg:flex-row-reverse space-y-3 mt-3'>
                                        <div className='flex items-center space-x-2 lg:w-[30%]'>
                                            <span className='text-sm text-muted-foreground'>
                                                Show:
                                            </span>
                                            <Select
                                                value={limit.toString()}
                                                onValueChange={(value) =>
                                                    handleLimitChange(
                                                        parseInt(value),
                                                    )
                                                }
                                            >
                                                <SelectTrigger className='w-20'>
                                                    <SelectValue>
                                                        {limit}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='5'>
                                                        5
                                                    </SelectItem>
                                                    <SelectItem value='10'>
                                                        10
                                                    </SelectItem>
                                                    <SelectItem value='25'>
                                                        25
                                                    </SelectItem>
                                                    <SelectItem value='50'>
                                                        50
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <span className='text-sm text-muted-foreground'>
                                                of {total} items
                                            </span>
                                        </div>

                                        <CustomPagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

// Set display name to fix the ESLint warning
MyBlogPage.displayName = 'MyBlogPage';

export default MyBlogPage;
