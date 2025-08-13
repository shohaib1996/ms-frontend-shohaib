'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
// shadcn UI components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

// Lucide icons
import {
    User,
    Mail,
    Phone,
    Lock,
    Info,
    AlertCircle,
    X,
    Loader2,
} from 'lucide-react';
import GlobalTooltip from '@/components/global/GlobalTooltip';

// Form schema with stronger password validation
const formSchema = z
    .object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        email: z.string().email('Invalid email address'),
        phone: z.string().min(10, 'Phone number must be at least 10 digits'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
            .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
            .regex(
                /[^A-Za-z0-9]/,
                'Password must contain at least 1 special character',
            ),
        confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
        message: 'Passwords do not match',
        path: ['confirm'],
    });

// Types
type FormValues = z.infer<typeof formSchema>;

interface RegisterProps {
    sendOtpData: (data: any) => void;
}

const RegisterForm: React.FC<RegisterProps> = ({ sendOtpData }) => {
    const router = useRouter();
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newPassOpen, setNewPassOpen] = useState<boolean>(false);
    const [conPassOpen, setConPassOpen] = useState<boolean>(false);

    // Initialize form
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirm: '',
        },
    });

    const onSubmit = async (values: FormValues) => {
        setGeneralError(null);
        setIsLoading(true);
        window.scrollTo(0, 0);

        try {
            const referredBy = Cookies.get(
                process.env.NEXT_PUBLIC_REFERRAL_TOKEN_NAME || '',
            );

            const response = await axios.post('/user/register', {
                ...values,
                referredBy: referredBy || null,
            });

            if (response.data.success) {
                sendOtpData(response.data);
                form.reset();
            }
        } catch (err: any) {
            console.error(err);
            if (err?.response?.data?.error) {
                const fieldErrors = err.response.data.error;

                if (typeof fieldErrors === 'object' && fieldErrors !== null) {
                    // Show all errors at the top
                    const errorMessages = Object.entries(fieldErrors)
                        .map(([field, message]) => `${field}: ${message}`)
                        .join(', ');
                    setGeneralError(errorMessages);

                    // Still set field errors for UI feedback
                    Object.entries(fieldErrors).forEach(([field, message]) => {
                        if (field in form.formState.errors) {
                            form.setError(field as any, {
                                type: 'manual',
                                message: message as string,
                            });
                        }
                    });
                } else if (typeof fieldErrors === 'string') {
                    setGeneralError(fieldErrors);
                }
            } else {
                setGeneralError(
                    'An error occurred during registration. Please try again.',
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    // prevent pasting password confirmation
    const handlePasteConfirm = (e: React.ClipboardEvent) => {
        e.preventDefault();
        form.setError('confirm', {
            type: 'manual',
            message: 'Please manually type your confirm password.',
        });
    };

    return (
        <div className='max-w-md mx-auto w-full'>
            {/* Form Errors */}
            {(generalError ||
                Object.keys(form.formState.errors).length > 0) && (
                <Alert variant='destructive' className='mb-4 p-2'>
                    <AlertCircle className='h-4 w-4 -mt-1.5 mr-1' />
                    <AlertDescription className='mt-0.5'>
                        {generalError ||
                            Object.entries(form.formState.errors)
                                .map(
                                    ([field, error]) =>
                                        `${field}: ${error.message}`,
                                )
                                .join(', ')}
                    </AlertDescription>
                </Alert>
            )}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                >
                    {/* First Name Field */}
                    <FormField
                        control={form.control}
                        name='firstName'
                        render={({ field }) => (
                            <FormItem>
                                <div className='flex items-center justify-between mb-2'>
                                    <GlobalTooltip tooltip='Enter your first name as it appears on official documents.'>
                                        <FormLabel>
                                            First Name
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </FormLabel>
                                    </GlobalTooltip>
                                </div>
                                <FormControl className='bg-foreground rounded-md'>
                                    <div className='relative'>
                                        <User className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5' />
                                        <Input
                                            {...field}
                                            placeholder='First Name'
                                            className='pl-10 bg-foreground'
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Last Name Field */}
                    <FormField
                        control={form.control}
                        name='lastName'
                        render={({ field }) => (
                            <FormItem>
                                <div className='flex items-center justify-between mb-2'>
                                    <GlobalTooltip tooltip='Enter your last name or family name.'>
                                        <FormLabel>
                                            Last Name
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </FormLabel>
                                    </GlobalTooltip>
                                </div>
                                <FormControl>
                                    <div className='relative'>
                                        <User className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5' />
                                        <Input
                                            {...field}
                                            placeholder='Last Name'
                                            className='pl-10 bg-foreground'
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <div className='flex items-center justify-between mb-2'>
                                    <GlobalTooltip tooltip='Provide a valid email address for account verification and notifications.'>
                                        <FormLabel>
                                            Email
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </FormLabel>
                                    </GlobalTooltip>
                                </div>
                                <FormControl>
                                    <div className='relative'>
                                        <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5' />
                                        <Input
                                            {...field}
                                            type='email'
                                            placeholder='Email'
                                            className='pl-10 bg-foreground'
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone Field */}
                    <FormField
                        control={form.control}
                        name='phone'
                        render={({ field }) => (
                            <FormItem>
                                <div className='flex items-center justify-between mb-2'>
                                    <GlobalTooltip tooltip='Enter your mobile number including the country code, (e.g., +1 for USA.)'>
                                        <FormLabel>
                                            Phone Number
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </FormLabel>
                                    </GlobalTooltip>
                                </div>
                                <FormControl>
                                    <PhoneInput
                                        international
                                        defaultCountry='US'
                                        value={field.value}
                                        onChange={(value) =>
                                            field.onChange(value || '')
                                        }
                                        className='bg-foreground rounded-md pl-2'
                                        inputComponent={Input}
                                    />
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
                                <div className='flex items-center justify-between mb-2'>
                                    <GlobalTooltip tooltip='Create a secure password with at least 8 characters, including letters, special characters and numbers.'>
                                        <FormLabel>
                                            Password
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </FormLabel>
                                    </GlobalTooltip>
                                </div>
                                <FormControl>
                                    <div className='relative'>
                                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5' />
                                        <Input
                                            {...field}
                                            type='password'
                                            placeholder='Enter your Password'
                                            className='pl-10 bg-foreground'
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                                <div className='flex items-center text-sm text-muted-foreground mt-1'>
                                    <span className='mr-1'>
                                        Must be at least 8 characters
                                    </span>
                                    <Popover
                                        open={newPassOpen}
                                        onOpenChange={setNewPassOpen}
                                    >
                                        <PopoverTrigger asChild>
                                            <Info className='h-4 w-4 cursor-pointer' />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-80'>
                                            <div className='flex items-center justify-between mb-2'>
                                                <h3 className='font-medium'>
                                                    Must be at least 8
                                                    characters
                                                </h3>
                                                <Button
                                                    variant='ghost'
                                                    size='sm'
                                                    className='h-6 w-6 p-0'
                                                    onClick={() =>
                                                        setNewPassOpen(false)
                                                    }
                                                >
                                                    <X className='h-4 w-4' />
                                                </Button>
                                            </div>
                                            <Separator className='my-2' />
                                            <div className='text-sm'>
                                                <p>{`It's better to have:`}</p>
                                                <p>
                                                    1. Upper and lower case
                                                    letters
                                                </p>
                                                <p>2. A Symbol (@$&)</p>
                                                <p>3. A longer password</p>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Confirm Password Field */}
                    <FormField
                        control={form.control}
                        name='confirm'
                        render={({ field }) => (
                            <FormItem>
                                <div className='flex items-center justify-between mb-2'>
                                    <GlobalTooltip tooltip='Re-enter your password to ensure it matches the one you just created.'>
                                        <FormLabel>
                                            Confirm Password
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </FormLabel>
                                    </GlobalTooltip>
                                </div>
                                <FormControl>
                                    <div className='relative'>
                                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5' />
                                        <Input
                                            {...field}
                                            type='password'
                                            placeholder='Confirm your Password'
                                            className='pl-10 bg-foreground'
                                            onPaste={handlePasteConfirm}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                                <div className='flex items-center text-sm text-muted-foreground mt-1'>
                                    <span className='mr-1'>
                                        Must be the same as above password
                                    </span>
                                    <Popover
                                        open={conPassOpen}
                                        onOpenChange={setConPassOpen}
                                    >
                                        <PopoverTrigger asChild>
                                            <Info className='h-4 w-4 cursor-pointer' />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-80'>
                                            <div className='flex items-center justify-between mb-2'>
                                                <h3 className='font-medium'>
                                                    Must be the same as above
                                                    password
                                                </h3>
                                                <Button
                                                    variant='ghost'
                                                    size='sm'
                                                    className='h-6 w-6 p-0'
                                                    onClick={() =>
                                                        setConPassOpen(false)
                                                    }
                                                >
                                                    <X className='h-4 w-4' />
                                                </Button>
                                            </div>
                                            <Separator className='my-2' />
                                            <div className='text-sm'>
                                                <p>{`It's better to have:`}</p>
                                                <p>
                                                    1. Upper and lower case
                                                    letters
                                                </p>
                                                <p>2. A Symbol (@$&)</p>
                                                <p>3. A longer password</p>
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
                                Creating account...
                            </>
                        ) : (
                            'Create an account'
                        )}
                    </Button>

                    {/* Login Link */}
                    <div className='text-center text-sm'>
                        Already have an account?{' '}
                        <Link
                            href='/auth/login'
                            className='font-semibold text-primary'
                        >
                            Login
                        </Link>
                    </div>

                    {/* Terms and Conditions */}
                    <div className='text-center text-xs text-muted-foreground'>
                        {`By selecting "Sign Up," you consent to our`} <br />
                        <Link
                            href='/privacy-policy'
                            className='text-primary'
                            target='_blank'
                        >
                            Terms of Use and Privacy Policy.
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default RegisterForm;
