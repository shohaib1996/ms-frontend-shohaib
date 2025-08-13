import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';
import { cn } from '@/lib/utils';

interface RadioCompProps {
    field: any;
    handleChangeField: (value: string) => void;
    isError?: boolean;
    readOnly?: boolean;
}

function RadioComp({
    field,
    handleChangeField,
    isError,
    readOnly = false,
}: RadioCompProps) {
    const handleChange = (value: string) => {
        if (!readOnly) {
            handleChangeField(value);
        }
    };

    return (
        <div
            className={cn(
                'bg-background rounded-md border border-forground-border p-4',
                readOnly && 'opacity-90',
            )}
        >
            <p className='text-base text-dark-gray font-semibold pb-2'>
                {field?.label} {field?.isRequired && !readOnly ? '*' : ''}
            </p>

            <RadioGroup
                defaultValue={field?.value || ''}
                value={field?.value || ''}
                onValueChange={handleChange}
                className={readOnly ? 'pointer-events-none' : ''}
            >
                {field?.options?.map((option: any, i: number) => (
                    <div
                        key={i}
                        className={cn(
                            'flex items-center space-x-2',
                            readOnly && 'cursor-default',
                        )}
                    >
                        <RadioGroupItem
                            value={option?.value}
                            id={`${option?.value}-${i}`}
                            disabled={readOnly}
                        />
                        <Label
                            className={cn(
                                'text-gray',
                                readOnly && 'cursor-default',
                            )}
                            htmlFor={`${option?.value}-${i}`}
                        >
                            {option?.value}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
            {isError && !readOnly && (
                <div style={{ color: 'red' }}>This field is required</div>
            )}
        </div>
    );
}

export default RadioComp;
