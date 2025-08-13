// components/ui/image.tsx
'use client';

import React, { useState, useEffect, useContext, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import GlobalModal from '@/components/global/GlobalModal';
import { Button } from '@/components/ui/button';
import { DownloadIcon, EyeIcon } from 'lucide-react';

// Preview Group Context for handling gallery functionality
type PreviewGroupContextType = {
    registerImage: (image: { src: string; alt?: string }) => void;
    unregisterImage: (src: string) => void;
    showPreview: (initialSrc: string) => void;
    previewVisible: boolean;
    previewSrc: string | null;
    current: number;
    total: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
};

const PreviewGroupContext = React.createContext<PreviewGroupContextType | null>(
    null,
);

// Types based on Ant Design Image props with Next.js Image integration
export interface ImageProps {
    alt?: string;
    fallback?: string;
    height?: number;
    width?: number;
    placeholder?: React.ReactNode | 'blur' | 'empty';
    preview?:
        | boolean
        | {
              src?: string;
              mask?: React.ReactNode;
              maskClassName?: string;
          };
    src: string;
    onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    rootClassName?: string;
    className?: string;
    priority?: boolean;
    quality?: number;
    sizes?: string;
    fill?: boolean;
    blurDataURL?: string;
    style?: React.CSSProperties;
    loading?: 'eager' | 'lazy';
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    objectPosition?: string;
    downloadable?: boolean;
    onDownload?: any;
}

export const GlobalImage = React.forwardRef<HTMLDivElement, ImageProps>(
    (
        {
            src,
            alt = '',
            width,
            height,
            className,
            fallback,
            placeholder = 'empty',
            preview = true,
            onError,
            rootClassName,
            priority = false,
            quality,
            sizes,
            fill = false,
            blurDataURL,
            style,
            loading,
            objectFit = 'cover',
            objectPosition = 'center',
            onDownload,
            downloadable = false,
            ...props
        },
        ref,
    ) => {
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(false);
        const [showPreview, setShowPreview] = useState(false);
        const previewContext = useContext(PreviewGroupContext);
        const previewSrc = typeof preview === 'object' ? preview.src : src;
        const maskNode =
            typeof preview === 'object' ? (
                preview.mask
            ) : (
                <div className='absolute inset-0 flex items-center justify-center bg-[#000] bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-200 gap-1'>
                    <EyeIcon size={30} />
                    <p>Preview</p>
                </div>
            );
        const maskClassName =
            typeof preview === 'object' ? preview.maskClassName : '';

        // Register with preview group if available
        useEffect(() => {
            if (previewContext && previewSrc) {
                previewContext.registerImage({ src: previewSrc, alt });
                return () => {
                    previewContext.unregisterImage(previewSrc);
                };
            }
        }, [previewContext, previewSrc, alt]);

        const handleLoad = () => {
            setIsLoading(false);
            setError(false);
        };

        const handleError = (
            e: React.SyntheticEvent<HTMLImageElement, Event>,
        ) => {
            setIsLoading(false);
            setError(true);
            if (onError) {
                onError(e);
            }
        };

        const handlePreviewClick = () => {
            if (preview && previewSrc) {
                if (previewContext) {
                    previewContext.showPreview(previewSrc);
                } else {
                    setShowPreview(true);
                }
            }
        };

        const closePreview = () => {
            setShowPreview(false);
        };

        // Determine placeholder type for Next.js Image
        const getPlaceholderType = () => {
            if (placeholder === 'blur' && blurDataURL) {
                return 'blur';
            }
            return 'empty';
        };

        return (
            <>
                <div
                    ref={ref}
                    className={cn(
                        'relative inline-block overflow-hidden',
                        rootClassName,
                        className,
                    )}
                    style={{
                        width: fill ? '100%' : width,
                        height: fill ? '100%' : height,
                        ...style,
                    }}
                >
                    {isLoading &&
                        placeholder !== 'blur' &&
                        placeholder !== 'empty' && (
                            <div className='absolute inset-0 z-10'>
                                {placeholder}
                            </div>
                        )}

                    {error && fallback ? (
                        <div className='w-full h-full'>
                            <Image
                                src={fallback}
                                alt={alt || 'Fallback image'}
                                fill={fill}
                                width={!fill ? width : undefined}
                                height={!fill ? height : undefined}
                                className='object-cover'
                                priority={priority}
                                quality={quality}
                                sizes={sizes}
                                style={{
                                    objectFit,
                                    objectPosition,
                                }}
                            />
                        </div>
                    ) : (
                        <>
                            <Image
                                src={src}
                                alt={alt}
                                fill={fill}
                                width={!fill ? width : undefined}
                                height={!fill ? height : undefined}
                                onLoadingComplete={handleLoad}
                                onError={handleError}
                                placeholder={getPlaceholderType()}
                                blurDataURL={blurDataURL}
                                priority={priority}
                                quality={quality}
                                sizes={sizes}
                                loading={loading}
                                className={cn(
                                    'object-cover',
                                    isLoading &&
                                        placeholder === 'empty' &&
                                        'invisible',
                                )}
                                style={{
                                    objectFit,
                                    objectPosition,
                                }}
                                {...props}
                            />

                            {!isLoading && !error && preview && (
                                <div
                                    className={cn(
                                        'absolute inset-0 cursor-pointer',
                                        maskClassName,
                                    )}
                                    onClick={handlePreviewClick}
                                >
                                    {maskNode}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Using GlobalModal instead of the custom preview implementation */}
                <GlobalModal
                    className='w-[1000px]'
                    open={showPreview && !previewContext}
                    setOpen={closePreview}
                    title='Image Preview'
                    subTitle={alt}
                    buttons={
                        downloadable && (
                            <Button
                                tooltip='Download Image'
                                onClick={onDownload}
                            >
                                <DownloadIcon size={20} />
                            </Button>
                        )
                    }
                >
                    <div className=' flex justify-center h-full w-full'>
                        <Image
                            src={previewSrc || ''}
                            alt={alt}
                            width={900}
                            height={700}
                            className='max-w-full h-full object-contain'
                            priority
                            style={{
                                objectFit: 'contain',
                                width: 'auto',
                                height: 'auto',
                            }}
                        />
                    </div>
                </GlobalModal>
            </>
        );
    },
);

GlobalImage.displayName = 'GlobalImage';

// Preview Group Component with GlobalModal
export interface ImagePreviewGroupProps {
    children?: React.ReactNode;
    preview?:
        | boolean
        | {
              onChange?: (current: number, prevCurrent: number) => void;
              countRender?: (current: number, total: number) => React.ReactNode;
          };
    className?: string;
}

export const ImagePreviewGroup: React.FC<ImagePreviewGroupProps> = ({
    children,
    preview = true,
    className,
}) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [images, setImages] = useState<Array<{ src: string; alt?: string }>>(
        [],
    );
    const [current, setCurrent] = useState(0);

    const registerImage = (image: { src: string; alt?: string }) => {
        setImages((prev) => {
            if (prev.some((i) => i.src === image.src)) {
                return prev;
            }
            return [...prev, image];
        });
    };

    const unregisterImage = (src: string) => {
        setImages((prev) => prev.filter((i) => i.src !== src));
    };

    const showPreview = (initialSrc: string) => {
        const index = images.findIndex((img) => img.src === initialSrc);
        if (index !== -1) {
            setCurrent(index);
            setPreviewSrc(initialSrc);
            setPreviewVisible(true);
        }
    };

    const handleClose = () => {
        setPreviewVisible(false);
    };

    const handlePrev = () => {
        const prevIndex = (current - 1 + images.length) % images.length;
        setCurrent(prevIndex);
        setPreviewSrc(images[prevIndex].src);

        if (typeof preview === 'object' && preview.onChange) {
            preview.onChange(prevIndex, current);
        }
    };

    const handleNext = () => {
        const nextIndex = (current + 1) % images.length;
        setCurrent(nextIndex);
        setPreviewSrc(images[nextIndex].src);

        if (typeof preview === 'object' && preview.onChange) {
            preview.onChange(nextIndex, current);
        }
    };

    const contextValue = {
        registerImage,
        unregisterImage,
        showPreview,
        previewVisible,
        previewSrc,
        current,
        total: images.length,
        onClose: handleClose,
        onPrev: handlePrev,
        onNext: handleNext,
    };

    const renderCounter = () => {
        if (typeof preview === 'object' && preview.countRender) {
            return preview.countRender(current + 1, images.length);
        }
        return (
            <div className='text-white px-2 py-1 rounded bg-black bg-opacity-50'>
                {current + 1} / {images.length}
            </div>
        );
    };

    return (
        <PreviewGroupContext.Provider value={contextValue}>
            <div className={className}>{children}</div>

            {/* Using GlobalModal for the preview group */}
            <GlobalModal
                className='w-[1000px]'
                open={previewVisible}
                setOpen={handleClose}
                title='Image Gallery'
                subTitle={images[current]?.alt || ''}
                buttons={
                    <div className='flex justify-end gap-2 mt-4'>
                        <Button variant='outline' onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                }
            >
                <div className=' relative'>
                    <div className='flex justify-center'>
                        <Image
                            src={previewSrc || ''}
                            alt={images[current]?.alt || ''}
                            width={900}
                            height={700}
                            className='max-w-full max-h-[70vh] object-contain'
                            priority
                            style={{
                                objectFit: 'contain',
                                width: 'auto',
                                height: 'auto',
                            }}
                        />
                    </div>

                    {images.length > 1 && (
                        <>
                            <Button
                                variant='outline'
                                size='icon'
                                className='absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full'
                                onClick={handlePrev}
                            >
                                ←
                            </Button>
                            <Button
                                variant='outline'
                                size='icon'
                                className='absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full'
                                onClick={handleNext}
                            >
                                →
                            </Button>

                            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2'>
                                {renderCounter()}
                            </div>
                        </>
                    )}
                </div>
            </GlobalModal>
        </PreviewGroupContext.Provider>
    );
};

// For exporting
export { GlobalImage as Image };
