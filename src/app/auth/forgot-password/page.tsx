'use client';

import type React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import PasswordValidator from 'password-validator';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ForgotForm } from './Forgot';
import { VerifyForm } from './VerifyForm';
import { ResetForm } from './ResetForm';
import Link from 'next/link';
import LinesSvg from '../../../../public/linesSvg';
import { useTheme } from 'next-themes';

// Create a schema
const schema = new PasswordValidator();

// Add properties to it
schema
    .is()
    .min(8)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .symbols(1)
    .has()
    .digits(1)
    .has()
    .not()
    .spaces();

interface FormErrors {
    otp?: string;
    password?: string;
    confirm?: string;
    error?: string;
}

export default function ForgotPasswordPage() {
    const [active, setActive] = useState<'forgot' | 'verify' | 'reset'>(
        'forgot',
    );
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [data, setData] = useState({ password: '', confirm: '' });
    const [errors, setErrors] = useState<FormErrors | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [channel, setChannel] = useState<'email' | 'sms'>('email');
    const { resolvedTheme } = useTheme();
    const { toast } = useToast();
    const router = useRouter();

    const setStatus = (val: string) => {
        setActive('verify');
        if (channel === 'email') {
            setEmail(val);
        } else {
            setPhone(val);
        }
    };

    const resetValidator = (otp: string, password: string, confirm: string) => {
        const error: FormErrors = {};

        if (!otp) {
            error.otp = 'Please enter your OTP code';
        }

        if (!password) {
            error.password = 'Enter your password';
        } else if (!schema.validate(password)) {
            const validationErrors = schema.validate(password, {
                list: true,
            }) as string[];

            const errorTexts: string[] = [];
            validationErrors.forEach((error) => {
                if (error === 'min') {
                    errorTexts.push('minimum 8 digit');
                }
                if (error === 'uppercase') {
                    errorTexts.push('at least one uppercase');
                }
                if (error === 'lowercase') {
                    errorTexts.push('at least one lowercase');
                }
                if (error === 'symbols') {
                    errorTexts.push('at least one special character');
                }
                if (error === 'digits') {
                    errorTexts.push('at least one number');
                }
            });

            error.password = 'Password should be ' + errorTexts.join(', ');
        }

        if (!confirm) {
            error.confirm = 'Please enter confirm password';
        } else if (password !== confirm) {
            error.confirm = "Password didn't match";
        }

        return {
            error,
            isError: Object.keys(error).length === 0,
        };
    };

    const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        const validate = resetValidator(otp, data.password, data.confirm);

        if (!validate.isError) {
            return setErrors(validate.error);
        }

        setErrors(null);
        setIsLoading(true);

        axios
            .patch('/user/password/reset', {
                email,
                otp: otp,
                channel,
                phone,
                password: data.password,
            })
            .then((res) => {
                if (res.data.success) {
                    toast({
                        title: 'Success',
                        description: 'Password changed successfully',
                        variant: 'default',
                    });
                    router.push('/auth/login');
                }
                setIsLoading(false);
            })
            .catch((err) => {
                if (err && err.response) {
                    setErrors(err.response.data);
                }
                setIsLoading(false);
            });
    };

    function maskEmail(email: string) {
        const atIndex = email.indexOf('@');
        if (atIndex === -1) {
            return 'Invalid email format';
        }

        const user = email.substring(0, atIndex);
        const domain = email.substring(atIndex);

        if (user.length < 2) {
            return 'Email username too short to mask';
        }

        const maskedUser = user.substring(0, 2) + '*'.repeat(user.length - 2);
        return maskedUser + domain;
    }

    return (
        <>
            {/* <Seo
                title="TS4U - Forget Password"
                description="Any user can easily recover his/her account by verifying a OTP through gmail."
                url="auth/forgot-password"
            /> */}

            <div className=''>
                <div className='grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden shadow-lg'>
                    {/* Left side - Form */}
                    <div className='p-8 flex flex-col items-center justify-center'>
                        <div className='mb-6'>
                            <Image
                                src={
                                    resolvedTheme === 'dark'
                                        ? '/logo/logo-dark.png'
                                        : '/logo/logo.png'
                                }
                                alt='SkillBNK Logo'
                                height={45}
                                width={180}
                            />
                        </div>

                        {active === 'forgot' && (
                            <div className='text-center mb-6'>
                                <h3 className='text-2xl font-bold mb-2 text-black'>
                                    Forgot Password
                                </h3>
                                <p className='text-gray'>
                                    Enter the email address with your account
                                    <br />
                                    {`and we'll send an email with confirmation to`}
                                    <br />
                                    reset your password.
                                </p>
                            </div>
                        )}

                        {active === 'verify' && (
                            <div className='text-center mb-6'>
                                <h3 className='text-2xl font-bold mb-2 text-black'>
                                    Verification
                                </h3>
                                <p className='text-gray'>
                                    Enter the 6-digit code that we sent to the
                                    <br />
                                    email address {maskEmail(email)}
                                </p>
                            </div>
                        )}

                        {active === 'reset' && (
                            <div className='text-center mb-6'>
                                <h3 className='text-2xl font-bold mb-2 text-black'>
                                    Reset Password
                                </h3>
                                <p className='text-gray'>
                                    Setting up password for
                                    <br />
                                    {email}
                                </p>
                            </div>
                        )}

                        <Card className='w-full max-w-md p-0 bg-transparent border-none'>
                            <CardContent className='p-0 bg-transparent'>
                                {active === 'forgot' && (
                                    <ForgotForm
                                        handleNewPassForm={setStatus}
                                        channel={channel}
                                        setChannel={setChannel}
                                    />
                                )}

                                {active === 'verify' && (
                                    <VerifyForm
                                        setOtp={setOtp}
                                        setActive={setActive}
                                    />
                                )}

                                {active === 'reset' && (
                                    <ResetForm
                                        data={data}
                                        errors={errors}
                                        isLoading={isLoading}
                                        handleChangeRegister={
                                            handleChangeRegister
                                        }
                                        handleRegister={handleRegister}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Side - Branding */}
                    <div className='relative flex-1 overflow-hidden md:flex hidden min-h-screen w-full flex-col items-center gap-10 justify-center bg-[#052466] text-center'>
                        <div className='flex flex-col gap-2 items-center z-10'>
                            {/* CEO sir told to remove */}
                            {/* <Image
                                alt='SkillBNK logo'
                                className='w-64'
                                src='/logo/logo-dark.png'
                                height={60}
                                width={200}
                            /> */}
                            <h3 className='mt-common text-4xl font-bold text-pure-white'>
                                Welcome Back!
                            </h3>
                            <p className='mx-36 w-full md:w-[50%] mt-common self-center text-center font-semibold text-pure-white'>
                                to keep connection with use please login with
                                your personal info
                            </p>
                            <Link href='/auth/register'>
                                <Button
                                    variant='outline'
                                    className='bg-white text-primary hover:bg-white/90 border-white'
                                >
                                    Register
                                </Button>
                            </Link>
                        </div>

                        <div className='laptop_image z-10'>
                            <Image
                                alt='SkillBNK Branch'
                                src='/leptopAndMobile.png'
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
                </div>
            </div>
        </>
    );
}
