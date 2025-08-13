'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';
import NotFoundSection from './NotFoundSection';

interface Instructor {
    id: string;
    name: string;
    role: string;
    about: string;
    image?: string;
    expertise?: string[];
}

const staticInstructors: Instructor[] = [
    {
        id: '1',
        name: 'Dr. Sarah Johnson',
        role: 'Senior Data Scientist',
        about: 'With over 10 years of experience in machine learning and AI, Dr. Johnson has led data science teams at Fortune 500 companies and published numerous research papers in top-tier journals.',
        image: '/avatar.png',
        expertise: [
            'Machine Learning',
            'Python',
            'Deep Learning',
            'Statistics',
            'AI Research',
        ],
    },
    {
        id: '2',
        name: 'Michael Chen',
        role: 'Full Stack Developer',
        about: 'Michael is a seasoned full-stack developer with expertise in modern web technologies. He has built scalable applications for startups and enterprise clients across various industries.',
        image: '/avatar.png',
        expertise: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
    },
    {
        id: '3',
        name: 'Emily Rodriguez',
        role: 'UX/UI Design Lead',
        about: 'Emily brings 8 years of design experience from leading tech companies. She specializes in user-centered design and has helped launch products used by millions of users worldwide.',
        image: '/avatar.png',
        expertise: [
            'User Research',
            'Figma',
            'Design Systems',
            'Prototyping',
            'Accessibility',
        ],
    },
    {
        id: '4',
        name: 'David Kim',
        role: 'DevOps Engineer',
        about: 'David is an expert in cloud infrastructure and automation. He has helped companies scale their operations and improve deployment efficiency through modern DevOps practices.',
        image: '/avatar.png',
        expertise: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Monitoring'],
    },
    {
        id: '5',
        name: 'Lisa Thompson',
        role: 'Product Manager',
        about: 'Lisa has over 12 years of product management experience, leading cross-functional teams to deliver innovative solutions that drive business growth and user satisfaction.',
        image: '/avatar.png',
        expertise: [
            'Product Strategy',
            'Agile',
            'Analytics',
            'User Stories',
            'Roadmapping',
        ],
    },
    {
        id: '6',
        name: 'James Wilson',
        role: 'Cybersecurity Specialist',
        about: 'James is a certified cybersecurity expert with extensive experience in threat analysis and security architecture. He has protected organizations from sophisticated cyber attacks.',
        image: '/avatar.png',
        expertise: [
            'Penetration Testing',
            'Security Audits',
            'Risk Assessment',
            'Compliance',
            'Incident Response',
        ],
    },
];

interface InstructorsSectionProps {
    instructorsData?: Instructor[];
}

