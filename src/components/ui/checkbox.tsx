'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
    React.ComponentRef<typeof CheckboxPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
        readOnly?: boolean;
    }
>(
    (
        {
            className,
            readOnly = false,
            onCheckedChange,
            checked,
            defaultChecked,
            ...props
        },
        ref,
    ) => {
        const [isChecked, setIsChecked] = React.useState<
            boolean | 'indeterminate'
        >(checked !== undefined ? checked : defaultChecked || false);

        React.useEffect(() => {
            if (checked !== undefined) {
                setIsChecked(checked);
            }
        }, [checked]);

        const handleCheckedChange = (value: boolean | 'indeterminate') => {
            if (!readOnly) {
                setIsChecked(value);
                onCheckedChange?.(value);
            }
        };

        return (
            <div
                className={cn(
                    readOnly
                        ? 'cursor-default pointer-events-none'
                        : 'cursor-pointer',
                    'relative',
                )}
                onClick={(e) => {
                    if (readOnly) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }}
            >
                <CheckboxPrimitive.Root
                    ref={ref}
                    checked={isChecked}
                    onCheckedChange={handleCheckedChange}
                    className={cn(
                        'peer h-4 w-4 shrink-0 rounded-sm border border-primary-white shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                        'data-[state=checked]:bg-primary data-[state=checked]:text-pure-white',
                        !readOnly &&
                            'disabled:cursor-not-allowed disabled:opacity-50',
                        readOnly && 'opacity-90',
                        className,
                    )}
                    {...props}
                >
                    <CheckboxPrimitive.Indicator
                        className={cn(
                            'flex items-center justify-center text-current',
                        )}
                    >
                        <Check className='h-4 w-4' />
                    </CheckboxPrimitive.Indicator>
                </CheckboxPrimitive.Root>

                {readOnly && (
                    <div
                        className='absolute inset-0'
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    ></div>
                )}
            </div>
        );
    },
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
