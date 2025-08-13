'use client';
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';

interface GoogleAuthProps {
    from?: string;
    sendToRegister: () => void;
}

function GoogleAuth({ from, sendToRegister }: GoogleAuthProps) {
    const router = useRouter();
    const [searchParams, setSearchParams] = React.useState<
        Record<string, string>
    >({});

    // Get search params in client component
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const queryParams: Record<string, string> = {};

            // Convert URLSearchParams to object
            params.forEach((value, key) => {
                queryParams[key] = value;
            });

            setSearchParams(queryParams);
        }
    }, []);

    const responseGoogle = (response: any) => {
        axios
            .post('/user/googleauth', { credential: response.credential })
            .then((res) => {
                Cookies.set(
                    process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || '',
                    `Bearer ${res.data.token}`,
                    { domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN },
                );

                toast.success('Logged in successfully');

                if (searchParams.program) {
                    if (res.data.isEnrolled) {
                        window.location.href = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard`;
                    } else {
                        window.location.href = `/enrollment`;
                    }
                } else if (searchParams.course) {
                    window.location.href = `/course/${searchParams.course}`;
                } else if (searchParams.interview) {
                    window.location.href = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/interview/${searchParams.interview}`;
                } else if (searchParams.callback) {
                    window.location.href = searchParams.callback;
                } else if (res.data.isEnrolled) {
                    window.location.href = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard`;
                } else {
                    window.location.href = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard`;
                }
            })
            .catch((err) => {
                console.error(err);
                if (err.response) {
                    if (err.response?.status === 404) {
                        sendToRegister();
                    }
                }
                toast.error(
                    err?.response?.data?.error || 'Something went wrong',
                );
            });
    };

    return (
        <div className='google-btn'>
            <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => {
                    console.error('Google Login Failed');
                    toast.error('Google login failed. Please try again.');
                }}
                useOneTap
                type='icon'
                shape='circle'
                theme='filled_blue'
                logo_alignment='center'
            />
        </div>
    );
}

export default GoogleAuth;
