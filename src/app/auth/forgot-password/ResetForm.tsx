'use client';

import type React from 'react';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon, Loader2, LockIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ResetFormProps {
    data: {
        password: string;
        confirm: string;
    };
    errors: {
        password?: string;
        confirm?: string;
        error?: string;
    } | null;
    isLoading: boolean;
    handleRegister: (e: React.FormEvent) => void;
    handleChangeRegister: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ResetForm({
    data,
    errors,
    isLoading,
    handleRegister,
    handleChangeRegister,
}: ResetFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className='space-y-6'>
            <form onSubmit={handleRegister} className='space-y-4'>
                {errors?.error && (
                    <Alert variant='destructive'>
                        <AlertDescription>{errors.error}</AlertDescription>
                    </Alert>
                )}

                <div className='space-y-4'>
                    {/* New Password */}
                    <div>
                        <label className='mb-1 block font-medium text-sm'>
                            New Password <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative'>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='••••••••••••'
                                value={data.password}
                                onChange={handleChangeRegister}
                                className='bg-foreground border text-gray pr-10'
                            />
                            <button
                                type='button'
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOffIcon className='h-5 w-5' />
                                ) : (
                                    <EyeIcon className='h-5 w-5' />
                                )}
                            </button>
                        </div>
                        {errors?.password && (
                            <p className='text-sm text-red-500 mt-1'>
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className='mb-1 block font-medium text-sm'>
                            Confirm Password{' '}
                            <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative'>
                            <Input
                                type={showConfirm ? 'text' : 'password'}
                                name='confirm'
                                placeholder='••••••••••••'
                                value={data.confirm}
                                onChange={handleChangeRegister}
                                className='bg-foreground border text-gray pr-10'
                            />
                            <button
                                type='button'
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray'
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? (
                                    <EyeOffIcon className='h-5 w-5' />
                                ) : (
                                    <EyeIcon className='h-5 w-5' />
                                )}
                            </button>
                        </div>
                        {errors?.confirm && (
                            <p className='text-sm text-red-500 mt-1'>
                                {errors.confirm}
                            </p>
                        )}
                    </div>
                </div>

                <Button type='submit' className='w-full' disabled={isLoading}>
                    {isLoading ? (
                        <div className='flex items-center flex-row'>
                            <Loader2 className='h-4 w-4 animate-spin text-primary' />
                            Resetting...
                        </div>
                    ) : (
                        'Reset'
                    )}
                </Button>
            </form>
        </div>
    );
}
