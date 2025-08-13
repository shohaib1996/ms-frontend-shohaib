'use client';

import type React from 'react';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import success from '../../../public/animation/success.json';

export default function ContactFormCRM() {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        email: '',
        phone: '',
        bestTime: null as Date | null,
        timezone: '',
        details: '',
        website: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const router = useRouter();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        try {
            // Format date for submission
            const formattedDate = formData.bestTime
                ? format(formData.bestTime, 'PPP')
                : '';

            // Prepare data for API submission in the expected format
            const payload = {
                formSteps: [
                    {
                        label: 'Inquiry',
                        icon: '',
                        id: '188ca891-8ecd-4187-a95d-a7ea567dca7b',
                        type: 'tab',
                        rows: [
                            {
                                label: "Let's Connect",
                                icon: '',
                                id: 'cf3a5f08-a107-4571-b222-933e5fb03ff2',
                                type: 'row',
                                fields: [
                                    {
                                        label: 'Name',
                                        icon: 'FaTextHeight',
                                        id: 'c267f482-2097-439c-b89d-5092573fa596',
                                        type: 'shortText',
                                        description: '',
                                        isDefault: false,
                                        isRequired: true,
                                        options: [],
                                        children: [],
                                        _id: '680a74168ed222944a584980',
                                        value: formData.name,
                                    },
                                    {
                                        label: 'What is your current position?',
                                        icon: 'FaTextHeight',
                                        id: '1cb24e7e-6e91-4d08-91c4-2da91e18c17c',
                                        type: 'shortText',
                                        description: '',
                                        defaultValue:
                                            'Like Owner, coach, mentor, sales, VP, Director etc.',
                                        isDefault: false,
                                        isRequired: true,
                                        options: [],
                                        children: [],
                                        _id: '680a74168ed222944a584981',
                                        value: formData.position,
                                    },
                                    {
                                        label: 'Email',
                                        icon: 'FaTextHeight',
                                        id: '7674392c-eb83-455d-8648-71e6875ecd00',
                                        type: 'shortText',
                                        description: '',
                                        isDefault: false,
                                        isRequired: true,
                                        options: [],
                                        children: [],
                                        _id: '680a74168ed222944a584982',
                                        value: formData.email,
                                    },
                                    {
                                        label: 'Phone Number',
                                        icon: 'FaSortNumericDownAlt',
                                        id: '758bfb62-a54d-4dc7-9352-b455169f3ab8',
                                        type: 'number',
                                        description: '',
                                        defaultValue: '',
                                        isDefault: false,
                                        isRequired: true,
                                        options: [],
                                        children: [],
                                        _id: '680a74168ed222944a584983',
                                        value: formData.phone,
                                    },
                                    {
                                        label: 'What is the best time for us to reach you to set up a meeting?',
                                        icon: 'FaCalendarAlt',
                                        id: 'e3f7ad9f-8663-4c23-8645-ef72e74995b5',
                                        type: 'date',
                                        description: '',
                                        isDefault: false,
                                        isRequired: true,
                                        options: [],
                                        children: [],
                                        _id: '680a74168ed222944a584984',
                                        value: formData.bestTime
                                            ? formData.bestTime.toISOString()
                                            : '',
                                    },
                                    {
                                        label: 'Timezone',
                                        icon: 'FaAngleDown',
                                        id: '4ba6ee18-5e6b-4369-805e-30e7d4722bab',
                                        type: 'dropdown',
                                        description: '',
                                        isDefault: false,
                                        isRequired: true,
                                        options: [
                                            {
                                                value: 'EST',
                                            },
                                            {
                                                value: 'CST',
                                            },
                                            {
                                                value: 'PST',
                                            },
                                            {
                                                value: 'Other',
                                            },
                                        ],
                                        children: [],
                                        isMulti: false,
                                        _id: '680aa59e8ed222944a586bb7',
                                        value: formData.timezone,
                                    },
                                    {
                                        label: 'Share Details',
                                        icon: 'FaAlignCenter',
                                        id: '37aefc19-3a86-4f4d-a5d6-a94769fb2c6e',
                                        type: 'paragraph',
                                        description: '',
                                        defaultValue:
                                            'share your details so that we can have a productive meeting',
                                        isDefault: false,
                                        isRequired: true,
                                        options: [],
                                        children: [],
                                        _id: '680a74168ed222944a584985',
                                        value: formData.details,
                                    },
                                    {
                                        label: 'What is your current website?',
                                        icon: 'FaTextHeight',
                                        id: '57a7b777-85a6-4272-8b9b-7a72c687e81b',
                                        type: 'shortText',
                                        description: '',
                                        defaultValue: 'https://www.abc.com',
                                        isDefault: false,
                                        isRequired: false,
                                        options: [],
                                        children: [],
                                        _id: '680a74b28ed222944a584a01',
                                        value: formData.website,
                                    },
                                ],
                                _id: '680a74168ed222944a58497f',
                            },
                        ],
                        _id: '680a74168ed222944a58497e',
                    },
                ],
            };

            console.log('Submitting payload:', payload);

            // Make the API call
            const response = await fetch(
                'https://api.bizcoms.ai/api/v1/crm/form/submit/mi1RuZLQkm',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                },
            );

            // Handle response
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit form');
            }

            const data = await response.json();
            console.log('Form submission response:', data);

            // Success handling
            setSubmitSuccess(true);

            // Optional: Reset form
            setFormData({
                name: '',
                position: '',
                email: '',
                phone: '',
                bestTime: null,
                timezone: '',
                details: '',
                website: '',
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : 'An unexpected error occurred',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='max-w-4xl mx-auto p-2 rounded-lg'>
            <Dialog
                open={submitSuccess}
                onOpenChange={(open) => !open && setSubmitSuccess(false)}
            >
                <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                        <DialogTitle className='text-center text-xl text-black'>
                            Submission Successful!
                        </DialogTitle>
                        <DialogDescription className='text-center'>
                            Thank you for your submission! We&apos;ll be in
                            touch with you shortly.
                        </DialogDescription>
                    </DialogHeader>

                    <div className='h-[200px] w-[200px] mx-auto'>
                        <Lottie animationData={success} loop={true} />
                    </div>

                    <DialogFooter className='sm:justify-center mt-4'>
                        <Button
                            type='button'
                            onClick={() => {
                                setSubmitSuccess(false);
                            }}
                            className='w-full sm:w-auto'
                        >
                            Go Home
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {!submitSuccess && (
                <form onSubmit={handleSubmit} className='space-y-2'>
                    {submitError && (
                        <div className='p-4 bg-red-50 border border-red-200 rounded-md text-red-800'>
                            <p>{submitError}</p>
                        </div>
                    )}

                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <label
                                htmlFor='name'
                                className='block text-sm font-medium text-black'
                            >
                                Name <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='text'
                                placeholder='John Doe'
                                id='name'
                                name='name'
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className='mt-1 block w-full px-3 py-2 text-black border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500'
                            />
                        </div>

                        <div>
                            <label
                                htmlFor='position'
                                className='block text-sm font-medium text-black'
                            >
                                What is your current position?{' '}
                                <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='text'
                                id='position'
                                name='position'
                                required
                                placeholder='Like Owner, VP, Director etc.'
                                value={formData.position}
                                onChange={handleChange}
                                className='mt-1 block w-full px-3 py-2 text-black border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500'
                            />
                        </div>

                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium text-black'
                            >
                                Email <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='email'
                                placeholder='example@example.com'
                                id='email'
                                name='email'
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className='mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500'
                            />
                        </div>

                        <div>
                            <label
                                htmlFor='phone'
                                className='block text-sm font-medium text-black'
                            >
                                Phone Number{' '}
                                <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='tel'
                                id='phone'
                                placeholder='123-456-7890'
                                name='phone'
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className='mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500'
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor='bestTime'
                            className='block text-sm font-medium text-black'
                        >
                            What is the best time for us to reach you to set up
                            a meeting? <span className='text-red-500'>*</span>
                        </label>
                        <div className='flex flex-wrap gap-2'>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant='outline'
                                        className={cn(
                                            'flex-1 justify-start text-left font-normal text-black mt-1 px-3 py-2 h-10 border bg-foreground border-gray-200 rounded-md shadow-sm',
                                            !formData.bestTime && 'text-black',
                                        )}
                                    >
                                        <CalendarIcon className='mr-2 h-4 w-4' />
                                        {formData.bestTime ? (
                                            format(formData.bestTime, 'PPP')
                                        ) : (
                                            <span>Select a date</span>
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
                                            formData.bestTime || undefined
                                        }
                                        onSelect={(date) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                bestTime: date || null,
                                            }))
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            <div className='flex-1 mt-1'>
                                <Select
                                    value={formData.timezone}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            timezone: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger className='w-full border border-gray-200 rounded-md shadow-sm bg-foreground'>
                                        <SelectValue placeholder='Select Timezone' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='EST'>
                                            Eastern Time (EST)
                                        </SelectItem>
                                        <SelectItem value='CST'>
                                            Central Time (CST)
                                        </SelectItem>
                                        <SelectItem value='PST'>
                                            Pacific Time (PST)
                                        </SelectItem>

                                        <SelectItem value='other'>
                                            Other
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor='website'
                            className='block text-sm font-medium text-black'
                        >
                            What is your current website?
                        </label>
                        <input
                            type='url'
                            id='website'
                            name='website'
                            placeholder='https://www.abc.com'
                            value={formData.website}
                            onChange={handleChange}
                            className='mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500'
                        />
                    </div>
                    <div className='col-span-2'>
                        <label
                            htmlFor='details'
                            className='block text-sm font-medium text-black'
                        >
                            Share Details{' '}
                            <span className='text-red-500'>*</span>
                        </label>
                        <textarea
                            id='details'
                            name='details'
                            rows={3}
                            required
                            placeholder='share your details so that we can have a productive meeting'
                            value={formData.details}
                            onChange={handleChange}
                            className='mt-1 block w-full px-3 py-2 text-black border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500'
                        />
                    </div>

                    <div className='mt-6'>
                        <Button
                            type='submit'
                            className='w-full sm:w-auto px-6 py-2 text-pure-white'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
