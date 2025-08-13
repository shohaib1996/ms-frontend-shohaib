'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';
import {
    Heart,
    Search,
    PlusCircle,
    Share,
    MessageSquare,
    Eye,
    ArrowLeft,
} from 'lucide-react';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Local Components
import TagsComponent from '@/components/blogs/new-blog/TagsComponent';
import LeftUserMenu from '@/components/blogs/new-blog/LeftUserMenu';
import DropDownMenu from '@/components/blogs/new-blog/DropDownMenu';
import ShareModal from '@/components/blogs/new-blog/ShareModal';
import { toast } from 'sonner';
import GlobalComment from '@/components/global/comments/global-comment';
import RelatedBlog from '@/components/blogs/related-blog';
import { RootState, useAppSelector } from '@/store';

interface User {
    _id: string;
    fullName: string;
    profilePicture?: string;
}

interface Blog {
    _id: string;
    title: string;
    slug: string;
    thumbnail?: string;
    description?: string;
    createdAt: string;
    readCount: number;
    minRead: number;
    comments: number;
    likes: string[];
    tags: string[];
    metaTitle?: string;
    metaDescription?: string;
    category?: string;
    createdBy: User;
}

export default function SingleBlogPage() {
    const params = useParams();
    const slug = params?.slug as string;

    // States
    const [blog, setBlog] = useState<Blog | null>(null);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likes, setLikes] = useState<string[]>([]);
    const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
    const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [sort, setSort] = useState<string>('latest');

    // Mock auth state (replace with your actual auth state)
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    // Fetch blog data
    useEffect(() => {
        const fetchBlog = async () => {
            setIsLoading(true);
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/blog/article/${slug}`,
                );
                setBlog(data.article);
                setLikes(data.article?.likes || []);

                // Check if user has liked the post
                if (user && data.article?.likes) {
                    const userLiked = data.article.likes.includes(user._id);
                    setIsLiked(userLiked);
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching blog:', error);
                toast.error('Failed to load blog post');
                setIsLoading(false);
            }
        };

        if (slug) {
            fetchBlog();
        }

        // Scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [slug, user]);

    const handleSelect = (value: string) => {
        setSort(value);
    };

    const handleReact = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (!isAuthenticated) {
            setLoginDialogOpen(true);
            return;
        }

        try {
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_API_URL}/blog/react/${blog?._id}`,
                )
                .then((res) => {
                    const newLikes = res?.data?.likes || [];
                    setLikes(newLikes);

                    // Directly check if the user's ID is in the updated likes array
                    const userLiked = user
                        ? newLikes.includes(user._id)
                        : false;
                    setIsLiked(userLiked);
                    setLikes(res?.data?.likes);
                    setIsLiked(res?.data?.likes.includes(user?._id));

                    toast.success(
                        userLiked
                            ? 'Post liked successfully'
                            : 'Post unliked successfully',
                    );
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Failed to like post', {
                        description:
                            err?.response?.data?.error ||
                            'Something went wrong',
                    });
                });
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className='container mx-auto py-12 flex items-center justify-center min-h-screen'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className='container mx-auto py-12 flex flex-col items-center justify-center min-h-screen'>
                <h2 className='text-2xl font-bold mb-4'>Blog post not found</h2>
                <p className='text-muted-foreground mb-6'>
                    The blog post youre looking for doesnt exist or has been
                    removed.
                </p>
                <Button asChild>
                    <Link href='/blogs'>
                        <ArrowLeft className='mr-2 h-4 w-4' />
                        Back to Blogs
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <section className='min-h-screen bg-background mt-14 text-black'>
            <div className='container mx-auto py-8 px-4'>
                {/* Header */}
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
                    <div className='flex items-center mb-4 md:mb-0'>
                        <Button
                            variant='ghost'
                            size='icon'
                            asChild
                            className='mr-2'
                        >
                            <Link href='/blogs'>
                                <ArrowLeft className='h-5 w-5' />
                            </Link>
                        </Button>
                        <h2 className='text-2xl md:text-3xl font-bold text-black'>
                            Blog
                        </h2>
                    </div>

                    <div className={`flex gap-4 ${isMobile ? 'w-full' : ''}`}>
                        <Select
                            defaultValue={sort}
                            onValueChange={handleSelect}
                        >
                            <SelectTrigger
                                className={`${isMobile ? 'flex-1' : 'w-40'}`}
                            >
                                <SelectValue placeholder='Trending Posts' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='latest'>
                                    Trending Posts
                                </SelectItem>
                                <SelectItem value='top'>Top Posts</SelectItem>
                            </SelectContent>
                        </Select>
                        <Link href={'blogs/create-blog'}>
                            <Button asChild>
                                <>
                                    <PlusCircle className='h-4 w-4 mr-2' />
                                    <span>Create Post</span>
                                </>
                            </Button>
                        </Link>
                    </div>
                </div>

                <Separator className='my-4' />

                {/* Main Content */}
                <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
                    {/* Left Sidebar */}
                    <div className='md:col-span-4 lg:col-span-3 order-2 md:order-1'>
                        {!isMobile && <LeftUserMenu />}
                        <TagsComponent />
                        <RelatedBlog />
                    </div>

                    {/* Main Content */}
                    <div className='md:col-span-8 lg:col-span-9 order-1 md:order-2'>
                        {/* Blog Top Bar */}
                        <div className='mb-6'>
                            <Card className='overflow-hidden'>
                                <CardContent className='p-4 md:p-6'>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                        <div className='md:col-span-1'>
                                            <div className='relative'>
                                                <Input
                                                    className='pl-10'
                                                    placeholder='Search...'
                                                />
                                                <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                                            </div>
                                        </div>

                                        <div className='md:col-span-2 flex justify-between items-center'>
                                            {!isMobile && (
                                                <h3 className='text-lg font-medium'>
                                                    {sort === 'latest'
                                                        ? 'Trending Posts'
                                                        : 'Top Posts'}
                                                </h3>
                                            )}

                                            {isMobile && <DropDownMenu />}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Blog Content */}
                        <Card className='overflow-hidden'>
                            <CardContent className='p-0'>
                                {/* Blog Header */}
                                <div className='p-4 md:p-6 border-b'>
                                    <div className='flex flex-col md:flex-row justify-between'>
                                        <div className='mb-4 md:mb-0'>
                                            <h1 className='text-2xl md:text-3xl font-bold mb-2'>
                                                {blog.title}
                                            </h1>
                                            <p className='text-muted-foreground'>
                                                {moment(blog.createdAt).format(
                                                    'll',
                                                )}
                                            </p>
                                        </div>

                                        <div className='flex flex-col'>
                                            <div className='flex items-center mb-3'>
                                                <Avatar className='h-10 w-10 mr-3 border border-primary/20'>
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

                                                <div>
                                                    <p className='text-sm font-medium'>
                                                        <span className='text-muted-foreground mr-1'>
                                                            Author:
                                                        </span>
                                                        {
                                                            blog.createdBy
                                                                ?.fullName
                                                        }
                                                    </p>
                                                    <p className='text-xs text-muted-foreground'>
                                                        {blog.minRead || 5} min
                                                        read
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='flex gap-2'>
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    onClick={() =>
                                                        setShareModalOpen(true)
                                                    }
                                                    className='flex-1'
                                                >
                                                    <Share className='h-4 w-4 mr-2' />
                                                    Share
                                                </Button>
                                                <Button
                                                    size='icon'
                                                    variant={
                                                        isLiked
                                                            ? 'destructive'
                                                            : 'outline'
                                                    }
                                                    className='h-8 w-8 rounded-full '
                                                    onClick={handleReact}
                                                >
                                                    <Heart
                                                        className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`}
                                                    />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Blog Stats */}
                                <div className='flex justify-between items-center p-4 bg-muted/30'>
                                    <div className='flex space-x-4'>
                                        <Badge
                                            variant='outline'
                                            className='flex items-center gap-1'
                                        >
                                            <Eye className='h-3 w-3' />
                                            <span>
                                                {blog.readCount || 0} Views
                                            </span>
                                        </Badge>

                                        <Badge
                                            variant='outline'
                                            className='flex items-center gap-1'
                                        >
                                            <Heart className='h-3 w-3' />
                                            <span>
                                                {likes?.length || 0} Likes
                                            </span>
                                        </Badge>

                                        <Badge
                                            variant='outline'
                                            className='flex items-center gap-1'
                                        >
                                            <MessageSquare className='h-3 w-3' />
                                            <span>
                                                {blog.comments || 0} Comments
                                            </span>
                                        </Badge>
                                    </div>

                                    {blog.tags && blog.tags.length > 0 && (
                                        <div className='hidden md:flex gap-2'>
                                            {blog.tags
                                                .slice(0, 3)
                                                .map((tag, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant='secondary'
                                                    >
                                                        #{tag}
                                                    </Badge>
                                                ))}
                                        </div>
                                    )}
                                </div>

                                {/* Blog Thumbnail */}
                                <div className='relative aspect-video w-full overflow-hidden'>
                                    <Image
                                        src={
                                            blog.thumbnail ||
                                            '/blogs/placeholder.jpg'
                                        }
                                        alt={blog.title}
                                        fill
                                        className='object-cover'
                                        priority
                                    />
                                </div>

                                {/* Blog Content */}
                                <div className='p-4 md:p-6 prose prose-sm md:prose-base lg:prose-lg max-w-none'>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: blog.description || '',
                                        }}
                                    />
                                </div>

                                {/* Tags (Mobile) */}
                                {isMobile &&
                                    blog.tags &&
                                    blog.tags.length > 0 && (
                                        <div className='p-4 flex flex-wrap gap-2'>
                                            {blog.tags.map((tag, index) => (
                                                <Badge
                                                    key={index}
                                                    variant='secondary'
                                                >
                                                    #{tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                            </CardContent>
                        </Card>

                        {/* Comments Section */}
                        <div className='mt-6'>
                            <Card>
                                <CardContent className='p-4 md:p-6'>
                                    <h3 className='text-xl font-bold mb-4'>
                                        Comments
                                    </h3>
                                    <GlobalComment contentId={blog._id} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Share Modal */}
            {shareModalOpen && (
                <ShareModal
                    opened={shareModalOpen}
                    post={blog}
                    close={() => setShareModalOpen(false)}
                />
            )}

            {/* Login Dialog */}
            <AlertDialog
                open={loginDialogOpen}
                onOpenChange={setLoginDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Login Required</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please log in to like posts and interact with the
                            community.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Link href='/login'>Login</Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
}
