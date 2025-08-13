'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'sonner';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { CalendarIcon, Clock, Loader2 } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type NewsletterBenefit = {
    icon: React.ReactNode;
    title: string;
    description: string;
};

const newsletterBenefits: NewsletterBenefit[] = [
    {
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' />
                <polyline points='14 2 14 8 20 8' />
                <path d='M16 13H8' />
                <path d='M16 17H8' />
                <path d='M10 9H8' />
            </svg>
        ),
        title: 'Exclusive Content',
        description:
            'Get access to learning resources, tutorials, and guides not available anywhere else.',
    },
    {
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <path d='M5.5 8.5 9 12l-1.5 1.5' />
                <path d='m12 12 1.5 1.5' />
                <path d='M8 18h8' />
                <path d='M2 8h2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8h2' />
                <path d='M6 4h12a2 2 0 0 1 2 2v2H4V6a2 2 0 0 1 2-2Z' />
            </svg>
        ),
        title: 'Industry Insights',
        description:
            'Stay updated with the latest trends, technologies, and best practices in your field.',
    },
    {
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <path d='M6 9H4.5a2.5 2.5 0 0 1 0-5H6' />
                <path d='M18 9h1.5a2.5 2.5 0 0 0 0-5H18' />
                <path d='M4 22h16' />
                <path d='M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22' />
                <path d='M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22' />
                <path d='M18 2H6v7a6 6 0 0 0 12 0V2Z' />
            </svg>
        ),
        title: 'Special Offers',
        description:
            'Receive exclusive discounts and early access to new courses and programs.',
    },
];

