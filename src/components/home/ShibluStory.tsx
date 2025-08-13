'use client';

import { useState, useRef, useCallback } from 'react';
import GlobalTitle from '../global/GlobalTitle';
import { Button } from '../ui/button';
import { ArrowUpRight, Volume2, VolumeX, Play } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

function ShibluStory() {
    const [isMuted, setIsMuted] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleVideoClick = () => {
        setVideoOpen(true);
    };

    const handleDialogClose = () => {
        setVideoOpen(false);
        // Reset the video in the thumbnail when dialog closes
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
        }
    };

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
        <div className='my-container'>
            <GlobalTitle
                title='The Shiblu Story'
                subTitle='From Frustrated Coach to Platform Creator'
            />
            <div className='content-section flex flex-col justify-center items-center md:flex-row gap-9 mt-5 mx-5'>
                <div
                    className='video-section w-full md:w-1/2 max-h-[355px] rounded-lg shadow-lg relative overflow-hidden bg-foreground cursor-pointer'
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={handleVideoClick}
                >
                    <video
                        ref={videoRef}
                        className='w-full h-full object-contain rounded-lg'
                        src='/shiblu_video.mp4'
                        poster='/shiblu_ahmed_story.png'
                        muted={isMuted}
                        autoPlay
                        loop
                        playsInline
                    />

                    {/* Play button overlay */}
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='rounded-full bg-white/80 p-4 shadow-lg'>
                            <Play className='h-8 w-8 text-blue-600 fill-blue-600' />
                        </div>
                    </div>

                    {/* Video overlay at bottom - only visible on hover */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 px-4 py-3 flex justify-between items-center bg-pure-black/50 backdrop-blur-sm transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
                    >
                        {/* Title and user info */}
                        <div className='flex items-center gap-3'>
                            <div className='text-pure-white'>
                                <h3 className='font-bold text-lg'>
                                    Why I Created SkillBNK
                                </h3>
                                <p className='text-sm'>Shiblu, Founder & CEO</p>
                            </div>
                        </div>

                        {/* Mute button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent video dialog from opening
                                toggleMute();
                            }}
                            className='bg-pure-black/20 backdrop-blur-sm p-2 rounded-full hover:bg-pure-black/30 transition-colors'
                            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                        >
                            {isMuted ? (
                                <VolumeX className='text-white' size={20} />
                            ) : (
                                <Volume2 className='text-white' size={20} />
                            )}
                        </button>
                    </div>
                </div>

                <div className='text-section w-full md:w-[40%] flex flex-col gap-4 items-start'>
                    <div className='flex flex-col'>
                        <p className='text-gray text-md w-full'>
                            {`In 2019, I quit my job because I had a deep passion for helping others grow. My mission was to empower professionals, particularly immigrants and degree-holders stuck in career stagnation, to break into six-figure tech roles.`}
                        </p>
                        <p className='text-gray text-md w-full mt-4'>
                            {`When the pandemic hit in 2020, I launched my coaching journey—but quickly discovered there was no dedicated platform for high-ticket coaching. I was forced to cobble together multiple tools, creating a disjointed experience for my students and administrative headaches for myself.
                            That's when I decided to build SkillBNK—the platform I wish existed when I started coaching.`}
                        </p>
                    </div>
                    <Button
                        onClick={() => scrollToSection('faq')}
                        className='rounded-full mt-2 flex items-center gap-2'
                    >
                        Discover Our Journey <ArrowUpRight size={16} />
                    </Button>
                </div>
            </div>

            {/* Video Dialog */}
            <Dialog open={videoOpen} onOpenChange={handleDialogClose}>
                <DialogContent className='max-w-6xl p-0'>
                    <div className='relative pt-[56.25%] w-full bg-black'>
                        {videoOpen && (
                            <video
                                className='absolute top-0 left-0 w-full h-full'
                                src='/shiblu_video.mp4'
                                controls
                                autoPlay
                                playsInline
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ShibluStory;
