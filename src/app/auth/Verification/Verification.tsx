'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import ReCAPTCHA from 'react-google-recaptcha';
import { ArrowLeft } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import instance from '@/lib/axios';
import VerifyPage from '../verify/VerifyPage';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';

interface VerificationProps {
    otpEmail: string;
    otpPhone: {
        countryCode: string;
        number: string;
    };
    userId: string;
    onClose: () => void;
    open?: boolean;
    active?: string;
    setActive?: any;
}

interface ErrorType {
    error?: string;
    otp?: string;
    message?: string;
}

export default function Verification({
    otpEmail,
    otpPhone,
    userId,
    onClose,
    open,
    active,
    setActive,
}: VerificationProps) {
    const router = useRouter();
    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [mount, setMount] = useState(true);
    const [newCodeTimer, setNewCodeTimer] = useState(Date.now() + 60000 * 5);
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState<ErrorType | null>(null);
    const [channel, setChannel] = useState('email');
    const [captchaToken, setCaptchaToken] = useState('tokendisabled');

    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const handleClose = () => {
        onClose();
        setActive('register');
    };

    useEffect(() => {
        const handlePopState = () => {
            if (isVerificationSent || (active === 'verification' && open)) {
                onClose();
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [isVerificationSent, active, open, onClose]);

    const validator = (otp: string) => {
        const error: ErrorType = {};

        if (!otp) {
            error.otp = 'Enter your verification code';
        } else if (otp.length !== 6) {
            error.otp = 'Code must be six digit long';
        }

        return {
            error,
            isError: Object.keys(error).length === 0,
        };
    };

    const handleChangeOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setOtp(e.target.value);
    };

    const handleOtp = (e: React.FormEvent) => {
        e.preventDefault();
        const validate = validator(otp);

        if (!validate.isError) {
            return setErrors(validate.error);
        }

        setErrors(null);
        verifyOtp();
    };

    const sendOtp = () => {
        const data = {
            channel,
            userId,
            captchaToken,
        };
        setIsSending(true);
        instance
            .post('/user/sendotp', data)
            .then(() => {
                setIsSending(false);
                setIsVerificationSent(true);

                toast({
                    title: 'Verification Code Sent',
                    description: `A six digit verification code has been sent to your ${
                        channel === 'email' ? 'email' : 'phone'
                    }`,
                });

                setMount(false);
                setTimeout(() => {
                    setMount(true);
                }, 1000);
                setNewCodeTimer(Date.now() + 60000 * 5);
                setErrors(null);
            })
            .catch((err) => {
                setIsSending(false);
                if (err?.response) {
                    setErrors(err.response.data);
                }
            });
    };

    const resendOtp = () => {
        const data = {
            channel,
            userId,
            captchaToken,
        };
        setIsSending(true);
        instance
            .post('/user/sendotp', data)
            .then(() => {
                setIsSending(false);
                setIsVerificationSent(true);

                toast({
                    title: 'Verification Code Sent',
                    description: `A six digit verification code has been sent to your ${
                        channel === 'email' ? 'email' : 'phone'
                    }`,
                });

                setMount(false);
                setTimeout(() => {
                    setMount(true);
                }, 1000);
                setNewCodeTimer(Date.now() + 60000 * 5);
                setErrors(null);
            })
            .catch((err) => {
                setIsSending(false);
                if (err?.response) {
                    setErrors(err.response.data);
                }
            });
    };

    const verifyOtp = () => {
        if (otp.length === 6) {
            setIsLoading(true);
            instance
                .post('/user/verifyotp', { userId, otp, channel })
                .then((res) => {
                    if (res.data.success) {
                        Cookies.set(
                            process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || '',
                            `Bearer ${res.data.token}`,
                            { domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN },
                        );

                        toast({
                            title: 'Success',
                            description: 'Verified successfully',
                        });

                        setIsLoading(false);

                        const query = new URLSearchParams(
                            window.location.search,
                        );

                        if (query.get('program')) {
                            if (res.data.isEnrolled) {
                                window.location.href = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard`;
                            } else {
                                window.location.href = `/enrollment`;
                            }
                        } else if (query.get('course')) {
                            window.location.href = `/course/${query.get('course')}`;
                        } else if (query.get('interview')) {
                            window.location.href = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/interview/${query.get('interview')}`;
                        } else if (query.get('callback')) {
                            window.location.href = query.get('callback') || '';
                        } else if (res.data.isEnrolled) {
                            window.location.href = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard`;
                        } else {
                            window.location.href = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard`;
                        }
                    }
                })
                .catch((err: any) => {
                    console.log({ err });
                    setIsLoading(false);
                    toast({
                        title: 'Failed to verify!',
                        description:
                            err.response?.data?.message ||
                            err.response?.data?.error ||
                            'Something went wrong',
                    });
                    if (err?.response) {
                        setErrors(err.response.data);
                    }
                });
        } else {
            setErrors({ message: 'OTP should be 6 digit' });
        }
    };

    const renderTimer = ({
        hours,
        minutes,
        seconds,
        completed,
    }: {
        hours: number;
        minutes: number;
        seconds: number;
        completed: boolean;
    }) => {
        if (completed) {
            return (
                <Button
                    variant='outline'
                    className='w-full mb-1.5'
                    type='button'
                    onClick={() => resendOtp()}
                    disabled={!captchaToken}
                >
                    Resend Code
                </Button>
            );
        } else {
            return (
                <Button
                    variant='outline'
                    className='w-full cursor-default'
                    type='button'
                    disabled
                >
                    Resend Code ({minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds})
                </Button>
            );
        }
    };

    const onChangeRecaptcha = (value: string | null) => {
        setCaptchaToken(value || '');
    };

    return (
        <div className='w-full'>
            {isVerificationSent ? (
                <Dialog
                    open={isVerificationSent}
                    onOpenChange={(isOpen) => {
                        if (!isOpen) {
                            setIsVerificationSent(false);
                            onClose();
                        }
                    }}
                >
                    <DialogContent className='p-0' fullScreen={true}>
                        <VerifyPage
                            handleOtp={handleOtp}
                            setOtp={setOtp}
                            otpEmail={otpEmail}
                            otpPhone={otpPhone}
                            verifyOtp={verifyOtp}
                            channel={channel}
                            setIsVerificationSent={setIsVerificationSent}
                            isVerificationSent={isVerificationSent}
                            onClose={onClose}
                        />
                    </DialogContent>
                </Dialog>
            ) : (
                <AlertDialog
                    open={active === 'verification' && open}
                    onOpenChange={(isOpen) => {
                        if (!isOpen) {
                            handleClose();
                        }
                    }}
                >
                    <AlertDialogContent className='sm:max-w-md'>
                        <div className='space-y-4'>
                            <div className='flex items-center gap-2'>
                                <ArrowLeft
                                    className='h-5 w-5 cursor-pointer text-black'
                                    onClick={onClose}
                                />
                                <h3 className='text-xl font-semibold text-black'>
                                    Account Verification
                                </h3>
                            </div>

                            {errors && errors.error && (
                                <Alert variant='destructive'>
                                    <AlertDescription className='text-danger'>
                                        {errors.error}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <Card>
                                <CardContent className='pt-6'>
                                    <RadioGroup
                                        value={channel}
                                        onValueChange={setChannel}
                                    >
                                        <div className='space-y-3'>
                                            <div
                                                className={`p-3 rounded-md ${channel === 'email' ? 'border-2 border-primary bg-background' : 'border border-muted-foreground'}`}
                                            >
                                                <div className='flex items-center space-x-2'>
                                                    <RadioGroupItem
                                                        value='email'
                                                        id='email'
                                                    />
                                                    <Label
                                                        htmlFor='email'
                                                        className='flex-1'
                                                    >
                                                        {otpEmail}
                                                    </Label>
                                                </div>
                                            </div>

                                            <div
                                                className={`p-3 rounded-md ${channel === 'sms' ? 'border-2 border-primary bg-background' : 'border border-muted-foreground'}`}
                                            >
                                                <div className='flex items-center space-x-2'>
                                                    <RadioGroupItem
                                                        value='sms'
                                                        id='sms'
                                                    />
                                                    <Label
                                                        htmlFor='sms'
                                                        className='flex-1'
                                                    >
                                                        +{otpPhone?.countryCode}
                                                        {otpPhone?.number}
                                                    </Label>
                                                </div>
                                            </div>
                                        </div>
                                    </RadioGroup>
                                </CardContent>
                            </Card>

                            {/* <div className='flex justify-center'>
                                <ReCAPTCHA
                                    sitekey={
                                        process.env
                                            .NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                                        ''
                                    }
                                    onChange={onChangeRecaptcha}
                                    size='normal'
                                />
                            </div> */}

                            {!isVerificationSent && (
                                <Button
                                    className='w-full'
                                    onClick={() => sendOtp()}
                                    disabled={isSending || !captchaToken}
                                >
                                    {isSending && (
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
                                    )}
                                    Get Code
                                </Button>
                            )}
                        </div>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
}
