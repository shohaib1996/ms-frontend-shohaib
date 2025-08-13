'use client';

import React, { useState } from 'react';
import GlobalTitle from '@/components/global/GlobalTitle';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import { tabsData } from './tabsData';
import TabContent from './TabContent';

const BusinessSolutions = () => {
    const [activeTab, setActiveTab] =
        useState<keyof typeof tabsData>('content');

    return (
        <div className='bg-primary mx-auto w-full py-12'>
            <div className='my-container'>
                <div className='flex flex-col gap-2 items-center justify-center'>
                    <Button
                        // variant={'primary_light'}
                        className='h-[26px] rounded-full bg-blue-500/30 text-white border-none shadow-md flex items-center gap-1'
                    >
                        <Rocket className='h-3.5 w-3.5' />
                        Complete Solution
                    </Button>
                    <GlobalTitle
                        className='lg:max-w-[70%] text-center text-white'
                        color='white'
                        title='End-to-End Solution for Your Coaching Business'
                        subTitle='Everything you need to launch, manage, and scale your high-ticket coaching'
                    />
                </div>

                {/* Tabs Navigation */}
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-10'>
                    {Object.entries(tabsData).map(([key, tab]) => (
                        <button
                            key={key}
                            onClick={() =>
                                setActiveTab(key as keyof typeof tabsData)
                            }
                            className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                                activeTab === key
                                    ? 'bg-white text-primary'
                                    : 'bg-pure-white/10 text-white'
                            }`}
                        >
                            <div
                                className={`rounded-full p-3 ${
                                    activeTab === key
                                        ? 'bg-primary text-white'
                                        : 'bg-pure-white/10 text-white'
                                }`}
                            >
                                {tab.icon}
                            </div>
                            <span className='text-sm font-medium mt-2 text-center'>
                                {tab.title}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className='mt-6'>
                    <TabContent
                        activeTab={activeTab}
                        data={tabsData[activeTab]}
                    />
                </div>
            </div>
        </div>
    );
};

export default BusinessSolutions;
