'use client';
import React, { use, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
    ArrowUpRight,
    Bell,
    BookIcon,
    BookUser,
    Building2,
    ChevronDown,
    Menu,
    Moon,
    Sun,
    User,
    User2,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import GlobalDropdown from '../global/GlobalDropdown';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/store';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../ui/collapsible';
import Cookies from 'js-cookie';
import { notificationsList } from '@/helper/notification';

type NavLink = {
    label: string;
    link: string;
    children?: { label: string; link: string }[];
};

const navLinks: NavLink[] = [
    // {
    //     label: 'About Us',
    //     link: '/about-us',
    // },
    // {
    //     label: 'Features',
    //     link: '/',
    //     children: [
    //         {
    //             label: 'Founder',
    //             link: '/founder',
    //         },
    //         {
    //             label: 'why choose SkillBNK',
    //             link: '/why-choose-bootcamps-hub',
    //         },
    //         {
    //             label: 'other lms vs SkillBNK',
    //             link: '/other-lms-vs-bootcamps-hub',
    //         },
    //         {
    //             label: 'Apply',
    //             link: '/company/apply',
    //         },
    //         {
    //             label: 'blended learning',
    //             link: '/blended-learning',
    //         },
    //         {
    //             label: 'transition to SkillBNK',
    //             link: '/transition-to-bootcamps-hub',
    //         },
    //         {
    //             label: 'Company Training and Onboarding',
    //             link: '/company-training-and-onboarding',
    //         },
    //     ],
    // },
    // {
    //     label: 'Resources',
    //     link: '/',
    //     children: [
    //         {
    //             label: 'blogs',
    //             link: '/blogs',
    //         },
    //         {
    //             label: 'documentation',
    //             link: '/docs',
    //         },
    //     ],
    // },
    // {
    //     label: 'Contact',
    //     link: '/contact',
    // },
];

const Navbar = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [scrollY, setScrollY] = useState(0);
    const pathName = usePathname();
    const [hideNavbar, setHideNavbar] = useState(false);
    const { user } = useAppSelector((s) => s.auth);
    const { notifications } = useAppSelector((state) => state.notification);

    useEffect(() => {
        if (pathName.includes('auth')) {
            setHideNavbar(true);
        } else {
            setHideNavbar(false);
        }
    }, [pathName]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        Cookies.remove(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || '');
        //      {
        //     domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
        // }
        window.location.pathname = '/';
    };

    return (
        <div
            className={cn(
                ` fixed left-1/2 -translate-x-1/2  z-[999] bg-foreground dark:bg-gray-800/70 backdrop-blur-md border border-forground-border rounded-full py-1 px-4 transition-all ${hideNavbar && 'hidden'}`,
                ` w-full top-0 rounded-none shadow-md bg-foreground/80`,
            )}
        >
            <div
                className={cn('flex justify-between items-center my-container')}
            >
                <Link className='cursor-pointer' href={'/'}>
                    <Image
                        src={
                            resolvedTheme === 'dark'
                                ? '/logo/logo-dark.png'
                                : '/logo/logo.png'
                        }
                        className='w-full lg:w-full h-[33px] lg:h-[70px]'
                        width={200}
                        height={50}
                        alt='logo'
                    />
                </Link>
                <div className='hidden lg:flex text-sm lg:text-base 2xl:gap-6 gap-3 text-dark-gray font-medium'>
                    {navLinks?.map((link) =>
                        link.children ? (
                            <GlobalDropdown
                                align='center'
                                className='z-[9999] p-4 bg-foreground/70 dark:bg-gray-800/70 backdrop-blur-md top-4'
                                dropdownRender={
                                    <div className='flex flex-col gap-3 capitalize'>
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.label}
                                                href={child.link}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                }
                                key={link.label}
                            >
                                <p className='flex items-center gap-1'>
                                    {' '}
                                    <ChevronDown size={16} /> {link.label}
                                </p>
                            </GlobalDropdown>
                        ) : (
                            <Link key={link.label} href={link.link}>
                                {link.label}
                            </Link>
                        ),
                    )}
                </div>
                <div className='flex items-center'>
                    <GlobalDropdown
                        className='top-3 right-3 bg-foreground/70 dark:bg-gray-800/70 backdrop-blur-md'
                        dropdownRender={
                            <div className='flex flex-col gap-3 p-3'>
                                {navLinks?.map((link, i) =>
                                    link.children ? (
                                        <Collapsible key={link.label}>
                                            <CollapsibleTrigger className='flex items-center gap-1'>
                                                <ChevronDown size={16} />{' '}
                                                {link.label}
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <div className='flex flex-col gap-2 ps-5 pt-3'>
                                                    {link.children.map(
                                                        (child) => (
                                                            <Link
                                                                key={
                                                                    child.label
                                                                }
                                                                href={
                                                                    child.link
                                                                }
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        ),
                                                    )}
                                                </div>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    ) : (
                                        <Link key={i} href={link.link}>
                                            {link.label}
                                        </Link>
                                    ),
                                )}

                                {!user._id && (
                                    <Link href={'/auth/login'}>
                                        <Button
                                            size={'sm'}
                                            variant={'outline'}
                                            className='border-none text-primary-white w-fit'
                                            icon={<User size={18} />}
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        }
                    >
                        <Button
                            size={'icon'}
                            variant={'plain'}
                            className='lg:hidden border-none'
                        >
                            <Menu />
                        </Button>
                    </GlobalDropdown>
                    <Button
                        variant={'plain'}
                        size={'icon'}
                        className='border-none'
                        onClick={() =>
                            setTheme(
                                resolvedTheme === 'dark' ? 'light' : 'dark',
                            )
                        }
                    >
                        {resolvedTheme === 'dark' ? (
                            <Moon size={18} />
                        ) : (
                            <Sun size={18} />
                        )}
                    </Button>
                    {!user?._id && (
                        <Link href={'/auth/login'}>
                            <Button
                                size={'sm'}
                                variant={'plain'}
                                className='border-none text-primary-white md:flex hidden'
                                icon={<User size={18} />}
                            >
                                Login
                            </Button>
                        </Link>
                    )}
                    {user._id && (
                        <>
                            <GlobalDropdown
                                title={
                                    <h2 className='text-lg font-semibold text-black'>
                                        Notifications
                                    </h2>
                                }
                                className='z-[9999] top-4'
                                align='end'
                                dropdownRender={
                                    <div className='p-3'>
                                        {notificationsList(notifications)}
                                    </div>
                                }
                            >
                                <Button
                                    size={'icon'}
                                    variant={'secondary'}
                                    className='border-forground-border rounded-full me-2'
                                >
                                    <Bell size={18} />
                                </Button>
                            </GlobalDropdown>
                            <GlobalDropdown
                                title={
                                    <div className='flex gap-2 items-center'>
                                        {user.profilePicture ? (
                                            <Image
                                                src={user.profilePicture}
                                                height={100}
                                                width={100}
                                                alt='user'
                                                className='rounded-full size-14'
                                            />
                                        ) : (
                                            <User />
                                        )}
                                        <div>
                                            <h2 className='text-dark-gray font-medium'>
                                                {user?.fullName}
                                            </h2>
                                            <p className='text-sm text-gray'>
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>
                                }
                                className='z-[9999] top-3'
                                dropdownRender={
                                    <div className='flex flex-col gap-3 p-4'>
                                        <Link
                                            className='flex items-center gap-2'
                                            href={'/company/mycompanies'}
                                        >
                                            <Building2 size={18} /> My Companies
                                        </Link>
                                        <Link
                                            className='flex items-center gap-2'
                                            href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/program`}
                                        >
                                            <BookUser size={18} /> My Courses
                                        </Link>
                                        <Link
                                            className='flex items-center gap-2'
                                            href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/my-profile`}
                                        >
                                            <User2 size={18} /> My Profile
                                        </Link>
                                        <Link
                                            className='flex items-center gap-2'
                                            href={`/docs`}
                                        >
                                            <BookIcon size={18} /> User Manual
                                        </Link>

                                        <Button
                                            variant={'danger_light'}
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                }
                                align='end'
                            >
                                <Button
                                    size={'icon'}
                                    variant={'secondary'}
                                    className='border-forground-border rounded-full me-2'
                                >
                                    {user.profilePicture ? (
                                        <Image
                                            src={user.profilePicture}
                                            height={100}
                                            width={100}
                                            alt='user'
                                            className='rounded-full size-8'
                                        />
                                    ) : (
                                        <User />
                                    )}
                                </Button>
                            </GlobalDropdown>
                        </>
                    )}
                    {!user._id && (
                        <Link href={'/book-a-demo'}>
                            <Button className='border-none rounded-full bg-gradient-to-r from-[#0635D0] to-[#9810FA] via-[#4F22E5] hover:text-gray-100'>
                                Schedule Demo
                                <ArrowUpRight size={18} />
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
