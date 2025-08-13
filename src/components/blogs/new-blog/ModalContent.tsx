import React from 'react';
import { Button } from '@/components/ui/button';

interface ModalContentProps {
    url?: string;
    text?: string;
}

function ModalContent({ url, text }: ModalContentProps) {
    const handleNavigation = (path: string) => {
        window.open(`${path}?callback=${url || window.location}`, '_parent');
    };

    return (
        <div className='flex flex-col items-center p-6 text-center'>
            {text ? (
                <h2 className='text-xl font-semibold mb-4'>
                    <span className='text-primary'>{text}</span>
                </h2>
            ) : (
                <>
                    <h2 className='text-xl font-semibold mb-4'>
                        <span className='text-primary'>SkillBNK Community</span>{' '}
                        is a community of 1500 amazing students.
                    </h2>
                    <p className='text-muted-foreground mb-6'>
                        Were a place where students get professional training,
                        hands on projects to grow their careers.
                    </p>
                </>
            )}

            <div className='flex gap-4 mt-4'>
                <Button onClick={() => handleNavigation('/auth/register')}>
                    Sign Up
                </Button>

                <Button
                    variant='outline'
                    onClick={() => handleNavigation('/auth/login')}
                >
                    Sign In
                </Button>
            </div>
        </div>
    );
}

export default ModalContent;
