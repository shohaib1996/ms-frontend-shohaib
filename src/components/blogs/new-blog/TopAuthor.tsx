import React, { SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { Circle } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import store from '@/store';
import { Dispatch } from '@reduxjs/toolkit';
import { cn } from '@/lib/utils';

interface Author {
    user: {
        _id: string;
        fullName: string;
        profilePicture?: string;
    };
    count: number;
    commentsCount?: number;
    readCount?: number;
}

interface BlogState {
    authorId: string;
}

interface RootState {
    blog: BlogState;
}

function TopAuthor({ setAuthorId }: { setAuthorId: any }) {
    const dispatch = useDispatch();
    const { authorId } = useSelector<RootState, BlogState>(
        (state) => state.blog,
    );
    const [authors, setAuthors] = useState<Author[]>([]);
    const [isActive, setIsActive] = useState<{
        index: number | null;
        isActive: boolean;
    }>({ index: null, isActive: false });

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/blog/users`,
                );
                setAuthors(res?.data?.users);
            } catch (error) {
                console.error('Failed to fetch authors:', error);
            }
        };

        fetchAuthors();
    }, []);

    const handleAuthorClick = (
        authorId: string,
        currentAuthorId: string,
        index: number | null,
    ) => {
        store.dispatch({
            type: 'SET_AUTHOR_ID',
            payload: currentAuthorId === authorId ? '' : authorId,
        });
        setAuthorId(currentAuthorId === authorId ? '' : authorId);
        setIsActive({
            index: index,
            isActive: currentAuthorId === authorId ? false : true,
        });
    };

    return (
        <Card className='mb-3'>
            <CardHeader className='pb-2 '>
                <CardTitle className='text-xl flex justify-between'>
                    Top Authors{' '}
                    <span
                        className='text-sm text-primary cursor-pointer'
                        onClick={() => handleAuthorClick('', authorId, null)}
                    >
                        Reset
                    </span>
                </CardTitle>
            </CardHeader>

            <Separator className='mb-4' />

            <CardContent>
                <div className='space-y-4'>
                    {authors.map((author, index) => (
                        <div
                            key={author.user._id}
                            className={cn(
                                isActive.isActive === true &&
                                    isActive.index === index
                                    ? 'border-primary'
                                    : '',
                                `flex items-center border p-3 rounded-md cursor-pointer transition-colors hover:bg-muted ${
                                    authorId === author.user._id
                                        ? 'bg-primary/10'
                                        : ''
                                }`,
                            )}
                            onClick={() =>
                                handleAuthorClick(
                                    author.user._id,
                                    authorId,
                                    index,
                                )
                            }
                        >
                            <Avatar className='h-10 w-10 mr-3'>
                                <AvatarImage
                                    src={
                                        author.user.profilePicture ||
                                        '/author.png'
                                    }
                                    alt={author.user.fullName}
                                />
                                <AvatarFallback>
                                    {author.user.fullName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>

                            <div className='flex-1'>
                                <h3
                                    className={`font-medium text-sm ${
                                        authorId === author.user._id
                                            ? 'text-primary'
                                            : ''
                                    }`}
                                >
                                    {author.user.fullName}
                                </h3>

                                <div className='flex items-center text-xs text-muted-foreground mt-1'>
                                    <span
                                        className={`${
                                            authorId === author.user._id
                                                ? 'text-primary'
                                                : ''
                                        }`}
                                    >
                                        {author.count} Posts
                                    </span>

                                    {/* Commented out as in original */}
                                    {/* <Circle className="h-1 w-1 mx-2" />
                  <span>{author.commentsCount} Comments</span>
                  <Circle className="h-1 w-1 mx-2" />
                  <span>{author.readCount} Views</span> */}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Commented out as in original */}
                    {/* <Button variant="outline" className="w-full mt-2">View More</Button> */}
                </div>
            </CardContent>
        </Card>
    );
}

export default TopAuthor;
