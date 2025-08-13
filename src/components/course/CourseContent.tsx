'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import {
    ChevronDown,
    ChevronRight,
    Lock,
    Play,
    FileText,
    ExternalLink,
    Presentation,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import instance from '@/lib/axios';

// Helper functions
function formatCompactDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const result = [];

    if (hours > 0) {
        result.push(hours + 'h');
    }

    if (minutes > 0 || (hours > 0 && seconds % 3600 === 0)) {
        result.push(minutes + 'm');
    }

    if (remainingSeconds > 0 && hours === 0 && minutes === 0) {
        result.push(remainingSeconds + 's');
    }

    if (seconds === 0) {
        return '0s';
    }

    return result.join(' ');
}

function secondsToHours(seconds: number): number | string {
    const hours = seconds / 3600;
    if (hours >= 1) {
        return Math.floor(hours);
    } else {
        return hours.toFixed(2);
    }
}

// Types
interface Lesson {
    title: string;
    url: string;
    duration: number;
    type: 'video' | 'file' | 'link' | 'slide';
    data?: {
        summary?: string;
        interview?: string;
        behavioral?: string;
        implementation?: string;
    };
}

interface MyCourse {
    parent: string | null;
}

interface ChapterNode {
    _id: string;
    title: string;
    key: string;
    isLeaf: boolean;
    type: 'chapter' | 'lesson';
    isPreview: boolean;
    myCourse: MyCourse;
    lesson?: Lesson;
    chapter?: {
        name: string;
    };
    children: ChapterNode[];
    firstParent?: boolean;
}

interface Category {
    _id: string;
    name: string;
}

interface Program {
    _id: string;
    [key: string]: any;
}

interface TranscriptionTab {
    title: string;
    content: string;
}

interface RenderTranscriptionProps {
    data?: Lesson['data'];
}

