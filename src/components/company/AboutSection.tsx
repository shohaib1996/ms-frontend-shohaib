'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Address, Organization } from '@/types';
import {
    Facebook,
    Github,
    Home,
    Instagram,
    Linkedin,
    Twitter,
} from 'lucide-react';
import Link from 'next/link';

interface AboutSectionProps {
    organization: Organization;
    address?: Address;
    socialLinks?: SocialLinks;
}

interface SocialLinks {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
}
export function AboutSection({
    organization,
    address,
    socialLinks,
}: AboutSectionProps) {
    const { name, data } = organization;

    console.log('address: ', address);
    console.log('socialLinks: ', socialLinks);
    console.log('organization: ', organization);

    return (
        <div className='py-5 bg-indigo-50 dark:bg-indigo-950 relative overflow-hidden z-10'>
            <div className='my-container px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 lg:items-center'>
                    {/* Main Content */}
                    <div className='lg:col-span-2 order-1 lg:order-1'>
                        <div className='space-y-6 sm:space-y-8'>
                            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight'>
                                About{' '}
                                <span className='block sm:inline'>{name}</span>
                            </h1>

                            <div className='prose prose-sm sm:prose-base lg:prose-lg max-w-none'>
                                <p className='text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg'>
                                    {data.about}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Social Links Sidebar */}
                    <div className='order-2 lg:order-2 lg:col-span-1'>
                        <div className='space-y-6 sm:space-y-8'>
                            {/* Social Links */}
                            <Card className='p-4 sm:p-6 border-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-lg'>
                                <CardContent className='p-0'>
                                    <h3 className='text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3'>
                                        Connect With Us
                                    </h3>

                                    {/* Mobile: Horizontal layout, Desktop: Vertical layout */}
                                    {/* <div className="flex flex-row sm:flex-row lg:flex-col gap-3 sm:gap-4 lg:space-y-0 lg:space-x-0"> */}
                                    <div className='grid grid-cols-2 sm:grid-cols-1'>
                                        {socialLinks?.facebook && (
                                            <Link
                                                href={
                                                    socialLinks?.facebook || ''
                                                }
                                                target='_blank'
                                                className='flex flex-1 lg:flex-none items-center py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group'
                                            >
                                                <div className='w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors flex-shrink-0'>
                                                    <Facebook className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
                                                </div>
                                                <div className='ml-3'>
                                                    <p className='font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base'>
                                                        Facebook
                                                    </p>
                                                    <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
                                                        Follow our updates
                                                    </p>
                                                </div>
                                            </Link>
                                        )}
                                        {socialLinks?.twitter && (
                                            <Link
                                                href={
                                                    socialLinks?.twitter || ''
                                                }
                                                target='_blank'
                                                className='flex flex-1 lg:flex-none items-center py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group'
                                            >
                                                <div className='w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors flex-shrink-0'>
                                                    <Twitter className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
                                                </div>
                                                <div className='ml-3'>
                                                    <p className='font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base'>
                                                        Twitter
                                                    </p>
                                                    <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
                                                        Follow our updates
                                                    </p>
                                                </div>
                                            </Link>
                                        )}
                                        {socialLinks?.instagram && (
                                            <Link
                                                href={
                                                    socialLinks?.instagram || ''
                                                }
                                                target='_blank'
                                                className='flex flex-1 lg:flex-none items-center py-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:via-pink-50 hover:to-orange-50 dark:hover:from-purple-900/20 dark:hover:via-pink-900/20 dark:hover:to-orange-900/20 transition-all duration-300 group'
                                            >
                                                <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-orange-500 transition-all duration-300 flex-shrink-0'>
                                                    <Instagram className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
                                                </div>
                                                <div className='ml-3'>
                                                    <p className='font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base'>
                                                        Instagram
                                                    </p>
                                                    <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
                                                        Follow our updates
                                                    </p>
                                                </div>
                                            </Link>
                                        )}

                                        {socialLinks?.github && (
                                            <Link
                                                href={socialLinks?.github || ''}
                                                target='_blank'
                                                className='flex flex-1 lg:flex-none items-center py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/20 transition-colors group'
                                            >
                                                <div className='w-8 h-8 sm:w-10 sm:h-10 bg-[#24292e] rounded-lg flex items-center justify-center group-hover:bg-[#1b1f23] transition-colors flex-shrink-0'>
                                                    <Github className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
                                                </div>
                                                <div className='ml-3'>
                                                    <p className='font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base'>
                                                        Github
                                                    </p>
                                                    <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
                                                        Follow our updates
                                                    </p>
                                                </div>
                                            </Link>
                                        )}

                                        {/* <Link
                                            href='#'
                                            className='flex flex-1 lg:flex-none items-center py-3 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors group'
                                        >
                                            <div className='w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-stone-600 transition-colors flex-shrink-0'>
                                                <X className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
                                            </div>
                                            <div className='ml-3'>
                                                <p className='font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base'>
                                                    X
                                                </p>
                                                <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
                                                    Latest news & insights
                                                </p>
                                            </div>
                                        </Link> */}

                                        {socialLinks?.linkedin && (
                                            <Link
                                                href={
                                                    socialLinks?.linkedin || ''
                                                }
                                                target='_blank'
                                                className='flex flex-1 lg:flex-none items-center py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group'
                                            >
                                                <div className='w-8 h-8 sm:w-10 sm:h-10 bg-blue-700 rounded-lg flex items-center justify-center group-hover:bg-blue-800 transition-colors flex-shrink-0'>
                                                    <Linkedin className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
                                                </div>
                                                <div className='ml-3 '>
                                                    <p className='font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base'>
                                                        LinkedIn
                                                    </p>
                                                    <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
                                                        Professional network
                                                    </p>
                                                </div>
                                            </Link>
                                        )}
                                        <Link
                                            target='_blank'
                                            href={`https://www.google.com/maps/place/${address?.city},${address?.country}`}
                                            className='flex flex-1 lg:flex-none items-center py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group'
                                        >
                                            <div className='w-8 h-8 sm:w-10 sm:h-10 bg-sky-700 rounded-lg flex items-center justify-center group-hover:bg-blue-800 transition-colors flex-shrink-0'>
                                                <Home className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
                                            </div>
                                            <div className='ml-3 '>
                                                <p className='font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base'>
                                                    Address
                                                </p>
                                                <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
                                                    {address?.city},{' '}
                                                    {address?.country}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
