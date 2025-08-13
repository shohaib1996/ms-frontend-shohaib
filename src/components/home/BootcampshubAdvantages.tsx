'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import {
    BarChart2,
    Clock,
    Users,
    Trophy,
    Sparkles,
    DollarSign,
    Award,
} from 'lucide-react';
import GlobalTitle from '../global/GlobalTitle';

// Define the data for the advantage cards
const advantageData = [
    {
        icon: <Clock className='text-white' size={20} />,
        value: '70%',
        description: 'Reduction in administrative tasks',
    },
    {
        icon: <Users className='text-white' size={20} />,
        value: '3X',
        description: 'Increase in student engagement',
    },
    {
        icon: <Award className='text-white' size={20} />,
        value: '47%',
        description: 'Improvement in course completion rates',
    },
    {
        icon: <Sparkles className='text-white' size={20} />,
        value: '89%',
        description: 'of coaches report higher student satisfaction',
    },
    {
        icon: <DollarSign className='text-white' size={20} />,
        value: '$42,000',
        description: 'Average increase in annual coaching revenue',
    },
];

const BootcampshubAdvantages = () => {
    const [activeCard, setActiveCard] = useState<number | null>(null);

    return (
        <div className='w-full bg-primary py-12'>
            <div className='my-container flex flex-col gap-10'>
                <div className='flex flex-col gap-2 items-center text-center'>
                    <Button
                        size={'sm'}
                        className='bg-blue-500/30 text-white w-fit rounded-full flex items-center gap-1.5'
                    >
                        <BarChart2 size={14} />
                        Impact Metrics
                    </Button>
                    <GlobalTitle
                        color='white'
                        title='By the Numbers: The SkillBNK Advantage'
                        subTitle={
                            <>
                                See how SkillBNK stands apart from traditional
                                coaching platforms
                                <br />
                                Tap or hover over any feature for more details
                            </>
                        }
                        className='text-center'
                    />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                    {advantageData.map((advantage, index) => (
                        <div
                            key={index}
                            className='p-6 rounded-lg bg-blue-500/40 border border-blue-400/30 h-full w-full flex flex-col items-center justify-center gap-3 transition-all duration-200 hover:bg-blue-500/40 cursor-pointer'
                            onMouseEnter={() => setActiveCard(index)}
                            onMouseLeave={() => setActiveCard(null)}
                            onClick={() =>
                                setActiveCard(
                                    activeCard === index ? null : index,
                                )
                            }
                        >
                            <div className='animate-pulse-scale'>
                                <div className='rounded-full h-16 w-16 bg-blue-500/50 flex items-center justify-center'>
                                    <div className='rounded-full h-11 w-11 bg-blue-500/80 flex items-center justify-center rotate-180'>
                                        {advantage.icon}
                                    </div>
                                </div>
                            </div>
                            <p className='text-4xl font-semibold text-white mt-2'>
                                {advantage.value}
                            </p>
                            <p className='text-sm text-blue-100 text-center'>
                                {advantage.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BootcampshubAdvantages;
