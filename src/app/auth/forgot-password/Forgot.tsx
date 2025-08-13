'use client';

import type React from 'react';
import { useState } from 'react';
import { isEmail } from 'validator';
import { MailOpenIcon as Envelope, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import PhoneInput from 'react-phone-number-input';
import instance from '@/lib/axios';

interface ForgotFormProps {
    handleNewPassForm: (val: string) => void;
    channel: 'email' | 'sms';
    setChannel: React.Dispatch<React.SetStateAction<'email' | 'sms'>>;
}

interface FormErrors {
    email?: string;
    phone?: string;
    error?: string;
}

export function ForgotForm({
    handleNewPassForm,
    channel,
    setChannel,
}: ForgotFormProps) {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState<FormErrors | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const emailValidator = (email: string) => {
        const error: FormErrors = {};
        if (!email) {
            error.email = 'Enter your email';
        } else if (!isEmail(email)) {
            error.email = 'Enter your valid email';
        }

        return {
            error,
            isError: Object.keys(error).length === 0,
        };
    };

    const fetchData = ({
        email,
        phone,
        channel,
    }: {
        email: string;
        phone: string;
        channel: string;
    }) => {
        instance
            .post('/user/password/forgot', { email, phone, channel })
            .then((res) => {
                const { isOtpSend, success } = res.data;
                if (isOtpSend) {
                    toast({
                        title: 'Success',
                        description:
                            'A code has been sent to your ' +
                            (channel === 'email' ? 'Email' : 'Phone'),
                        variant: 'default',
                    });
                    handleNewPassForm(channel === 'email' ? email : phone);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                if (err && err.response) {
                    setErrors(err.response.data);
                }
                setIsLoading(false);
            });
    };

    const handleSubmitEmail = (e: React.FormEvent) => {
        e.preventDefault();
        const validate = emailValidator(email);

        if (!validate.isError) {
            return setErrors(validate.error);
        }

        setErrors(null);
        setIsLoading(true);
        fetchData({ email, phone, channel });
    };

    const handleSubmitPhone = () => {
        if (!phone) {
            return setErrors({ phone: 'Enter your phone number' });
        }
        setErrors(null);
        setIsLoading(true);
        fetchData({ email, phone, channel });
    };

    return (
        <div className='space-y-4'>
            <Tabs
                defaultValue={channel}
                onValueChange={(value) => setChannel(value as 'email' | 'sms')}
                className='w-full'
            >
                <TabsList className='grid w-full grid-cols-2 bg-foreground'>
                    <TabsTrigger value='email'>Email</TabsTrigger>
                    <TabsTrigger value='sms'>Phone</TabsTrigger>
                </TabsList>

                {errors?.error && (
                    <Alert variant='destructive' className='mt-4'>
                        <AlertDescription>{errors.error}</AlertDescription>
                    </Alert>
                )}

                <TabsContent value='email' className='mt-4'>
                    <form onSubmit={handleSubmitEmail} className='space-y-4'>
                        <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <Label htmlFor='email'>
                                    Email{' '}
                                    <span className='text-red-500'>*</span>
                                </Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        {/* <TooltipTrigger asChild>
                      <span className="text-sm text-muted-foreground cursor-help">Need help?</span>
                    </TooltipTrigger> */}
                                        <TooltipContent>
                                            <p>{`Enter the email address you used to sign up. We'll send you password reset instructions.`}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className='relative'>
                                <Envelope className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                                <Input
                                    id='email'
                                    type='text'
                                    name='email'
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={handleChangeEmail}
                                    className='pl-10 bg-foreground'
                                />
                            </div>
                            {errors?.email && (
                                <p className='text-sm text-red-500'>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <Button
                            type='submit'
                            className='w-full'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className='flex items-center'>
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
                                    Loading...
                                </div>
                            ) : (
                                'Get OTP'
                            )}
                        </Button>
                    </form>
                </TabsContent>

                <TabsContent value='sms' className='mt-4'>
                    <div className='space-y-4'>
                        <div className='space-y-1'>
                            <Label htmlFor='phone'>
                                Phone Number{' '}
                                <span className='text-red-500'>*</span>
                            </Label>
                            <div className='phoneNumbers'>
                                <PhoneInput
                                    defaultCountry='US'
                                    className='h-10 bg-foreground border border-foreground-border rounded-md px-2 text-sm text-dark-gray [&_input]:outline-none [&_input]:bg-foreground [&_input]:h-10 [&_input]:text-black dark:[&_input]:text-white'
                                    countryCallingCodeEditable={false}
                                    international
                                    placeholder='Enter phone number'
                                    value={phone}
                                    onChange={(phone) => setPhone(phone || '')}
                                />
                                {errors?.phone && (
                                    <p className='text-sm text-red-500 mt-2'>
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        <Button
                            onClick={handleSubmitPhone}
                            className='w-full'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className='flex items-center'>
                                    <Loader2 className='animate-spin text-xl text-primary mr-2' />
                                    Loading...
                                </div>
                            ) : (
                                'Get OTP'
                            )}
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
