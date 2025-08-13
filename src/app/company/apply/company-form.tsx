'use client';

import { useCallback, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, Link, Phone, User } from 'lucide-react';
import type { CompanyFormData } from '@/types/ApplyCompanyTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import UploadFiles from '@/components/global/UploadFiles';

// Define the form schema with zod
const formSchema = z.object({
    name: z.string().min(1, 'Company name is required'),
    address: z.object({
        street: z.string().min(1, 'Street is required'),
        city: z.string().min(1, 'City is required'),
        state: z.string().min(1, 'State is required'),
        country: z.string().min(1, 'Country is required'),
        zip: z.string().min(1, 'Postal code is required'),
    }),
    companyUrl: z.string().optional(),
    phone: z.string().min(1, 'Phone number is required'),
    faxNumber: z.string().optional(),
    taxNumber: z.string().optional(),
    firstContact: z.object({
        name: z.string().min(1, 'Contact name is required'),
        email: z.string().email('Invalid email').min(1, 'Email is required'),
        phone: z.string().min(1, 'Phone number is required'),
    }),
    secondContact: z.object({
        name: z.string().optional(),
        email: z.string().email('Invalid email').optional().or(z.literal('')),
        phone: z.string().optional(),
    }),
    about: z.string().optional(),
    socialLinks: z.object({
        facebook: z.string().optional(),
        twitter: z.string().optional(),
        github: z.string().optional(),
        instagram: z.string().optional(),
        linkedin: z.string().optional(),
    }),
    companyLogo: z
        .union([z.string(), z.array(z.string())])
        .optional()
        .nullable(),
    companyDocument: z
        .union([z.string(), z.array(z.string())])
        .optional()
        .nullable(),
    otherDocument: z
        .union([z.string(), z.array(z.string())])
        .optional()
        .nullable(),
});

// Create a type for the form values based on the schema
type FormValues = z.infer<typeof formSchema>;

interface CompanyFormProps {
    initialData: CompanyFormData;
    onSubmit: (data: CompanyFormData) => Promise<void>;
    isSubmitting: boolean;
}

// Local storage key for saved form data
const FORM_STORAGE_KEY = 'saved_company_form_data';