export function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            return toast.error('Enter your email');
        }
        const data = {
            email,
        };

        setLoading(true);
        axios
            .post('/marketing/newsletter/subscribe', data)
            .then((res) => {
                toast.success('Subscribed successfully');
                setEmail('');
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.response.data.error);
            });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    const formSchema = z.object({
        name: z.string().min(2, {
            message: 'Name must be at least 2 characters.',
        }),
        mobile: z.string().min(10, {
            message: 'Please enter a valid mobile number.',
        }),
        email: z.string().email({
            message: 'Please enter a valid email address.',
        }),
        meetingDateTime: z.date({
            required_error: 'Please select a date and time for the meeting.',
        }),
        employed: z.enum(['1-Yes', '2-No'], {
            required_error: 'Please select if you are currently employed.',
        }),
        jobSwitch: z.enum(['1-Yes', '2-No'], {
            required_error:
                'Please select if you are looking for a job switch.',
        }),
    });

    const timeSlots = [
        { value: '09:00', label: '9:00 AM' },
        { value: '09:30', label: '9:30 AM' },
        { value: '10:00', label: '10:00 AM' },
        { value: '10:30', label: '10:30 AM' },
        { value: '11:00', label: '11:00 AM' },
        { value: '11:30', label: '11:30 AM' },
        { value: '12:00', label: '12:00 PM' },
        { value: '12:30', label: '12:30 PM' },
        { value: '13:00', label: '1:00 PM' },
        { value: '13:30', label: '1:30 PM' },
        { value: '14:00', label: '2:00 PM' },
        { value: '14:30', label: '2:30 PM' },
        { value: '15:00', label: '3:00 PM' },
        { value: '15:30', label: '3:30 PM' },
        { value: '16:00', label: '4:00 PM' },
        { value: '16:30', label: '4:30 PM' },
        { value: '17:00', label: '5:00 PM' },
    ];

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            mobile: '',
            email: '',
            employed: undefined,
            jobSwitch: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        try {
            // Transform form data to API payload format
            const payload = {
                formSteps: [
                    {
                        label: 'Applicant Info',
                        icon: '',
                        id: 'eacc6581-ce9f-4e79-a75f-fb3e4d7f4c9d',
                        type: 'tab',
                        rows: [
                            {
                                label: 'Full Name',
                                icon: '',
                                id: '15ac53f7-89e9-40c6-b70f-d5fb3cf42a87',
                                type: 'row',
                                fields: [
                                    {
                                        label: 'Name',
                                        icon: 'FaTextHeight',
                                        id: '70cd9b86-ea25-4dca-a627-56b1ff727af3',
                                        type: 'shortText',
                                        description: '',
                                        isDefault: false,
                                        isRequired: true,
                                        options: [],
                                        children: [],
                                        _id: '67d30e9bb6137a55b2ba0994',
                                        value: values.name,
                                    },
                                    {
                                        label: 'Mobile',
                                        icon: 'FaSortNumericDownAlt',
                                        id: '51ce6340-adee-4421-ade2-1d35a9534af8',
                                        type: 'number',
                                        description: '',
                                        isDefault: false,
                                        isRequired: true,
                                        options: [],
                                        children: [],
                                        _id: '67d30e9bb6137a55b2ba0995',
                                        value: values.mobile,
                                    },
                                    {
                                        label: 'Email',
                                        icon: 'FaTextHeight',
                                        id: 'e05b3213-b8eb-464c-b5f4-2274d672f98a',
                                        type: 'shortText',
                                        description: '',
                                        isDefault: false,
                                        isRequired: true,
                                        options: [],
                                        children: [],
                                        _id: '67d30e9bb6137a55b2ba0996',
                                        value: values.email,
                                    },
                                    {
                                        label: 'What is the best time to set up a 15 min introductory meeting with you?',
                                        icon: 'FaCalendarAlt',
                                        id: 'f5116d25-e2c1-4434-b7bc-4d5a725018f6',
                                        type: 'date',
                                        description: '',
                                        isDefault: false,
                                        isRequired: true,
                                        options: [],
                                        children: [],
                                        _id: '67d31016b6137a55b2ba0f6d',
                                        value: values.meetingDateTime.toISOString(),
                                    },
                                    {
                                        label: 'Are you currently employed?',
                                        icon: 'FaRegDotCircle',
                                        id: '687654fe-4d51-468b-9528-d5ef2b85c5e2',
                                        type: 'radio',
                                        description: '',
                                        isDefault: false,
                                        isRequired: false,
                                        options: [
                                            {
                                                value: '1-Yes',
                                            },
                                            {
                                                value: '2-No',
                                            },
                                        ],
                                        children: [],
                                        _id: '67d30e9bb6137a55b2ba0998',
                                        value: values.employed,
                                    },
                                    {
                                        label: 'Are you looking for job switch?',
                                        icon: 'FaRegDotCircle',
                                        id: '63573ce1-0ecc-4e3e-b798-cc0186c25a17',
                                        type: 'radio',
                                        description: '',
                                        isDefault: false,
                                        isRequired: false,
                                        options: [
                                            {
                                                value: '1-Yes',
                                            },
                                            {
                                                value: '2-No',
                                            },
                                        ],
                                        children: [],
                                        _id: '67d30e9bb6137a55b2ba0999',
                                        value: values.jobSwitch,
                                    },
                                ],
                                _id: '67d30e9bb6137a55b2ba0993',
                            },
                        ],
                        _id: '67d30e9bb6137a55b2ba0992',
                    },
                ],
            };

            // Submit to API
            const response = await fetch(
                'https://api.bizcoms.ai/api/v1/crm/form/submit/2mSA6C6qTq',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                },
            );
            console.log(response);
            if (response.ok) {
                toast.success('Your form has been successfully submitted.');
                form.reset({});
            }
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
        } catch (err) {
            console.error('Form submission error:', err);
            // toast.error(err);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <section
            ref={sectionRef}
            id='consultation'
            className=' py-3 relative overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-primary-light dark:from-indigo-950 dark:via-[#1a1c2e] dark:to-primary/10'
        >
            <Card
                id='contact'
                className=' my-2 md:my-6 my-container mx-auto px-4'
            >
                <CardHeader>
                    <CardTitle className='text-base md:text-lg lg:text-2xl text-black font-bold'>
                        Book a FREE Career Consultation
                    </CardTitle>
                    <CardDescription className='text-xs sm:text-sm md:text-base'>
                        Please fill out the form below to schedule a 15-minute
                        career auditing session
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-3'
                        >
                            <div className='grid gap-6 md:grid-cols-2'>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-base md:text-lg font-bold text-black'>
                                                Name{' '}
                                                <span className='text-destructive'>
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Enter your name'
                                                    {...field}
                                                    className='text-black p-6 bg-background'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='mobile'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-base md:text-lg font-bold text-black'>
                                                Mobile{' '}
                                                <span className='text-destructive'>
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Enter your mobile number'
                                                    {...field}
                                                    className='text-black p-6 bg-background'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-base md:text-lg font-bold text-black'>
                                            Email{' '}
                                            <span className='text-destructive'>
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter your email address'
                                                {...field}
                                                className='text-black p-6 bg-background'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='meetingDateTime'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel className='text-base md:text-lg font-bold text-black'>
                                            What is the best time for a
                                            15-minute career auditing session?{' '}
                                            <span className='text-destructive'>
                                                *
                                            </span>
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-full pl-3 text-black text-left font-normal p-6 flex items-center justify-between',
                                                            !field.value &&
                                                                'text-muted-foreground',
                                                        )}
                                                    >
                                                        {field.value &&
                                                        dayjs(
                                                            field.value,
                                                        ).isValid() ? (
                                                            dayjs(
                                                                field.value,
                                                            ).format(
                                                                'MMMM D, YYYY [at] h:mm A',
                                                            )
                                                        ) : (
                                                            <span>
                                                                Select date and
                                                                time
                                                            </span>
                                                        )}
                                                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className='w-auto p-4'
                                                align='start'
                                            >
                                                <div className='space-y-4'>
                                                    <Calendar
                                                        mode='single'
                                                        selected={field.value}
                                                        onSelect={(date) => {
                                                            if (date) {
                                                                const hours =
                                                                    field.value
                                                                        ? dayjs(
                                                                              field.value,
                                                                          ).hour()
                                                                        : 9;
                                                                const minutes =
                                                                    field.value
                                                                        ? dayjs(
                                                                              field.value,
                                                                          ).minute()
                                                                        : 0;
                                                                const newDate =
                                                                    dayjs(date)
                                                                        .hour(
                                                                            hours,
                                                                        )
                                                                        .minute(
                                                                            minutes,
                                                                        )
                                                                        .toDate();
                                                                field.onChange(
                                                                    newDate,
                                                                );
                                                            }
                                                        }}
                                                        initialFocus
                                                        className='text-black'
                                                    />
                                                    {/* <div className="flex flex-col space-y-2">
                                                        <div className="flex items-center">
                                                            <Clock className="mr-2 h-4 w-4" />
                                                            <span className="text-sm font-medium text-black">Time</span>
                                                        </div>
                                                        <Select
                                                            onValueChange={(time) => {
                                                                if (field.value && time) {
                                                                    const [hours, minutes] = time
                                                                        .split(":")
                                                                        .map(Number);
                                                                    const newDate = dayjs(field.value)
                                                                        .hour(hours)
                                                                        .minute(minutes)
                                                                        .toDate();
                                                                    field.onChange(newDate);
                                                                } else if (time) {
                                                                    const today = dayjs();
                                                                    const [hours, minutes] = time
                                                                        .split(":")
                                                                        .map(Number);
                                                                    const newDate = today
                                                                        .hour(hours)
                                                                        .minute(minutes)
                                                                        .toDate();
                                                                    field.onChange(newDate);
                                                                }
                                                            }}
                                                            value={
                                                                field.value
                                                                    ? `${dayjs(field.value)
                                                                        .hour()
                                                                        .toString()
                                                                        .padStart(2, "0")}:${dayjs(field.value)
                                                                            .minute()
                                                                            .toString()
                                                                            .padStart(2, "0")}`
                                                                    : undefined
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select time" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {timeSlots.map((slot) => (
                                                                    <SelectItem className="text-black"
                                                                        key={slot.value}
                                                                        value={slot.value}
                                                                    >
                                                                        {slot.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div> */}
                                                    <div className='flex flex-col space-y-2'>
                                                        <div className='flex items-center'>
                                                            <Clock className='mr-2 h-4 w-4' />
                                                            <span className='text-sm font-medium text-black'>
                                                                Time
                                                            </span>
                                                        </div>
                                                        <Select
                                                            onValueChange={(
                                                                time,
                                                            ) => {
                                                                if (
                                                                    field.value &&
                                                                    time
                                                                ) {
                                                                    const [
                                                                        hours,
                                                                        minutes,
                                                                    ] = time
                                                                        .split(
                                                                            ':',
                                                                        )
                                                                        .map(
                                                                            Number,
                                                                        );
                                                                    const newDate =
                                                                        dayjs(
                                                                            field.value,
                                                                        )
                                                                            .hour(
                                                                                hours,
                                                                            )
                                                                            .minute(
                                                                                minutes,
                                                                            )
                                                                            .toDate();
                                                                    field.onChange(
                                                                        newDate,
                                                                    );
                                                                } else if (
                                                                    time
                                                                ) {
                                                                    const today =
                                                                        dayjs();
                                                                    const [
                                                                        hours,
                                                                        minutes,
                                                                    ] = time
                                                                        .split(
                                                                            ':',
                                                                        )
                                                                        .map(
                                                                            Number,
                                                                        );
                                                                    const newDate =
                                                                        today
                                                                            .hour(
                                                                                hours,
                                                                            )
                                                                            .minute(
                                                                                minutes,
                                                                            )
                                                                            .toDate();
                                                                    field.onChange(
                                                                        newDate,
                                                                    );
                                                                }
                                                            }}
                                                            value={
                                                                field.value
                                                                    ? `${dayjs(
                                                                          field.value,
                                                                      )
                                                                          .hour()
                                                                          .toString()
                                                                          .padStart(
                                                                              2,
                                                                              '0',
                                                                          )}:${dayjs(
                                                                          field.value,
                                                                      )
                                                                          .minute()
                                                                          .toString()
                                                                          .padStart(
                                                                              2,
                                                                              '0',
                                                                          )}`
                                                                    : undefined
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder='Select time' />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {timeSlots.map(
                                                                    (slot) => (
                                                                        <SelectItem
                                                                            className='text-black'
                                                                            key={
                                                                                slot.value
                                                                            }
                                                                            value={
                                                                                slot.value
                                                                            }
                                                                        >
                                                                            {
                                                                                slot.label
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Select your preferred date and time
                                            for the meeting.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='grid gap-6 md:grid-cols-2'>
                                <FormField
                                    control={form.control}
                                    name='employed'
                                    render={({ field }) => (
                                        <FormItem className='space-y-3'>
                                            <FormLabel className='text-base md:text-lg font-bold text-black dark:text-white'>
                                                Are you currently employed?{' '}
                                                <span className='text-destructive'>
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    className='flex flex-col space-y-1'
                                                >
                                                    <FormItem className='flex items-center space-x-3 space-y-0'>
                                                        <FormControl>
                                                            <RadioGroupItem
                                                                value='1-Yes'
                                                                className='text-primary border-gray-400 dark:border-gray-300'
                                                            />
                                                        </FormControl>
                                                        <FormLabel className='font-normal text-xs sm:text-sm md:text-base text-black dark:text-white'>
                                                            Yes
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className='flex items-center space-x-3 space-y-0'>
                                                        <FormControl>
                                                            <RadioGroupItem
                                                                value='2-No'
                                                                className='text-primary border-gray-400 dark:border-gray-300'
                                                            />
                                                        </FormControl>
                                                        <FormLabel className='font-normal text-xs sm:text-sm md:text-base text-black dark:text-white'>
                                                            No
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='jobSwitch'
                                    render={({ field }) => (
                                        <FormItem className='space-y-3'>
                                            <FormLabel className='text-base md:text-lg font-bold text-black dark:text-white'>
                                                Are you looking for job switch?{' '}
                                                <span className='text-destructive'>
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    className='flex flex-col space-y-1'
                                                >
                                                    <FormItem className='flex items-center space-x-3 space-y-0'>
                                                        <FormControl>
                                                            <RadioGroupItem
                                                                value='1-Yes'
                                                                className='text-primary border-gray-400 dark:border-gray-300'
                                                            />
                                                        </FormControl>
                                                        <FormLabel className='font-normal text-xs sm:text-sm md:text-base text-black dark:text-white'>
                                                            Yes
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className='flex items-center space-x-3 space-y-0'>
                                                        <FormControl>
                                                            <RadioGroupItem
                                                                value='2-No'
                                                                className='text-primary border-gray-400 dark:border-gray-300'
                                                            />
                                                        </FormControl>
                                                        <FormLabel className='font-normal text-xs sm:text-sm md:text-base text-black dark:text-white'>
                                                            No
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <CardFooter className='flex justify-center py-0 px-0 md:pt-4'>
                                <Button
                                    type='submit'
                                    size='lg'
                                    disabled={isSubmitting}
                                    className='bg-primary hover:bg-blue-500 text-white hover:text-black w-full md:w-auto'
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit'
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </section>
    );
}
