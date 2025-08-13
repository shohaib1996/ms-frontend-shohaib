import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const CEO: React.FC = () => {
    return (
        <section className='py-16 bg-gradient-to-b from-slate-50 dark:from-slate-900 dark:to-slate-950 to-white'>
            <div className='my-container pt-10'>
                <div className='text-center mb-12'>
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white leading-tight mb-4'>
                        Meet Our{' '}
                        <span className='text-primary-white'>Founder</span>
                    </h1>
                    <div className='w-20 h-1 bg-primary mx-auto rounded-full'></div>
                </div>

                <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
                    <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-tr from-emerald-100 to-sky-100 dark:from-emerald-900/30 dark:to-sky-900/30 rounded-3xl transform rotate-2 opacity-70'></div>
                        <div className='relative overflow-hidden rounded-2xl shadow-lg'>
                            <Image
                                src='/pages/ceo.png'
                                alt='Shiblu Ahmad - Founder and CEO'
                                width={600}
                                height={600}
                                className='w-full h-auto object-cover'
                            />
                        </div>
                    </div>

                    <div className='space-y-6'>
                        <div>
                            <h2 className='text-3xl font-bold text-black dark:text-white mb-2'>
                                Shiblu Ahmad
                            </h2>
                            <p className='text-lg text-primary-white font-medium'>
                                Founder & CEO
                            </p>
                        </div>

                        <p className='text-lg text-dark-gray dark:text-slate-300 leading-relaxed'>
                            Shiblu Ahmad is the visionary founder of Bootcamps
                            Hub, dedicated to revolutionizing education through
                            innovative technology solutions. With extensive
                            experience in EdTech and a passion for helping
                            students succeed, Shiblu has built a platform that
                            transforms how people learn and develop their
                            careers.
                        </p>

                        <div className='flex flex-wrap gap-4'>
                            <Button>Connect on LinkedIn</Button>
                            <Button variant='primary_light'>
                                Read Full Story
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CEO;
