import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Search } from 'lucide-react';

function DocumentPageLoader({ aside = true }: { aside?: boolean }) {
    return (
        <Card className='bg-transparent shadow-none border-none w-full'>
            {/* Header Section */}
            {aside && (
                <div className='py-2 border-b border-forground-border'>
                    <div className='flex justify-between items-start'>
                        <div className='left'>
                            <h2 className='title flex items-center gap-2 text-2xl font-bold mb-2'>
                                <ArrowLeft className='h-6 w-6 cursor-pointer' />
                                Branch User Manual
                            </h2>
                            <p className='subTitle text-gray'>
                                From here you can see all instructions to use
                                Branch.
                            </p>
                        </div>
                        <div className='right'>
                            <div className='data space-y-2'>
                                <p className='flex items-center gap-2'>
                                    <strong>Last Updated By:</strong>
                                    <div className='flex items-center gap-2'>
                                        <div className='h-5 w-5 rounded-full bg-foreground'></div>
                                        <div className='h-4 w-24 bg-foreground rounded'></div>
                                        <div className='h-4 w-16 bg-foreground rounded'></div>
                                    </div>
                                </p>
                                <p className='flex items-center gap-2'>
                                    <strong>Last Updated Date:</strong>
                                    <div className='h-4 w-40 bg-foreground rounded'></div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='p-0 pt-2'>
                {/* Search Section */}
                {aside && (
                    <div className='mb-4 relative'>
                        <div className='flex items-center gap-2'>
                            <div className='relative flex-1'>
                                <div className='relative'>
                                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray' />
                                    <div className='w-full h-10 pl-10 pr-10 bg-foreground border border-forground-border rounded-md'></div>
                                </div>
                            </div>
                            <div className='h-10 w-20 bg-background rounded-md'></div>
                        </div>
                    </div>
                )}

                {/* Main Content Section */}
                <div className='flex flex-col items-start gap-4'>
                    <div className='flex gap-2 w-full max-h-[calc(100vh-200px)]'>
                        {/* Sidebar Skeleton */}
                        {aside && (
                            <aside className='min-h-full max-h-full overflow-y-auto w-[315px] bg-foreground rounded-lg p-4'>
                                <div className='space-y-3'>
                                    {/* Tree View Items */}
                                    {[...Array(8)].map((_, index) => (
                                        <div key={index} className='space-y-2'>
                                            {/* Main folder/item */}
                                            <div className='flex items-center gap-2 p-2'>
                                                <div className='h-4 w-4 bg-background rounded'></div>
                                                <div className='h-4 w-24 bg-background rounded'></div>
                                            </div>

                                            {/* Sub-items (randomly show some) */}
                                            {index % 3 === 0 && (
                                                <div className='ml-6 space-y-1'>
                                                    {[
                                                        ...Array(
                                                            Math.floor(
                                                                Math.random() *
                                                                    4,
                                                            ) + 1,
                                                        ),
                                                    ].map((_, subIndex) => (
                                                        <div
                                                            key={subIndex}
                                                            className='flex items-center gap-2 p-1'
                                                        >
                                                            <div className='h-3 w-3 bg-background rounded'></div>
                                                            <div className='h-3 w-20 bg-background rounded'></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </aside>
                        )}

                        {/* Main Content Skeleton */}
                        <div className='bg-foreground min-h-full max-h-full overflow-y-auto rounded-lg flex-1 p-6'>
                            {/* Document Title */}
                            <div className='mb-6'>
                                <div className='h-8 w-3/4 bg-background rounded mb-4'></div>
                                <div className='h-4 w-1/2 bg-background rounded'></div>
                            </div>

                            {/* Content Sections */}
                            <div className='space-y-6'>
                                {/* Section 1 */}
                                <div className='space-y-3'>
                                    <div className='h-6 w-1/3 bg-background rounded'></div>
                                    <div className='space-y-2'>
                                        <div className='h-4 w-full bg-background rounded'></div>
                                        <div className='h-4 w-5/6 bg-background rounded'></div>
                                        <div className='h-4 w-4/5 bg-background rounded'></div>
                                    </div>
                                </div>

                                {/* Section 2 */}
                                <div className='space-y-3'>
                                    <div className='h-6 w-1/4 bg-background rounded'></div>
                                    <div className='space-y-2'>
                                        <div className='h-4 w-full bg-background rounded'></div>
                                        <div className='h-4 w-3/4 bg-background rounded'></div>
                                    </div>

                                    {/* Bullet points skeleton */}
                                    <div className='ml-4 space-y-2'>
                                        {[...Array(3)].map((_, index) => (
                                            <div
                                                key={index}
                                                className='flex items-center gap-2'
                                            >
                                                <div className='h-2 w-2 bg-background rounded-full'></div>
                                                <div className='h-4 w-64 bg-background rounded'></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Modal/Dialog Skeleton */}
                                <div className='border rounded-lg p-4 bg-background/50'>
                                    <div className='flex justify-between items-center mb-4'>
                                        <div className='h-5 w-32 bg-background rounded'></div>
                                        <div className='h-4 w-4 bg-background rounded'></div>
                                    </div>

                                    <div className='space-y-4'>
                                        {/* Form fields skeleton */}
                                        <div className='space-y-2'>
                                            <div className='h-4 w-24 bg-background rounded'></div>
                                            <div className='h-10 w-full bg-background rounded'></div>
                                        </div>

                                        <div className='space-y-2'>
                                            <div className='h-4 w-20 bg-background rounded'></div>
                                            <div className='h-24 w-full bg-background rounded'></div>
                                        </div>

                                        <div className='space-y-2'>
                                            <div className='h-4 w-16 bg-background rounded'></div>
                                            <div className='h-10 w-full bg-background rounded'></div>
                                        </div>

                                        <div className='space-y-2'>
                                            <div className='h-4 w-20 bg-background rounded'></div>
                                            <div className='h-10 w-full bg-background rounded'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default DocumentPageLoader;
