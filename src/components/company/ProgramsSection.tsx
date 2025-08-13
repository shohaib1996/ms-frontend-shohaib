'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import instance from '@/lib/axios';
import type { Organization } from '@/types';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParam } from 'react-use';
import { toast } from 'sonner';
import GlobalPagination from '../global/GlobalPagination';
import MultiSelect from '../global/MultiSelect';
import { Input } from '../ui/input';

type TProgram = {
    _id: string;
    title: string;
    slug: string;
    image: string | null;
    totalDuration: number;
    totalReviews: number;
    averageStarCount: number;
    price: {
        cost: {
            price: number;
            salePrice: number;
        };
        isFree: boolean;
    };
};

interface ProgramsSectionProps {
    company: Organization;
    branches?: { name: string; slug: string; _id: string }[];
}

export function ProgramsSection({ company, branches }: ProgramsSectionProps) {
    const [branchLists, setBrancheLists] = useState<
        { name: string; slug: string; _id: string }[]
    >([]);
    const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [type, setType] = useState<'course' | 'program'>('program');
    const [programs, setPrograms] = useState<TProgram[]>([]);
    const [limit, setLimit] = useState(20);
    const [currentPage, setCurrentPage] = useState(0);
    const [total, setTotal] = useState(0);
    const searchParams = useSearchParam('branch');

    useEffect(() => {
        // Handle hash navigation
        if (window.location.hash === '#programs') {
            const element = document.getElementById('programs');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Handle branch query parameter
        const branchSlug = searchParams ? searchParams : null;
        if (branchSlug && branchLists.length > 0) {
            const branch = branchLists.find((b) => b.slug === branchSlug);
            if (branch && !selectedBranches.includes(branch._id)) {
                setSelectedBranches([branch._id]);
            }
        }
    }, [branchLists, searchParams]);

    useEffect(() => {
        if (!branches && company?.slug) {
            instance
                .get(`/organization/details/${company?.slug}`)
                .then((res) => {
                    setBrancheLists(res?.data?.branches || []);
                })
                .catch((err) => {
                    console.error(err);
                    toast.error(
                        err?.response?.data?.error || 'Something went wrong',
                    );
                });
        } else {
            setBrancheLists(branches || []);
        }
    }, [branches, company]);

    const getPrograms = (options: any) => {
        setIsLoading(true);
        instance
            .post(`/course/organization/${company?.slug}`, { ...options, type })
            .then((res) => {
                setPrograms(res.data.programs || []);
                setTotal(res.data.count);
                setCurrentPage(options?.page || 1);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.error(err);
                toast.error(err?.response?.data?.error);
            });
    };

    useEffect(() => {
        if (company) {
            getPrograms({ page: 1, limit });
        }
    }, [company, type]);

    function secondsToHours(seconds: number) {
        const hours = seconds / 3600;
        if (hours >= 1) {
            return Math.floor(hours);
        } else {
            return hours.toFixed(2);
        }
    }

    return (
        <section
            id='programs'
            className='py-3 bg-foreground relative overflow-hidden'
        >
            <div className='my-container relative mx-auto z-50'>
                <h2 className='text-3xl font-bold text-black mb-5 text-center'>
                    Our Offerings
                </h2>

                <Tabs defaultValue='program' className='w-full'>
                    <TabsList className='grid w-full max-w-md mx-auto grid-cols-2 mb-3'>
                        <TabsTrigger
                            onClick={() => setType('program')}
                            value='program'
                        >
                            Programs
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setType('course')}
                            value='course'
                        >
                            Courses
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className='flex justify-between gap-2 mb-3'>
                    <Input
                        className='h-10 bg-background text-dark-gray border-forground-border'
                        placeholder='Search Courses'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <MultiSelect
                        onChange={(value) => setSelectedBranches(value)}
                        value={selectedBranches}
                        placeholder='Search Branch'
                        options={branchLists?.map((branch) => ({
                            value: branch?._id,
                            label: branch?.name,
                        }))}
                    />
                    <Button
                        className='h-10'
                        onClick={() =>
                            getPrograms({
                                page: 1,
                                branches: selectedBranches,
                                query,
                                limit,
                            })
                        }
                    >
                        <Search size={18} />
                    </Button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-3 gap-3 max-h-screen overflow-y-auto'>
                    {isLoading
                        ? Array.from({ length: 6 }, (_, i) => (
                              <Card
                                  className='min-h-96 bg-background border-forground-border'
                                  key={i}
                              >
                                  <CardContent className='pt-3'>
                                      <div className='w-full h-48 bg-foreground rounded-md'></div>
                                      <div className='space-y-2 pt-3'>
                                          <div className='w-full h-10 bg-foreground rounded-md'></div>
                                          <div className='w-full h-6 flex gap-6 rounded-md'>
                                              <div className='w-full bg-foreground rounded-md'></div>
                                              <div className='w-1/2 bg-foreground rounded-md'></div>
                                          </div>
                                          <div className='w-full h-6 flex gap-6 rounded-md'>
                                              <div className='w-full bg-foreground rounded-md'></div>
                                              <div className='w-1/3 bg-foreground rounded-md'></div>
                                          </div>
                                          <div className='w-full h-6 flex gap-6 rounded-md'>
                                              <div className='w-full bg-foreground rounded-md'></div>
                                              <div className='w-full bg-foreground rounded-md'></div>
                                          </div>
                                      </div>
                                  </CardContent>
                              </Card>
                          ))
                        : programs?.map((program) => (
                              <Card
                                  key={program?._id}
                                  className='h-full border border-indigo-400/35 bg-foreground flex flex-col overflow-hidden dark:bg-background'
                              >
                                  <div className='relative h-48 w-full'>
                                      {/* <Image
                                        src={
                                            program?.image ||
                                            '/placeholder2.png'
                                        }
                                        alt={program?.title}
                                        fill
                                        className='object-cover'
                                    /> */}
                                      <div className='absolute top-3 right-3'>
                                          <Badge className='bg-primary text-white'>
                                              Featured
                                          </Badge>
                                      </div>
                                  </div>
                                  <CardHeader className='p-3'>
                                      <CardTitle>{program?.title}</CardTitle>
                                  </CardHeader>
                                  <CardContent className='flex-grow p-3 pt-0'>
                                      <div className='space-y-2'>
                                          <div className='flex justify-between gap-2'>
                                              <span className='text-muted-foreground whitespace-nowrap'>
                                                  Total Hours:
                                              </span>
                                              <span className='font-medium'>
                                                  {`Total hours: ${secondsToHours(
                                                      program?.totalDuration ||
                                                          0,
                                                  )}+h Video Lectures`}
                                              </span>
                                          </div>
                                          <div className='flex justify-between'>
                                              <span className='text-muted-foreground'>
                                                  Rating:
                                              </span>
                                              <div className='flex items-center'>
                                                  <span className='font-medium mr-1'>
                                                      {program?.averageStarCount.toFixed(
                                                          1,
                                                      )}
                                                      /5.0
                                                  </span>
                                                  <div className='flex'>
                                                      {[...Array(5)].map(
                                                          (_, i) => (
                                                              <span
                                                                  key={i}
                                                                  className={`text-xs ${i < Math.floor(program?.averageStarCount) ? 'text-yellow-500' : 'text-gray-300'}`}
                                                              >
                                                                  ★
                                                              </span>
                                                          ),
                                                      )}
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </CardContent>
                                  <CardFooter className='pt-0 px-3'>
                                      <Link href={`/course/${program?.slug}`}>
                                          <Button className='w-full'>
                                              Learn More
                                          </Button>
                                      </Link>
                                  </CardFooter>
                              </Card>
                          ))}
                </div>
                <GlobalPagination
                    currentPage={currentPage}
                    itemsPerPage={limit}
                    totalItems={total}
                    onPageChange={(page, limit) =>
                        getPrograms({
                            page,
                            limit,
                            branches: selectedBranches,
                            query,
                        })
                    }
                />
            </div>
            <div className='absolute z-[0px] -top-[50px] blur-3xl h-[1000px] md:w-[800px] w-[500px] -right-[100px] bg-gradient-to-bl rounded-full from-blue-400/30 to-transparent'></div>
        </section>
    );
}
