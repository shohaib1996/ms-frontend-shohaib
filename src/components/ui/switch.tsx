'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
    React.ComponentRef<typeof SwitchPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
        readOnly?: boolean;
    }
>(
    (
        {
            className,
            readOnly,
            checked,
            defaultChecked,
            onCheckedChange,
            ...props
        },
        ref,
    ) => {
        const [isChecked, setIsChecked] = React.useState<boolean>(
            checked !== undefined ? checked : defaultChecked || false,
        );

        React.useEffect(() => {
            if (checked !== undefined) {
                setIsChecked(checked);
            }
        }, [checked]);

        const handleCheckedChange = (value: boolean) => {
            if (!readOnly) {
                setIsChecked(value);
                onCheckedChange?.(value);
            }
        };

        return (
            <div
                className={cn(
                    'relative inline-block',
                    readOnly ? 'pointer-events-none' : '',
                )}
            >
                <SwitchPrimitives.Root
                    className={cn(
                        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
                        readOnly && 'opacity-80 cursor-default',
                        className,
                    )}
                    {...props}
                    ref={ref}
                    checked={isChecked}
                    onCheckedChange={handleCheckedChange}
                >
                    <SwitchPrimitives.Thumb
                        className={cn(
                            'pointer-events-none block h-4 w-4 rounded-full bg-background ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
                        )}
                    />
                </SwitchPrimitives.Root>

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

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
