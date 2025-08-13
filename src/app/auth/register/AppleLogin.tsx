'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Apple } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import AppleSignin from 'react-apple-signin-auth';
import { toast } from 'sonner';

interface AppleLoginProps {
    sendToRegister: () => void;
}

interface AppleAuthResponse {
    authorization: {
        code?: string;
        id_token?: string;
        state?: string;
    };
}

function AppleLogin({ sendToRegister }: AppleLoginProps) {
    const router = useRouter();
    const [searchParams, setSearchParams] = useState<Record<string, string>>(
        {},
    );

    // Get search params in client component
    useEffect(() => {
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

    const responseApple = (data: AppleAuthResponse) => {
        if (!data?.authorization?.id_token) {
            return toast.error('Login failed');
        }

        axios
            .post('/user/appleauth', { tokenId: data.authorization.id_token })
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
        <AppleSignin
            /** Auth options passed to AppleID.auth.init() */
            authOptions={{
                /** Client ID - eg: 'com.example.com' */
                clientId: 'us.ts4u.web',
                /** Requested scopes, seperated by spaces - eg: 'email name' */
                scope: 'email name',
                /** Apple's redirectURI - must be one of the URIs you added to the serviceID */
                redirectURI: `${process.env.NEXT_PUBLIC_CLIENT_URL}/auth`,
                /** State string that is returned with the apple response */
                state: 'state',
                /** Nonce */
                nonce: 'nonce',
                /** Uses popup auth instead of redirection */
                usePopup: true,
            }}
            /** General props */
            uiType='dark'
            /** className */
            className='apple-auth-btn'
            /** Removes default style tag */
            noDefaultStyle={false}
            /** Allows to change the button's children, eg: for changing the button text */
            buttonExtraChildren='Continue with Apple'
            /** Called upon signin success */
            onSuccess={(response: any) =>
                responseApple(response as AppleAuthResponse)
            }
            /** Called upon signin error */
            onError={(error: any) => toast.error('Login failed')}
            /** Skips loading the apple script if true */
            skipScript={false}
            /** Apple image props */
            iconProps={{ style: { marginTop: '10px' } }}
            /** render function for custom UI */
            render={(props: any) => (
                <div className='google-btn' {...props}>
                    <div className='google_signIn_btn_2'>
                        <div className='google_icon'>
                            <svg
                                className='text-black'
                                fill='currentColor'
                                height='30px'
                                width='30px'
                                version='1.1'
                                id='Capa_1'
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                viewBox='0 0 22.773 22.773'
                                xmlSpace='preserve'
                            >
                                <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                                <g
                                    id='SVGRepo_tracerCarrier'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                ></g>
                                <g id='SVGRepo_iconCarrier'>
                                    {' '}
                                    <g>
                                        {' '}
                                        <g>
                                            {' '}
                                            <path d='M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z'></path>{' '}
                                            <path d='M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z'></path>{' '}
                                        </g>{' '}
                                        <g> </g> <g> </g> <g> </g> <g> </g>{' '}
                                        <g> </g> <g> </g> <g> </g> <g> </g>{' '}
                                        <g> </g> <g> </g> <g> </g> <g> </g>{' '}
                                        <g> </g> <g> </g> <g> </g>{' '}
                                    </g>{' '}
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        />
    );
}

export default AppleLogin;
