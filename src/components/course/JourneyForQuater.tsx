'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Flag,
    MapPin,
} from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import instance from '@/lib/axios';

interface Week {
    title: string;
    description: string;
}

interface Quarter {
    weeks: Week[];
}

interface Roadmap {
    quarters: Quarter[];
}

interface JourneyForQuarterProps {
    program: {
        _id: string;
        [key: string]: any;
    };
    className?: string;
}

const JourneyForQuarter: React.FC<JourneyForQuarterProps> = ({
    program,
    className,
}) => {
    const [visibleItems, setVisibleItems] = useState<number>(6);
    const [roadmap, setRoadMap] = useState<Roadmap | null>(null);
    const [quarterIndex, setQuarterIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const isMobile = useMediaQuery({
        query: '(max-width: 768px)',
    });

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await instance.get(
                    `/course/roadmap/find/${program?._id}`,
                );
                setRoadMap(res?.data?.roadmap);
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Failed to load roadmap data');
            } finally {
                setIsLoading(false);
            }
        };

        if (program?._id) {
            fetchData();
        }
    }, [program?._id]);

    const handleSeeMore = () => {
        setVisibleItems(visibleItems + 6);
    };

    const handleSeeLess = () => {
        setVisibleItems(6);
    };

    const handlePreviousQuarter = () => {
        if (quarterIndex > 0) {
            setQuarterIndex(quarterIndex - 1);
            setVisibleItems(6); // Reset visible items when changing quarters
        }
    };

    const handleNextQuarter = () => {
        if (roadmap?.quarters && quarterIndex < roadmap.quarters.length - 1) {
            setQuarterIndex(quarterIndex + 1);
            setVisibleItems(6); // Reset visible items when changing quarters
        }
    };

    // If no roadmap data or quarters, don't render anything
    if (!roadmap?.quarters || roadmap.quarters.length === 0) {
        return null;
    }

    const currentQuarter = roadmap.quarters[quarterIndex];
    const totalQuarters = roadmap.quarters.length;
    const totalWeeks = currentQuarter?.weeks?.length || 0;
    const showSeeMoreButton = totalWeeks > 6 && visibleItems < totalWeeks;
    const showSeeLessButton = totalWeeks > 6 && visibleItems > 6;

    return (
        <section
            className={cn(
                'py-6 bg-gradient-to-br dark:from-slate-950 dark:to-emerald-950 from-slate-50 to-emerald-50',
                className,
            )}
        >
            <div className='my-container'>
                <div className='text-center mb-3'>
                    <h2 className='text-3xl md:text-4xl font-bold text-slate-900 dark:text-white'>
                        Journey For Quarter-{quarterIndex + 1} ({totalQuarters}{' '}
                        Quarters)
                    </h2>
                    <div className='w-24 h-1 bg-emerald-500 mx-auto mt-2 rounded-full'></div>
                </div>

                {isLoading ? (
                    <div className='flex justify-center items-center py-10'>
                        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500'></div>
                    </div>
                ) : error ? (
                    <div className='text-center text-red-500 py-6'>{error}</div>
                ) : (
                    <>
                        {!isMobile ? (
                            <div className='relative max-w-4xl mx-auto mt-11'>
                                {/* Timeline line */}
                                <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-200 dark:bg-emerald-800 rounded-full'></div>

                                {/* Start flag */}
                                <div className='absolute left-1/2 transform -translate-x-1/2 -top-6 flex flex-col items-center'>
                                    <div className='w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center z-10'>
                                        <Flag className='w-4 h-4 text-white' />
                                    </div>
                                </div>

                                <div className='space-y-2 relative'>
                                    {currentQuarter?.weeks
                                        ?.slice(0, visibleItems)
                                        .map((week, index) => (
                                            <div
                                                key={index}
                                                className={cn(
                                                    'flex items-center',
                                                    index % 2 === 0
                                                        ? 'flex-row'
                                                        : 'flex-row-reverse',
                                                )}
                                            >
                                                {/* Content */}
                                                <div
                                                    className={cn(
                                                        'w-5/12 p-2',
                                                        index % 2 === 0
                                                            ? 'text-right pr-6'
                                                            : 'text-left pl-6',
                                                    )}
                                                >
                                                    <div className='bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300'>
                                                        <h3 className='text-base font-bold text-emerald-600 dark:text-emerald-400 mb-1'>
                                                            Week {index + 1}
                                                        </h3>
                                                        <h4 className='text-lg font-bold text-slate-900 dark:text-white mb-2'>
                                                            {week.title}
                                                        </h4>
                                                        <p className='text-sm text-slate-600 dark:text-slate-300'>
                                                            {week.description.slice(
                                                                0,
                                                                100,
                                                            )}
                                                            {week.description
                                                                .length > 100 &&
                                                                '...'}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Timeline point */}
                                                <div className='w-2/12 flex justify-center relative'>
                                                    <div className='w-7 h-7 bg-white dark:bg-slate-800 border-3 border-emerald-500 rounded-full z-10 flex items-center justify-center'>
                                                        <span className='text-xs font-bold text-emerald-600 dark:text-emerald-400'>
                                                            {index + 1}
                                                        </span>
                                                    </div>

                                                    {/* Connector line */}
                                                    <div
                                                        className={cn(
                                                            'absolute top-1/2 transform -translate-y-1/2 w-1/2 h-1 bg-emerald-200 dark:bg-emerald-800',
                                                            index % 2 !== 0
                                                                ? 'right-0'
                                                                : 'left-0',
                                                        )}
                                                    ></div>
                                                </div>

                                                {/* Empty space for alternating layout */}
                                                <div className='w-5/12'></div>
                                            </div>
                                        ))}

                                    {/* End marker */}
                                    <div className='flex justify-center'>
                                        <div className='w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center z-10'>
                                            <MapPin className='w-4 h-4 text-white' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='relative mb-8'>
                                <Swiper
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    navigation={{
                                        nextEl: '.swiper-button-next',
                                        prevEl: '.swiper-button-prev',
                                    }}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{ clickable: true }}
                                    modules={[Autoplay, Navigation, Pagination]}
                                    className='pb-10'
                                >
                                    {currentQuarter?.weeks
                                        ?.slice(0, visibleItems)
                                        .map((week, index) => (
                                            <SwiperSlide key={index}>
                                                <div className='relative pb-8'>
                                                    {/* Horizontal timeline line */}
                                                    <div className='absolute top-12 left-0 w-full h-1 bg-emerald-200 dark:bg-emerald-800'></div>

                                                    {/* Timeline point */}
                                                    <div className='relative flex justify-center mb-4'>
                                                        <div className='w-8 h-8 bg-white dark:bg-slate-800 border-3 border-emerald-500 rounded-full z-10 flex items-center justify-center'>
                                                            <span className='text-xs font-bold text-emerald-600 dark:text-emerald-400'>
                                                                {index + 1}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className='bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md'>
                                                        <h3 className='text-base font-bold text-emerald-600 dark:text-emerald-400 mb-1'>
                                                            Week {index + 1}
                                                        </h3>
                                                        <h4 className='text-lg font-bold text-slate-900 dark:text-white mb-2'>
                                                            {week.title}
                                                        </h4>
                                                        <p className='text-sm text-slate-600 dark:text-slate-300'>
                                                            {week.description.slice(
                                                                0,
                                                                100,
                                                            )}
                                                            {week.description
                                                                .length > 100 &&
                                                                '...'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                                <div className='swiper-button-next !w-8 !h-8 !bg-white dark:!bg-slate-800 !rounded-full !shadow-md after:!text-emerald-500 after:!text-sm'></div>
                                <div className='swiper-button-prev !w-8 !h-8 !bg-white dark:!bg-slate-800 !rounded-full !shadow-md after:!text-emerald-500 after:!text-sm'></div>
                            </div>
                        )}

                        <div className='flex flex-wrap justify-center gap-3 mt-6'>
                            {quarterIndex > 0 && (
                                <Button
                                    onClick={handlePreviousQuarter}
                                    variant='outline'
                                    size='sm'
                                    className='border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-400'
                                >
                                    <ChevronLeft className='w-4 h-4 mr-1' />
                                    Previous Quarter
                                </Button>
                            )}

                            {showSeeMoreButton && (
                                <Button
                                    onClick={handleSeeMore}
                                    size='sm'
                                    className='bg-emerald-500 hover:bg-emerald-600 text-white'
                                >
                                    See More
                                    <ChevronDown className='w-4 h-4 ml-1' />
                                </Button>
                            )}

                            {showSeeLessButton && (
                                <Button
                                    onClick={handleSeeLess}
                                    size='sm'
                                    className='bg-emerald-500 hover:bg-emerald-600 text-white'
                                >
                                    See Less
                                    <ChevronUp className='w-4 h-4 ml-1' />
                                </Button>
                            )}

                            {roadmap.quarters[quarterIndex + 1] && (
                                <Button
                                    onClick={handleNextQuarter}
                                    variant='outline'
                                    size='sm'
                                    className='border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-400'
                                >
                                    Next Quarter
                                    <ChevronRight className='w-4 h-4 ml-1' />
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default JourneyForQuarter;
