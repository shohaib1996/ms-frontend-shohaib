import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Accreditation, Document } from '@/types';
import dayjs from 'dayjs';
import { Award, FileText } from 'lucide-react';
import Link from 'next/link';
import NotFoundSection from './NotFoundSection';

interface DocumentsAccreditationSectionProps {
    accreditationData?: Accreditation[];
    documentsData?: Document[];
}

export function DocumentsAccreditationSection({
    accreditationData,
    documentsData,
}: DocumentsAccreditationSectionProps) {
    return (
        <section className='py-3 bg-foreground'>
            <div className='my-container mx-auto px-4'>
                <h2 className='text-3xl font-bold mb-4 text-black text-center'>
                    Documents & Accreditation
                </h2>

                <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-5 gap-3 '>
                    {/* Accreditations */}
                    <div className='bg-indigo-50 dark:bg-indigo-950 border border-indigo-400/35 p-4 rounded-md '>
                        <h3 className='text-2xl font-bold mb-3 text-dark-gray'>
                            Our Accreditations
                        </h3>
                        {accreditationData?.length === 0 ? (
                            <NotFoundSection itemText='No accreditations found' />
                        ) : (
                            <div className='space-y-5'>
                                {accreditationData?.map((accreditation) => {
                                    const IconComponent =
                                        accreditation.icon || Award;
                                    return (
                                        <div
                                            key={accreditation?.id}
                                            className='flex gap-4 items-start'
                                        >
                                            <div className='p-3 bg-primary rounded-full'>
                                                <IconComponent className='h-6 w-6 text-primary-white' />
                                            </div>
                                            <div>
                                                <h4 className='font-semibold text-dark-gray'>
                                                    {accreditation?.name}
                                                </h4>
                                                <p className='text-sm text-muted-foreground'>
                                                    {accreditation?.description}
                                                </p>
                                                <p className='text-xs text-muted-foreground mt-1'>
                                                    Accredited since{' '}
                                                    {dayjs(
                                                        accreditation?.accreditationDate,
                                                    ).format('MMM DD, YYYY')}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Documents */}
                    <div className='bg-indigo-50 dark:bg-indigo-950 border border-indigo-400/35 p-4 rounded-md '>
                        <h3 className='text-2xl font-bold mb-3 text-dark-gray'>
                            Available Documents
                        </h3>
                        {documentsData?.length === 0 ? (
                            <NotFoundSection itemText='No documents found' />
                        ) : (
                            <div className='space-y-4'>
                                {documentsData?.map((document) => (
                                    <Card key={document?.id}>
                                        <CardContent className='p-3 flex items-start gap-2'>
                                            <div className='p-2 bg-primary/10 rounded-lg'>
                                                <FileText className='h-6 w-6 text-primary-white' />
                                            </div>
                                            <div className='flex-grow'>
                                                <h4 className='font-semibold'>
                                                    {document?.name}
                                                </h4>
                                                <p className='text-sm text-muted-foreground'>
                                                    {document?.description}
                                                </p>
                                                <div className='flex justify-between items-center mt-2'>
                                                    <span className='text-xs text-muted-foreground'>
                                                        {document?.type} •{' '}
                                                        {(
                                                            Number(
                                                                document?.size,
                                                            ) /
                                                            (1024 * 1024)
                                                        ).toFixed(2)}{' '}
                                                        MB
                                                    </span>
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        asChild
                                                    >
                                                        <Link
                                                            href={document.url}
                                                        >
                                                            Download
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
