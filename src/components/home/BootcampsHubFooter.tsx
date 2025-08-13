'use client';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
const logo = '/logo/logo-dark.png';

export default function BootcampsHubFooter() {
    const pathName = usePathname();
    const [hideNavbar, setHideNavbar] = useState(false);

    useEffect(() => {
        if (pathName.includes('auth')) {
            setHideNavbar(true);
        } else {
            setHideNavbar(false);
        }
    }, [pathName]);
    return (
        <footer
            className={`bg-[#0a0c17] text-white py-10 relative overflow-hidden w-full ${hideNavbar && 'hidden'}`}
        >
            {/* Decorative stars */}
            <div className='absolute top-8 right-64'>
                <div className='text-gray-600 opacity-30 text-[100px] animate-spin'>
                    ✦
                </div>
            </div>
            <div className='absolute top-28 right-[45%] animate-spin duration-1000'>
                <div className='text-gray-600 opacity-30 text-[50px]'>✧</div>
            </div>

            <div className='my-container mx-auto px-4'>
                <div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
                    {/* Column 1: Logo and Tagline */}
                    <Link className='cursor-pointer' href={'/'}>
                        <Image src={logo} alt='logo' width={300} height={200} />
                    </Link>

                    {/* Column 2: Company */}
                    {/* <div>
                        <h3 className='text-lg font-bold mb-4'>Company</h3>
                        <ul className='space-y-3 list-none'>
                            <li className='list-none'>
                                <Link
                                    href='/about-us'
                                    className='text-gray hover:text-white transition-colors'
                                >
                                    About Us
                                </Link>
                            </li>
                            <li className='list-none'>
                                <Link
                                    href='/contact'
                                    className='text-gray hover:text-white transition-colors'
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li className='list-none'>
                                <Link
                                    href='/founder'
                                    className='text-gray hover:text-white transition-colors'
                                >
                                    Founder
                                </Link>
                            </li>
                        </ul>
                    </div> */}

                    {/* Column 3: Resources */}
                    <div>
                        <h3 className='text-lg font-bold mb-4'>Resources</h3>
                        <ul className='space-y-3 capitalize'>
                            <li className='list-none'>
                                <Link
                                    href='/terms-and-condition'
                                    className='text-gray hover:text-white transition-colors'
                                >
                                    Terms and Conditions
                                </Link>
                            </li>
                            <li className='list-none'>
                                <Link
                                    href='/privacy-policy'
                                    className='text-gray hover:text-white transition-colors'
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li className='list-none'>
                                <Link
                                    href='https://www.bootcampshub.ai/company/apply'
                                    className='text-gray hover:text-white transition-colors'
                                >
                                    Apply for company
                                </Link>
                            </li>
                            {/* <li className='list-none'>
                                <Link
                                    href='/company/apply'
                                    className='text-gray hover:text-white transition-colors'
                                >
                                    Apply
                                </Link>
                            </li>
                            <li className='list-none'>
                                <Link
                                    href='/blended-learning'
                                    className='text-gray hover:text-white transition-colors'
                                >
                                    blended learning
                                </Link>
                            </li>
                            <li className='list-none'>
                                <Link
                                    href='/transition-to-bootcamps-hub'
                                    className='text-gray hover:text-white transition-colors'
                                >
                                    transition to SkillBNK
                                </Link>
                            </li> */}
                        </ul>
                    </div>

                    {/* Column 4: Support */}
                    {/* <div>
                        <h3 className='text-lg font-bold mb-4'>Support</h3>
                        <ul className='space-y-3 capitalize'>
                            <li className='list-none'>
                                <Link
                                    href='/transition-to-bootcamps-hub'
                                    className='text-gray hover:text-white transition-colors'
                                >
                                    transition to SkillBNK
                                </Link>
                            </li>
                            <li className='list-none'>
                                <Link
                                    href='Company Training and Onboarding'
                                    className='text-gray hover:text-white transition-colors'
                                >
                                    Company Training and Onboarding
                                </Link>
                            </li>
                            <li className='list-none'>
                                <Link
                                    href='blogs'
                                    className='text-gray hover:text-white transition-colors'
                                >
                                    blogs
                                </Link>
                            </li>
                        </ul>
                    </div> */}
                    {/* Contact Info */}
                    <div className=''>
                        <h3 className='text-lg font-bold mb-4'>Contact Info</h3>
                        <p className='text-gray mb-4'>
                            <a
                                href='mailto:hello@skillbnk.com'
                                className='hover:text-white transition-colors'
                            >
                                hello@skillbnk.com
                            </a>
                        </p>
                        <div className='flex space-x-4'>
                            {/* <Link
                                href='#'
                                className='text-gray hover:text-white transition-colors'
                            >
                                <Facebook size={20} />
                                <span className='sr-only'>Facebook</span>
                            </Link>
                            <Link
                                href='#'
                                className='text-gray hover:text-white transition-colors'
                            >
                                <Twitter size={20} />
                                <span className='sr-only'>Twitter</span>
                            </Link>
                            <Link
                                href='#'
                                className='text-gray hover:text-white transition-colors'
                            >
                                <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    className='lucide lucide-send'
                                >
                                    <path d='m22 2-7 20-4-9-9-4Z' />
                                    <path d='M22 2 11 13' />
                                </svg>
                                <span className='sr-only'>Telegram</span>
                            </Link> */}
                            <a
                                href='https://www.linkedin.com/company/bootcampshub/'
                                className='text-gray hover:text-white transition-colors'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <Linkedin size={20} />
                                <span className='sr-only'>LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* <div className='w-16 h-16 border border-dashed border-white mr-4 animate-pulse-scale'></div> */}
                {/* Divider */}
                <div className='mt-12 pt-6 border-t border-gray-800 flex items-center'>
                    <div className='flex-1'></div>
                </div>

                {/* Copyright */}
                <div className='mt-4 text-sm text-center text-gray-500'>
                    © 2025 All rights reserved by SkillBNK
                </div>
            </div>
        </footer>
    );
}
