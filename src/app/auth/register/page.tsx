'use client';
import type React from 'react';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import WithAuth from '@/helper/withAuth';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Components
import LinesSvg from '../../../../public/linesSvg';
import RegisterForm from './RegisterForm';
import { useTheme } from 'next-themes';
import Verification from '../Verification/Verification';

// Types
interface VerificationData {
    email?: string;
    phone?: string;
    _id?: string;
}

const RegisterPage: React.FC = () => {
    const router = useRouter();

    // State for OTP verification
    const [active, setActive] = useState<string>('register');
    const [otpEmail, setOtpEmail] = useState<string>('');
    const [otpPhone, setOtpPhone] = useState<any>({});
    const [userId, setUserId] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    const sendOtpData = (val: VerificationData) => {
        setActive('verification');
        setOtpEmail(val.email || '');
        setOtpPhone(val.phone || {});
        setUserId(val._id || '');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setActive('register');
    };

    const { theme, resolvedTheme } = useTheme();

    return (
        <WithAuth>
            <div className='min-h-screen flex flex-col'>
                <Head>
                    <title>
                        Register On SkillBNK - Access Educational Programs
                    </title>
                    <meta
                        name='description'
                        content='Join SkillBNK today! Register now to track daily activities, boost skills, and enhance learning.'
                    />
                    <meta
                        name='keywords'
                        content='start journey SkillBNK, join SkillBNK, student portal, SkillBNK register, register SkillBNK, sign up SkillBNK'
                    />

                    {/* JSON-LD Schema Markup */}
                    <script
                        type='application/ld+json'
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                '@context': 'https://schema.org/',
                                '@type': 'BreadcrumbList',
                                itemListElement: [
                                    {
                                        '@type': 'ListItem',
                                        position: 1,
                                        name: 'Register SkillBNK',
                                        item: 'https://www.bootcampshub.ai/auth/register',
                                    },
                                    {
                                        '@type': 'ListItem',
                                        position: 2,
                                        name: 'Contact SkillBNK',
                                        item: 'https://www.bootcampshub.ai/contact',
                                    },
                                ],
                            }),
                        }}
                    />

                    <script
                        type='application/ld+json'
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                '@context': 'https://schema.org',
                                '@type': 'Article',
                                mainEntityOfPage: {
                                    '@type': 'WebPage',
                                    '@id': 'https://www.bootcampshub.ai/auth/register',
                                },
                                headline:
                                    'Register On SkillBNK For Access To Diverse, Inclusive, And Equitable Educational Programs.',
                                description:
                                    'Join SkillBNK today! Register now to track daily activities, boost skills, and enhance learning.',
                                image: 'https://www.bootcampshub.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FRegisterImage.ad34c1f5.png&w=640&q=75',
                                author: {
                                    '@type': 'Person',
                                    name: 'Shiblu Ahmad',
                                    url: 'https://www.bootcampshub.ai/founder',
                                },
                                publisher: {
                                    '@type': 'Organization',
                                    name: 'SkillBNK',
                                    logo: {
                                        '@type': 'ImageObject',
                                        url: 'https://www.bootcampshub.ai/multischool/new-folder/SchoolHubs-logo-final.png',
                                    },
                                },
                                datePublished: '2024-06-08',
                                dateModified: '2044-02-09',
                            }),
                        }}
                    />
                </Head>

                <main className='flex-grow flex'>
                    {/* Left Side - Registration Form */}
                    <div className='w-full lg:w-1/2 bg-background text-black p-8 flex flex-col justify-center'>
                        <div className='max-w-md mx-auto w-full'>
                            <div className='text-center mb-6'>
                                <Image
                                    src={
                                        resolvedTheme === 'dark'
                                            ? '/logo/logo-dark.png'
                                            : '/logo/logo.png'
                                    }
                                    alt='SkillBNK Logo'
                                    height={45}
                                    width={180}
                                    className='mx-auto'
                                />
                            </div>

                            <h1 className='text-3xl font-bold mb-8 text-center'>
                                Create an account
                            </h1>

                            <RegisterForm sendOtpData={sendOtpData} />
                        </div>
                    </div>

                    {/* Right Side - Branding */}
                    <div className='relative flex-1 overflow-hidden md:flex hidden min-h-screen w-1/2 flex-col gap-10 justify-center bg-[#052466]  text-center'>
                        {/* SVG background lines */}
                        <div className='line-svg absolute left-0 w-full'>
                            <LinesSvg />
                        </div>

                        {/* Animated circles */}
                        <div className='right-bottom-circle absolute -bottom-36 -right-24'>
                            <div
                                className='rounded-full bg-pure-white/20 w-[506px] h-[506px] animate-pulse'
                                style={{ animationDelay: '1s' }}
                            ></div>
                        </div>

                        <div className='left-middle-circle absolute left-20 bottom-1/3'>
                            <div
                                className='rounded-full bg-pure-white/20 w-[124px] h-[124px] animate-pulse'
                                style={{ animationDelay: '2s' }}
                            ></div>
                        </div>

                        {/* Content */}
                        <div className='flex flex-col gap-2 items-center z-10 mt-[50px]'>
                            {/* CEO sir told to remove */}
                            {/* <Image
                                alt='SkillBNK logo'
                                className='w-64'
                                src='/logo/logo-dark.png'
                                height={60}
                                width={200}
                            /> */}

                            <h3 className='mt-common text-4xl font-bold text-pure-white'>
                                Hello, Friends!
                            </h3>

                            <p className='mx-36 w-full md:w-[50%] mt-common self-center text-center font-semibold text-pure-white'>
                                Enter Your Personal details and start journey
                                with us
                            </p>

                            <Button
                                variant='white'
                                onClick={() => router.push('/auth/login')}
                                className='mt-4 bg-white text-primary hover:bg-gray-100 font-medium px-10 py-2'
                            >
                                Sign In
                            </Button>
                        </div>

                        {/* Registration Image */}
                        <div className='z-10 mt-4 m-auto'>
                            <Image
                                alt='SkillBNK Registration'
                                src='/mobile.png'
                                height={877}
                                width={691}
                                className='h-[400px] w-full'
                            />
                        </div>
                    </div>
                </main>
            </div>

            {/* Verification Modal */}
            <Verification
                userId={userId}
                otpPhone={otpPhone}
                otpEmail={otpEmail}
                onClose={handleClose}
                setActive={setActive}
                active={active}
                open={open}
            />
        </WithAuth>
    );
};

export default RegisterPage;
