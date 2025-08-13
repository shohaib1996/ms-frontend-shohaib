import React from 'react';
import GlobalTitle from '../global/GlobalTitle';
import GlobalTooltip from '../global/GlobalTooltip';
import { Button } from '../ui/button';
import { ArrowUpRight, Play, Sparkles, Volume, Volume1 } from 'lucide-react';
import Image from 'next/image';
import { Rating } from '@smastrom/react-rating';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

const reviews = [
    {
        id: 1,
        name: 'Maria K.',
        title: 'Software Engineering Coach',
        review: `"After switching to SkillBNK, I increased my student retention by 47% and doubled my coaching income within 90 days. switching to SkillBNK, I increased my student retention by 47%`,
        image: '/home/reviewUser.png',
        rating: 4.5,
    },
    {
        id: 2,
        name: 'Alex R.',
        title: 'Business development coach',
        review: `"After switching to SkillBNK, I increased my student retention by 47% and doubled my coaching income within 90 days. switching to SkillBNK, I increased my student retention by 47%`,
        image: '/home/reviewUser.png',
        rating: 5,
    },
    {
        id: 3,
        name: 'David T.',
        title: 'Software Engineering Coac',
        review: `"After switching to SkillBNK, I increased my student retention by 47% and doubled my coaching income within 90 days. switching to SkillBNK, I increased my student retention by 47%`,
        image: '/home/reviewUser.png',
        rating: 4.8,
    },
];

const IntroductionBootcampsHub = () => {
    return (
        <div className='py-10 bg-violet-50/85 dark:bg-indigo-900/60 w-full relative overflow-hidden'>
            <div className='my-container flex flex-col items-center gap-5'>
                <GlobalTooltip tooltip='Revolutionary Platform'>
                    <Button
                        variant={'primary_light'}
                        className='rounded-full w-fit'
                        icon={<Sparkles size={18} />}
                    >
                        Revolutionary Platform
                    </Button>
                </GlobalTooltip>
                <GlobalTitle
                    title='Introducing SkillBNK'
                    subTitle='The Only Platform Built for Serious High-Ticket Coaches'
                />
                <p className='text-center max-w-[850px] text-dark-gray text-xl'>
                    SkillBNK is a comprehensive SaaS platform designed
                    specifically for passionate professionals who want to
                    transform their expertise into a structured, scalable
                    coaching business—without quitting their day job.
                </p>

                <Button
                    icon={<Play size={18} />}
                    className='rounded-full h-11'
                    size={'lg'}
                >
                    Watch Demo Video
                </Button>

                <div className='rounded-lg w-full px-5 py-7 bg-foreground flex flex-col items-center z-30'>
                    <Button
                        variant={'primary_light'}
                        className='rounded-full w-fit md:mb-3 mb-1'
                    >
                        Success Story
                    </Button>
                    <div className='title lg:text-4xl md:text-2xl text-lg text-black font-bold'>
                        Real Results from Real Coaches
                    </div>
                    <div className='grid lg:grid-cols-3 lg:gap-4 gap-2 md:grid-cols-2 grid-cols-1 mt-4'>
                        {reviews?.map((review) => (
                            <div
                                className='bg-primary-light space-y-3 max-w-[360px] p-3 rounded-md border border-indigo-600/35'
                                key={review.id}
                            >
                                <div className='h-[236px] w-[336px] rounded-md relative overflow-hidden'>
                                    <Image
                                        src={review.image}
                                        width={336}
                                        height={236}
                                        alt='review user image'
                                    />
                                    <div className='absolute justify-between bg-slate-950/15 inset-0 h-full w-full flex items-end p-3'>
                                        <div>
                                            <h3 className='text-xl font-semibold text-pure-white'>
                                                {review.name}
                                            </h3>
                                            <p className='text-gray text-sm'>
                                                {review.title}
                                            </p>
                                        </div>
                                        <Button
                                            className='rounded-full'
                                            variant={'secondary'}
                                            size={'icon'}
                                        >
                                            <Volume1 size={18} />
                                        </Button>
                                    </div>

                                    <Dialog>
                                        <DialogTrigger>
                                            <div className='bg-white/20 cursor-pointer absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm rounded-full p-3'>
                                                <div className='bg-white rounded-full size-11 flex justify-center items-center'>
                                                    <Play className='text-primary' />
                                                </div>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className='max-w-4xl p-0'>
                                            <div className='relative pt-[56.25%] w-full'>
                                                <iframe
                                                    className='absolute top-0 left-0 w-full h-full'
                                                    src='https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
                                                    title='Platform Tour Video'
                                                    frameBorder='0'
                                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <Rating
                                    radius='large'
                                    readOnly
                                    style={{ maxWidth: 120 }}
                                    value={review.rating}
                                />
                                <p className='line-clamp-3 italic text-base text-gray'>
                                    {review.review}
                                </p>
                            </div>
                        ))}
                    </div>
                    <Button className='rounded-full w-fit mt-5' size={'lg'}>
                        Watch More Success Stories
                        <ArrowUpRight size={18} />
                    </Button>
                </div>
            </div>

            <div className='absolute z-10 -top-[50px] blur-3xl h-[1000px] md:w-[800px] w-[500px] -left-[100px] bg-gradient-to-br rounded-full from-purple-400/30 to-transparent'></div>
        </div>
    );
};

export default IntroductionBootcampsHub;
