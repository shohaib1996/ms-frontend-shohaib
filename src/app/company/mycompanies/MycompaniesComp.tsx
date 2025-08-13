'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
    Building2,
    Search,
    Eye,
    ExternalLink,
    MapPin,
    Phone,
    Mail,
    Calendar,
    X,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import instance from '@/lib/axios';
import Link from 'next/link';

// Define types for organization data
interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
}

interface Contact {
    name: string;
    email: string;
    phone: string;
}

interface SocialLinks {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    github: string;
}

interface OrganizationData {
    address: Address;
    companyUrl: string;
    phone: string;
    faxNumber: string;
    taxNumber: string;
    firstContact: Contact;
    secondContact: Contact;
    about: string;
    socialLinks: SocialLinks;
    companyLogo?: string;
    createdAt?: string;
}

interface Organization {
    _id: string;
    name: string;
    status: 'approved' | 'pending' | 'rejected';
    data: OrganizationData;
    createdAt?: string;
    updatedAt?: string;
}

export default function MyOrganizations() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [filteredOrganizations, setFilteredOrganizations] = useState<
        Organization[]
    >([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const router = useRouter();

    // Fetch organizations data
    useEffect(() => {
        setIsLoading(true);
        instance
            .get('/organization/myorganizations')
            .then((res) => {
                setOrganizations(res.data?.organizations || []);
                setFilteredOrganizations(res.data?.organizations || []);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                toast.error(
                    err?.response?.data?.error ||
                        'Failed to fetch organizations',
                );
                setIsLoading(false);
            });
    }, []);

    // Filter organizations based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredOrganizations(organizations);
        } else {
            const filtered = organizations.filter((org) =>
                org.name.toLowerCase().includes(searchQuery.toLowerCase()),
            );
            setFilteredOrganizations(filtered);
        }
    }, [organizations, searchQuery]);

    // Show organization details drawer
    const showDrawer = (org: Organization) => {
        setSelectedOrg(org);
        setIsDrawerOpen(true);
    };

    // Handle drawer close
    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        setTimeout(() => setSelectedOrg(null), 300); // Clear selected org after drawer animation completes
    };

    // Format date
    const formatDate = (dateString?: string) => {
        if (!dateString) {
            return 'N/A';
        }
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Get address string
    const getAddressString = (address?: Address) => {
        if (!address) {
            return 'No address available';
        }
        const parts = [
            address.street,
            address.city,
            address.state,
            address.country,
            address.zip,
        ].filter(Boolean);
        return parts.length > 0 ? parts.join(', ') : 'No address available';
    };

    // Render loading skeletons
    const renderSkeletons = () => {
        return Array(4)
            .fill(0)
            .map((_, index) => (
                <Card key={index} className='overflow-hidden'>
                    <div className='p-4'>
                        <Skeleton className='h-40 w-full mb-4' />
                        <Skeleton className='h-6 w-3/4 mb-2' />
                        <Skeleton className='h-4 w-1/2 mb-4' />
                        <Skeleton className='h-10 w-full' />
                    </div>
                </Card>
            ));
    };
    console.log({ Data: selectedOrg?.data });
    return (
        <div className='overflow-hidden'>
            {/* Background gradient effects */}
            <div className='fixed top-[100px]  w-[400px] h-[500px] rounded-full bg-blue-700/30 blur-3xl' />
            <div className='fixed top-1/2 right-0  w-[500px] h-[400px] rounded-full bg-purple-800/30 blur-3xl' />

            <div className='mt-[90px] my-container relative z-10'>
                <div className='min-h-[60vh]'>
                    {/* Header with Search */}
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-700/30 dark:border-white/70 pb-2 mb-2'>
                        <div>
                            <h1 className='text-3xl font-bold tracking-tight text-black'>
                                Companies
                            </h1>
                            <p className='mt-1 text-md text-gray'>
                                All Companies information are here.
                            </p>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='relative w-full sm:w-64 md:w-80'>
                                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray' />
                                <Input
                                    placeholder='Search companies...'
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className='pl-10 bg-foreground text-gray'
                                />
                            </div>
                            <Link href={'/company/apply'}>
                                <Button>Apply For Company</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Organizations Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 my-4'>
                        {isLoading ? (
                            renderSkeletons()
                        ) : filteredOrganizations.length > 0 ? (
                            filteredOrganizations.map((org) => (
                                <Card
                                    key={org._id}
                                    className='overflow-hidden transition-all hover:shadow-lg shadow-md bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border border-foreground'
                                >
                                    <CardContent className='p-0 h-[calc(100%-50px)]'>
                                        <div className='relative h-48 bg-gradient-to-r from-blue-400/70 to-purple-500/70'>
                                            {org.data &&
                                            org.data.companyLogo ? (
                                                <Image
                                                    src={
                                                        org.data.companyLogo ||
                                                        '/default_image.svg'
                                                    }
                                                    alt={org.name}
                                                    fill
                                                    className='object-cover mix-blend-overlay'
                                                />
                                            ) : (
                                                <div className='absolute inset-0 flex items-center justify-center'>
                                                    <Building2 className='h-16 w-16 text-white/80' />
                                                </div>
                                            )}
                                            <div className='absolute top-4 right-4'>
                                                <Badge
                                                    className={
                                                        org.status ===
                                                        'approved'
                                                            ? 'bg-green-500'
                                                            : org.status ===
                                                                'pending'
                                                              ? 'bg-yellow-500'
                                                              : 'bg-red-500'
                                                    }
                                                >
                                                    {org.status}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className='p-3'>
                                            <h3 className='text-xl font-bold mb-3 text-gray-800 dark:text-white capitalize'>
                                                {org.name}
                                            </h3>

                                            <div className='space-y-2 mb-2'>
                                                {org.data?.address && (
                                                    <div className='flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300'>
                                                        <MapPin className='h-4 w-4 mt-0.5 flex-shrink-0' />
                                                        <span className='line-clamp-1'>
                                                            {getAddressString(
                                                                org.data
                                                                    .address,
                                                            )}
                                                        </span>
                                                    </div>
                                                )}

                                                {org.data?.phone && (
                                                    <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                                                        <Phone className='h-4 w-4 flex-shrink-0' />
                                                        <span>
                                                            {org.data.phone}
                                                        </span>
                                                    </div>
                                                )}

                                                {org.data?.firstContact
                                                    ?.email && (
                                                    <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                                                        <Mail className='h-4 w-4 flex-shrink-0' />
                                                        <span className='truncate'>
                                                            {
                                                                org.data
                                                                    .firstContact
                                                                    .email
                                                            }
                                                        </span>
                                                    </div>
                                                )}

                                                {(org.createdAt ||
                                                    org.data?.createdAt) && (
                                                    <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                                                        <Calendar className='h-4 w-4 flex-shrink-0' />
                                                        <span>
                                                            Added:{' '}
                                                            {formatDate(
                                                                org.createdAt ||
                                                                    org.data
                                                                        ?.createdAt,
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {org.data?.about && (
                                                <div className='mb-2'>
                                                    <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>
                                                        {org.data.about}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                    <CardFooter className='px-3 pb-3 pt-0 mt-auto'>
                                        <Button
                                            className='w-full hover:text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0'
                                            onClick={() => showDrawer(org)}
                                        >
                                            <Eye className='h-4 w-4 mr-2' />
                                            View Details
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        ) : (
                            <div className='col-span-full flex flex-col items-center justify-center p-8 text-center'>
                                <Building2 className='h-16 w-16 text-gray mb-4' />
                                <h3 className='text-xl font-semibold mb-2 text-dark-gray'>
                                    No companies found
                                </h3>
                                <p className='text-gray mb-4'>
                                    {searchQuery
                                        ? `No results for "${searchQuery}"`
                                        : "You haven't added any companies yet"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Organization Details Drawer */}
                <Drawer
                    open={isDrawerOpen}
                    onOpenChange={setIsDrawerOpen}
                    direction='bottom'
                >
                    <DrawerContent className='overflow-auto h-[80vh] z-[9999] rounded-t-xl bg-white/50 dark:bg-gray-900/90 backdrop-blur-xl'>
                        <DrawerHeader className='border-b border-gray-700/60 dark:border-white/70 pb-2'>
                            <DrawerTitle className='text-2xl text-black text-center'>
                                Company Details
                                <DrawerClose className='absolute right-2 bg-red-600 p-1 rounded-full text-pure-white top-2'>
                                    <X size={21} />
                                </DrawerClose>
                            </DrawerTitle>
                        </DrawerHeader>

                        {selectedOrg && (
                            <div className='p-6 overflow-y-auto'>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    {/* Left Column */}
                                    <div className='space-y-6'>
                                        {/* Company Information */}
                                        <div className='bg-blue-500/30 backdrop-blur-xl rounded-lg p-4 shadow-sm'>
                                            <h3 className='text-lg font-semibold mb-3 text-dark-gray border-b border-gray-700/60 dark:border-white/70'>
                                                Company Information
                                            </h3>
                                            <div className='space-y-3'>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        Name:
                                                    </span>
                                                    <span className='text-sm text-gray'>
                                                        {selectedOrg.name}
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        Status:
                                                    </span>
                                                    <Badge
                                                        className={
                                                            selectedOrg.status ===
                                                            'approved'
                                                                ? 'bg-green-500'
                                                                : selectedOrg.status ===
                                                                    'pending'
                                                                  ? 'bg-yellow-500'
                                                                  : 'bg-red-500'
                                                        }
                                                    >
                                                        {selectedOrg.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div className='bg-blue-500/30 backdrop-blur-xl rounded-lg p-4 shadow-sm'>
                                            <h3 className='text-lg font-semibold mb-3 text-dark-gray border-b border-gray-700/60 dark:border-white/70'>
                                                Address
                                            </h3>
                                            <div className='space-y-3'>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        Street:
                                                    </span>
                                                    <span className='text-sm text-gray'>
                                                        {selectedOrg.data
                                                            ?.address?.street ||
                                                            'N/A'}
                                                    </span>
                                                </div>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        City:
                                                    </span>
                                                    <span className='text-sm text-gray'>
                                                        {selectedOrg.data
                                                            ?.address?.city ||
                                                            'N/A'}
                                                    </span>
                                                </div>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        State:
                                                    </span>
                                                    <span className='text-sm text-gray'>
                                                        {selectedOrg.data
                                                            ?.address?.state ||
                                                            'N/A'}
                                                    </span>
                                                </div>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        Country:
                                                    </span>
                                                    <span className='text-sm text-gray'>
                                                        {selectedOrg.data
                                                            ?.address
                                                            ?.country || 'N/A'}
                                                    </span>
                                                </div>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        Zip:
                                                    </span>
                                                    <span className='text-sm text-gray'>
                                                        {selectedOrg.data
                                                            ?.address?.zip ||
                                                            'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* First Contact */}
                                        <div className='bg-blue-500/30 backdrop-blur-xl rounded-lg p-4 shadow-sm'>
                                            <h3 className='text-lg font-semibold mb-3 text-dark-gray border-b border-gray-700/60 dark:border-white/70'>
                                                Primary Contact
                                            </h3>
                                            <div className='space-y-3'>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        Name:
                                                    </span>
                                                    <span className='text-sm text-gray'>
                                                        {selectedOrg.data
                                                            ?.firstContact
                                                            ?.name || 'N/A'}
                                                    </span>
                                                </div>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        Email:
                                                    </span>
                                                    <span className='text-sm text-gray'>
                                                        {selectedOrg.data
                                                            ?.firstContact
                                                            ?.email || 'N/A'}
                                                    </span>
                                                </div>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        Phone:
                                                    </span>
                                                    <span className='text-sm text-gray'>
                                                        {selectedOrg.data
                                                            ?.firstContact
                                                            ?.phone || 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className='space-y-6'>
                                        {/* Other Information */}
                                        <div className='bg-blue-500/30 backdrop-blur-xl rounded-lg p-4 shadow-sm'>
                                            <h3 className='text-lg font-semibold mb-3 text-dark-gray border-b border-gray-700/60 dark:border-white/70'>
                                                Other Information
                                            </h3>
                                            <div className='space-y-3'>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        Fax Number:
                                                    </span>
                                                    <span className='text-sm text-gray'>
                                                        {selectedOrg.data
                                                            ?.faxNumber ||
                                                            'N/A'}
                                                    </span>
                                                </div>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        Tax Number:
                                                    </span>
                                                    <span className='text-sm text-gray'>
                                                        {selectedOrg.data
                                                            ?.taxNumber ||
                                                            'N/A'}
                                                    </span>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px] mb-1'>
                                                        About:
                                                    </span>
                                                    <p className='text-sm text-gray whitespace-pre-wrap'>
                                                        {selectedOrg.data
                                                            ?.about || 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Social Links */}
                                        <div className='bg-blue-500/30 backdrop-blur-xl rounded-lg p-4 shadow-sm'>
                                            <h3 className='text-lg font-semibold mb-3 text-dark-gray border-b border-gray-700/60 dark:border-white/70'>
                                                Social Links
                                            </h3>
                                            <div className='space-y-3'>
                                                {selectedOrg.data
                                                    ?.socialLinks &&
                                                    Object.entries(
                                                        selectedOrg.data
                                                            .socialLinks,
                                                    ).map(([key, value]) => (
                                                        <div
                                                            key={key}
                                                            className='flex flex-row gap-2 items-center'
                                                        >
                                                            <span className='text-sm font-medium text-dark-gray w-[120px] capitalize'>
                                                                {key}:
                                                            </span>
                                                            {value ? (
                                                                <a
                                                                    href={
                                                                        value.startsWith(
                                                                            'http',
                                                                        )
                                                                            ? value
                                                                            : `https://${value}`
                                                                    }
                                                                    target='_blank'
                                                                    rel='noopener noreferrer'
                                                                    className='text-sm text-blue-600 hover:underline flex items-center'
                                                                >
                                                                    {value.length >
                                                                    25
                                                                        ? value.substring(
                                                                              0,
                                                                              25,
                                                                          ) +
                                                                          '...'
                                                                        : value}
                                                                    <ExternalLink className='h-3 w-3 ml-1' />
                                                                </a>
                                                            ) : (
                                                                <span className='text-sm text-gray'>
                                                                    N/A
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>

                                        {/* Contact Details */}
                                        <div className='bg-blue-500/30 backdrop-blur-xl rounded-lg p-4 shadow-sm'>
                                            <h3 className='text-lg font-semibold mb-3 text-dark-gray border-b border-gray-700/60 dark:border-white/70'>
                                                Additional Contact Details
                                            </h3>
                                            <div className='space-y-3'>
                                                <div className='flex flex-row items-center'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        Company URL:
                                                    </span>
                                                    {selectedOrg.data
                                                        ?.companyUrl ? (
                                                        <a
                                                            href={
                                                                selectedOrg.data.companyUrl.startsWith(
                                                                    'http',
                                                                )
                                                                    ? selectedOrg
                                                                          .data
                                                                          .companyUrl
                                                                    : `https://${selectedOrg.data.companyUrl}`
                                                            }
                                                            target='_blank'
                                                            rel='noopener noreferrer'
                                                            className='text-sm text-blue-600 hover:underline flex items-center'
                                                        >
                                                            {selectedOrg.data
                                                                .companyUrl
                                                                .length > 25
                                                                ? selectedOrg.data.companyUrl.substring(
                                                                      0,
                                                                      25,
                                                                  ) + '...'
                                                                : selectedOrg
                                                                      .data
                                                                      .companyUrl}
                                                            <ExternalLink className='h-3 w-3 ml-1' />
                                                        </a>
                                                    ) : (
                                                        <span className='text-sm text-gray'>
                                                            N/A
                                                        </span>
                                                    )}
                                                </div>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        Phone:
                                                    </span>
                                                    <span className='text-sm text-gray'>
                                                        {selectedOrg.data
                                                            ?.phone || 'N/A'}
                                                    </span>
                                                </div>

                                                <Separator className='my-2 bg-gray-700/60 dark:bg-white/70' />

                                                <h4 className='text-md font-medium text-dark-gray'>
                                                    Secondary Contact
                                                </h4>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        Name:
                                                    </span>
                                                    <span className='text-sm text-gray'>
                                                        {selectedOrg.data
                                                            ?.secondContact
                                                            ?.name || 'N/A'}
                                                    </span>
                                                </div>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        Email:
                                                    </span>
                                                    <span className='text-sm text-gray'>
                                                        {selectedOrg.data
                                                            ?.secondContact
                                                            ?.email || 'N/A'}
                                                    </span>
                                                </div>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <span className='text-sm font-medium text-dark-gray w-[120px]'>
                                                        Phone:
                                                    </span>
                                                    <span className='text-sm text-gray'>
                                                        {selectedOrg.data
                                                            ?.secondContact
                                                            ?.phone || 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    );
}
