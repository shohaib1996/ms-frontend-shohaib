'use client';

import type React from 'react';

import { useState } from 'react';
import {
    MoreHorizontal,
    Reply,
    Edit,
    Trash2,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CommentsProps {
    comments: any[];
    replies: any[];
    contentId: string;
    handleUpdate: (data: any) => void;
    handleDelete: (id: string) => void;
    commentInput: (data: any) => React.ReactNode;
    setCurrentReply: (id: string | null) => void;
    currentReply: string | null;
    openReplies: string[];
    setOpenReplies: (ids: string[]) => void;
    isUpdate: string;
    setUpdate: (id: string) => void;
    isModal?: boolean;
    wrapperHeight?: string;
}

export default function Comments({
    comments,
    replies,
    contentId,
    handleUpdate,
    handleDelete,
    commentInput,
    setCurrentReply,
    currentReply,
    openReplies,
    setOpenReplies,
    isUpdate,
    setUpdate,
    isModal = false,
}: CommentsProps) {
    // Get auth state from Redux (mock implementation)
    const user = { _id: '123' }; // Replace with actual Redux state

    // State for editing comments
    const [editText, setEditText] = useState('');

    // Format date
    const formatDate = (date: string) => {
        try {
            return formatDistanceToNow(new Date(date), { addSuffix: true });
        } catch (error) {
            return 'some time ago';
        }
    };

    // Toggle replies visibility
    const toggleReplies = (commentId: string) => {
        if (openReplies.includes(commentId)) {
            setOpenReplies(openReplies.filter((id) => id !== commentId));
        } else {
            setOpenReplies([...openReplies, commentId]);
        }
    };

    // Handle edit button click
    const handleEdit = (comment: any) => {
        setUpdate(comment._id);
        setEditText(comment.comment);
    };

    // Render comments
    return (
        <div className='space-y-6'>
            {comments.map((comment) => {
                // Get replies for this comment
                const commentReplies = replies.filter(
                    (reply) => reply.parentId === comment._id,
                );
                const hasReplies = commentReplies.length > 0;
                const isRepliesOpen = openReplies.includes(comment._id);

                return (
                    <div key={comment._id} className='space-y-4'>
                        {/* Main Comment */}
                        <div className='flex gap-3'>
                            <Avatar className='h-10 w-10 border border-primary/20'>
                                <AvatarImage
                                    src={
                                        comment.user?.profilePicture ||
                                        '/author.png'
                                    }
                                    alt={comment.user?.fullName || 'User'}
                                />
                                <AvatarFallback>
                                    {comment.user?.fullName?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>

                            <div className='flex-1'>
                                <div className='bg-muted/30 rounded-lg p-3'>
                                    <div className='flex justify-between items-start mb-1'>
                                        <h4 className='font-medium'>
                                            {comment.user?.fullName ||
                                                'Anonymous'}
                                        </h4>

                                        {user?._id === comment.user?._id && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant='ghost'
                                                        size='icon'
                                                        className='h-8 w-8'
                                                    >
                                                        <MoreHorizontal className='h-4 w-4' />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align='end'>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleEdit(comment)
                                                        }
                                                    >
                                                        <Edit className='h-4 w-4 mr-2' />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleDelete(
                                                                comment._id,
                                                            )
                                                        }
                                                        className='text-destructive focus:text-destructive'
                                                    >
                                                        <Trash2 className='h-4 w-4 mr-2' />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </div>

                                    {isUpdate === comment._id ? (
                                        <div className='space-y-2'>
                                            <Textarea
                                                value={editText}
                                                onChange={(e) =>
                                                    setEditText(e.target.value)
                                                }
                                                className='min-h-[80px] resize-none'
                                            />
                                            <div className='flex justify-end gap-2'>
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    onClick={() =>
                                                        setUpdate('')
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    size='sm'
                                                    onClick={() =>
                                                        handleUpdate({
                                                            id: comment._id,
                                                            contentId,
                                                            comment: editText,
                                                        })
                                                    }
                                                >
                                                    Update
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className='text-sm'>
                                            {comment.comment}
                                        </p>
                                    )}
                                </div>

                                <div className='flex items-center mt-1 text-xs text-muted-foreground'>
                                    <span>{formatDate(comment.createdAt)}</span>
                                    <span className='mx-2'>•</span>
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        className='h-auto p-0 text-xs text-muted-foreground hover:text-foreground'
                                        onClick={() =>
                                            setCurrentReply(comment._id)
                                        }
                                    >
                                        <Reply className='h-3 w-3 mr-1' />
                                        Reply
                                    </Button>

                                    {hasReplies && (
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            className='h-auto p-0 text-xs text-muted-foreground hover:text-foreground ml-2'
                                            onClick={() =>
                                                toggleReplies(comment._id)
                                            }
                                        >
                                            {isRepliesOpen ? (
                                                <>
                                                    <ChevronUp className='h-3 w-3 mr-1' />
                                                    Hide Replies
                                                </>
                                            ) : (
                                                <>
                                                    <ChevronDown className='h-3 w-3 mr-1' />
                                                    Show {commentReplies.length}{' '}
                                                    {commentReplies.length === 1
                                                        ? 'Reply'
                                                        : 'Replies'}
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Reply Input */}
                        {currentReply === comment._id && (
                            <div className='ml-12'>
                                {commentInput({
                                    parentId: comment._id,
                                    comment: '',
                                    setComment: (text: string) => {},
                                    isReply: true,
                                })}
                            </div>
                        )}

                        {/* Replies */}
                        {isRepliesOpen && hasReplies && (
                            <div className='ml-12 space-y-4'>
                                {commentReplies.map((reply) => (
                                    <div key={reply._id} className='flex gap-3'>
                                        <Avatar className='h-8 w-8 border border-primary/20'>
                                            <AvatarImage
                                                src={
                                                    reply.user
                                                        ?.profilePicture ||
                                                    '/author.png'
                                                }
                                                alt={
                                                    reply.user?.fullName ||
                                                    'User'
                                                }
                                            />
                                            <AvatarFallback>
                                                {reply.user?.fullName?.charAt(
                                                    0,
                                                ) || 'U'}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className='flex-1'>
                                            <div className='bg-muted/30 rounded-lg p-3'>
                                                <div className='flex justify-between items-start mb-1'>
                                                    <h4 className='font-medium text-sm'>
                                                        {reply.user?.fullName ||
                                                            'Anonymous'}
                                                    </h4>

                                                    {user?._id ===
                                                        reply.user?._id && (
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant='ghost'
                                                                    size='icon'
                                                                    className='h-6 w-6'
                                                                >
                                                                    <MoreHorizontal className='h-3 w-3' />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align='end'>
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleEdit(
                                                                            reply,
                                                                        )
                                                                    }
                                                                >
                                                                    <Edit className='h-4 w-4 mr-2' />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            reply._id,
                                                                        )
                                                                    }
                                                                    className='text-destructive focus:text-destructive'
                                                                >
                                                                    <Trash2 className='h-4 w-4 mr-2' />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    )}
                                                </div>

                                                {isUpdate === reply._id ? (
                                                    <div className='space-y-2'>
                                                        <Textarea
                                                            value={editText}
                                                            onChange={(e) =>
                                                                setEditText(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className='min-h-[80px] resize-none'
                                                        />
                                                        <div className='flex justify-end gap-2'>
                                                            <Button
                                                                variant='outline'
                                                                size='sm'
                                                                onClick={() =>
                                                                    setUpdate(
                                                                        '',
                                                                    )
                                                                }
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                size='sm'
                                                                onClick={() =>
                                                                    handleUpdate(
                                                                        {
                                                                            id: reply._id,
                                                                            parentId:
                                                                                reply.parentId,
                                                                            contentId,
                                                                            comment:
                                                                                editText,
                                                                        },
                                                                    )
                                                                }
                                                            >
                                                                Update
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className='text-sm'>
                                                        {reply.comment}
                                                    </p>
                                                )}
                                            </div>

                                            <div className='flex items-center mt-1 text-xs text-muted-foreground'>
                                                <span>
                                                    {formatDate(
                                                        reply.createdAt,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
