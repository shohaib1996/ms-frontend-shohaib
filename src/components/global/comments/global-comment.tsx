'use client';

import type React from 'react';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import Comments from './comments';

interface GlobalCommentProps {
    contentId: string;
    withInput?: boolean;
    cbPost?: () => void;
    cbDelete?: () => void;
    focused?: boolean;
    wrapperHeight?: string;
    bgColor?: 'background' | 'foreground';
}

export default function GlobalComment({
    contentId,
    withInput = true,
    cbPost,
    cbDelete,
    focused = true,
    wrapperHeight = '500px',
    bgColor = 'background',
}: GlobalCommentProps) {
    // Get auth state from Redux
    const { isAuthenticated, user } = useSelector((state: any) => state.auth);

    // State
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [comments, setComments] = useState<any[]>([]);
    const [replies, setReplies] = useState<any[]>([]);
    const [currentReply, setCurrentReply] = useState<string | null>(null);
    const [openReplies, setOpenReplies] = useState<string[]>([]);
    const [isUpdate, setUpdate] = useState('');
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Fetch replies for all comments
    const fetchReplies = () => {
        let newReplies: any[] = [];

        // Fetch replies for each comment
        Promise.all(
            comments.map(async (comment) => {
                return axios
                    .get(
                        `${process.env.NEXT_PUBLIC_API_URL}/content/comment/get/${contentId}?parentId=${comment._id}`,
                    )
                    .then((res) => {
                        // Filter out duplicates
                        const uniqueReplies = res.data.comments.filter(
                            (newReply: any) =>
                                !replies.some(
                                    (existingReply) =>
                                        existingReply._id === newReply._id,
                                ),
                        );
                        newReplies = [...uniqueReplies, ...newReplies];
                    })
                    .catch((err) => {
                        console.error('Error fetching replies:', err);
                    });
            }),
        ).then(() => {
            // Update state with unique replies
            setReplies((prevReplies) => {
                // Filter out duplicates again before updating state
                const filteredReplies = newReplies.filter(
                    (newReply) =>
                        !prevReplies.some(
                            (existingReply) =>
                                existingReply._id === newReply._id,
                        ),
                );
                return [...filteredReplies, ...prevReplies];
            });
        });
    };

    // Handle comment deletion
    const handleDelete = (id: string) => {
        setCommentToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!commentToDelete) {
            return;
        }

        axios
            .delete(
                `${process.env.NEXT_PUBLIC_API_URL}/content/comment/delete/${commentToDelete}`,
            )
            .then(() => {
                setReplies((prev) =>
                    prev.filter((c) => c._id !== commentToDelete),
                );
                fetchComments();
                fetchReplies();
                if (cbDelete) {
                    cbDelete();
                }
                toast.success('Comment deleted successfully');
            })
            .catch((err) => {
                console.error('Error deleting comment:', err);
                toast.error(
                    'Could not delete your comment. Please try again later',
                );
            })
            .finally(() => {
                setDeleteDialogOpen(false);
                setCommentToDelete(null);
            });
    };

    // Handle comment update
    const handleUpdate = ({ id, parentId, contentId, comment }: any) => {
        if (comment && comment.trim() !== '') {
            const data = {
                contentId: contentId,
                comment: comment,
                parentId: '',
            };

            if (parentId) {
                data.parentId = parentId;
            }

            axios
                .patch(
                    `${process.env.NEXT_PUBLIC_API_URL}/content/comment/update/${id}`,
                    data,
                )
                .then(() => {
                    setReplies((prevReplies) => {
                        const index = prevReplies.findIndex(
                            (reply) => reply._id === id,
                        );
                        if (index === -1) {
                            return prevReplies;
                        }
                        const updatedReply = { ...prevReplies[index] };
                        updatedReply.comment = comment;
                        const updatedReplies = [...prevReplies];
                        updatedReplies[index] = updatedReply;
                        return updatedReplies;
                    });
                    fetchComments();
                    fetchReplies();
                    setUpdate('');
                    toast.success('Comment updated successfully');
                })
                .catch((err) => {
                    console.error('Error updating comment:', err);
                    toast.error('Failed to update comment');
                });
        } else {
            toast.warning('Please write something');
        }
    };

    // Fetch comments
    const fetchComments = () => {
        if (contentId) {
            axios
                .get(
                    `${process.env.NEXT_PUBLIC_API_URL}/content/comment/get/${contentId}`,
                )
                .then((res) => {
                    setComments(res.data.comments);
                    if (res.data) {
                        fetchReplies();
                    }
                })
                .catch((err) => {
                    console.error('Error fetching comments:', err);
                });
        }
    };

    // Fetch comments on mount and when contentId changes
    useEffect(() => {
        fetchComments();
    }, [contentId]);

    // Fetch replies when comments change
    useEffect(() => {
        fetchReplies();
    }, [comments]);

    // Handle comment submission
    const handleSubmit = ({ parentId, comment, setComment, isReply }: any) => {
        if (!isAuthenticated) {
            setLoginDialogOpen(true);
            return;
        }

        if (comment && comment.trim() !== '') {
            let reqBody: {
                contentId: string;
                comment: any;
                parentId?: string;
            } = { contentId, comment };
            if (parentId) {
                reqBody = { ...reqBody, parentId };
            }

            setIsSubmitting(true);
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_API_URL}/content/comment/create`,
                    reqBody,
                )
                .then(() => {
                    if (cbPost) {
                        cbPost();
                    }
                    setIsSubmitting(false);
                    fetchComments();
                    fetchReplies();
                    setComment('');
                    setCurrentReply(null);
                    if (parentId) {
                        setOpenReplies((prev) => [...prev, parentId]);
                    }
                    toast.success('Comment posted successfully');
                })
                .catch((err) => {
                    console.error('Error posting comment:', err);
                    setIsSubmitting(false);
                    setComment('');
                    toast.error('Failed to post comment');
                });
        } else {
            toast.warning('Please write something');
        }
    };

    // Auto-resize textarea
    const handleResize = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const target = event.target as HTMLTextAreaElement;
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
    };

    // Comment input component
    const commentInput = ({ parentId, comment, setComment, isReply }: any) => {
        return (
            <div className={`${parentId ? 'ml-12 mt-3' : ''}`}>
                <div className='flex gap-3'>
                    {isAuthenticated && (
                        <Avatar className='h-10 w-10 border border-primary/20'>
                            <AvatarImage
                                src={user?.profilePicture || '/author.png'}
                                alt={user?.firstName || 'User'}
                            />
                            <AvatarFallback>
                                {user?.firstName?.charAt(0) || 'U'}
                            </AvatarFallback>
                        </Avatar>
                    )}

                    <div className='flex-1 space-y-2'>
                        <Textarea
                            ref={inputRef}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onFocus={handleResize as any}
                            onInput={handleResize as any}
                            placeholder='Type your comment'
                            autoFocus={focused}
                            className={`min-h-[80px] resize-none bg-${bgColor}`}
                        />

                        <div className='flex justify-end'>
                            {parentId && (
                                <Button
                                    variant='outline'
                                    size='sm'
                                    className='mr-2'
                                    onClick={() => setCurrentReply(null)}
                                >
                                    Cancel
                                </Button>
                            )}

                            <Button
                                size='sm'
                                disabled={isSubmitting}
                                onClick={() =>
                                    handleSubmit({
                                        parentId,
                                        comment,
                                        setComment,
                                        isReply,
                                    })
                                }
                            >
                                <Send className='h-4 w-4 mr-2' />
                                {isSubmitting ? 'Sending...' : 'Send'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {contentId && (
                <div className='space-y-6'>
                    {withInput && commentInput({ comment, setComment })}

                    <Separator className='my-6 bg-forground-border' />

                    <div
                        style={{ maxHeight: wrapperHeight }}
                        className='overflow-y-auto pr-2'
                    >
                        <Comments
                            commentInput={commentInput}
                            comments={comments}
                            handleUpdate={handleUpdate}
                            replies={replies}
                            isModal={true}
                            contentId={contentId}
                            setCurrentReply={setCurrentReply}
                            currentReply={currentReply}
                            handleDelete={handleDelete}
                            openReplies={openReplies}
                            setOpenReplies={setOpenReplies}
                            isUpdate={isUpdate}
                            setUpdate={setUpdate}
                            wrapperHeight={wrapperHeight}
                        />

                        {comments.length === 0 && (
                            <div className='text-center py-8 text-muted-foreground'>
                                No comments available. Be the first to comment!
                            </div>
                        )}
                    </div>

                    {/* Login Dialog */}
                    <Dialog
                        open={loginDialogOpen}
                        onOpenChange={setLoginDialogOpen}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Login Required</DialogTitle>
                                <DialogDescription>
                                    To leave a comment, please log in to your
                                    account.
                                </DialogDescription>
                            </DialogHeader>
                            <div className='flex justify-end gap-2 mt-4'>
                                <Button
                                    variant='outline'
                                    onClick={() => setLoginDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() =>
                                        (window.location.href = '/login')
                                    }
                                >
                                    Login
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Delete Confirmation Dialog */}
                    <AlertDialog
                        open={deleteDialogOpen}
                        onOpenChange={setDeleteDialogOpen}
                    >
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    You want to delete this comment. This action
                                    cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={confirmDelete}
                                    className='bg-destructive text-destructive-foreground'
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}
        </>
    );
}
