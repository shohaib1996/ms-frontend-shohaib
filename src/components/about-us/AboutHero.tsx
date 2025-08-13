import type React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const AboutHero: React.FC = () => {
    return (
        <section className='xl:py-20 py-16  bg-gradient-to-b from-slate-50 dark:from-slate-900 dark:to-slate-950 to-white'>
            <div className='my-container pt-10'>
                <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
                    <div className='space-y-6'>
                        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight'>
                            About{' '}
                            <span className='text-primary-white'>SkillBNK</span>
                        </h1>

                        <p className='text-lg text-dark-gray leading-relaxed'>
                            Discover SkillBNK: your go-to platform for
                            educational resources, bootcamps, and daily activity
                            tracking. We&apos;re dedicated to helping you
                            enhance your learning journey and stay ahead in your
                            career.
                        </p>

                        <div className='flex flex-wrap gap-4'>
                            <Button>Explore Bootcamps</Button>
                            <Button variant='primary_light'>Learn More</Button>
                        </div>
                    </div>

                    <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-tr from-emerald-100 to-sky-100 rounded-3xl transform rotate-2 opacity-70'></div>
                        <div className='relative overflow-hidden rounded-2xl shadow-lg'>
                            <Image
                                src='/pages/about-us.png'
                                alt='About SkillBNK'
                                width={600}
                                height={400}
                                className='w-full h-auto object-cover'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
