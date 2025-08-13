'use client';
import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle } from 'lucide-react';
import { useAppSelector } from '@/store';
import instance from '@/lib/axios';
import Certificate from '@/components/certificate/Certificate';
import Transcript from '@/components/certificate/Transcript';
import { TCertificate } from '@/types/certificate.type';
import Testimonial from '@/components/certificate/Testimonial';
import { useRouter, useSearchParams } from 'next/navigation';

function VerificationIndex() {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const searchParams = useSearchParams();
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<TCertificate | null>(null);
    const [error, setError] = useState<null | string>(null);
    const router = useRouter();
    console.log({ searchParams });
    useEffect(() => {
        const idFromURL = searchParams.get('certificateId');
        if (idFromURL) {
            setQuery(idFromURL);
        }
    }, [searchParams]);
    const verify = async () => {
        if (!query.trim()) {
            setError('Please enter email or ID');
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            // Replace with your actual API call
            const response = await instance.get(
                `/certificate/verify?query=${encodeURIComponent(query)}`,
            );
            console.log(JSON.stringify(response.data?.certificate, null, 2));

            setData(response.data?.certificate);
            console.log('API call would be made here');
        } catch (err) {
            setError('Verification failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = () => {
        // Replace with your router logic
        router.push(`/auth/login?callback=/verification`);
        console.log('Redirect to login');
    };

    return (
        <div className='min-h-screen pt-20 bg-background'>
            <div className='container mx-auto px-4 py-8'>
                {/* Verification Input Section */}
                <Card className='max-w-2xl mx-auto mb-8'>
                    <CardHeader>
                        <CardTitle className='text-2xl font-bold text-center text-black'>
                            Certificate Verification
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-6'>
                        <div className='space-y-2'>
                            <label
                                htmlFor='verification-id'
                                className='text-sm font-medium text-gray'
                            >
                                Enter verification ID for certificate
                                verification:
                            </label>
                            <Input
                                id='verification-id'
                                placeholder='Enter your ID'
                                value={query}
                                type='text'
                                onChange={(e) => setQuery(e.target.value)}
                                className='w-full'
                                disabled={isLoading}
                            />
                        </div>

                        {isAuthenticated ? (
                            <Button
                                onClick={verify}
                                disabled={isLoading || !query.trim()}
                                className='w-full bg-blue-600 hover:bg-blue-700'
                            >
                                {isLoading && (
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                )}
                                Submit
                            </Button>
                        ) : (
                            <Button
                                onClick={handleLogin}
                                disabled={isLoading}
                                className='w-full bg-blue-600 hover:bg-blue-700'
                            >
                                {isLoading && (
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                )}
                                Click Here to Login
                            </Button>
                        )}

                        {/* Information Section */}
                        <div className='bg-blue-50 p-4 rounded-lg'>
                            <div className='space-y-2 text-sm text-gray-700'>
                                <p className='flex items-start'>
                                    <span className='mr-2'>→</span>
                                    You can verify existing student course
                                    completion, progress, and testimonial.
                                </p>
                                <p className='flex items-start'>
                                    <span className='mr-2'>→</span>
                                    You can also obtain it at the end of the
                                    verification.
                                </p>
                                <p className='flex items-start'>
                                    <span className='mr-2'>→</span>
                                    To verify any students information, you will
                                    need a verification ID!
                                </p>
                            </div>

                            {!isAuthenticated && (
                                <div className='mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded'>
                                    <p className='text-sm text-gray-700'>
                                        <span className='font-semibold text-red-600'>
                                            Note:
                                        </span>{' '}
                                        Please{' '}
                                        <a
                                            href='/auth/register'
                                            className='text-blue-600 hover:underline'
                                        >
                                            Sign Up
                                        </a>{' '}
                                        and{' '}
                                        <a
                                            href='/auth/login'
                                            className='text-blue-600 hover:underline'
                                        >
                                            Sign In
                                        </a>{' '}
                                        to make sure youre the right person to
                                        verify the information.
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Error Display */}
                {error && (
                    <div className='max-w-2xl mx-auto mb-8'>
                        <Alert variant='destructive'>
                            <AlertCircle className='h-4 w-4' />
                            <AlertDescription className='capitalize'>
                                {error}
                            </AlertDescription>
                        </Alert>
                    </div>
                )}

                {/* Results Display */}
                {data && !error && (
                    <div className='space-y-8'>
                        {/* Certificate Component */}
                        <Certificate data={data} />

                        {data?.results && (
                            <>
                                <Transcript data={data} />
                            </>
                        )}

                        {/* Testimonial Component */}
                        <Testimonial data={data} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default VerificationIndex;
