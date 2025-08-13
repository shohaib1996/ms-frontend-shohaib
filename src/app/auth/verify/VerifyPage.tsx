'use client';

import type React from 'react';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import LinesSvg from '../../../../public/linesSvg';

interface VerifyPageProps {
    handleOtp: (e: React.FormEvent) => void;
    setOtp: (otp: string) => void;
    setIsVerificationSent: (value: boolean) => void;
    channel: string;
    otpEmail: string;
    otpPhone: {
        countryCode: string;
        number: string;
    };
    verifyOtp: () => void;
    isVerificationSent: boolean;
    onClose?: () => void;
}

export default function VerifyPage({
    handleOtp,
    setOtp,
    setIsVerificationSent,
    channel,
    otpEmail,
    otpPhone,
    verifyOtp,
    isVerificationSent,
    onClose,
}: VerifyPageProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [otpArray, setOtpArray] = useState<string[]>(new Array(6).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
    const { theme, resolvedTheme } = useTheme();

    const handleChangeOtp = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const value = e.target.value;
        const newOtpArray = [...otpArray];

        // Update current input with the last character typed or pasted
        newOtpArray[index] = value.slice(-1);

        // Set the updated array back to state
        setOtpArray(newOtpArray);
        setOtp(newOtpArray.join(''));

        // Move focus forward or backward based on input
        if (!value) {
            // Move focus backward if input is empty (user has pressed backspace)
            if (index > 0 && inputRefs.current[index - 1]) {
                inputRefs.current[index - 1]?.focus();
            }
        } else if (
            index < otpArray.length - 1 &&
            inputRefs.current[index + 1]
        ) {
            // Move focus forward if input is filled
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        if (e.key === 'Backspace' && !otpArray[index]) {
            // Focus previous input if backspace is pressed on an already empty input
            if (index > 0 && inputRefs.current[index - 1]) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, 6); // Get first 6 digits from clipboard
        const newOtpArray = [...otpArray];

        // Start filling inputs from the currently focused input
        const pasteIndex = pasteData.length > 0 ? pasteData.length : 0;
        for (let i = 0; i < pasteIndex; i++) {
            newOtpArray[i] = pasteData[i];
            if (inputRefs.current[i]) {
                inputRefs.current[i]!.value = pasteData[i]; // Set value for each ref input
            }
        }

        setOtpArray(newOtpArray);
        setOtp(newOtpArray.join(''));
        // Set focus after the last pasted input
        if (pasteIndex < 6 && inputRefs.current[pasteIndex]) {
            inputRefs.current[pasteIndex]?.focus();
        }
    };

    useEffect(() => {
        // Always focus the first input on mount
        if (inputRefs.current[0]) {
            inputRefs.current[0]?.focus();
        }
    }, []);

    return (
        <div className=' grid md:grid-cols-2 min-h-screen'>
            <div className='flex flex-col items-center justify-center p-6 md:p-10'>
                <div className='w-full max-w-md space-y-6'>
                    <div className='flex justify-center'>
                        <Image
                            src={
                                resolvedTheme === 'dark'
                                    ? '/logo/logo-dark.png'
                                    : '/logo/logo.png'
                            }
                            alt='SchoolHubs Logo'
                            height={45}
                            width={180}
                        />
                    </div>

                    <div className='text-center space-y-2'>
                        <h3 className='text-2xl font-bold text-black'>
                            Verification
                        </h3>
                        <p className='text-gray'>
                            Enter the 6-digit code that we sent to the <br />
                            {channel === 'sms'
                                ? 'phone number'
                                : 'email address'}{' '}
                            {channel === 'email' &&
                                otpEmail?.slice(0, 2) +
                                    '********' +
                                    '@gmail.com'}
                            {channel === 'sms' &&
                                '+' +
                                    otpPhone?.countryCode +
                                    otpPhone?.number.slice(0, 2) +
                                    '******' +
                                    otpPhone?.number.slice(-2)}
                        </p>
                    </div>

                    <div className='w-full'>
                        <form onSubmit={handleOtp} className='space-y-6'>
                            <div className='flex justify-between gap-2'>
                                {otpArray.map((_, index) => (
                                    <div
                                        key={index}
                                        className='w-full max-w-[3rem]'
                                    >
                                        <Input
                                            ref={(el) => {
                                                inputRefs.current[index] = el;
                                            }}
                                            onChange={(e) =>
                                                handleChangeOtp(e, index)
                                            }
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, index)
                                            }
                                            onPaste={handlePaste}
                                            className='text-center text-lg h-12 w-full text-black dark:text-white font-bold'
                                            type='text'
                                            maxLength={1}
                                            pattern='[0-9]*'
                                            autoComplete='off'
                                            inputMode='numeric'
                                        />
                                    </div>
                                ))}
                            </div>

                            <Button
                                type='submit'
                                className='w-full'
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <svg
                                        className='animate-spin -ml-1 mr-3 h-4 w-4 text-white'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                    >
                                        <circle
                                            className='opacity-25'
                                            cx='12'
                                            cy='12'
                                            r='10'
                                            stroke='currentColor'
                                            strokeWidth='4'
                                        ></circle>
                                        <path
                                            className='opacity-75'
                                            fill='currentColor'
                                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                        ></path>
                                    </svg>
                                ) : (
                                    'Submit'
                                )}
                            </Button>

                            <p className='text-center text-gray text-sm'>
                                Haven&apos;t received your code?{' '}
                                <span
                                    className='text-primary-white hover:text-primary cursor-pointer'
                                    onClick={() =>
                                        setIsVerificationSent(
                                            !isVerificationSent,
                                        )
                                    }
                                >
                                    Get a new one.
                                </span>
                            </p>
                            <Link href='/auth/login'>
                                <div
                                    className='text-center text-sm text-gray flex flex-row items-center justify-center gap-1 mt-3'
                                    onClick={onClose}
                                >
                                    <ArrowLeft className='h-4 w-4 text-gray' />
                                    Back
                                </div>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>

            {/* Right Side - Branding */}
            <div className='relative w-full flex-1 overflow-hidden md:flex hidden min-h-screen flex-col gap-10 justify-center bg-primary text-center'>
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
                    <Image
                        alt='SkillBNK logo'
                        className='w-64'
                        src='/logo-white.png'
                        height={60}
                        width={200}
                    />

                    <h3 className='mt-common text-4xl font-bold text-pure-white'>
                        Hello, Friends!
                    </h3>

                    <p className='mx-36 w-full md:w-[50%] mt-common self-center text-center font-semibold text-pure-white'>
                        Enter Your Personal details and start journey with us
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
        </div>
    );
}
