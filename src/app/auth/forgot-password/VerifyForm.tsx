'use client';

import type React from 'react';
import { useRef, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Alert, AlertDescription } from '@/components/ui/alert';

interface VerifyFormProps {
    setOtp: React.Dispatch<React.SetStateAction<string>>;
    setActive: React.Dispatch<
        React.SetStateAction<'forgot' | 'verify' | 'reset'>
    >;
}

const formSchema = z.object({
    otp: z.string().min(6, { message: 'OTP must be at least 6 characters' }),
});

export function VerifyForm({ setOtp, setActive }: VerifyFormProps) {
    const [error, setError] = useState<string | null>(null);
    const [otpArray, setOtpArray] = useState<string[]>(new Array(6).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

    const handleChangeOtp = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const value = e.target.value;
        const newOtpArray = [...otpArray];
        newOtpArray[index] = value.slice(-1);
        setOtpArray(newOtpArray);
        const joinedOtp = newOtpArray.join('');
        setOtp(newOtpArray.join(''));
        form.setValue('otp', joinedOtp);
        if (!value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (value && index < otpArray.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        if (e.key === 'Backspace' && !otpArray[index]) {
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, 6);
        const newOtpArray = [...otpArray];
        for (let i = 0; i < pasteData.length; i++) {
            newOtpArray[i] = pasteData[i];
            if (inputRefs.current[i]) {
                inputRefs.current[i]!.value = pasteData[i];
            }
        }
        setOtpArray(newOtpArray);
        const joinedOtp = newOtpArray.join('');
        setOtp(joinedOtp);
        form.setValue('otp', joinedOtp);
        if (pasteData.length < 6) {
            inputRefs.current[pasteData.length]?.focus();
        }
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: '',
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setOtp(data.otp);
        setActive('reset');
    };

    return (
        <div className='space-y-6'>
            {error && (
                <Alert variant='destructive'>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                >
                    <FormField
                        control={form.control}
                        name='otp'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-black mb-1'>
                                    Verification Code
                                </FormLabel>
                                <FormControl>
                                    <FormControl>
                                        <div className='flex justify-between gap-2'>
                                            {[...Array(6)].map((_, index) => (
                                                <div
                                                    key={index}
                                                    className='w-full max-w-[3rem]'
                                                >
                                                    <Input
                                                        ref={(el) => {
                                                            inputRefs.current[
                                                                index
                                                            ] = el;
                                                        }}
                                                        value={otpArray[index]}
                                                        onChange={(e) =>
                                                            handleChangeOtp(
                                                                e,
                                                                index,
                                                            )
                                                        }
                                                        onKeyDown={(e) =>
                                                            handleKeyDown(
                                                                e,
                                                                index,
                                                            )
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
                                    </FormControl>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='w-full'>
                        Verify
                    </Button>
                </form>
            </Form>
        </div>
    );
}
