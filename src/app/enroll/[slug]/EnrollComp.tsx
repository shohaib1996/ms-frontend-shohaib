// Modified version of EnrollComp with Zod validation
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import dayjs from 'dayjs';
import Header from '@/components/home/enroll/header';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import DynamicFormViewer from '@/components/home/enroll/DynamicFormViewer';
import instance from '@/lib/axios';
import { Label } from '@/components/ui/label';
import { Combobox } from '@/components/ui/combobox';

// Interfaces for course-related data
interface Branch {
    _id: string;
    name: string;
    status: string;
}

interface SessionType {
    _id: string;
    name: string;
}

interface Organization {
    formSteps?: any[];
}

interface Course {
    _id: string;
    title: string;
    price?: {
        isFree: boolean;
        cost?: {
            salePrice: number;
        };
    };
    branches?: Branch[];
    organization?: Organization;
    type: 'program' | 'course';
}

// Form schema with Zod validation
const formSchema = z.object({
    program: z.string(),
    session: z.string(),
    branch: z.string(),
    status: z.string(), // ✅ make required
});

export default function EnrollComp() {
    const router = useRouter();
    const params = useParams();
    const { width, height } = useWindowSize();
    // Using authentication state - can be replaced with actual auth implementation
    const isAuthenticated = true; // Replace with actual authentication check

    // Course and enrollment data state
    const [course, setCourse] = useState<Course | null>(null);
    console.log({ course });
    const [sessions, setSessions] = useState<SessionType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [branch, setBranch] = useState<string>('');
    const [session, setSession] = useState<string>('');
    const [formSteps, setFormSteps] = useState<any[]>([]);
    const [company, setCompany] = useState<any>(null);
    const [term, setTerm] = useState<any>({});
    const [isEnrollmentCompleted, setIsEnrollmentCompleted] =
        useState<boolean>(false);
    const [isMultiStepVisible, setIsMultiStepVisible] =
        useState<boolean>(false);
    const [value, setValue] = useState<string>('');

    const pathName = usePathname();
    const url = pathName?.split('/')[pathName?.split('/')?.length - 1];
    console.log({ SelectedBranch: branch });
    // Track original form values for change detection
    const originalValuesRef = useRef({
        status: 'pending',
        program: '',
        session: '',
        branch: '',
    });

    // Fetch course data from API
    useEffect(() => {
        setIsLoading(true);
        instance
            .get(`/course/getcoursetoenroll/${params.slug}`)
            .then((res) => {
                const fetchedCourse: Course = res.data?.course;
                const fetchedSessions: SessionType[] = res.data?.sessions || [];
                setCourse(fetchedCourse);
                setSessions(fetchedSessions);
                setCompany(res.data?.course?.organization);
                setFormSteps(res.data?.course?.organization?.formSteps || []);

                // Initialize form values
                // form.setValue('program', fetchedCourse?._id || '');
                // if (fetchedSessions.length > 0) {
                //     form.setValue('session', fetchedSessions[0]?._id || '');
                // }
                // Initialize branch if there's only one approved branch
                if (
                    fetchedCourse.branches?.length === 1 &&
                    fetchedCourse.branches[0].status === 'approved'
                ) {
                    setBranch(fetchedCourse.branches[0]._id);
                }

                // Store original values for change detection
                originalValuesRef.current = {
                    status: 'pending',
                    program: fetchedCourse?._id || '',
                    session:
                        fetchedSessions.length > 0
                            ? fetchedSessions[0]?._id || ''
                            : '',
                    branch: '',
                };

                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
                toast.error(
                    error?.response?.data?.error ||
                        'Failed to load course data',
                );
            });
    }, [params.slug]);

    // Fetch terms and conditions when branch and session are selected
    useEffect(() => {
        if (branch && course && session) {
            const data = {
                branch,
                program: course?._id,
                session,
            };

            instance
                .post('/terms-conditions/myterm', data)
                .then((res) => {
                    setTerm(res.data?.term);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [branch, course, session]);

    // Update form values when branch or session changes
    // useEffect(() => {
    //     if (branch) {
    //         form.setValue('branch', branch);
    //     }
    //     if (session) {
    //         form.setValue('session', session);
    //     }
    // }, [branch, session, form]);

    // Function to find signature field in form steps
    // Define the expected shape of a field
    interface Field {
        label: string;
        type: string;
        [key: string]: any; // to allow extra properties
    }

    // Define a row containing fields
    interface Row {
        fields: Field[];
    }

    // Define a tab containing rows
    interface Tab {
        rows?: Row[];
    }

    // The function to find a signature field
    function findSignatureField(data: Tab[]): Field | null {
        for (const tab of data) {
            if (tab.rows) {
                for (const row of tab.rows) {
                    for (const field of row.fields) {
                        if (
                            field.label === 'Signature' &&
                            field.type === 'signature'
                        ) {
                            return field;
                        }
                    }
                }
            }
        }
        return null;
    }

    const handleChangeField = ({
        rowId,
        stepId,
        fieldId,
        value,
    }: {
        rowId: string;
        stepId: string;
        fieldId: string;
        value: any;
    }) => {
        const arr = JSON.parse(JSON.stringify(formSteps));
        const index = arr?.findIndex((x: any) => x.id === stepId);
        const rows = [...arr[index].rows];

        const rowIndex = rows?.findIndex((x: any) => x.id === rowId);
        const fieldIndex = rows[rowIndex]?.fields?.findIndex(
            (x: any) => x.id === fieldId,
        );

        rows[rowIndex].fields[fieldIndex] = {
            ...rows[rowIndex]?.fields[fieldIndex],
            value: value,
        };
        arr[index] = { ...arr[index], rows };

        setFormSteps(arr);
    };

    const handleEnroll = (isTrial: boolean) => {
        // Using authentication check
        if (!isAuthenticated) {
            return router.push(
                `/auth/login?callback=${window.location.pathname}`,
            );
        }

        // Validate form data using Zod schema
        // const formData = form.getValues();
        // const validationResult = formSchema.safeParse(formData);

        // if (!validationResult.success) {
        //     // Display validation errors using toast
        //     const errors = validationResult.error.errors;
        //     errors.forEach((error) => {
        //         toast.error(`${error.path.join('.')}: ${error.message}`);
        //     });
        //     return;
        // }

        setIsLoading(true);

        instance
            .post('/enrollment/enroll', {
                program: course?._id,
                branch,
                session,
                isTrial,
                formStepsData: formSteps,
                term: term?.description,
            })
            .then((res) => {
                setIsLoading(false);
                toast.success('Enrolled successfully');
                setIsEnrollmentCompleted(true);
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(
                    error?.response?.data?.error || 'Enrollment failed',
                );
            });
    };

    const handleNext = () => {
        // Check authentication
        if (!isAuthenticated) {
            return router.push(
                `/auth/login?callback=${window.location.pathname}`,
            );
        }

        // Validate branch and session using Zod
        const validationResult = z
            .object({
                branch: z.string().min(1, { message: 'Branch is required' }),
                session: z.string().min(1, { message: 'Session is required' }),
            })
            .safeParse({ branch, session });

        if (!validationResult.success) {
            // Display validation errors using toast
            const errors = validationResult.error.errors;
            errors.forEach((error) => {
                toast.error(`${error.path.join('.')}: ${error.message}`);
            });
            return;
        }

        if (branch && session) {
            setIsMultiStepVisible(true);
        }
    };

    // Handle back button click
    const handleBack = () => {
        setIsMultiStepVisible(false);
    };

    const getSession = sessions?.find((s) => s?._id === session);
    const currentDate = dayjs(new Date()).format('MMM D, YYYY');

    return (
        <div className='bg-background'>
            <div className='my-container mt-28'>
                {isEnrollmentCompleted ? (
                    <div className='relative overflow-hidden min-h-[70vh] flex items-center'>
                        <Confetti
                            width={width}
                            height={height}
                            numberOfPieces={50}
                            recycle={false}
                        />

                        <div className='max-w-md mx-auto text-center'>
                            <div className='mb-6'>
                                <div className='h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-10 w-10 text-green-600'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M5 13l4 4L19 7'
                                        />
                                    </svg>
                                </div>
                            </div>

                            <h2 className='text-2xl font-bold text-black mb-2'>
                                You have enrolled successfully!
                            </h2>
                            <p className='text-muted-foreground mb-6'>
                                We will verify and get back to you soon
                            </p>

                            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                                <Button
                                    onClick={() =>
                                        router.push('/enrollment-status')
                                    }
                                >
                                    Go to Portal
                                </Button>
                                <Button
                                    variant='secondary'
                                    onClick={() => {
                                        setIsEnrollmentCompleted(false);
                                        setIsMultiStepVisible(false);
                                    }}
                                >
                                    Go Back
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : isMultiStepVisible ? (
                    <>
                        {/* <form className='grid p-4 grid-cols-2 shadow-sm gap-2 border border-forground-border mt-common rounded-lg p-common bg-foreground'>
                            <Input value={'Pending'} />
                            <Input value={course?.title} />
                            <Input value={getSession?.name} />
                            <div className='pt-[3px]'>
                                <p className='text-sm leading-normal text-gray font-medium'>
                                    Enrolled Date:
                                </p>
                                <Input
                                    className='shadow-sm'
                                    readOnly
                                    value={currentDate}
                                />
                            </div>
                        </form> */}

                        {formSteps && formSteps.length > 0 ? (
                            <DynamicFormViewer
                                isLoading={isLoading}
                                handleSubmit={() => handleEnroll(false)}
                                handleChangeField={handleChangeField}
                                formSteps={formSteps}
                                handleBack={() => setIsMultiStepVisible(false)}
                                company={company}
                                term={term}
                            />
                        ) : (
                            <div className='mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center'>
                                <p className='text-gray-600'>
                                    No form data available for this enrollment
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <Card className='max-w-md mx-auto my-10'>
                        <CardContent className='pt-6'>
                            {isLoading ? (
                                <div className='flex items-center justify-center h-40'>
                                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
                                </div>
                            ) : !course ? (
                                <div className='text-center py-8'>
                                    <h3 className='text-lg font-medium'>
                                        Program not found
                                    </h3>
                                    <p className='text-muted-foreground mt-2'>
                                        The requested program could not be found
                                    </p>
                                </div>
                            ) : (
                                <div className='space-y-6'>
                                    <div>
                                        <h2 className='text-xl font-bold'>
                                            <span className='capitalize'>
                                                {course.type}
                                            </span>
                                            : {course.title}
                                        </h2>
                                        <p className='font-medium mt-2'>
                                            Price:{' '}
                                            {course.price?.isFree
                                                ? 'Free'
                                                : `$${course.price?.cost?.salePrice}`}
                                        </p>
                                    </div>

                                    <div className='space-y-3'>
                                        <div className='space-y-2'>
                                            <Label>
                                                Select a branch to enroll
                                            </Label>
                                            <Combobox
                                                // emptyPlaceholder='No Branches Found'
                                                placeholder='Select Branch'
                                                searchPlaceholder='Search Branches'
                                                // value={
                                                //     course.branches?.filter(
                                                //         (x) =>
                                                //             x.status ===
                                                //             'approved',
                                                //     ).length === 1
                                                //         ? course.branches?.filter(
                                                //             (x) =>
                                                //                 x.status ===
                                                //                 'approved',
                                                //         )[0]._id
                                                //         : branch
                                                // }
                                                value={branch}
                                                onChange={(value) => {
                                                    setBranch(value);
                                                }}
                                                options={
                                                    course.branches
                                                        ?.filter(
                                                            (x) =>
                                                                x.status ===
                                                                'approved',
                                                        )
                                                        .map((branch, i) => ({
                                                            value: branch?._id,
                                                            searchValue:
                                                                branch?.name,
                                                            label: branch?.name,
                                                        })) || []
                                                }
                                                emptyPlaceholder={
                                                    !course.branches ||
                                                    course.branches.length ===
                                                        0 ? (
                                                        <p className='text-warning px-3 text-center'>
                                                            Sorry, This{' '}
                                                            {course?.type} is
                                                            not available on any
                                                            branch
                                                        </p>
                                                    ) : (
                                                        'No matching branches found'
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className='space-y-1'>
                                            <Label>Select a session</Label>
                                            <Combobox
                                                // emptyPlaceholder='No Branches Found'
                                                placeholder='Select Session'
                                                searchPlaceholder='Search Session'
                                                value={session}
                                                onChange={(value) => {
                                                    setSession(value);
                                                }}
                                                options={sessions?.map(
                                                    (session, i) => ({
                                                        value: session?._id,
                                                        searchValue:
                                                            session?.name,
                                                        label: session?.name,
                                                    }),
                                                )}
                                                emptyPlaceholder={
                                                    !sessions ||
                                                    sessions?.length !== 0 ? (
                                                        <p className='text-warning px-3 text-center'>
                                                            Sorry, there is no
                                                            available session
                                                            for this{' '}
                                                            {course?.type}
                                                        </p>
                                                    ) : (
                                                        'No matching sessions found'
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className='flex justify-center pt-4'>
                                        {formSteps?.length > 0 ? (
                                            <Button
                                                size={'lg'}
                                                onClick={handleNext}
                                            >
                                                Next
                                            </Button>
                                        ) : (
                                            <Button
                                                className='bg-green-600 hover:bg-green-700'
                                                onClick={() =>
                                                    handleEnroll(false)
                                                }
                                            >
                                                Enroll
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
