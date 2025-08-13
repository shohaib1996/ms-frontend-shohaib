'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import moment from 'moment';
import { Calendar, Clock, Globe, PlayIcon, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Rating } from '@smastrom/react-rating';
import MessagePreview from '../global/MarkdownPreview';
import CustomMarkdownPreview from '../lexicalEditor/renderer/CustomMarkdownPreview/CustomMarkdownPreview';

// Utility functions
function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function secondsToHours(seconds: number): number | string {
    const hours = seconds / 3600;
    if (hours >= 1) {
        return Math.floor(hours);
    } else {
        return hours.toFixed(2);
    }
}

interface SingleBootcampHeroProps {
    bootcamp: any;
    studentCount?: number;
    totalDuration?: number;
    course?: any;
    review?: {
        averageStarCount?: number;
        totalReviews?: number;
    };
    className?: string;
}

const SingleBootcampHero: React.FC<SingleBootcampHeroProps> = ({
    bootcamp,
    studentCount = 0,
    totalDuration = 0,
    course,
    review = { averageStarCount: 0, totalReviews: 0 },
    className,
}) => {
    const [randomNumber, setRandomNumber] = useState<number | null>(null);
    console.log({ bootcamp });
    useEffect(() => {
        const randomInt = getRandomInt(100, 1000);
        setRandomNumber(randomInt);
    }, []);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <section
            className={cn(
                'relative overflow-hidden bg-gradient-to-br from-slate-50 dark:from-slate-900 dark:to-slate-800 to-slate-200 py-8 md:py-16 md:pb-10',
                className,
            )}
        >
            {/* Background decorative elements */}
            <div className='absolute top-0 left-0 w-full h-full overflow-hidden opacity-10'>
                <div className='absolute -top-24 -left-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl'></div>
                <div className='absolute top-1/2 right-0 w-80 h-80 bg-blue-600 rounded-full blur-3xl'></div>
                <div className='absolute bottom-0 left-1/3 w-64 h-64 bg-purple-600 rounded-full blur-3xl'></div>
            </div>

            <div className='my-container relative z-10 pt-11'>
                <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
                    <div className='space-y-3'>
                        {/* Course category badge */}
                        <Badge className='bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 text-sm capitalize'>
                            {bootcamp?.type || 'Online Course'}
                        </Badge>

                        {/* Course title */}
                        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight'>
                            {bootcamp?.title}
                        </h1>

                        {/* Short description */}
                        {bootcamp?.shortDetail && (
                            <div className='text-lg text-dark-gray'>
                                <CustomMarkdownPreview
                                    text={bootcamp?.shortDetail?.slice(0, 100)}
                                />
                            </div>
                        )}

                        {/* Rating and students */}
                        <div className='flex flex-wrap items-center gap-4'>
                            <div className='flex items-center gap-2'>
                                <Rating
                                    radius='large'
                                    readOnly
                                    style={{ maxWidth: 120 }}
                                    value={review?.averageStarCount || 0}
                                />
                                <span className='text-dark-gray'>
                                    ({review?.totalReviews || 0})
                                </span>
                            </div>
                            <div className='flex items-center gap-2 text-dark-gray font-medium'>
                                <Users className='w-5 h-5 text-emerald-400' />
                                <span>{studentCount || 0} Students</span>
                            </div>
                        </div>

                        {/* Course meta information */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='flex items-center gap-2 text-dark-gray'>
                                <Clock className='w-5 h-5 text-emerald-400' />
                                <span>{`Total hours: ${secondsToHours(totalDuration || 0)}+h Video Lectures`}</span>
                            </div>
                            <div className='flex items-center gap-2 text-dark-gray'>
                                <Calendar className='w-5 h-5 text-emerald-400' />
                                <span>
                                    Last updated:{' '}
                                    {moment(bootcamp?.updatedAt).format('LL')}
                                </span>
                            </div>
                            <div className='flex items-center gap-2 text-dark-gray'>
                                <Globe className='w-5 h-5 text-emerald-400' />
                                <span>{bootcamp?.language || 'English'}</span>
                            </div>
                        </div>

                        {/* Mentor/Instructor */}
                        <div className='pt-4 border-t border-forground-border'>
                            <div className='flex items-center gap-4'>
                                <div className='relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-400'>
                                    <Image
                                        src={
                                            course?.instructor?.image ||
                                            '/avatar.png'
                                        }
                                        alt={
                                            course?.instructor?.name ||
                                            'Instructor'
                                        }
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                                <div>
                                    <p className='text-gray text-sm'>Mentor</p>
                                    <p className='text-dark-gray font-medium'>
                                        {course?.instructor?.name || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course image */}
                    <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl transform rotate-3'></div>
                        <div
                            className='relative overflow-hidden rounded-2xl shadow-2xl aspect-video'
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            {(() => {
                                const mediaUrl =
                                    bootcamp?.image ||
                                    '/placeholder.svg?height=720&width=1080';
                                const isVideo =
                                    /\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv)(\?.*)?$/i.test(
                                        mediaUrl,
                                    );

                                if (isVideo) {
                                    return (
                                        <>
                                            <video
                                                ref={videoRef}
                                                src={mediaUrl}
                                                // src={'/sample.mp4'}
                                                className='w-full h-full object-contain bg-pure-white rounded-2xl cursor-pointer'
                                                controls={false}
                                                preload='metadata'
                                                poster={
                                                    bootcamp?.thumbnail ||
                                                    undefined
                                                }
                                                onPlay={() =>
                                                    setIsPlaying(true)
                                                }
                                                onPause={() =>
                                                    setIsPlaying(false)
                                                }
                                                onEnded={() =>
                                                    setIsPlaying(false)
                                                }
                                                onClick={handlePlayPause}
                                            />
                                            {/* Play/Pause button overlay */}
                                            {(!isPlaying ||
                                                (isPlaying && isHovering)) && (
                                                <div className='absolute inset-0 flex items-center justify-center'>
                                                    <div
                                                        className={`w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 p-3 ${
                                                            isPlaying &&
                                                            isHovering
                                                                ? 'opacity-100 scale-100'
                                                                : !isPlaying
                                                                  ? 'opacity-100 scale-100'
                                                                  : 'opacity-0 scale-95'
                                                        }`}
                                                        onClick={
                                                            handlePlayPause
                                                        }
                                                    >
                                                        {!isPlaying ? (
                                                            // Play Icon
                                                            <svg
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                shapeRendering='geometricPrecision'
                                                                textRendering='geometricPrecision'
                                                                imageRendering='optimizeQuality'
                                                                fillRule='evenodd'
                                                                clipRule='evenodd'
                                                                viewBox='0 0 512 512'
                                                            >
                                                                <circle
                                                                    fill='#01A437'
                                                                    cx='256'
                                                                    cy='256'
                                                                    r='256'
                                                                />
                                                                <path
                                                                    fill='#42C76E'
                                                                    d='M256 9.28c136.12 0 246.46 110.35 246.46 246.46 0 3.22-.08 6.42-.21 9.62C497.2 133.7 388.89 28.51 256 28.51S14.8 133.7 9.75 265.36c-.13-3.2-.21-6.4-.21-9.62C9.54 119.63 119.88 9.28 256 9.28z'
                                                                />
                                                                <path
                                                                    fill='#fff'
                                                                    d='M351.74 275.46c17.09-11.03 17.04-23.32 0-33.09l-133.52-97.7c-13.92-8.73-28.44-3.6-28.05 14.57l.54 191.94c1.2 19.71 12.44 25.12 29.04 16l131.99-91.72z'
                                                                />
                                                            </svg>
                                                        ) : (
                                                            // Pause Icon
                                                            <svg
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                shapeRendering='geometricPrecision'
                                                                textRendering='geometricPrecision'
                                                                imageRendering='optimizeQuality'
                                                                fillRule='evenodd'
                                                                clipRule='evenodd'
                                                                viewBox='0 0 512 512'
                                                            >
                                                                <circle
                                                                    fill='#01A437'
                                                                    cx='256'
                                                                    cy='256'
                                                                    r='256'
                                                                />
                                                                <path
                                                                    fill='#42C76E'
                                                                    d='M256 9.28c136.12 0 246.46 110.35 246.46 246.46 0 3.22-.08 6.42-.21 9.62C497.2 133.7 388.89 28.51 256 28.51S14.8 133.7 9.75 265.36c-.13-3.2-.21-6.4-.21-9.62C9.54 119.63 119.88 9.28 256 9.28z'
                                                                />
                                                                <g fill='#fff'>
                                                                    <rect
                                                                        x='180'
                                                                        y='150'
                                                                        width='50'
                                                                        height='212'
                                                                        rx='8'
                                                                        ry='8'
                                                                    />
                                                                    <rect
                                                                        x='282'
                                                                        y='150'
                                                                        width='50'
                                                                        height='212'
                                                                        rx='8'
                                                                        ry='8'
                                                                    />
                                                                </g>
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    );
                                } else {
                                    return (
                                        <Image
                                            src={mediaUrl}
                                            alt={bootcamp?.title || 'Bootcamp'}
                                            width={1080}
                                            height={720}
                                            className='w-full h-full object-contain bg-pure-white rounded-2xl'
                                        />
                                    );
                                }
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SingleBootcampHero;
