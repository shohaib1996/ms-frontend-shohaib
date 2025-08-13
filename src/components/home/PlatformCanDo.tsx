'use client';

import { useCallback, useState } from 'react';
import GlobalTitle from '../global/GlobalTitle';
import { Button } from '../ui/button';
import { ArrowUpRight, LineChartIcon as ChartLine, Play } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const PlatformCanDo = () => {
    const [videoOpen, setVideoOpen] = useState(false);

    const scrollToSection = useCallback((elementId: string) => {
        const element = document.getElementById(elementId);
        if (element) {
            // Prevent abrupt jumps by using smooth scrolling
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, []);

    return (
        <div className='flex flex-col gap-5 items-center justify-center my-container bg-foreground rounded-xl p-6 pb-10'>
            <Button
                variant={'primary_light'}
                className='h-[26px] font-sm rounded-full border-none'
                icon={<ChartLine size={14} />}
                size={'sm'}
            >
                Platform Tour
            </Button>

            <GlobalTitle
                title='See What Our Platform Can Do'
                subTitle='Experience how SkillBNK transforms coaching businesses'
            />

            <div className="content bg-[url('/platform_bg.png')] flex flex-col md:flex-row items-center w-full rounded-lg shadow-lg overflow-hidden">
                {/* Image section (left side) */}
                <div className='w-full md:w-1/2 relative px-3 h-full bg-cover bg-center'>
                    <Image
                        src='/platform_img.png'
                        alt='Platform dashboard'
                        width={500}
                        height={400}
                        className='w-full object-contain rounded-lg shadow-md'
                    />
                </div>

                {/* Video section (right side) */}
                <div className='w-full md:w-1/2 relative'>
                    <div
                        className='relative cursor-pointer'
                        onClick={() => setVideoOpen(true)}
                    >
                        <Image
                            src='/hero-thumbnail.jpg'
                            alt='Video thumbnail'
                            width={500}
                            height={400}
                            className='w-full h-full max-h-[480px] object-cover'
                        />
                        <div className='absolute inset-0 flex items-center justify-center '>
                            <Button className='rounded-full bg-pure-white/60 p-2 h-[65px] w-[65px]'>
                                <div className='rounded-full bg-white p-3 shadow-lg'>
                                    <Play className='h-6 w-6 text-blue-600' />
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                onClick={() => scrollToSection('faq')}
                className='rounded-full'
            >
                Explore All Features
                <ArrowUpRight className='ml-2' />
            </Button>

            {/* Video Dialog/Modal */}
            <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                <DialogContent className='max-w-6xl p-0'>
                    <div className='relative pt-[56.25%] w-full'>
                        {videoOpen && (
                            <iframe
                                className='absolute top-0 left-0 w-full h-full'
                                src='https://player.vimeo.com/video/1077328497?h=960b739b0d&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1'
                                title='Platform Tour Video'
                                frameBorder='0'
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PlatformCanDo;
