import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface AuthState {
    isAuthenticated: boolean;
}

interface RootState {
    auth: AuthState;
}

function LeftUserMenu() {
    const router = useRouter();
    const { isAuthenticated } = useSelector<RootState, AuthState>(
        (state) => state.auth,
    );

    const handleClick = () => {
        if (isAuthenticated) {
            router.push('/blogs/my-blog');
        } else {
            // Show a toast notification using Sonner instead of opening a dialog
            toast.error('Please log in to view your posts', {
                description: 'You need to be logged in to access this feature',
                action: {
                    label: 'Login',
                    onClick: () => router.push('/login'),
                },
            });
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <Card className='mb-3'>
            <CardContent className='p-4'>
                <nav className='space-y-2'>
                    <div className='w-full'>
                        <Button
                            variant='ghost'
                            className='w-full justify-start text-left font-normal'
                            onClick={handleClick}
                        >
                            My Posts
                        </Button>
                    </div>
                    {/*
                    <div className="w-full">
                        <Button variant="ghost" className="w-full justify-start text-left font-normal" asChild>
                            <Link href="#">Reading List</Link>
                        </Button>
                    </div>
                    */}
                    {/*
                    <div className="w-full">
                        <Button variant="ghost" className="w-full justify-start text-left font-normal flex items-center">
                            Archives Posts
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                    */}
                </nav>
            </CardContent>
        </Card>
    );
}

export default LeftUserMenu;
