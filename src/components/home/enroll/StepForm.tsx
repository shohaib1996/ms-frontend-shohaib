'use client';

import { forwardRef, useImperativeHandle, useState } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import ShortText from './ShortText';
import 'react-phone-number-input/style.css';
import SignatureComp from './SignatureComp';
import Attach from './Attach';
import { DatePicker } from '@/components/global/DatePicket';
import dayjs from 'dayjs';

interface FieldOption {
    label: string;
    value: string;
}

interface Field {
    id: string;
    type: string;
    label?: string;
    placeholder?: string;
    isRequired?: boolean;
    value?: any;
    options?: FieldOption[];
    children?: string[];
    [key: string]: any;
}

interface Row {
    id: string;
    fields: Field[];
    label: string;
}

interface Step {
    id: string;
    label: string;
    rows: Row[];
}

interface StepFormProps {
    step: Step;
    handleChangeField: (data: {
        value: any;
        fieldId: string;
        rowId: string;
        stepId: string;
    }) => void;
    readOnly?: boolean;
}

interface ValidationResult {
    success: boolean;
    errors?: string[];
}

const StepForm = forwardRef<
    { validate: () => ValidationResult },
    StepFormProps
>(({ step, handleChangeField, readOnly = false }, ref) => {
    const [errorIds, setErrorIds] = useState<string[]>([]);
    const isPaymentOption = step?.label === 'Payment Information';
    const isAlmost = step?.label === 'Almost Done';

    // Validation function
    const validate = (): ValidationResult => {
        const allFields = step?.rows
            ?.flatMap((x) => x?.fields)
            ?.filter((x) => x?.isRequired);

        const newErrorIds =
            allFields
                ?.filter((x) => {
                    // Check if value is undefined, null, empty string, or only whitespace
                    if (x?.value === undefined || x?.value === null) {
                        return true;
                    }
                    if (
                        typeof x?.value === 'string' &&
                        x?.value.trim() === ''
                    ) {
                        return true;
                    }
                    return false;
                })
                ?.map((x) => x?.id) || [];
        setErrorIds(newErrorIds);

        return {
            success: newErrorIds.length === 0,
            errors: newErrorIds,
        };
    };

    // Expose validate method to parent component
    useImperativeHandle(ref, () => ({
        validate,
    }));

    // Helper function to render different field types
    const renderFieldComponent = (
        field: Field,
        handleFieldChange: any,
        row: Row,
        step: Step,
        errorIds: string[],
        index?: number,
        totalDropdowns?: number,
    ) => {
        console.log({ field });

        const isError = errorIds?.includes(field.id);
        const handleChange = (value: any) => {
            if (readOnly) {
                return;
            }
            handleFieldChange({
                value,
                fieldId: field.id,
                rowId: row.id,
                stepId: step.id,
            });
        };

        const dropdownGridClass =
            totalDropdowns && totalDropdowns > 1
                ? 'md:grid md:grid-cols-2 gap-4'
                : 'w-full';

        switch (field?.type) {
            case 'shortText':
            case 'number':
                return (
                    <ShortText
                        handleChangeField={(value: number | string) => {
                            // If it's a string and required, don't allow whitespace-only values
                            if (typeof value === 'string' && field.isRequired) {
                                const trimmedValue = value.trim();
                                // If the trimmed value is empty but the original value has whitespace,
                                // don't update the value (this prevents whitespace-only values)
                                if (trimmedValue === '' && value !== '') {
                                    return;
                                }
                            }
                            handleChangeField({
                                value,
                                fieldId: field.id,
                                rowId: row.id,
                                stepId: step.id,
                            });
                        }}
                        field={field}
                        isError={errorIds?.includes(field.id)}
                    />
                );

            case 'paragraph':
                return (
                    <div className='space-y-2'>
                        {field.label && (
                            <Label
                                htmlFor={field.id}
                                className={field.isRequired ? 'required' : ''}
                            >
                                {field.label}
                            </Label>
                        )}
                        <Textarea
                            id={field.id}
                            placeholder={field.placeholder}
                            value={field.value || ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                // For required fields, validate that it's not just whitespace
                                if (
                                    field.isRequired &&
                                    value.trim() === '' &&
                                    value !== ''
                                ) {
                                    return; // Don't update if it's only whitespace
                                }
                                handleChange(value);
                            }}
                            className={cn(
                                'min-h-[120px] text-gray',
                                isError && 'border-red-500',
                            )}
                            disabled={readOnly}
                        />
                        {isError && (
                            <p className='text-sm text-red-500'>
                                This field is required
                            </p>
                        )}
                    </div>
                );

            case 'dropdown':
                return (
                    <div className={dropdownGridClass}>
                        <div className='space-y-2'>
                            {field.label && (
                                <Label
                                    htmlFor={field.id}
                                    className={
                                        field.isRequired ? 'required' : ''
                                    }
                                >
                                    {field.label}
                                </Label>
                            )}
                            <Select
                                value={field.value || ''}
                                onValueChange={handleChange}
                                disabled={readOnly}
                            >
                                <SelectTrigger
                                    id={field.id}
                                    className={cn(isError && 'border-red-500')}
                                >
                                    <SelectValue
                                        placeholder={
                                            field.placeholder ||
                                            'Select an option'
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {field.options?.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label || option.value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {isError && (
                                <p className='text-sm text-red-500'>
                                    This field is required
                                </p>
                            )}
                        </div>
                    </div>
                );

            case 'date':
                return (
                    <div className='space-y-2'>
                        {field.label && (
                            <Label
                                htmlFor={field.id}
                                className={field.isRequired ? 'required' : ''}
                            >
                                {field.label}
                            </Label>
                        )}
                        <DatePicker
                            yearSelection
                            className='bg-background '
                            value={null}
                            placeholder={field?.defaultValue}
                            onChange={(date) =>
                                handleChange(date ? dayjs(date).format() : null)
                            }
                        />
                        {/* <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant='outline'
                                    className={cn(
                                        'w-full justify-start text-left text-dark-gray font-normal',
                                        !field.value && 'text-dark-gray',
                                        isError && 'border-red-500',
                                    )}
                                    disabled={readOnly}
                                >
                                    <CalendarIcon className='mr-2 h-4 w-4' />
                                    {field.value ? (
                                        format(new Date(field.value), 'PPP')
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className='w-auto p-0'
                                align='start'
                            >


                                <Calendar
                                    mode='single'
                                    selected={
                                        field.value
                                            ? new Date(field.value)
                                            : undefined
                                    }
                                    onSelect={(date) =>
                                        handleChange(date?.toISOString())
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover> */}
                        {isError && (
                            <p className='text-sm text-red-500'>
                                This field is required
                            </p>
                        )}
                    </div>
                );

            case 'attach':
                return (
                    <Attach
                        handleChangeField={(value) =>
                            handleChangeField({
                                value,
                                fieldId: field.id,
                                rowId: row.id,
                                stepId: step.id,
                            })
                        }
                        field={field}
                        isError={errorIds?.includes(field.id)}
                    />
                );

            case 'checkBox':
                return (
                    <div className='space-y-4'>
                        {field.label && (
                            <Label
                                className={field.isRequired ? 'required' : ''}
                            >
                                {field.label}
                            </Label>
                        )}
                        <div className='space-y-2'>
                            {field.options?.map((option) => (
                                <div
                                    key={option.value}
                                    className='flex items-center space-x-2'
                                >
                                    <Checkbox
                                        id={`${field.id}-${option.value}`}
                                        checked={(field.value || []).includes(
                                            option.value,
                                        )}
                                        onCheckedChange={(checked) => {
                                            const currentValues =
                                                field.value || [];
                                            const newValues = checked
                                                ? [
                                                      ...currentValues,
                                                      option.value,
                                                  ]
                                                : currentValues.filter(
                                                      (v: string) =>
                                                          v !== option.value,
                                                  );
                                            handleChange(newValues);
                                        }}
                                        disabled={readOnly}
                                    />
                                    <Label
                                        htmlFor={`${field.id}-${option.value}`}
                                        className='font-normal'
                                    >
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {isError && (
                            <p className='text-sm text-red-500'>
                                This field is required
                            </p>
                        )}
                    </div>
                );

            case 'switch':
                return (
                    <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                            {field.label && (
                                <Label
                                    htmlFor={field.id}
                                    className={
                                        field.isRequired ? 'required' : ''
                                    }
                                >
                                    {field.label}
                                </Label>
                            )}
                            <Switch
                                id={field.id}
                                checked={field.value || false}
                                onCheckedChange={handleChange}
                                disabled={readOnly}
                            />
                        </div>
                        {isError && (
                            <p className='text-sm text-red-500'>
                                This field is required
                            </p>
                        )}
                    </div>
                );

            case 'radio':
                return (
                    <div className='space-y-2'>
                        {field.label && (
                            <Label
                                className={field.isRequired ? 'required' : ''}
                            >
                                {field.label}
                            </Label>
                        )}
                        <RadioGroup
                            value={field.value || ''}
                            onValueChange={handleChange}
                            className='flex flex-col space-y-1'
                            disabled={readOnly}
                        >
                            {field.options?.map((option) => (
                                <div
                                    key={option.value}
                                    className='flex items-center space-x-2'
                                >
                                    <RadioGroupItem
                                        value={option.value}
                                        id={`${field.id}-${option.value}`}
                                    />
                                    <Label
                                        htmlFor={`${field.id}-${option.value}`}
                                        className='font-normal'
                                    >
                                        {option.label || option.value}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                        {isError && (
                            <p className='text-sm text-red-500'>
                                This field is required
                            </p>
                        )}
                    </div>
                );

            case 'signature':
                return (
                    <SignatureComp
                        readOnly={false}
                        handleChangeField={(value) =>
                            handleChangeField({
                                value,
                                fieldId: field.id,
                                rowId: row.id,
                                stepId: step.id,
                            })
                        }
                        field={field}
                        isError={errorIds?.includes(field.id)}
                    />
                );

            case 'heading':
                return (
                    <div
                        className={cn(
                            'py-2',
                            isPaymentOption &&
                                'bg-primary-light p-4 rounded-md',
                        )}
                    >
                        <h3 className='text-lg font-semibold text-primary-white'>
                            {field.label}
                        </h3>
                        {field.description && (
                            <p className='text-sm text-muted-foreground mt-1'>
                                {field.description}
                            </p>
                        )}
                    </div>
                );

            case 'twoColumnRow':
            case 'threeColumnRow':
            case 'fourColumnRow':
                const allFields = row?.fields || [];
                const columnClass =
                    field.type === 'twoColumnRow'
                        ? 'grid-cols-1 md:grid-cols-2'
                        : field.type === 'threeColumnRow'
                          ? 'grid-cols-1 md:grid-cols-3'
                          : 'grid-cols-1 md:grid-cols-4';

                return (
                    <div
                        className={cn(
                            `grid ${columnClass} gap-4`,
                            isPaymentOption && index === 0 && 'md:grid-cols-4',
                            isPaymentOption &&
                                index === 1 &&
                                '[&>*:first-child]:col-span-2',
                            isAlmost && 'col-span-2',
                        )}
                    >
                        {field?.children?.map((childId, i) => {
                            const childField = allFields?.find(
                                (x) => x.id === childId,
                            );
                            return childField ? (
                                <div key={i}>
                                    {renderFieldComponent(
                                        childField,
                                        handleFieldChange,
                                        row,
                                        step,
                                        errorIds,
                                        i,
                                    )}
                                </div>
                            ) : null;
                        })}
                    </div>
                );

            default:
                return null;
        }
    };

    // Filter out fields that are children of other fields
    const filterSubField = (fields: Field[]) => {
        const children = fields?.flatMap((x) => x?.children || []);
        return fields?.filter((x) => !children?.includes(x.id)) || [];
    };

    return (
        <div className='space-y-6'>
            {step?.rows?.map((row, i) => {
                // Count dropdowns in this row
                const dropdownFields = filterSubField(row?.fields)?.filter(
                    (field) => field?.type === 'dropdown',
                );
                const totalDropdowns = dropdownFields.length;

                // Validate that fields exist and are non-empty
                const validFields = filterSubField(row?.fields)?.filter(
                    (field) => field && Object.keys(field).length > 0,
                );

                console.log({ row });

                return validFields.length > 0 ? (
                    <div key={i} className='space-y-4'>
                        <h4 className='text-lg font-semibold text-slate-700 dark:text-slate-300'>
                            {row?.label}
                        </h4>

                        <div
                            className={cn(
                                'space-y-6',
                                step?.label === 'Additional Information' &&
                                    'grid grid-cols-1 md:grid-cols-3 gap-4',
                            )}
                        >
                            {validFields.map((field, index) => (
                                <div key={index}>
                                    {renderFieldComponent(
                                        field,
                                        handleChangeField,
                                        row,
                                        step,
                                        errorIds,
                                        index,
                                        totalDropdowns,
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null;
            })}
        </div>
    );
});

StepForm.displayName = 'StepForm';

export default StepForm;
