'use client';

import { useCallback, useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { CompanyFormData } from '@/types/ApplyCompanyTypes';
import CompanyForm from './company-form';
import instance from '@/lib/axios';
import axios from 'axios';

export default function ApplyComp() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const companyId = searchParams.get('id');
    const [isLoading, setIsLoading] = useState(false);
    const [companyData, setCompanyData] = useState<CompanyFormData>({
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
        companyLogo: '',
        companyDocument: '',
        otherDocument: '',
    });

    console.log({ companyData });

    const fetchCompanyData = useCallback(async () => {
        if (!/^[a-fA-F0-9]{24}$/.test(companyId || '')) {
            return;
        }

        try {
            setIsLoading(true);
            const { data } = await instance.get(
                '/organization/myorganizations',
            );

            const company = data?.organizations?.find(
                (company: any) => company?._id === companyId,
            );

            if (company) {
                setCompanyData({
                    name: company?.name,
                    ...company?.data,
                    companyLogo: '',
                    companyDocument: '',
                    otherDocument: '',
                });
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch company data');
        } finally {
            setIsLoading(false);
        }
    }, [companyId]);

    useEffect(() => {
        fetchCompanyData();
    }, [fetchCompanyData]);

    const handleApply = useCallback(
        async (formData: CompanyFormData) => {
            try {
                setIsLoading(true);

                const res = await instance.post(
                    '/organization/apply',
                    formData,
                );

                localStorage.removeItem('saved_company_form_data');
                toast.success('Applied successfully');
                router.push('/company/mycompanies');
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const errorMessage = error.response?.data?.error;
                    if (typeof errorMessage === 'object') {
                        toast.error(errorMessage.message || 'Failed to apply');
                    } else {
                        toast.error(errorMessage || 'Failed to apply');
                    }
                } else {
                    toast.error('An error occurred');
                }
            } finally {
                setIsLoading(false);
            }
        },
        [router],
    );

    return (
        <div className='my-container min-h-screen mt-[90px]'>
            <div className=''>
                <div className='text-center mb-4'>
                    <h1 className='text-2xl font-bold tracking-tight text-primary-white w-full'>
                        Apply For Company
                    </h1>
                </div>

                <Suspense
                    fallback={
                        <div className='flex justify-center items-center h-64'>
                            <Loader2 className='h-8 w-8 animate-spin text-primary' />
                        </div>
                    }
                >
                    <CompanyForm
                        initialData={companyData}
                        onSubmit={handleApply}
                        isSubmitting={isLoading}
                    />
                </Suspense>
            </div>
        </div>
    );
}
