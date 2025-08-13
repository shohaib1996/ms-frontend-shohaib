// Example.tsx - Usage examples for the Image component
import React from 'react';
import { GlobalImage, ImagePreviewGroup } from './GlobalImage';
// import { GlobalImage as Image, ImagePreviewGroup } from "";

export default function ImageExample() {
    return (
        <div className='p-6 space-y-8'>
            <div className='space-y-2'>
                <h2 className='text-xl font-semibold'>Basic Usage</h2>
                <GlobalImage
                    width={200}
                    height={200}
                    src='/api/placeholder/200/200'
                    alt='Example image'
                />
            </div>

            <div className='space-y-2'>
                <h2 className='text-xl font-semibold'>With Fallback</h2>
                <GlobalImage
                    width={200}
                    height={200}
                    src='https://non-existent-image.jpg'
                    fallback='/api/placeholder/200/200'
                    alt='Example with fallback'
                />
            </div>

            <div className='space-y-2'>
                <h2 className='text-xl font-semibold'>Preview Disabled</h2>
                <GlobalImage
                    width={200}
                    height={200}
                    src='/api/placeholder/200/200'
                    alt='No preview image'
                    preview={false}
                />
            </div>

            <div className='space-y-2'>
                <h2 className='text-xl font-semibold'>Fill Mode</h2>
                <div
                    style={{
                        width: '300px',
                        height: '200px',
                        position: 'relative',
                    }}
                >
                    <GlobalImage
                        fill
                        src='/api/placeholder/300/200'
                        alt='Fill mode example'
                        objectFit='cover'
                    />
                </div>
            </div>

            <div className='space-y-2'>
                <h2 className='text-xl font-semibold'>Blur Placeholder</h2>
                <GlobalImage
                    width={200}
                    height={200}
                    src='/api/placeholder/200/200'
                    alt='Image with blur'
                    placeholder='blur'
                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJcUQjLgwAAAABJRU5ErkJggg=='
                />
            </div>

            <div className='space-y-2'>
                <h2 className='text-xl font-semibold'>Custom Preview Source</h2>
                <GlobalImage
                    width={200}
                    height={200}
                    src='/api/placeholder/200/200'
                    alt='Custom preview source'
                    preview={{
                        src: '/api/placeholder/800/600',
                        mask: (
                            <div className='absolute inset-0 flex items-center justify-center bg-blue-500 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200'>
                                <span className='text-white font-bold'>
                                    View Larger
                                </span>
                            </div>
                        ),
                        maskClassName: 'cursor-zoom-in',
                    }}
                />
            </div>

            <div className='space-y-2'>
                <h2 className='text-xl font-semibold'>Image Preview Group</h2>
                <ImagePreviewGroup>
                    <div className='flex gap-4'>
                        <GlobalImage
                            width={150}
                            height={150}
                            src='/api/placeholder/400/300'
                            alt='Image 1'
                        />
                        <GlobalImage
                            width={150}
                            height={150}
                            src='/api/placeholder/400/300?text=Image+2'
                            alt='Image 2'
                        />
                        <GlobalImage
                            width={150}
                            height={150}
                            src='/api/placeholder/400/300?text=Image+3'
                            alt='Image 3'
                        />
                    </div>
                </ImagePreviewGroup>
            </div>

            <div className='space-y-2'>
                <h2 className='text-xl font-semibold'>
                    Priority Images (Above the Fold)
                </h2>
                <GlobalImage
                    width={200}
                    height={200}
                    src='/api/placeholder/200/200?text=Priority'
                    alt='Priority image'
                    priority
                />
            </div>

            <div className='space-y-2'>
                <h2 className='text-xl font-semibold'>Custom Counter Render</h2>
                <ImagePreviewGroup
                    preview={{
                        countRender: (current, total) => (
                            <div className='bg-white text-black px-4 py-2 rounded-full font-bold'>
                                {current} / {total}
                            </div>
                        ),
                    }}
                >
                    <div className='flex gap-4'>
                        <GlobalImage
                            width={150}
                            height={150}
                            src='/api/placeholder/400/300?text=Custom+1'
                            alt='Custom 1'
                        />
                        <GlobalImage
                            width={150}
                            height={150}
                            src='/api/placeholder/400/300?text=Custom+2'
                            alt='Custom 2'
                        />
                    </div>
                </ImagePreviewGroup>
            </div>
        </div>
    );
}
