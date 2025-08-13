'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Instructor {
    _id?: string;
    name: string;
    image?: string;
    about?: string;
}

interface InstructorWithArea {
    _id?: string;
    instructor: Instructor;
    area?: string;
}

interface ProgramProps {
    instructors?: InstructorWithArea[];
    [key: string]: any;
}

interface ClassDeliverByProps {
    program: ProgramProps;
    className?: string;
}

const ClassDeliverBy: React.FC<ClassDeliverByProps> = ({
    program,
    className,
}) => {
    const { instructors = [] } = program;

    if (!instructors || instructors.length === 0) {
        return null;
    }

    return (
        <section
            className={cn(
                'py-6 bg-gradient-to-br dark:from-slate-950 dark:to-indigo-950 from-slate-50 to-indigo-50',
                className,
            )}
        >
            <div className='container mx-auto px-4 md:px-6'>
                <div className='text-center mb-3'>
                    <h2 className='text-3xl md:text-4xl font-bold text-slate-900 dark:text-white'>
                        Class Delivery By
                    </h2>
                    <div className='w-24 h-1 bg-emerald-500 mx-auto mt-4 rounded-full'></div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto'>
                    {instructors.map((ins) => {
                        const { instructor } = ins;

                        return (
                            <div
                                key={ins?._id}
                                className='flex flex-col items-center bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2'
                            >
                                <div className='relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-emerald-100 dark:border-emerald-900'>
                                    <Image
                                        fill
                                        src={
                                            instructor?.image
                                                ? instructor?.image
                                                : '/multischool/bootcamps/courses/subnet-matter-expert.png'
                                        }
                                        alt={instructor?.name || 'Instructor'}
                                        className='object-cover'
                                    />
                                </div>

                                <div className='text-center'>
                                    <h3 className='text-emerald-600 dark:text-emerald-400 font-medium mb-1'>
                                        Mentor
                                    </h3>
                                    <p className='text-xl font-bold text-slate-900 dark:text-white mb-1'>
                                        {instructor?.name}
                                    </p>
                                    {ins?.area && (
                                        <p className='text-slate-600 dark:text-slate-300'>
                                            {ins.area}
                                        </p>
                                    )}
                                    {instructor?.about && (
                                        <p className='mt-3 text-sm text-slate-500 dark:text-slate-400 line-clamp-3'>
                                            {instructor.about}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ClassDeliverBy;
