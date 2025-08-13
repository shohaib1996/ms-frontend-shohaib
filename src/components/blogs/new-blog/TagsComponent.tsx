import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Updated import from next/navigation
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface Tag {
    _id: string;
    name: string;
    count: number;
}

interface BlogState {
    tag: string;
}

interface RootState {
    blog: BlogState;
}

function TagsComponent() {
    const [tags, setTags] = useState<Tag[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const { tag } = useSelector<RootState, BlogState>((state) => state.blog);

    const fetchTags = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/blog/tags`,
            );
            setTags(res?.data?.tags);
        } catch (err: any) {
            console.error(err);
            toast.error('Failed to load tags', {
                description:
                    err?.response?.data?.error || 'Something went wrong',
            });
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    const handleClick = (name: string) => {
        const newTag = tag === name ? '' : name;
        const currentParams = new URLSearchParams(searchParams.toString());

        if (newTag) {
            currentParams.set('tag', newTag);
        } else {
            currentParams.delete('tag');
        }

        // If a "slug" exists in the current query, navigate to "/blogs"
        const slug = searchParams.get('slug');
        if (slug) {
            router.push(`/blogs?${currentParams.toString()}`);
        } else {
            router.push(`?${currentParams.toString()}`);
        }

        dispatch({
            type: 'SET_TAG',
            payload: newTag,
        });
    };

    return (
        <Card className='mb-3 text-black'>
            <CardHeader className='pb-2'>
                <CardTitle className='text-xl justify-between flex'>
                    Tags{' '}
                    <span
                        className='text-sm text-primary cursor-pointer'
                        onClick={() => handleClick('')}
                    >
                        Reset
                    </span>
                </CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className='pt-4'>
                <div className='flex flex-wrap gap-2'>
                    {tags.map((t) => (
                        <Badge
                            key={t._id}
                            variant={
                                (tag || searchParams.get('tag') || '') ===
                                t.name
                                    ? 'default'
                                    : 'outline'
                            }
                            className='cursor-pointer px-3 py-1  transition-colors'
                            onClick={() => handleClick(t.name)}
                        >
                            {t.name} <span className='ml-1'>({t.count})</span>
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default TagsComponent;