export default function CompanyForm({
    initialData,
    onSubmit,
    isSubmitting,
}: CompanyFormProps) {
    // Get saved data from localStorage
    const getSavedData = useCallback(() => {
        if (typeof window === 'undefined') {
            return null;
        }

        try {
            const savedData = localStorage.getItem(FORM_STORAGE_KEY);
            return savedData
                ? (JSON.parse(savedData) as CompanyFormData)
                : null;
        } catch (error) {
            console.error('Error loading saved form data:', error);
            return null;
        }
    }, []);

    // Initialize with saved data or initialData
    const savedData = getSavedData();

    const [logo, setLogo] = useState<string | string[] | null>(
        savedData?.companyLogo || initialData.companyLogo || null,
    );

    const [document, setDocument] = useState<string | string[] | null>(
        savedData?.companyDocument || initialData.companyDocument || null,
    );

    const [otherDocument, setOtherDocument] = useState<
        string | string[] | null
    >(savedData?.otherDocument || initialData.otherDocument || null);

    // Prepare default values from saved data or initial data
    const getDefaultValues = () => {
        if (savedData) {
            return {
                name: savedData.name || '',
                address: {
                    street: savedData.address?.street || '',
                    city: savedData.address?.city || '',
                    state: savedData.address?.state || '',
                    country: savedData.address?.country || '',
                    zip: savedData.address?.zip || '',
                },
                companyUrl: savedData.companyUrl || '',
                phone: savedData.phone || '',
                faxNumber: savedData.faxNumber || '',
                taxNumber: savedData.taxNumber || '',
                firstContact: {
                    name: savedData.firstContact?.name || '',
                    email: savedData.firstContact?.email || '',
                    phone: savedData.firstContact?.phone || '',
                },
                secondContact: {
                    name: savedData.secondContact?.name || '',
                    email: savedData.secondContact?.email || '',
                    phone: savedData.secondContact?.phone || '',
                },
                about: savedData.about || '',
                socialLinks: {
                    facebook: savedData.socialLinks?.facebook || '',
                    twitter: savedData.socialLinks?.twitter || '',
                    github: savedData.socialLinks?.github || '',
                    instagram: savedData.socialLinks?.instagram || '',
                    linkedin: savedData.socialLinks?.linkedin || '',
                },
                companyLogo: savedData.companyLogo || null,
                companyDocument: savedData.companyDocument || null,
                otherDocument: savedData.otherDocument || null,
            };
        }

        return {
            name: initialData.name || '',
            address: {
                street: initialData.address?.street || '',
                city: initialData.address?.city || '',
                state: initialData.address?.state || '',
                country: initialData.address?.country || '',
                zip: initialData.address?.zip || '',
            },
            companyUrl: initialData.companyUrl || '',
            phone: initialData.phone || '',
            faxNumber: initialData.faxNumber || '',
            taxNumber: initialData.taxNumber || '',
            firstContact: {
                name: initialData.firstContact?.name || '',
                email: initialData.firstContact?.email || '',
                phone: initialData.firstContact?.phone || '',
            },
            secondContact: {
                name: initialData.secondContact?.name || '',
                email: initialData.secondContact?.email || '',
                phone: initialData.secondContact?.phone || '',
            },
            about: initialData.about || '',
            socialLinks: {
                facebook: initialData.socialLinks?.facebook || '',
                twitter: initialData.socialLinks?.twitter || '',
                github: initialData.socialLinks?.github || '',
                instagram: initialData.socialLinks?.instagram || '',
                linkedin: initialData.socialLinks?.linkedin || '',
            },
            companyLogo: initialData.companyLogo || null,
            companyDocument: initialData.companyDocument || null,
            otherDocument: initialData.otherDocument || null,
        };
    };

    // Initialize the form with the correct type
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: getDefaultValues(),
    });

    const handleClearForm = () => {
        // Remove data from localStorage
        localStorage.removeItem(FORM_STORAGE_KEY);

        // Reset file states
        setLogo(null);
        setDocument(null);
        setOtherDocument(null);

        // Reset form with empty values
        form.reset({
            name: '',
            address: {
                street: '',
                city: '',
                state: '',
                country: '',
                zip: '',
            },
            companyUrl: '',
            phone: '',
            faxNumber: '',
            taxNumber: '',
            firstContact: {
                name: '',
                email: '',
                phone: '',
            },
            secondContact: {
                name: '',
                email: '',
                phone: '',
            },
            about: '',
            socialLinks: {
                facebook: '',
                twitter: '',
                github: '',
                instagram: '',
                linkedin: '',
            },
            companyLogo: null,
            companyDocument: null,
            otherDocument: null,
        });
    };

    // Save form data to localStorage whenever form values change
    useEffect(() => {
        const subscription = form.watch((formValues) => {
            if (typeof window === 'undefined' || !formValues) {
                return;
            }

            try {
                const dataToSave: CompanyFormData = {
                    ...(formValues as FormValues),
                    companyLogo: Array.isArray(logo)
                        ? logo[0]
                        : logo || undefined,
                    companyDocument: Array.isArray(document)
                        ? document[0]
                        : document || undefined,
                    otherDocument: Array.isArray(otherDocument)
                        ? otherDocument[0]
                        : otherDocument || undefined,
                    companyUrl: (formValues as FormValues).companyUrl || '',
                };

                localStorage.setItem(
                    FORM_STORAGE_KEY,
                    JSON.stringify(dataToSave),
                );
            } catch (error) {
                console.error('Error saving form data:', error);
            }
        });

        return () => subscription.unsubscribe();
    }, [form, logo, document, otherDocument]);

    // Save file states to localStorage when they change
    useEffect(() => {
        try {
            const currentFormData = form.getValues();
            const dataToSave: CompanyFormData = {
                ...(currentFormData as FormValues),
                companyLogo: Array.isArray(logo) ? logo[0] : logo || undefined,
                companyDocument: Array.isArray(document)
                    ? document[0]
                    : document || undefined,
                otherDocument: Array.isArray(otherDocument)
                    ? otherDocument[0]
                    : otherDocument || undefined,
                companyUrl: (currentFormData as FormValues).companyUrl || '',
            };

            localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(dataToSave));
        } catch (error) {
            console.error('Error saving file data:', error);
        }
    }, [logo, document, otherDocument, form]);

    const handleFormSubmit: SubmitHandler<FormValues> = useCallback(
        async (data: FormValues) => {
            const formData: CompanyFormData = {
                ...data,
                companyLogo: Array.isArray(logo) ? logo[0] : logo || undefined,
                companyDocument: Array.isArray(document)
                    ? document[0]
                    : document || undefined,
                otherDocument: Array.isArray(otherDocument)
                    ? otherDocument[0]
                    : otherDocument || undefined,
                companyUrl: data.companyUrl || '',
            };

            try {
                await onSubmit(formData);

                // Clear saved form data on successful submission
            } catch (error) {
                // Keep the data in localStorage if submission fails
                console.error('Form submission error:', error);
            }
        },
        [logo, document, otherDocument, onSubmit],
    );

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className='space-y-4 mb-4'
            >
                <Card className='bg-foreground border-none'>
                    <CardContent className='pt-4'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Company Name{' '}
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='Enter company name'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='address.street'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Street{' '}
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='Street'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='address.city'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            City{' '}
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='City'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='address.zip'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Postal Code{' '}
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='Postal Code'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='address.state'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            State{' '}
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='State'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='address.country'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Country{' '}
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Select country' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='America'>
                                                    America
                                                </SelectItem>
                                                <SelectItem value='Canada'>
                                                    Canada
                                                </SelectItem>
                                                <SelectItem value='Bangladesh'>
                                                    Bangladesh
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='companyUrl'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex items-center gap-2 mb-1'>
                                            <Link size={16} />
                                            Website URL
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='Website URL'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='phone'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex items-center gap-2 mb-1'>
                                            <Phone size={16} />
                                            Phone Number{' '}
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='Phone Number'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='faxNumber'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fax Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='Fax Number'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='taxNumber'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tax Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='Enter tax number'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Person 1 */}
                <Card className='bg-foreground border-none'>
                    <CardContent className='pt-6'>
                        <h3 className='text-lg font-medium mb-4'>
                            Contact Person 1
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <FormField
                                control={form.control}
                                name='firstContact.name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex items-center gap-2 mb-1'>
                                            <User size={16} />
                                            Name{' '}
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='Please enter name'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='firstContact.email'
                                render={({ field }) => (
                                    <FormItem className='-mt-1'>
                                        <FormLabel>
                                            Email{' '}
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='Please enter email'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='md:col-span-2'>
                                <FormField
                                    control={form.control}
                                    name='firstContact.phone'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='flex items-center gap-2 mb-1'>
                                                <Phone size={16} />
                                                Phone Number{' '}
                                                <span className='text-red-500'>
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='bg-background'
                                                    placeholder='Please enter phone'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Person 2 */}
                <Card className='bg-foreground border-none'>
                    <CardContent className='pt-6'>
                        <h3 className='text-lg font-medium mb-4'>
                            Contact Person 2
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <FormField
                                control={form.control}
                                name='secondContact.name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex items-center gap-2 mb-1'>
                                            <User size={16} />
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='Please enter name'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='secondContact.email'
                                render={({ field }) => (
                                    <FormItem className='-mt-1'>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='Please enter email'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='md:col-span-2'>
                                <FormField
                                    control={form.control}
                                    name='secondContact.phone'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='flex items-center gap-2 mb-1'>
                                                <Phone size={16} />
                                                Phone Number
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='bg-background'
                                                    placeholder='Please enter phone'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* About */}
                <Card className='bg-foreground border-none'>
                    <CardContent className='pt-6'>
                        <FormField
                            control={form.control}
                            name='about'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>About</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder='Write about the company'
                                            className='min-h-[120px] bg-background'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Social Links */}
                <Card className='bg-foreground border-none'>
                    <CardContent className='pt-6'>
                        <h3 className='text-lg font-medium mb-4'>
                            Social Links
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <FormField
                                control={form.control}
                                name='socialLinks.facebook'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex items-center gap-2 mb-1'>
                                            <img
                                                src='/socialicon/f-icon.png'
                                                width={15}
                                                height={15}
                                                alt='facebook'
                                                className='object-contain'
                                            />
                                            Facebook
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='www.facebook.com'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='socialLinks.github'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex items-center gap-2 mb-1'>
                                            <img
                                                src='/socialicon/git-icon.png'
                                                width={15}
                                                height={15}
                                                alt='github'
                                                className='object-contain'
                                            />
                                            GitHub
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='www.github.com'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='socialLinks.instagram'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex items-center gap-2 mb-1'>
                                            <img
                                                src='/socialicon/inst-icon.png'
                                                width={15}
                                                height={15}
                                                alt='instagram'
                                                className='object-contain'
                                            />
                                            Instagram
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='www.instagram.com'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='socialLinks.twitter'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex items-center gap-2 mb-1'>
                                            <img
                                                src='/socialicon/x-icon.png'
                                                width={15}
                                                height={15}
                                                alt='twitter'
                                                className='object-contain'
                                            />
                                            Twitter
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-background'
                                                placeholder='www.twitter.com'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='md:col-span-2'>
                                <FormField
                                    control={form.control}
                                    name='socialLinks.linkedin'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='flex items-center gap-2 mb-1'>
                                                <img
                                                    src='/socialicon/link-icon.png'
                                                    width={15}
                                                    height={15}
                                                    alt='linkedin'
                                                    className='object-contain'
                                                />
                                                LinkedIn
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='bg-background'
                                                    placeholder='www.linkedin.com'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* File Uploads */}
                <Card className='bg-foreground border-none'>
                    <CardContent className='pt-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <UploadFiles
                                    placeholder='Upload logo'
                                    label='Logo'
                                    attachment={logo || ''}
                                    setAttachment={setLogo}
                                    htmlFor='companyLogo'
                                    accept='.jpg, .jpeg, .png'
                                />
                            </div>

                            <div className='space-y-2'>
                                <UploadFiles
                                    placeholder='Upload document'
                                    label='Business Document'
                                    attachment={document || ''}
                                    setAttachment={setDocument}
                                    htmlFor='companyDocument'
                                    accept='.jpg, .png, .pdf, .docx'
                                    multiple={false}
                                />
                            </div>

                            <div className='space-y-2 md:col-span-2'>
                                <UploadFiles
                                    placeholder='Upload other document'
                                    label='Other Document'
                                    attachment={otherDocument || ''}
                                    setAttachment={setOtherDocument}
                                    htmlFor='otherDocument'
                                    accept='.jpg, .png, .pdf, .docx'
                                    multiple={false}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className='flex justify-center'>
                    <Button
                        type='button'
                        size='lg'
                        className='w-[200px] border-red-500 text-red-500 mr-4'
                        variant={'plain'}
                        onClick={handleClearForm}
                    >
                        Clear
                    </Button>
                    <Button
                        type='submit'
                        size='lg'
                        className='w-[200px]'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Applying...
                            </>
                        ) : (
                            'Apply'
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
