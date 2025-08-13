import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, Facebook, Twitter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Organization } from '@/types';

interface ContactSectionProps {
    organization: Organization;
}

export function ContactSection({ organization }: ContactSectionProps) {
    const { data } = organization;

    return (
        <section className=' bg-teal-50 dark:bg-teal-950'>
            {/* <div className='my-container mx-auto'>
                <h2 className='text-3xl font-bold mb-6 text-black text-center'>
                    Contact Information
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 xl:gap-12 md:gap-8 gap-4'>
                    <Card className='bg-foreground'>
                        <CardHeader>
                            <CardTitle>Get in Touch</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <div className='flex items-center gap-3'>
                                    <MapPin className='h-5 w-5 text-primary' />
                                    <p>
                                        {data.address?.street},{' '}
                                        {data.address?.city},{' '}
                                        {data.address?.state} {data.address?.zip},{' '}
                                        {data.address?.country}
                                    </p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Phone className='h-5 w-5 text-primary' />
                                    <p>{data.phone}</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Mail className='h-5 w-5 text-primary' />
                                    <p>{data?.firstContact?.email}</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Globe className='h-5 w-5 text-primary' />
                                    <Link
                                        href={data?.companyUrl}
                                        className='text-primary hover:underline'
                                    >
                                        {data?.companyUrl?.replace(
                                            'https://',
                                            '',
                                        )}
                                    </Link>
                                </div>
                                <div className='flex gap-4 mt-6'>
                                    <Link
                                        href={data?.socialLinks?.facebook}
                                        className='text-primary hover:text-primary/80'
                                    >
                                        <Facebook className='h-6 w-6' />
                                    </Link>
                                    <Link
                                        href={data?.socialLinks?.twitter}
                                        className='text-primary hover:text-primary/80'
                                    >
                                        <Twitter className='h-6 w-6' />
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='bg-foreground'>
                        <CardHeader>
                            <CardTitle>Contact Persons</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-6'>
                                <div>
                                    <h4 className='font-semibold text-lg'>
                                        {data?.firstContact?.name}
                                    </h4>
                                    <p className='text-muted-foreground mb-2'>
                                        Primary Contact
                                    </p>
                                    <div className='space-y-2'>
                                        <div className='flex items-center gap-3'>
                                            <Phone className='h-5 w-5 text-primary' />
                                            <p>{data?.firstContact?.phone}</p>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <Mail className='h-5 w-5 text-primary' />
                                            <p>{data?.firstContact?.email}</p>
                                        </div>
                                    </div>
                                </div>

                                {data?.secondContact?.name && (
                                    <div>
                                        <h4 className='font-semibold text-lg'>
                                            {data?.secondContact?.name}
                                        </h4>
                                        <p className='text-muted-foreground mb-2'>
                                            Secondary Contact
                                        </p>
                                        <div className='space-y-2'>
                                            <div className='flex items-center gap-3'>
                                                <Phone className='h-5 w-5 text-primary' />
                                                <p>
                                                    {data?.secondContact?.phone}
                                                </p>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <Mail className='h-5 w-5 text-primary' />
                                                <p>
                                                    {data?.secondContact?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div> */}
        </section>
    );
}
