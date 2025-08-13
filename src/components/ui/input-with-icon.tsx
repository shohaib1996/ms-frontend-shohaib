'use client';

import type React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface InputWithIconProps {
    label: string;
    isRequired?: boolean;
    tooltip?: React.ReactNode | string;
    icon?: React.ReactNode;
    type: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export function InputWithIcon({
    label,
    isRequired = false,
    tooltip,
    icon,
    type,
    name,
    placeholder,
    value,
    onChange,
    error,
}: InputWithIconProps) {
    return (
        <div className='space-y-2'>
            <div className='flex items-center justify-between'>
                <Label htmlFor={name} className='text-sm font-medium'>
                    {label}{' '}
                    {isRequired && <span className='text-red-500'>*</span>}
                </Label>
                {tooltip && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <HelpCircle className='h-4 w-4 text-muted-foreground cursor-help' />
                            </TooltipTrigger>
                            <TooltipContent
                                side='right'
                                align='start'
                                className='max-w-sm text-pure-white'
                            >
                                {typeof tooltip === 'string' ? (
                                    <p>{tooltip}</p>
                                ) : (
                                    tooltip
                                )}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
            <div className='relative'>
                {icon && (
                    <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                        {icon}
                    </div>
                )}
                <Input
                    id={name}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={icon ? 'pl-10 bg-foreground' : ' bg-foreground'}
                />
            </div>
            {error && <p className='text-sm text-red-500'>{error}</p>}
        </div>
    );
}
