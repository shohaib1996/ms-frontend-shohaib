import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Image from 'next/image';
// Updated import from "next/navigation"
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, Eye, Share, Edit, Trash2, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import ModalContent from './ModalContent';
import ShareModal from './ShareModal';

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
    createdBy: User;
}

interface AuthState {
    user: User;
    isAuthenticated: boolean;
}

interface BlogState {
    blog_load: boolean;
}

interface RootState {
    auth: AuthState;
    blog: BlogState;
}

interface NewBlogCardProps {
    blog: Blog;
    isMy?: boolean;
}

function NewBlogCard({ blog, isMy = false }: NewBlogCardProps | any) {
    const [isLiked, setIsLiked] = useState<string | undefined>(undefined);
    const [likes, setLikes] = useState<string[]>(blog?.likes || []);
    const [changeLike, setChangeLike] = useState<boolean>(false);
    const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);

    const { user, isAuthenticated } = useSelector<RootState, AuthState>(
        (state) => state.auth,
    );
    const { blog_load } = useSelector<RootState, BlogState>(
        (state) => state.blog,
    );
    const dispatch = useDispatch();
    const router = useRouter();

    const handleRoute = () => {
        router.push(`/blogs/${blog?.slug}`);
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/blogs/edit/${blog?.slug}`);
    };

    const handleReact = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (!isAuthenticated) {
            // Inform user to log in when they try to like a post
            toast.info('Please log in to react to posts');
            return;
        }
        try {
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_API_URL}/blog/react/${blog?._id}`,
                )
                .then((res) => {
                    setLikes(res?.data?.likes);
                    setIsLiked(
                        res?.data?.likes.includes(user?._id)
                            ? user?._id
                            : undefined,
                    );
                    setChangeLike(!changeLike);
                    toast.success('Post liked successfully');
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

    const handleDelete = async () => {
        try {
            const res = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/blog/article/delete/${blog?._id}`,
            );
            if (res) {
                toast.success('Blog post deleted successfully');
                dispatch({ type: 'SET_BLOG_LOAD', payload: !blog_load });
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete blog post');
        }
    };

    useEffect(() => {
        const liked = likes?.find((p) => p === user?._id);
        setIsLiked(liked);
    }, [likes, user?._id, changeLike]);

    return (
        <>
            <Card className='overflow-hidden hover:shadow-md transition-shadow'>
                <div className='relative'>
                    <div className='aspect-video relative overflow-hidden'>
                        <Image
                            className='object-cover w-full h-full transition-transform hover:scale-105'
                            src={blog?.thumbnail || '/blogs/placeholder.jpg'}
                            alt={blog?.title || 'Blog thumbnail'}
                            width={366}
                            height={232}
                        />
                    </div>

                    <div className='absolute top-3 flex justify-between w-full px-3'>
                        <Badge className='h-5'>
                            {moment(blog?.createdAt).format('ll')}
                        </Badge>

                        <Button
                            size='icon'
                            variant={isLiked ? 'destructive' : 'outline'}
                            className='h-8 w-8 rounded-full '
                            onClick={handleReact}
                        >
                            <Heart
                                className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`}
                            />
                        </Button>
                    </div>
                </div>

                <CardContent className='pt-4 p-2 md:p-6'>
                    <div className='flex justify-between items-center text-sm text-muted-foreground mb-3'>
                        <div className='flex space-x-1 md:space-x-4'>
                            <Badge className='flex items-center space-x-1 px-1 md:px-2'>
                                <Eye className='h-4 w-4' />
                                <span>{blog?.readCount} Views</span>
                            </Badge>

                            <Badge className='flex items-center space-x-1 px-1 md:px-2'>
                                <Heart className='h-4 w-4' />
                                <span>{likes?.length} Likes</span>
                            </Badge>

                            <Badge className='flex items-center space-x-1 text-xs px-1 md:px-2'>
                                <MessageSquare className='h-4 w-4' />
                                <span className='text-xs'>
                                    {blog?.comments} Comments
                                </span>
                            </Badge>
                        </div>

                        <Button
                            size='icon'
                            variant='ghost'
                            onClick={(e) => {
                                e.stopPropagation();
                                setShareModalOpen(true);
                            }}
                            className='h-8 w-8'
                        >
                            <Share className='h-4 w-4' />
                        </Button>
                    </div>

                    <div className='flex justify-between items-center mb-4'>
                        <div className='flex items-center'>
                            <Avatar className='h-8 w-8 mr-2 border border-primary/20'>
                                <AvatarImage
                                    src={
                                        blog?.createdBy?.profilePicture ||
                                        '/author.png'
                                    }
                                    alt={blog?.createdBy?.fullName}
                                />
                                <AvatarFallback>
                                    {blog?.createdBy?.fullName?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>

                            <div className='flex items-center text-sm'>
                                <span className='font-medium mr-2'>
                                    {blog?.createdBy?.fullName}
                                </span>
                                <span className='text-muted-foreground flex items-center'>
                                    <span className='mx-1.5 h-1 w-1 rounded-full bg-muted-foreground'></span>
                                    <span>{blog?.minRead} min read</span>
                                </span>
                            </div>
                        </div>

                        {isMy && (
                            <div className='flex space-x-1'>
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    onClick={handleEdit}
                                    className='h-8 w-8 text-primary'
                                >
                                    <Edit className='h-4 w-4' />
                                </Button>

                                <Button
                                    variant='ghost'
                                    size='icon'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setConfirmDeleteOpen(true);
                                    }}
                                    className='h-8 w-8 text-danger'
                                >
                                    <Trash2 className='h-4 w-4' />
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className='cursor-pointer' onClick={handleRoute}>
                        <h3 className='text-xl font-medium line-clamp-2 mb-2 hover:text-primary transition-colors'>
                            {blog?.title}
                        </h3>

                        <div className='flex flex-wrap gap-1 mt-2'>
                            {blog?.tags
                                ?.slice(0, 3)
                                .map((tag: string, index: number) => (
                                    <Badge
                                        key={index}
                                        className='text-xs px-1 md:px-2'
                                    >
                                        # {tag}
                                    </Badge>
                                ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Share Modal */}
            {shareModalOpen && (
                <ShareModal
                    opened={shareModalOpen}
                    post={blog}
                    close={() => setShareModalOpen(false)}
                />
            )}

            {/* Login Dialog */}
            {!isAuthenticated && (
                <Dialog>
                    <DialogContent className='p-0'>
                        <ModalContent />
                    </DialogContent>
                </Dialog>
            )}

            {/* Delete Confirmation */}
            <AlertDialog
                open={confirmDeleteOpen}
                onOpenChange={setConfirmDeleteOpen}
            >
                <AlertDialogContent className='text-black'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You want to delete this blog post. This action
                            cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className='bg-primary text-pure-white'>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className='bg-danger hover:bg-red-500/50'
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default NewBlogCard;
