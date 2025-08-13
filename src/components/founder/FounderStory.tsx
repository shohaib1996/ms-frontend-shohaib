import type React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const FounderStory: React.FC = () => {
    return (
        <section className='py-12 bg-slate-50 dark:bg-slate-900'>
            <div className='my-container'>
                <div className='max-w-3xl mx-auto'>
                    <div className='text-center mb-12'>
                        <h2 className='text-3xl md:text-4xl font-bold text-black dark:text-white mb-4'>
                            The Founder&apos;s Story
                        </h2>
                        <div className='w-16 h-1 bg-primary mx-auto rounded-full'></div>
                    </div>

                    <div className='space-y-8'>
                        <Card className='border-none shadow-lg dark:bg-slate-800'>
                            <CardContent className='p-8'>
                                <Quote className='h-10 w-10 text-primary mb-4 opacity-50' />
                                <p className='text-lg text-dark-gray dark:text-slate-300 leading-relaxed mb-6'>
                                    My journey began with a simple observation:
                                    traditional education wasn&apos;t keeping
                                    pace with the rapidly evolving job market.
                                    Students were graduating with degrees but
                                    lacking the practical skills employers
                                    needed. I founded SkillBNK to bridge this
                                    gap, creating a platform where learners
                                    could gain real-world skills through
                                    intensive, focused training programs.
                                </p>
                                <p className='text-lg text-dark-gray dark:text-slate-300 leading-relaxed'>
                                    What started as a small initiative has grown
                                    into a comprehensive educational ecosystem
                                    that has helped thousands of students
                                    transition into rewarding careers. Our
                                    success stories fuel my passion to continue
                                    innovating and expanding our offerings,
                                    ensuring that quality education is
                                    accessible to everyone, regardless of their
                                    background or previous experience.
                                </p>
                            </CardContent>
                        </Card>

                        <div className='grid md:grid-cols-3 gap-6'>
                            <Card className='border-none shadow-md bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow'>
                                <CardContent className='p-6 text-center'>
                                    <div className='text-4xl font-bold text-primary mb-2'>
                                        10+
                                    </div>
                                    <p className='text-dark-gray dark:text-slate-300'>
                                        Years in EdTech
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className='border-none shadow-md bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow'>
                                <CardContent className='p-6 text-center'>
                                    <div className='text-4xl font-bold text-primary mb-2'>
                                        5,000+
                                    </div>
                                    <p className='text-dark-gray dark:text-slate-300'>
                                        Students Helped
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className='border-none shadow-md bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow'>
                                <CardContent className='p-6 text-center'>
                                    <div className='text-4xl font-bold text-primary mb-2'>
                                        20+
                                    </div>
                                    <p className='text-dark-gray dark:text-slate-300'>
                                        Bootcamp Programs
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FounderStory;
