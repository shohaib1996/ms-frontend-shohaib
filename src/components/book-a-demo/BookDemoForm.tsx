'use client';

import type React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import PhoneInput from 'react-phone-number-input';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    companyWeb: string;
    phone: string;
    about: string;
    hsCurrentLms: boolean;
    isReferred: boolean;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    companyName?: string;
    companyWeb?: string;
    phone?: string;
    about?: string;
}

const BookDemoForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        companyWeb: '',
        phone: '',
        about: '',
        hsCurrentLms: false,
        isReferred: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value === 'yes' }));
    };

    const handlePhoneChange = (value: any) => {
        setFormData((prev) => ({ ...prev, phone: value }));
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }
        if (!formData.companyWeb.trim()) {
            newErrors.companyWeb = 'Company website is required';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }
        if (!formData.about.trim()) {
            newErrors.about = 'Company details are required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            companyName: '',
            companyWeb: '',
            phone: '',
            about: '',
            hsCurrentLms: false,
            isReferred: false,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await axios.post('/marketing/book-demo', {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                about: formData.about,
                companyWeb: formData.companyWeb,
                companyName: formData.companyName,
                hsCurrentLms: formData.hsCurrentLms,
                isReferred: formData.isReferred,
            });

            toast.success(
                "You've successfully booked a demo. We will contact you shortly.",
            );

            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(
                'There was a problem submitting your request. Please try again.',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className='xl:py-20 py-16 bg-gradient-to-b from-slate-50 dark:from-slate-900 dark:to-slate-950 to-white'>
            <div className='my-container pt-10'>
                <div className='text-center mb-12'>
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4'>
                        Book A <span className='text-primary-white'>Demo</span>
                    </h1>
                    <div className='w-20 h-1 bg-primary mx-auto rounded-full'></div>
                </div>

                <div className='grid lg:grid-cols-2 gap-4 lg:gap-6 items-center'>
                    {/* Form Section */}
                    <div className='bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 md:p-6'>
                        <form
                            onSubmit={handleSubmit}
                            className='space-y-3 text-dark-gray'
                        >
                            <div className='grid md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <Label
                                        htmlFor='firstName'
                                        className='required'
                                    >
                                        First Name
                                    </Label>
                                    <Input
                                        id='firstName'
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder='Enter first name'
                                        className={`${errors.firstName ? 'border-red-500' : ''} bg-background`}
                                    />
                                    {errors.firstName && (
                                        <p className='text-sm text-red-500'>
                                            {errors.firstName}
                                        </p>
                                    )}
                                </div>

                                <div className='space-y-2'>
                                    <Label
                                        htmlFor='lastName'
                                        className='required'
                                    >
                                        Last Name
                                    </Label>
                                    <Input
                                        id='lastName'
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder='Enter last name'
                                        className={`${errors.lastName ? 'border-red-500' : ''} bg-background`}
                                    />
                                    {errors.lastName && (
                                        <p className='text-sm text-red-500'>
                                            {errors.lastName}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='email' className='required'>
                                    Email
                                </Label>
                                <Input
                                    id='email'
                                    name='email'
                                    type='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='Enter your email'
                                    className={`${errors.email ? 'border-red-500' : ''} bg-background`}
                                />
                                {errors.email && (
                                    <p className='text-sm text-red-500'>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className='grid md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <Label
                                        htmlFor='companyName'
                                        className='required'
                                    >
                                        Company Name
                                    </Label>
                                    <Input
                                        id='companyName'
                                        name='companyName'
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder='Enter company name'
                                        className={`${errors.companyName ? 'border-red-500' : ''} bg-background`}
                                    />
                                    {errors.companyName && (
                                        <p className='text-sm text-red-500'>
                                            {errors.companyName}
                                        </p>
                                    )}
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='phone' className='required'>
                                        Phone Number
                                    </Label>
                                    <PhoneInput
                                        international
                                        defaultCountry='US'
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        className='bg-background rounded-md border border-forground-border pl-2'
                                        inputComponent={Input}
                                    />
                                    {errors.phone && (
                                        <p className='text-sm text-red-500'>
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label
                                    htmlFor='companyWeb'
                                    className='required'
                                >
                                    Company Website
                                </Label>
                                <Input
                                    id='companyWeb'
                                    name='companyWeb'
                                    value={formData.companyWeb}
                                    onChange={handleChange}
                                    placeholder='Enter company website'
                                    className={`${errors.companyWeb ? 'border-red-500' : ''} bg-background`}
                                />
                                {errors.companyWeb && (
                                    <p className='text-sm text-red-500'>
                                        {errors.companyWeb}
                                    </p>
                                )}
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='hsCurrentLms'>
                                    Do you have a current LMS system?
                                </Label>
                                <Select
                                    onValueChange={(value) =>
                                        handleSelectChange(
                                            'hsCurrentLms',
                                            value,
                                        )
                                    }
                                    defaultValue='select'
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='select'>
                                            Select
                                        </SelectItem>
                                        <SelectItem value='yes'>Yes</SelectItem>
                                        <SelectItem value='no'>No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='isReferred'>
                                    Does someone refer you?
                                </Label>
                                <Select
                                    onValueChange={(value) =>
                                        handleSelectChange('isReferred', value)
                                    }
                                    defaultValue='select'
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='select'>
                                            Select
                                        </SelectItem>
                                        <SelectItem value='yes'>Yes</SelectItem>
                                        <SelectItem value='no'>No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='about' className='required'>
                                    Share Company Details
                                </Label>
                                <Textarea
                                    id='about'
                                    name='about'
                                    value={formData.about}
                                    onChange={handleChange}
                                    placeholder='Tell us about your company...'
                                    className={`min-h-[120px] bg-background ${errors.about ? 'border-red-500' : ''}`}
                                />
                                {errors.about && (
                                    <p className='text-sm text-red-500'>
                                        {errors.about}
                                    </p>
                                )}
                            </div>

                            <Button
                                type='submit'
                                className='w-full'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        </form>
                    </div>

                    {/* Image Section */}
                    <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-tr from-emerald-100 to-sky-100 dark:from-emerald-900/30 dark:to-sky-900/30 rounded-3xl transform rotate-2 opacity-70'></div>
                        <div className='relative overflow-hidden rounded-2xl shadow-lg'>
                            <Image
                                src='/pages/form-image.png'
                                alt='Book a demo'
                                width={1080}
                                height={720}
                                className='w-full h-auto object-cover'
                            />
                        </div>

                        <Alert className='mt-6 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'>
                            <AlertCircle className='h-4 w-4 text-emerald-600 dark:text-emerald-400' />
                            <AlertDescription className='text-emerald-700 dark:text-emerald-300'>
                                You&apos;re on the path to offering an
                                exceptional school and student experience via
                                the SkillBNK.
                            </AlertDescription>
                        </Alert>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookDemoForm;
