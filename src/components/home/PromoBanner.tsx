'use client';

import { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
const bgImage = '/leftRight3.png';
import Image from 'next/image';

export default function PromoBanner() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 300,
        minutes: 28,
        seconds: 35,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newSeconds = prevTime.seconds - 1;
                const newMinutes =
                    newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
                const newHours =
                    newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;

                return {
                    hours: newHours < 0 ? 0 : newHours,
                    minutes: newMinutes < 0 ? 59 : newMinutes,
                    seconds: newSeconds < 0 ? 59 : newSeconds,
                };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const scrollToSection = useCallback((elementId: string) => {
        const element = document.getElementById(elementId);
        if (element) {
            // Prevent abrupt jumps by using smooth scrolling
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, []);

    return (
        <div className='w-full relative bg-primary text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between overflow-hidden'>
            {/* Right background image - responsive positioning */}
            <div className='absolute hidden sm:block sm:-right-48 md:-right-36 lg:-right-36 top-1/2 -translate-y-1/2 opacity-50 sm:opacity-80 md:opacity-100 transform scale-75 sm:scale-90 md:scale-100'>
                <Image
                    src={bgImage}
                    alt='Background Right'
                    className='animate-pulse-scale delay-[3000]'
                    priority
                    height={200}
                    width={200}
                />
            </div>

            {/* Left background image - responsive positioning */}
            <div className='absolute hidden sm:block sm:-left-48 md:-left-36 lg:-left-36 top-1/2 -translate-y-1/2 opacity-50 sm:opacity-80 md:opacity-100 transform scale-75 sm:scale-90 md:scale-100'>
                <Image
                    src={bgImage}
                    alt='Background Left'
                    className='animate-pulse-scale delay-[3000]'
                    priority
                    height={200}
                    width={200}
                />
            </div>

            <div className='flex items-center gap-4 z-10'>
                <div className='bg-primary/30 p-3 rounded-full'>
                    <AlertTriangle className='h-6 w-6' />
                </div>
                <div>
                    <h2 className='text-xl sm:text-2xl font-semibold'>
                        Special Launch Pricing Ends Soon
                    </h2>
                    <p className='text-white/90 text-sm sm:text-base'>
                        Lock in your 90% revenue share before rates change
                    </p>
                </div>
            </div>

            <div className='flex items-center flex-col gap-4 mt-4 md:mt-0 z-10'>
                <div className='flex items-center gap-2'>
                    <div className='bg-white/10 rounded-lg p-2 min-w-[50px] sm:min-w-[60px] text-center'>
                        <div className='text-lg sm:text-xl font-bold font-orbitron'>
                            {timeLeft.hours}
                        </div>
                        <div className='text-xs'>Hours</div>
                    </div>
                    <div className='text-xl font-bold'>:</div>
                    <div className='bg-white/10 rounded-lg p-2 min-w-[50px] sm:min-w-[60px] text-center'>
                        <div className='text-lg sm:text-xl font-bold font-orbitron'>
                            {timeLeft.minutes}
                        </div>
                        <div className='text-xs'>Mins</div>
                    </div>
                    <div className='text-xl font-bold'>:</div>
                    <div className='bg-white/10 rounded-lg p-2 min-w-[50px] sm:min-w-[60px] text-center'>
                        <div className='text-lg sm:text-xl font-bold font-orbitron'>
                            {timeLeft.seconds}
                        </div>
                        <div className='text-xs'>Secs</div>
                    </div>
                </div>

                <Button
                    onClick={() => scrollToSection('faq')}
                    className='bg-white text-primary hover:bg-white/90 rounded-full px-4 py-2 font-medium'
                >
                    Secure Your Rate Now
                    <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
            </div>
        </div>
    );
}
