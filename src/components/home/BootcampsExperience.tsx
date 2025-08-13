import React from 'react';
import GlobalTooltip from '../global/GlobalTooltip';
import { Button } from '../ui/button';
import {
    BadgeCheck,
    BarChart2,
    BookOpen,
    Layers,
    Notebook,
    Rocket,
    Settings,
    Sparkles,
    Target,
    Users,
    Zap,
} from 'lucide-react';
import GlobalTitle from '../global/GlobalTitle';

const coachFeatures = [
    {
        icon: <Layers />,
        title: 'Everything in One Place',
        description: 'No more tool-switching or platform juggling',
    },
    {
        icon: <Settings />,
        title: 'Complete Customization',
        description: 'Tailor the platform to your coaching style',
    },
    {
        icon: <BarChart2 />,
        title: 'Student Progress Tracking',
        description: 'Monitor engagement and performance in real-time',
    },
    {
        icon: <Sparkles />,
        title: 'AI-Powered Insights',
        description: 'Get actionable data on student performance',
    },
    {
        icon: <Zap />,
        title: 'Automated Operations',
        description: 'Focus on coaching, not administrative tasks',
    },
];

const studentFeatures = [
    {
        icon: <Notebook />,
        title: 'Centralized Learning',
        description:
            'All resources, communications, and assignments in one place',
    },
    {
        icon: <Target />,
        title: 'Progress Visualization',
        description: 'Clear tracking of achievements and growth',
    },
    {
        icon: <Users />,
        title: 'Collaborative Environment',
        description: 'Engagement with peers and coaches',
    },
    {
        icon: <Rocket />,
        title: 'Structured Learning Path',
        description: 'Clear roadmap to success',
    },
    {
        icon: <BadgeCheck />,
        title: 'Comprehensive Assessment',
        description: 'Multiple ways to demonstrate knowledge',
    },
];

const BootcampsExperience = () => {
    return (
        <div className='py-12 bg-white dark:bg-indigo-950 w-full relative overflow-hidden'>
            <div className='my-container flex flex-col items-center gap-5'>
                <GlobalTooltip tooltip='Transformative Experience'>
                    <Button
                        variant={'secondary'}
                        className='rounded-full border-none w-fit'
                        icon={<Zap size={18} />}
                    >
                        Transformative Experience
                    </Button>
                </GlobalTooltip>
                <GlobalTitle title='The SkillBNK Experience' />

                <div className='grid md:grid-cols-2 grid-cols-1 gap-5 w-full'>
                    <div className='border relative overflow-hidden border-purple-300/40 p-5 bg-foreground rounded-2xl'>
                        <div className='bg-indigo-400/30 size-10 flex rounded-full justify-center items-center text-primary-white'>
                            <BookOpen />
                        </div>
                        <h2 className='text-dark-gray font-semibold text-xl py-7 flex gap-3 items-center'>
                            For Coaches
                            <div className='w-1/3 rounded-full h-[2px] bg-gradient-to-r from-indigo-600 to-indigo-600/20'></div>
                        </h2>

                        <div className='space-y-3'>
                            {coachFeatures.map((f) => (
                                <div
                                    className='flex gap-3 text-dark-gray items-center'
                                    key={f.title}
                                >
                                    <div className='bg-indigo-400/30 size-12 rounded-md flex justify-center items-center text-primary-white'>
                                        {f.icon}
                                    </div>
                                    <div>
                                        <h2 className='font-semibold'>
                                            {f.title}
                                        </h2>
                                        <h2 className='text-gray'>
                                            {f.description}
                                        </h2>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='absolute -top-32 -right-36 animate-pulse-scale'>
                            <div className='size-96 rounded-full bg-purple-200/40 dark:bg-purple-800/30 flex items-center justify-center'>
                                <div className='size-64 rounded-full bg-purple-200/60 dark:bg-purple-800/30 flex items-center justify-center'>
                                    <div className='size-36 rounded-full bg-purple-200 dark:bg-purple-800/30'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='border overflow-hidden relative border-purple-300/40 p-5 bg-foreground rounded-2xl'>
                        <div className='bg-indigo-400/30 size-10 flex rounded-full justify-center items-center text-primary-white'>
                            <Users />
                        </div>
                        <h2 className='text-dark-gray font-semibold text-xl py-7 flex gap-3 items-center'>
                            For Students
                            <div className='w-1/3 rounded-full h-[2px] bg-gradient-to-r from-indigo-600 to-indigo-600/20'></div>
                        </h2>

                        <div className='space-y-3'>
                            {studentFeatures.map((f) => (
                                <div
                                    className='flex gap-3 text-dark-gray items-center'
                                    key={f.title}
                                >
                                    <div className='bg-indigo-400/30 size-12 rounded-md flex justify-center items-center text-primary-white'>
                                        {f.icon}
                                    </div>
                                    <div>
                                        <h2 className='font-semibold'>
                                            {f.title}
                                        </h2>
                                        <h2 className='text-gray'>
                                            {f.description}
                                        </h2>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='absolute -top-32 -right-36 animate-pulse-scale'>
                            <div className='size-96 rounded-full bg-purple-200/40 dark:bg-purple-800/30 flex items-center justify-center'>
                                <div className='size-64 rounded-full bg-purple-200/60 dark:bg-purple-800/30 flex items-center justify-center'>
                                    <div className='size-36 rounded-full bg-purple-200 dark:bg-purple-800/30'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='absolute z-10 -top-[50px] blur-3xl h-[700px] w-[700px] -left-[100px] bg-gradient-to-r rounded-full from-purple-400/30 to-transparent'></div>
        </div>
    );
};

export default BootcampsExperience;
