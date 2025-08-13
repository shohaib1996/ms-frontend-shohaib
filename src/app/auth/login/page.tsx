'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// UI Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

// Icons
import {
    EyeIcon,
    EyeOffIcon,
    Info,
    AlertCircle,
    Loader2,
    X,
} from 'lucide-react';

// Layout components
import WithAuth from '@/helper/withAuth';
import LinesSvg from '../../../../public/linesSvg';
import { useTheme } from 'next-themes';
import GoogleAuth from '../register/GoogleLogin';
import AppleLogin from '../register/AppleLogin';
import instance from '@/lib/axios';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Verification from '../Verification/Verification';

// Form validation schema
const loginFormSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

// Types
interface VerificationData {
    email?: string;
    phone?: string;
    _id?: string;
}

const LoginPage: React.FC = () => {
    const { theme, resolvedTheme } = useTheme();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useState<any>({});
    const [open, setOpen] = useState<boolean>(false);
    // Get search params in client component
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const queryParams: any = {};

            // Convert URLSearchParams to object
            params.forEach((value, key) => {
                queryParams[key] = value;
            });

            setSearchParams(queryParams);
        }
    }, []);

    // Verification state
    const [active, setActive] = useState<string>('login');
    const [otpEmail, setOtpEmail] = useState<string>('');
    const [otpPhone, setOtpPhone] = useState<any>('');
    const [userId, setUserId] = useState<string>('');

    // Initialize form with React Hook Form
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        setGeneralError(null);
        setIsLoading(true);

        try {
            const response = await instance.post('/user/login', {
                email: values.email,
                password: values.password,
            });

            const { isVerified, success, token, email, phone, _id } =
                response.data;

            // If account is not verified, show verification modal
            if (!isVerified) {
                sendOtpData({ email, phone, _id });
                setIsLoading(false);
                return;
            }

            // If login successful
            if (success) {
                // Set auth token cookie
                Cookies.set(
                    process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || '',
                    `Bearer ${token}`,
                    { domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN },
                );

                // window.location.href = '/';

                // Handle redirect based on search params
                if (searchParams.program) {
                    if (response.data.isEnrolled) {
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
                } else if (response.data.isEnrolled) {
                    window.location.href = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard`;
                } else {
                    window.location.href = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard`;
                }
            }
        } catch (err: any) {
            console.error(err);
            if (err?.response?.data?.error) {
                setGeneralError(
                    typeof err.response.data.error === 'string'
                        ? err.response.data.error
                        : 'Login failed. Please check your credentials.',
                );
            } else {
                setGeneralError('An error occurred. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const sendOtpData = (val: VerificationData) => {
        setActive('verification');
        setOtpEmail(val?.email || '');
        setOtpPhone(val?.phone || '');
        setUserId(val?._id || '');
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setActive('login');
    };
    return (
        <WithAuth>
            <div className='min-h-screen flex flex-col'>
                <Head>
                    <title>
                        Log In To SkillBNK - Educational Resources & Activity
                        Tracking
                    </title>
                    <meta
                        name='description'
                        content='Log in to SkillBNK to track daily activities, access resources, and enhance your learning. Join now!'
                    />
                    <meta
                        name='keywords'
                        content='SkillBNK login, login SkillBNK, sign in SkillBNK, SkillBNK sign in, student portal'
                    />
                </Head>

                <main className='flex-grow flex'>
                    {/* Left Side - Login Form */}
                    <div className='w-full lg:w-1/2 bg-background text-black p-8 flex flex-col justify-center'>
                        <div className='max-w-md mx-auto w-full'>
                            <div className='text-center mb-6'>
                                <Image
                                    width={200}
                                    height={40}
                                    src={
                                        resolvedTheme === 'dark'
                                            ? '/logo/logo-dark.png'
                                            : '/logo/logo.png'
                                    }
                                    alt='SkillBNK logo'
                                    className='mx-auto'
                                />
                            </div>

                            <h1 className='text-3xl font-bold mb-8 text-center'>
                                Welcome back!
                            </h1>

                            {generalError && (
                                <Alert
                                    variant='destructive'
                                    className='mb-6 p-2 flex flex-row items-center'
                                >
                                    <AlertCircle size={20} className='-mt-1' />
                                    <AlertDescription className='mt-2 ml-2'>
                                        {generalError}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className='space-y-4'
                                >
                                    {/* Email Field */}
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-dark-gray'>
                                                    Email
                                                    <span className='text-danger'>
                                                        *
                                                    </span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className='relative'>
                                                        <Input
                                                            type='email'
                                                            defaultValue={
                                                                '186mdshimul@gmail.com'
                                                            }
                                                            placeholder='Enter your email'
                                                            {...field}
                                                            className='bg-foreground border text-gray'
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Password Field */}
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-dark-gray'>
                                                    Password
                                                    <span className='text-danger'>
                                                        *
                                                    </span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className='relative'>
                                                        <Input
                                                            type={
                                                                showPassword
                                                                    ? 'text'
                                                                    : 'password'
                                                            }
                                                            placeholder='••••••••••••'
                                                            defaultValue={
                                                                'Ashraful186@@'
                                                            }
                                                            {...field}
                                                            className='bg-foreground border text-gray pr-10'
                                                        />
                                                        <button
                                                            type='button'
                                                            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                                                            onClick={() =>
                                                                setShowPassword(
                                                                    !showPassword,
                                                                )
                                                            }
                                                        >
                                                            {showPassword ? (
                                                                <EyeOffIcon className='h-5 w-5' />
                                                            ) : (
                                                                <EyeIcon className='h-5 w-5' />
                                                            )}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                                <div className='flex items-center text-sm text-muted-foreground mt-1'>
                                                    <span className='mr-1'>
                                                        Must be at least 6
                                                        characters
                                                    </span>
                                                    <Popover
                                                        open={menuOpen}
                                                        onOpenChange={
                                                            setMenuOpen
                                                        }
                                                    >
                                                        <PopoverTrigger asChild>
                                                            <Info className='h-4 w-4 cursor-pointer' />
                                                        </PopoverTrigger>
                                                        <PopoverContent className='w-80'>
                                                            <div className='flex items-center justify-between'>
                                                                <h3 className='font-medium'>
                                                                    Password
                                                                    Requirements
                                                                </h3>
                                                                <Button
                                                                    variant='ghost'
                                                                    size='sm'
                                                                    className='h-6 w-6 p-0'
                                                                    onClick={() =>
                                                                        setMenuOpen(
                                                                            false,
                                                                        )
                                                                    }
                                                                >
                                                                    <X className='h-4 w-4' />
                                                                </Button>
                                                            </div>
                                                            <Separator className='my-2' />
                                                            <div className='text-sm'>
                                                                <p>{`It's better to have:`}</p>
                                                                <p>
                                                                    1. Upper and
                                                                    lower case
                                                                    letters
                                                                </p>
                                                                <p>
                                                                    2. A Symbol
                                                                    (@$&)
                                                                </p>
                                                                <p>
                                                                    3. A longer
                                                                    password
                                                                </p>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Submit Button */}
                                    <Button
                                        type='submit'
                                        className='w-full'
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                                Signing in...
                                            </>
                                        ) : (
                                            'Sign In'
                                        )}
                                    </Button>

                                    {/* Forgot Password Link */}
                                    <div className='text-center'>
                                        <Link
                                            href='/auth/forgot-password'
                                            className='text-primary text-sm'
                                        >
                                            Forgot password
                                        </Link>
                                    </div>
                                    {/* <div className="text-center flex flex-col items-center w-full">
                                        <p
                                            className="text-gray"
                                        >
                                            Or Sign In With
                                        </p>

                                        <div className="auth_social_container flex flex-row items-center gap-3">
                                            <GoogleAuth />
                                            <AppleLogin />
                                        </div>
                                    </div> */}
                                    {/* Register Link */}
                                    <div className='text-center text-sm'>
                                        {`Don't have an account?`}{' '}
                                        <Link
                                            href='/auth/register'
                                            className='text-primary font-medium'
                                        >
                                            Register
                                        </Link>
                                    </div>

                                    {/* Terms and Conditions */}
                                    <div className='text-xs text-center text-gray mt-8'>
                                        {`By clicking "Sign In", you agree to our`}{' '}
                                        <Link
                                            href='/terms-and-condition'
                                            className='text-primary'
                                        >
                                            Terms of Condition
                                        </Link>{' '}
                                        and{' '}
                                        <Link
                                            href='/privacy-policy'
                                            className='text-primary'
                                        >
                                            Privacy Policy
                                        </Link>
                                        .
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>

                    {/* Right Side - Branding */}
                    <div className='relative flex-1 overflow-hidden md:flex hidden min-h-screen w-1/2 flex-col items-center gap-10 justify-center   py-3 bg-[#052466]'>
                        <div className='flex flex-col gap-2 items-center z-10'>
                            {/* CEO sir told to comment it */}
                            {/* <Image
                                className='w-64'
                                width={200}
                                height={60}
                                src={'/logo/logo-dark.png'}
                                alt='SkillBNK logo'
                            /> */}
                            <h3 className='mt-common text-4xl font-bold text-pure-white'>
                                Welcome Back!
                            </h3>
                            <p className='mx-36 w-full md:w-[50%] mt-common self-center text-center font-semibold text-pure-white'>
                                to keep connection with use please login with
                                your personal info
                            </p>
                            <Link href='/auth/register'>
                                <Button variant='white'>Register</Button>
                            </Link>
                        </div>

                        <div className='laptop_image z-10'>
                            <Image
                                alt='SkillBNK Branch'
                                src='/leptop.png'
                                height={445}
                                width={544}
                                className='w-full h-[400px]'
                            />
                        </div>
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
                        <div className='line-svg absolute left-0 w-full'>
                            <LinesSvg />
                        </div>
                    </div>
                </main>
            </div>

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

export default LoginPage;