export function InstructorsSection({
    instructorsData,
}: InstructorsSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(4);
    const [cardWidth, setCardWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateLayout = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                let cards = 4;

                if (window.innerWidth < 768) {
                    cards = 1;
                } else if (window.innerWidth < 1024) {
                    cards = 2;
                } else {
                    cards = 4;
                }

                setCardsPerView(cards);
                setCardWidth(containerWidth / cards);
            }
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    const displayInstructors =
        instructorsData && instructorsData.length > 0 ? instructorsData : [];
    const maxIndex = Math.max(0, displayInstructors.length - cardsPerView);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(Math.min(Math.max(index, 0), maxIndex));
    };

    const truncateText = (text: string, maxLength = 120) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength).trim() + '...';
    };

    return (
        <section className='py-3 bg-violet-50/85 dark:bg-indigo-900/60 relative overflow-hidden'>
            <div className='my-container relative z-40 mx-auto px-4'>
                <h2 className='text-3xl font-bold mb-6 text-black dark:text-white text-center'>
                    Our Expert Instructors
                </h2>

                {displayInstructors && displayInstructors.length > 0 ? (
                    <div className='relative'>
                        <div
                            ref={containerRef}
                            className='overflow-hidden rounded-lg'
                        >
                            <motion.div
                                className='flex'
                                animate={{
                                    x: -currentIndex * cardWidth,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 30,
                                }}
                                drag='x'
                                dragConstraints={{
                                    left: -maxIndex * cardWidth,
                                    right: 0,
                                }}
                                dragElastic={0.1}
                                onDragEnd={(e, { offset }) => {
                                    const threshold = cardWidth / 4;
                                    if (
                                        offset.x > threshold &&
                                        currentIndex > 0
                                    ) {
                                        prevSlide();
                                    } else if (
                                        offset.x < -threshold &&
                                        currentIndex < maxIndex
                                    ) {
                                        nextSlide();
                                    }
                                }}
                            >
                                {displayInstructors?.map(
                                    (instructor, index) => (
                                        <motion.div
                                            key={instructor.id}
                                            className='flex-shrink-0 px-3'
                                            style={{ width: cardWidth }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Card className='h-full min-h-[500px] flex flex-col overflow-hidden border border-violet-400/35 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]'>
                                                <div className='relative pt-[100%] bg-slate-100 dark:bg-slate-900'>
                                                    <Image
                                                        src={
                                                            instructor?.image ||
                                                            '/avatar.png'
                                                        }
                                                        alt={
                                                            instructor?.name ||
                                                            'Instructor'
                                                        }
                                                        fill
                                                        className='object-cover object-center'
                                                    />
                                                </div>
                                                <CardHeader className='pb-3'>
                                                    <CardTitle className='text-lg font-semibold'>
                                                        {instructor?.name}
                                                    </CardTitle>
                                                    <CardDescription className='font-medium text-violet-600 dark:text-violet-400'>
                                                        {instructor?.role}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className='flex-grow pt-0'>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <p className='text-sm text-muted-foreground line-clamp-3 mb-4 leading-[1.2] cursor-help'>
                                                                    {
                                                                        instructor?.about
                                                                    }
                                                                </p>
                                                            </TooltipTrigger>
                                                            <TooltipContent className='max-w-xs'>
                                                                <p className='text-pure-white'>
                                                                    {
                                                                        instructor?.about
                                                                    }
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                    <div>
                                                        {instructor?.expertise &&
                                                            instructor.expertise
                                                                .length > 0 && (
                                                                <h4 className='text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200'>
                                                                    Expertise:
                                                                </h4>
                                                            )}
                                                        <div className='flex flex-wrap gap-1.5'>
                                                            {instructor?.expertise
                                                                ?.slice(0, 3)
                                                                .map(
                                                                    (
                                                                        skill,
                                                                        skillIndex,
                                                                    ) => (
                                                                        <Badge
                                                                            key={
                                                                                skillIndex
                                                                            }
                                                                            variant='outline'
                                                                            className='text-xs bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700'
                                                                        >
                                                                            {
                                                                                skill
                                                                            }
                                                                        </Badge>
                                                                    ),
                                                                )}
                                                            {instructor?.expertise &&
                                                                instructor
                                                                    .expertise
                                                                    .length >
                                                                    3 && (
                                                                    <Badge
                                                                        variant='outline'
                                                                        className='text-xs bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400'
                                                                    >
                                                                        +
                                                                        {instructor
                                                                            .expertise
                                                                            .length -
                                                                            3}
                                                                    </Badge>
                                                                )}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ),
                                )}
                            </motion.div>
                        </div>

                        {/* Navigation Buttons */}
                        {displayInstructors.length > cardsPerView && (
                            <>
                                <Button
                                    variant='outline'
                                    size='icon'
                                    className='absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/95 hover:bg-white border-violet-200 hover:border-violet-300 shadow-lg transition-all duration-200'
                                    onClick={prevSlide}
                                >
                                    <ChevronLeft className='h-4 w-4 text-violet-600' />
                                </Button>
                                <Button
                                    variant='outline'
                                    size='icon'
                                    className='absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/95 hover:bg-white border-violet-200 hover:border-violet-300 shadow-lg transition-all duration-200'
                                    onClick={nextSlide}
                                >
                                    <ChevronRight className='h-4 w-4 text-violet-600' />
                                </Button>
                            </>
                        )}
                    </div>
                ) : (
                    <NotFoundSection itemText='No instructor found' />
                )}
                {/* Dots Indicator */}
                {displayInstructors.length > cardsPerView && (
                    <div className='flex justify-center mt-8 space-x-2'>
                        {Array.from({ length: maxIndex + 1 }).map(
                            (_, index) => (
                                <button
                                    key={index}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        index === currentIndex
                                            ? 'bg-violet-600 w-8'
                                            : 'bg-violet-300 hover:bg-violet-400 w-2'
                                    }`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ),
                        )}
                    </div>
                )}
            </div>

            <div className='absolute z-10 -top-[50px] blur-3xl h-[1000px] md:w-[800px] w-[500px] -left-[100px] bg-gradient-to-br rounded-full from-purple-400/30 to-transparent'></div>
        </section>
    );
}
