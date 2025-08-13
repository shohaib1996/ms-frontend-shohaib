import React from 'react';
// Use the new Next.js 13 navigation hooks
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, ChevronDown } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface Category {
    _id: string;
    name: string;
    slug: string;
}

interface BlogState {
    categories: Category[];
    category: string;
}

interface RootState {
    blog: BlogState;
}

function DropDownMenu() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const { categories, category } = useSelector<RootState, BlogState>(
        (state) => state.blog,
    );

    const handleMenuClick = (value: string) => {
        const slug = searchParams.get('slug');
        if (slug) {
            router.push('/blogs');
        }

        dispatch({
            type: 'SET_CATEGORY',
            payload: category === value ? '' : value,
        });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon'>
                        <Menu />
                        <span className='sr-only'>Menu</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='end' className='w-56'>
                    {categories?.map((c) => (
                        <DropdownMenuItem
                            key={c._id}
                            onClick={() => handleMenuClick(c.slug)}
                            className={category === c.slug ? 'bg-muted' : ''}
                        >
                            {c.name}
                        </DropdownMenuItem>
                    ))}

                    <DropdownMenuItem>My Posts</DropdownMenuItem>
                    <DropdownMenuItem>Reading List</DropdownMenuItem>
                    <DropdownMenuItem>Archives Posts</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default DropDownMenu;
