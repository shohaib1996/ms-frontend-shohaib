'use client';

import type React from 'react';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import {
    ArrowLeft,
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Link,
    ImageIcon,
    FileCode,
    AlignLeft,
    Loader2,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

export default function EditBlogComp() {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug as string;

    const imageRef = useRef<HTMLInputElement>(null);

    // States
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [category, setCategory] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
        null,
    );
    const [tags, setTags] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [allCategories, setAllCategories] = useState<any[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [blogId, setBlogId] = useState('');

    // Fetch blog data
    const fetchBlog = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/blog/article/${slug}`,
            );
            const { article: blog } = data;

            setBlogId(blog?._id || '');
            setTitle(blog?.title || '');
            setDescription(blog?.description || '');
            setThumbnail(blog?.thumbnail || '');
            setThumbnailPreview(blog?.thumbnail || '');
            setTags(blog?.tags || []);
            setMetaTitle(blog?.metaTitle || '');
            setMetaDescription(blog?.metaDescription || '');
            setCategory(blog?.category || '');

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching blog:', error);
            toast.error('Failed to load blog data');
            setIsLoading(false);
        }
    };

    // Fetch categories and blog data on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/blog/category/get`,
                );
                setAllCategories(res.data?.categories || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        // Check authentication status
        const checkAuth = async () => {
            try {
                // Replace with your actual auth check
                const mockAuthCheck = true;
                setIsAuthenticated(mockAuthCheck);

                if (!mockAuthCheck) {
                    setShowAuthModal(true);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
                setShowAuthModal(true);
            }
        };

        fetchCategories();
        checkAuth();

        if (slug) {
            fetchBlog();
        } else {
            setIsLoading(false);
        }
    }, [slug]);

    // Handle image upload
    const handleUploadImage = (file: File) => {
        if (file) {
            setImageLoading(true);
            const formData = new FormData();
            formData.append('image', file);
            formData.append('path', 'program-user-image');

            axios
                .post(
                    `${process.env.NEXT_PUBLIC_API_URL}/settings/watermark-image`,
                    formData,
                )
                .then((res) => {
                    setThumbnail(res.data.url);
                    setThumbnailPreview(res.data.url);
                    setImageLoading(false);
                    if (imageRef.current) {
                        imageRef.current.value = '';
                    }
                })
                .catch((err) => {
                    console.error('Upload error:', err);
                    if (imageRef.current) {
                        imageRef.current.value = '';
                    }
                    setImageLoading(false);
                    toast.error('There was an error uploading your image.');
                });
        }
    };

    // Handle file input change
    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleUploadImage(file);
        }
    };

    // Handle drag and drop
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            handleUploadImage(file);
        }
    };

    // Handle post update
    const handleUpdate = () => {
        if (!title) {
            toast.error('Please enter a title for your post.');
            return;
        }

        if (!blogId) {
            toast.error('Blog ID is missing. Cannot update post.');
            return;
        }

        const data = {
            title,
            description,
            thumbnail,
            tags,
            metaDescription,
            metaTitle,
            category,
        };

        setIsSaving(true);
        axios
            .patch(
                `${process.env.NEXT_PUBLIC_API_URL}/blog/article/edit/${blogId}`,
                data,
            )
            .then((res) => {
                setIsSaving(false);
                toast.success('Your post has been updated successfully.');
                router.push('/blogs/my-posts');
            })
            .catch((err) => {
                console.error('Error updating post:', err);
                setIsSaving(false);
                toast.error(
                    err?.response?.data?.error || 'Failed to update post.',
                );
            });
    };

    if (isLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <Loader2 className='h-8 w-8 animate-spin text-primary' />
            </div>
        );
    }

    return (
        <div className='min-h-screen'>
            <div className='container mx-auto py-6 px-4 sm:px-6'>
                {/* Header */}
                <div className='flex items-center mb-6'>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => router.back()}
                        className='mr-2'
                    >
                        <ArrowLeft className='h-5 w-5' />
                    </Button>
                    <h1 className='text-xl font-semibold'>Update Post</h1>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-3'>
                    {/* Main content - left and center */}
                    <div className='lg:col-span-2 space-y-3'>
                        <Card>
                            <CardContent className='pt-6'>
                                <div className='space-y-4'>
                                    <div>
                                        <label
                                            htmlFor='title'
                                            className='block text-sm font-medium mb-1'
                                        >
                                            Title{' '}
                                            <span className='text-danger'>
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            id='title'
                                            placeholder='Enter title (Maximum 70 characters)'
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            maxLength={70}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor='description'
                                            className='block text-sm font-medium mb-1'
                                        >
                                            Enter description{' '}
                                            <span className='text-danger'>
                                                *
                                            </span>
                                        </label>

                                        {/* Rich Text Editor */}
                                        <div className='border rounded-md bg-background'>
                                            {/* This is a placeholder for the MdxEditor component */}
                                            <div className='border rounded-t-md p-2 flex items-center flex-wrap gap-1'>
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                    className='h-8 w-8'
                                                >
                                                    <Bold className='h-4 w-4' />
                                                </Button>
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                    className='h-8 w-8'
                                                >
                                                    <Italic className='h-4 w-4' />
                                                </Button>
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                    className='h-8 w-8'
                                                >
                                                    <Underline className='h-4 w-4' />
                                                </Button>
                                                <Separator
                                                    orientation='vertical'
                                                    className='mx-1 h-6'
                                                />
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                    className='h-8 w-8'
                                                >
                                                    <List className='h-4 w-4' />
                                                </Button>
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                    className='h-8 w-8'
                                                >
                                                    <ListOrdered className='h-4 w-4' />
                                                </Button>
                                                <Separator
                                                    orientation='vertical'
                                                    className='mx-1 h-6'
                                                />
                                                <Select defaultValue='paragraph'>
                                                    <SelectTrigger className='h-8 w-32'>
                                                        <SelectValue placeholder='Paragraph' />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='paragraph'>
                                                            Paragraph
                                                        </SelectItem>
                                                        <SelectItem value='heading1'>
                                                            Heading 1
                                                        </SelectItem>
                                                        <SelectItem value='heading2'>
                                                            Heading 2
                                                        </SelectItem>
                                                        <SelectItem value='heading3'>
                                                            Heading 3
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Separator
                                                    orientation='vertical'
                                                    className='mx-1 h-6'
                                                />
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                    className='h-8 w-8'
                                                >
                                                    <Link className='h-4 w-4' />
                                                </Button>
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                    className='h-8 w-8'
                                                >
                                                    <ImageIcon className='h-4 w-4' />
                                                </Button>
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                    className='h-8 w-8'
                                                >
                                                    <FileCode className='h-4 w-4' />
                                                </Button>
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                    className='h-8 w-8'
                                                >
                                                    <AlignLeft className='h-4 w-4' />
                                                </Button>
                                            </div>

                                            {/* For now, using a textarea as a placeholder for the MDX editor */}
                                            <Textarea
                                                id='description'
                                                placeholder='Write Here...'
                                                value={description}
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value,
                                                    )
                                                }
                                                className='min-h-[400px] rounded-t-none border-0'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar - right */}
                    <div className='space-y-3'>
                        {/* Thumbnail Upload */}
                        <Card>
                            <CardContent className='pt-6'>
                                <h2 className='text-sm font-medium mb-2'>
                                    Upload Thumbnail
                                </h2>
                                <div
                                    className={cn(
                                        'border-2 border-dashed rounded-md p-4 text-center h-40 flex flex-col items-center justify-center',
                                        isDragging
                                            ? 'border-primary bg-primary/5'
                                            : 'border-gray-300',
                                        thumbnailPreview
                                            ? ''
                                            : 'bg-primary-foreground ',
                                    )}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    {thumbnailPreview ? (
                                        <div className='relative w-full h-full'>
                                            <img
                                                src={
                                                    thumbnailPreview ||
                                                    '/placeholder.svg'
                                                }
                                                alt='Thumbnail preview'
                                                className='w-full h-full object-contain'
                                            />
                                            <Button
                                                variant='destructive'
                                                size='sm'
                                                className='absolute top-0 right-0'
                                                onClick={() => {
                                                    setThumbnail('');
                                                    setThumbnailPreview(null);
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            {imageLoading ? (
                                                <div className='flex items-center justify-center'>
                                                    <Loader2 className='h-6 w-6 animate-spin text-primary-white' />
                                                </div>
                                            ) : (
                                                <>
                                                    <p className='text-sm text-primary-white font-medium'>
                                                        Upload Thumbnail Or
                                                    </p>
                                                    <p className='text-sm text-primary-white font-medium'>
                                                        Drag and Drop
                                                    </p>
                                                    <input
                                                        ref={imageRef}
                                                        type='file'
                                                        id='thumbnail'
                                                        accept='image/png, image/jpeg'
                                                        className='hidden'
                                                        onChange={
                                                            handleThumbnailChange
                                                        }
                                                        disabled={imageLoading}
                                                    />
                                                    <Button
                                                        variant='ghost'
                                                        size='sm'
                                                        className='mt-2'
                                                        onClick={() =>
                                                            imageRef.current?.click()
                                                        }
                                                        disabled={imageLoading}
                                                    >
                                                        Browse Files
                                                    </Button>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Category */}
                        <Card>
                            <CardContent className='pt-6'>
                                <div className='space-y-4'>
                                    <div>
                                        <label
                                            htmlFor='category'
                                            className='block text-sm font-medium mb-1'
                                        >
                                            Category{' '}
                                            <span className='text-danger'>
                                                *
                                            </span>
                                        </label>
                                        <Select
                                            value={category}
                                            onValueChange={setCategory}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select category' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {allCategories.length > 0 ? (
                                                    allCategories.map((cat) => (
                                                        <SelectItem
                                                            key={cat._id}
                                                            value={cat._id}
                                                        >
                                                            {cat.name}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <>
                                                        <SelectItem value='technology'>
                                                            Technology
                                                        </SelectItem>
                                                        <SelectItem value='lifestyle'>
                                                            Lifestyle
                                                        </SelectItem>
                                                        <SelectItem value='business'>
                                                            Business
                                                        </SelectItem>
                                                        <SelectItem value='health'>
                                                            Health
                                                        </SelectItem>
                                                        <SelectItem value='travel'>
                                                            Travel
                                                        </SelectItem>
                                                    </>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Meta Information */}
                        <Card>
                            <CardContent className='pt-6'>
                                <div className='space-y-4'>
                                    <div>
                                        <label
                                            htmlFor='metaTitle'
                                            className='block text-sm font-medium mb-1'
                                        >
                                            Meta Title{' '}
                                            <span className='text-danger'>
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            id='metaTitle'
                                            placeholder='Enter meta title (Maximum 70 characters)'
                                            value={metaTitle}
                                            onChange={(e) =>
                                                setMetaTitle(e.target.value)
                                            }
                                            maxLength={70}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor='metaDescription'
                                            className='block text-sm font-medium mb-1'
                                        >
                                            Meta Description{' '}
                                            <span className='text-danger'>
                                                *
                                            </span>
                                        </label>
                                        <Textarea
                                            id='metaDescription'
                                            placeholder='Enter meta description (Maximum 160 characters)'
                                            value={metaDescription}
                                            onChange={(e) =>
                                                setMetaDescription(
                                                    e.target.value,
                                                )
                                            }
                                            maxLength={160}
                                            className='resize-none h-24'
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Update Button */}
                <div className='mt-3 flex justify-end'>
                    <Button
                        onClick={handleUpdate}
                        className='bg-primary  text-pure-white px-8'
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Updating...
                            </>
                        ) : (
                            'Update'
                        )}
                    </Button>
                </div>
            </div>

            {/* Authentication Modal */}
            <AlertDialog open={showAuthModal} onOpenChange={setShowAuthModal}>
                <AlertDialogContent>
                    <AlertDialogTitle>Authentication Required</AlertDialogTitle>
                    <AlertDialogDescription>
                        To edit a post, please ensure you are logged in.
                    </AlertDialogDescription>
                    <div className='flex justify-end gap-2 mt-4'>
                        <Button
                            variant='outline'
                            onClick={() => router.push('/')}
                        >
                            Cancel
                        </Button>
                        <Button onClick={() => router.push('/login')}>
                            Login
                        </Button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