const RenderTranscription: React.FC<RenderTranscriptionProps> = ({ data }) => {
    const [tabs, setTabs] = useState<TranscriptionTab[]>([]);

    useEffect(() => {
        setTabs([]);
        if (data?.summary) {
            setTabs((prev) => [
                ...prev,
                { title: 'summary', content: data?.summary || '' },
            ]);
        }
        if (data?.interview) {
            setTabs((prev) => [
                ...prev,
                { title: 'interview', content: data?.interview || '' },
            ]);
        }
        if (data?.behavioral) {
            setTabs((prev) => [
                ...prev,
                { title: 'behavioral', content: data?.behavioral || '' },
            ]);
        }
        if (data?.implementation) {
            setTabs((prev) => [
                ...prev,
                {
                    title: 'implementation',
                    content: data?.implementation || '',
                },
            ]);
        }
    }, [data]);

    if (tabs.length === 0) {
        return null;
    }

    return (
        <Tabs defaultValue={tabs[0]?.title}>
            <TabsList className='grid w-full grid-cols-2 md:grid-cols-4'>
                {tabs.map((tab) => (
                    <TabsTrigger
                        className='text-dark-gray'
                        key={tab.title}
                        value={tab.title}
                    >
                        {tab.title === 'summary'
                            ? 'Summary'
                            : tab.title === 'interview'
                              ? 'Interview Q&As'
                              : tab.title === 'behavioral'
                                ? 'Behavioral Q&As'
                                : 'Technical Implementation'}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent
                    key={tab.title}
                    value={tab.title}
                    className='mt-4 whitespace-pre-wrap p-4'
                >
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    );
};

interface TreeNodeProps {
    nodeData: ChapterNode;
    setSelectedPreview: (node: ChapterNode | null) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
    nodeData,
    setSelectedPreview,
}) => {
    const [expanded, setExpanded] = useState(false);

    const lessons =
        nodeData?.children?.filter((child) => child.type === 'lesson') || [];
    const chapters =
        nodeData?.children?.filter((child) => child.type === 'chapter') || [];
    const totalDuration = lessons?.reduce(
        (acc, lesson) => acc + (lesson?.lesson?.duration || 0),
        0,
    );

    const toggleExpand = () => {
        if (nodeData.children.length > 0) {
            setExpanded(!expanded);
        }
    };

    const handlePreviewClick = (e: React.MouseEvent, node: ChapterNode) => {
        e.stopPropagation();
        setSelectedPreview(node);
    };

    return (
        <div className={cn('mb-2', nodeData.firstParent ? 'mt-4' : '')}>
            <div
                className={cn(
                    'flex items-center p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors',
                    nodeData.type === 'chapter'
                        ? 'bg-slate-100 dark:bg-slate-800/50'
                        : 'bg-white dark:bg-slate-900',
                )}
                onClick={toggleExpand}
            >
                {nodeData.children.length > 0 && (
                    <div className='mr-2 text-slate-500'>
                        {expanded ? (
                            <ChevronDown className='h-4 w-4' />
                        ) : (
                            <ChevronRight className='h-4 w-4' />
                        )}
                    </div>
                )}

                {nodeData.type === 'lesson' ? (
                    <div className='mr-3 text-primary'>
                        {!nodeData.isPreview ? (
                            <Lock className='h-4 w-4' />
                        ) : nodeData?.lesson?.type === 'file' ? (
                            <FileText className='h-4 w-4' />
                        ) : nodeData?.lesson?.type === 'link' ? (
                            <ExternalLink className='h-4 w-4' />
                        ) : nodeData?.lesson?.type === 'slide' ? (
                            <Presentation className='h-4 w-4' />
                        ) : (
                            <Play
                                className='h-4 w-4 cursor-pointer'
                                onClick={(e) =>
                                    nodeData.isPreview &&
                                    handlePreviewClick(e, nodeData)
                                }
                            />
                        )}
                    </div>
                ) : (
                    !nodeData.isPreview && (
                        <div className='mr-3 text-slate-400'>
                            <Lock className='h-4 w-4' />
                        </div>
                    )
                )}

                <span className='flex-1 font-medium text-slate-700 dark:text-slate-200'>
                    {nodeData.title}
                </span>

                <div className='flex items-center gap-2 text-sm'>
                    {nodeData?.type === 'lesson' && nodeData.isPreview && (
                        <span
                            onClick={(e) => handlePreviewClick(e, nodeData)}
                            className='text-primary font-medium cursor-pointer hover:underline'
                        >
                            Preview
                        </span>
                    )}

                    {nodeData.type === 'chapter' && chapters?.length > 0 && (
                        <span className='text-slate-500 dark:text-slate-400'>
                            {chapters.length} chapters
                        </span>
                    )}

                    {nodeData.type === 'chapter' && lessons.length > 0 && (
                        <span className='text-slate-500 dark:text-slate-400'>
                            {lessons.length} lessons
                        </span>
                    )}

                    {totalDuration > 0 && (
                        <span className='text-slate-500 dark:text-slate-400'>
                            {formatCompactDuration(totalDuration)}
                        </span>
                    )}
                </div>
            </div>

            {expanded && nodeData.children.length > 0 && (
                <div className='pl-6 border-l border-slate-200 dark:border-slate-700 ml-4 mt-1'>
                    {nodeData.children.map((child) => (
                        <TreeNode
                            key={child._id}
                            nodeData={child}
                            setSelectedPreview={setSelectedPreview}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

interface CourseContentProps {
    program: Program;
}

const CourseContent: React.FC<CourseContentProps> = ({ program }) => {
    const [selectedPreview, setSelectedPreview] = useState<ChapterNode | null>(
        null,
    );
    const [chapters, setChapters] = useState<Record<string, ChapterNode[]>>({});
    const [seeMore, setSeeMore] = useState<number>(6);
    const [loading, setLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [totalDuration, setTotalDuration] = useState<number | undefined>(
        undefined,
    );
    const [totalChapter, setTotalChapter] = useState<number | undefined>(
        undefined,
    );
    const [totalLesson, setTotalLesson] = useState<number | undefined>(
        undefined,
    );
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );

    function buildTreeView(chapters: ChapterNode[]): ChapterNode[] {
        const nodes: Record<string, ChapterNode> = {};

        chapters.forEach((item) => {
            nodes[item._id] = { ...item, children: [], firstParent: false };
        });

        const tree: ChapterNode[] = [];

        chapters.forEach((item) => {
            if (item.myCourse.parent) {
                if (nodes[item.myCourse.parent]) {
                    nodes[item.myCourse.parent].children.push(nodes[item._id]);
                }
            } else {
                tree.push(nodes[item._id]);
                nodes[item._id].firstParent = true;
            }
        });

        return tree;
    }

    useEffect(() => {
        if (program) {
            const data: {
                courseId: string;
                fields: string[];
                categoryId?: string;
            } = {
                courseId: program._id,
                fields: ['chapters'],
            };

            if (!selectedCategory) {
                data.fields = [...data.fields, 'categories'];
            }

            if (totalDuration === undefined) {
                data.fields = [...data.fields, 'totalDuration'];
            }

            if (totalChapter === undefined) {
                data.fields = [...data.fields, 'totalChapter'];
            }

            if (totalLesson === undefined) {
                data.fields = [...data.fields, 'totalLesson'];
            }

            if (selectedCategory) {
                if (chapters[selectedCategory]) {
                    return;
                }
                data.categoryId = selectedCategory;
            }

            setLoading(true);

            instance
                .post('/course/chapterv2/preview', data)
                .then((res) => {
                    const results = res.data?.results;
                    if (results.categories) {
                        setCategories(results.categories);
                    }

                    if (results.totalDuration) {
                        setTotalDuration(results.totalDuration);
                    }

                    if (results.totalChapter) {
                        setTotalChapter(results.totalChapter);
                    }

                    if (results.totalLesson) {
                        setTotalLesson(results.totalLesson);
                    }

                    if (results.chapters) {
                        const processedChapters =
                            results.chapters?.chapters.map((chapter: any) => ({
                                title:
                                    chapter?.lesson?.title ||
                                    chapter?.chapter?.name,
                                key: chapter._id,
                                isLeaf:
                                    chapter.type === 'chapter'
                                        ? !chapter?.isPreview
                                        : chapter.type !== 'chapter',
                                ...chapter,
                            }));

                        setChapters((prev) => ({
                            ...prev,
                            [results.chapters?.selectedCategory]:
                                buildTreeView(processedChapters),
                        }));

                        if (!selectedCategory) {
                            setSelectedCategory(
                                results.chapters?.selectedCategory,
                            );
                        }
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    console.error(err);
                });
        }
    }, [program, selectedCategory]);

    const handleSeeMore = () => {
        setSeeMore(seeMore + 6);
    };

    const handleSeeLess = () => {
        setSeeMore(6);
    };

    return (
        <section className='xl:py-6 py-6 bg-gradient-to-b from-slate-50 dark:from-slate-900 dark:to-slate-950 to-white'>
            <div className='my-container'>
                <div className='text-center mb-3'>
                    <h2 className='text-3xl md:text-4xl font-bold text-black dark:text-white mb-3'>
                        Course Content
                    </h2>
                    <div className='w-20 h-1 bg-primary mx-auto rounded-full mb-3'></div>
                    {totalChapter !== undefined &&
                        totalLesson !== undefined &&
                        totalDuration !== undefined && (
                            <p className='text-dark-gray'>
                                {totalChapter} chapters • {totalLesson} lectures
                                • {secondsToHours(totalDuration)}h total length
                            </p>
                        )}
                </div>

                <div className='mt-3'>
                    {categories.length > 0 && (
                        <div className='flex flex-wrap gap-2 justify-center mb-3'>
                            {categories.map((category: any) => (
                                <Button
                                    key={category._id}
                                    variant={
                                        selectedCategory === category._id
                                            ? 'default'
                                            : 'secondary'
                                    }
                                    onClick={() =>
                                        setSelectedCategory(category._id)
                                    }
                                    className={cn(
                                        'min-w-[100px] bg-background',
                                        {
                                            'bg-primary':
                                                selectedCategory ===
                                                category._id,
                                        },
                                    )}
                                >
                                    {category.name}
                                </Button>
                            ))}
                        </div>
                    )}

                    <div className='mt-3 bg-white dark:bg-slate-900 rounded-xl border border-forground-border shadow-sm px-2 py-2 md:px-4'>
                        {loading ? (
                            <div className='space-y-4'>
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className='flex items-center gap-4'
                                    >
                                        <Skeleton className='h-4 bg-background w-4 rounded-full' />
                                        <Skeleton className='h-6 bg-background flex-1' />
                                        <Skeleton className='h-6 bg-background w-20' />
                                    </div>
                                ))}
                            </div>
                        ) : chapters[selectedCategory || '']?.length === 0 ? (
                            <div className='text-center py-6'>
                                <div className='mb-4'>
                                    <Image
                                        src='/placeholder.svg?height=120&width=120'
                                        alt='No content'
                                        width={120}
                                        height={120}
                                        className='mx-auto opacity-50'
                                    />
                                </div>
                                <h3 className='text-lg font-medium text-slate-700 dark:text-slate-300'>
                                    No chapters found
                                </h3>
                                <p className='text-slate-500 dark:text-slate-400 mt-2'>
                                    There are no chapters available in this
                                    category.
                                </p>
                            </div>
                        ) : (
                            <>
                                {chapters[selectedCategory || '']?.length > 0 &&
                                    chapters[selectedCategory || '']
                                        ?.slice(0, seeMore)
                                        .map((node) => (
                                            <TreeNode
                                                key={node?._id}
                                                setSelectedPreview={
                                                    setSelectedPreview
                                                }
                                                nodeData={node}
                                            />
                                        ))}
                            </>
                        )}
                    </div>

                    {chapters[selectedCategory || '']?.length > 6 && (
                        <div className='flex justify-center mt-3'>
                            <Button
                                onClick={
                                    seeMore <
                                    chapters[selectedCategory || '']?.length
                                        ? handleSeeMore
                                        : handleSeeLess
                                }
                                variant='outline'
                                className='min-w-[120px] text-dark-gray'
                            >
                                {seeMore <
                                chapters[selectedCategory || '']?.length
                                    ? 'See More'
                                    : 'See Less'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <Dialog
                open={!!selectedPreview}
                onOpenChange={() => setSelectedPreview(null)}
            >
                <DialogContent className='max-w-4xl'>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedPreview?.lesson?.title}
                        </DialogTitle>
                    </DialogHeader>
                    <div className='aspect-video w-full overflow-hidden rounded-md bg-slate-950'>
                        <iframe
                            className='w-full h-full'
                            src={selectedPreview?.lesson?.url}
                            allowFullScreen
                            title={selectedPreview?.lesson?.title}
                        ></iframe>
                    </div>
                    <div className='mt-4'>
                        <RenderTranscription
                            data={selectedPreview?.lesson?.data}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default CourseContent;
