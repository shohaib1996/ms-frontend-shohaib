'use client';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Clock,
    FileQuestion,
    Loader2,
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    Mic,
    MicOff,
    Upload,
    MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import instance from '@/lib/axios';

export default function BootcampEnrollmentTestComp({ slug }: { slug: string }) {
    const { user, isAuthenticated } = useSelector((state: any) => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [questions, setQuestions] = useState<any[]>([]);
    const [program, setProgram] = useState<any>(null);
    const [current, setCurrent] = useState(0);
    const [date, setDate] = useState<number | null>(null);
    const [isTimeout, setIsTimeout] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [testParticipate, setTestParticipate] = useState(false);
    const [testTime, setTestTime] = useState(0);

    // Audio-related states
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [isAudioRecording, setIsAudioRecording] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [uploadProgress, setUploadProgress] = useState({
        isActive: false,
        totalSize: 0,
        uploadedSize: 0,
    });

    useEffect(() => {
        setIsLoading(true);
        instance
            .get(`/enrollment/enrollment-test/getquestions/${slug}`)
            .then((res) => {
                if (res.data?.result) {
                    setResult(res.data.result);
                } else {
                    setQuestions(
                        res.data.questions?.map((x: any) => ({
                            ...x,
                            answered: [],
                            options: x.options,
                        })) || [],
                    );
                    setDate(Date.now() + res.data?.totalTestTime * 60 * 1000);
                    setTestTime(res.data?.totalTestTime);
                }
                if (res.data?.program) {
                    setProgram(res.data.program);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                toast.error(
                    err?.response?.data?.error || 'Failed to load test data',
                );
            });
    }, [isAuthenticated, slug]);

    const handleNext = () => setCurrent((prev) => prev + 1);
    const handlePrev = () => setCurrent((prev) => prev - 1);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/enrollment/enrollment-test/submit-answer/${program?._id}`,
                { answers: questions },
            );
            setResult(res.data.result);
            setTestParticipate(true);
            toast.success(
                'Congratulations! You have submitted the test successfully',
            );
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Submission failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAnswer = (
        option: string,
        index: number,
        questionType?: string,
        answerType?: string,
    ) => {
        const arr = [...questions];
        let answered = arr[index]?.answered || [];
        answered = answered.includes(option)
            ? answered.filter((x: string) => x !== option)
            : [...answered, option];
        arr[index] = {
            ...arr[index],
            answered,
            questionType: questionType || 'text',
            answerType: answerType || 'mcq',
        };
        setQuestions(arr);
    };

    const startAudio = () => {
        setAudioBlob(null);
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                setStream(stream);
                const recorder = new MediaRecorder(stream, {
                    mimeType: 'audio/webm',
                });
                const chunks: Blob[] = [];
                recorder.ondataavailable = (e) => {
                    chunks.push(e.data);
                    if (recorder.state === 'inactive') {
                        setAudioBlob(new Blob(chunks, { type: 'audio/webm' }));
                        setIsAudioRecording(false);
                    }
                };
                setRecorder(recorder);
                setIsAudioRecording(true);
                recorder.start();
            })
            .catch(() => toast.error('Audio recording not supported'));
    };

    const stopAudio = () => {
        recorder?.stop();
        setStream(null);
    };

    const handleUploadAudio = async (
        questionType: string,
        answerType: string,
    ) => {
        if (!audioBlob) {
            return;
        }
        setIsUploading(true);
        const file = new File([audioBlob], 'interview.webm', {
            type: audioBlob.type,
        });
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await instance.post(
                `/settings/video-audio-upload`,
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        setUploadProgress({
                            isActive: true,
                            uploadedSize: progressEvent.loaded,
                            totalSize: progressEvent.total || 0,
                        });
                    },
                },
            );
            handleAnswer(res.data.url, current, questionType, answerType);
            setAudioBlob(null);
            setUploadProgress({
                isActive: false,
                uploadedSize: 0,
                totalSize: 0,
            });
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const msToTime = (duration: number) => {
        const seconds = Math.floor((duration / 1000) % 60);
        const minutes = Math.floor((duration / (1000 * 60)) % 60);
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const getPercent = (total: number) =>
        100 - Math.floor((total / (testTime * 60 * 1000)) * 100);

    const CountTimer = React.memo(({ date }: { date: number }) => {
        const [timeLeft, setTimeLeft] = useState(date - Date.now());
        useEffect(() => {
            const interval = setInterval(() => {
                const remaining = date - Date.now();
                setTimeLeft(remaining);
                if (remaining <= 0) {
                    setIsTimeout(true);
                    clearInterval(interval);
                }
            }, 1000);
            return () => clearInterval(interval);
        }, [date]);
        return (
            <div className='flex items-center gap-2'>
                <Clock className='h-4 w-4' />
                {msToTime(timeLeft)}
                <Progress
                    value={getPercent(timeLeft)}
                    className='w-24 bg-primary-light'
                />
            </div>
        );
    });
    CountTimer.displayName = 'CountTimer';

    const progressPercentage = ((current + 1) / questions.length) * 100;

    const renderQuestionDots = () => {
        return (
            <div className='flex justify-center gap-1 mt-4 flex-wrap'>
                {questions.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                            current === index
                                ? 'bg-primary text-white'
                                : questions[index]?.answered?.length
                                  ? 'bg-green-100 text-green-800 border border-green-300'
                                  : 'bg-muted text-gray hover:bg-muted/80'
                        }`}
                        disabled={isTimeout}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className='container mx-auto mt-16 py-10'>
                {isLoading ? (
                    <Card>
                        <CardContent className='flex justify-center p-6'>
                            <Loader2 className='h-8 w-8 animate-spin' />
                        </CardContent>
                    </Card>
                ) : result || testParticipate ? (
                    <Card className='max-w-3xl mx-auto overflow-hidden shadow-lg'>
                        <div className='bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-teal-900 p-6'>
                            <div className='flex justify-center'>
                                <div className='w-20 h-20 rounded-full bg-green-100 dark:bg-green-200 flex items-center justify-center mb-4'>
                                    <CheckCircle className='h-10 w-10 text-green-600' />
                                </div>
                            </div>
                            <h1 className='text-3xl font-bold text-center text-green-800 dark:text-green-500'>
                                Congratulations!
                            </h1>
                        </div>
                        <CardContent className='text-center p-8'>
                            <Image
                                src='/successfully-completed.svg'
                                alt='Success'
                                width={1080}
                                height={720}
                                className='max-w-full h-64 object-contain mx-auto rounded-lg'
                            />
                            <div className='mt-6 space-y-4'>
                                <p className='text-lg'>
                                    You have successfully completed the
                                    pre-enrollment test. Our team will contact
                                    you soon.
                                </p>
                                {result && (
                                    <div className='inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-background border border-green-200 dark:border-border'>
                                        <span className='font-medium text-green-800 dark:text-white capitalize'>
                                            Status: {result.status}
                                        </span>
                                    </div>
                                )}
                                {testParticipate && (
                                    <div className='mt-6'>
                                        <Button
                                            className='px-6 py-2 gap-2'
                                            onClick={() =>
                                                window.open(
                                                    `${process.env.NEXT_PUBLIC_REDIRECT_URL}/chat/64ad4e2bca49cf0024f4079f`,
                                                )
                                            }
                                        >
                                            <MessageSquare className='h-4 w-4' />
                                            Send Inquiry
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div
                        className='space-y-6 px-3 md:px-4 lg:px-0'
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        <Card className='max-w-3xl mx-auto shadow-lg border-t-4 border-t-primary'>
                            <CardHeader className='pb-2'>
                                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
                                    <div>
                                        <h1 className='text-2xl font-bold'>
                                            Enrollment Test
                                        </h1>
                                        <p className='text-muted-foreground text-sm mt-1'>
                                            {program?.title ||
                                                'Bootcamp Program'}
                                        </p>
                                    </div>
                                    {questions.length > 0 && (
                                        <div className='flex flex-wrap gap-3'>
                                            <Badge className='flex items-center gap-1 px-3 py-1'>
                                                <FileQuestion className='h-4 w-4 text-white' />
                                                <span className='text-white'>
                                                    {questions.length} Questions
                                                </span>
                                            </Badge>
                                            <Badge className='flex items-center gap-1 px-3 py-1'>
                                                <Clock className='h-4 w-4 text-white' />
                                                <span className='text-white'>
                                                    {testTime} Minutes
                                                </span>
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>

                            <Separator />

                            {questions?.length > 0 ? (
                                <>
                                    <CardContent className='pt-6'>
                                        <div className='space-y-6'>
                                            <div className='bg-background p-4 rounded-lg border border-muted'>
                                                <p className='text-sm'>
                                                    There are{' '}
                                                    <strong>
                                                        {questions.length}{' '}
                                                        questions
                                                    </strong>
                                                    , and you have{' '}
                                                    <strong>
                                                        {testTime} minutes
                                                    </strong>{' '}
                                                    to answer them. You can skip
                                                    or revisit questions using
                                                    the navigation below.
                                                </p>
                                            </div>

                                            <div className='flex flex-col sm:flex-row justify-between items-center'>
                                                <div className='flex items-center gap-2'>
                                                    <span className='font-medium'>
                                                        Progress:
                                                    </span>
                                                    <span className='text-sm text-gray'>
                                                        {current + 1} of{' '}
                                                        {questions.length}
                                                    </span>
                                                </div>
                                                {date && (
                                                    <CountTimer date={date} />
                                                )}
                                            </div>

                                            <Progress
                                                value={progressPercentage}
                                                className='h-2 bg-primary-light'
                                            />

                                            {isTimeout && (
                                                <Alert
                                                    variant='destructive'
                                                    className='animate-pulse'
                                                >
                                                    <AlertDescription className='text-center font-medium'>
                                                        Time&apos;s up! Please
                                                        submit your answers now.
                                                    </AlertDescription>
                                                </Alert>
                                            )}

                                            <div className='bg-background p-6 rounded-lg border shadow-sm'>
                                                <div className='space-y-4'>
                                                    <div className='flex items-start gap-3'>
                                                        <div className='flex-shrink-0 w-8 h-8 rounded-full bg-primary-light text-primary-white flex items-center justify-center font-medium'>
                                                            {current + 1}.
                                                        </div>
                                                        <div className='space-y-1 w-full'>
                                                            <p className='font-medium text-base md:text-lg capitalize'>
                                                                {questions[
                                                                    current
                                                                ]
                                                                    ?.questionType ===
                                                                'audio' ? (
                                                                    <audio
                                                                        controls
                                                                        src={
                                                                            questions[
                                                                                current
                                                                            ]
                                                                                ?.question
                                                                        }
                                                                        className='w-full max-w-md my-2'
                                                                    >
                                                                        Your
                                                                        browser
                                                                        does not
                                                                        support
                                                                        the
                                                                        audio
                                                                        element.
                                                                    </audio>
                                                                ) : (
                                                                    questions[
                                                                        current
                                                                    ]?.question
                                                                )}
                                                            </p>

                                                            {questions[current]
                                                                ?.answerType ===
                                                                'mcq' && (
                                                                <div className='space-y-3 mt-4'>
                                                                    {questions[
                                                                        current
                                                                    ]?.options.map(
                                                                        (
                                                                            option: any,
                                                                            i: number,
                                                                        ) => (
                                                                            <button
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className={`w-full text-left p-3 rounded-lg transition-all capitalize ${
                                                                                    questions[
                                                                                        current
                                                                                    ]?.answered.includes(
                                                                                        option.option,
                                                                                    )
                                                                                        ? 'bg-primary text-white'
                                                                                        : 'bg-foreground hover:bg-primary-light text-black'
                                                                                } flex items-center text-sm md:text-base`}
                                                                                onClick={() =>
                                                                                    handleAnswer(
                                                                                        option.option,
                                                                                        current,
                                                                                        questions[
                                                                                            current
                                                                                        ]
                                                                                            ?.questionType,
                                                                                        questions[
                                                                                            current
                                                                                        ]
                                                                                            ?.answerType,
                                                                                    )
                                                                                }
                                                                                disabled={
                                                                                    isTimeout
                                                                                }
                                                                            >
                                                                                <div
                                                                                    className={`w-6 h-6 rounded-full mr-3 flex-shrink-0 flex items-center justify-center border ${
                                                                                        questions[
                                                                                            current
                                                                                        ]?.answered.includes(
                                                                                            option.option,
                                                                                        )
                                                                                            ? 'bg-background border-border'
                                                                                            : 'border-muted-foreground'
                                                                                    }`}
                                                                                >
                                                                                    {questions[
                                                                                        current
                                                                                    ]?.answered.includes(
                                                                                        option.option,
                                                                                    ) && (
                                                                                        <CheckCircle className='h-4 w-4 text-primary' />
                                                                                    )}
                                                                                </div>
                                                                                {
                                                                                    option.option
                                                                                }
                                                                            </button>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            )}

                                                            {questions[current]
                                                                ?.answerType ===
                                                                'audio' && (
                                                                <div className='space-y-4 mt-4 p-4 bg-muted/30 rounded-lg border border-muted'>
                                                                    <div className='text-center'>
                                                                        <h3 className='font-semibold text-lg mb-2'>
                                                                            Record
                                                                            your
                                                                            answer
                                                                        </h3>
                                                                        <p className='text-sm text-muted-foreground mb-4'>
                                                                            Please
                                                                            speak
                                                                            clearly
                                                                            into
                                                                            your
                                                                            microphone
                                                                        </p>

                                                                        {questions[
                                                                            current
                                                                        ]
                                                                            ?.answered
                                                                            .length >
                                                                        0 ? (
                                                                            <div className='bg-white p-3 rounded-lg shadow-sm'>
                                                                                <p className='text-sm text-green-600 mb-2'>
                                                                                    ✓
                                                                                    Answer
                                                                                    recorded
                                                                                </p>
                                                                                <audio
                                                                                    controls
                                                                                    src={
                                                                                        questions[
                                                                                            current
                                                                                        ]
                                                                                            ?.answered[0]
                                                                                    }
                                                                                    className='w-full'
                                                                                >
                                                                                    Your
                                                                                    browser
                                                                                    does
                                                                                    not
                                                                                    support
                                                                                    the
                                                                                    audio
                                                                                    element.
                                                                                </audio>
                                                                            </div>
                                                                        ) : audioBlob ? (
                                                                            <div className='bg-white p-3 rounded-lg shadow-sm'>
                                                                                <p className='text-sm text-amber-600 mb-2'>
                                                                                    Ready
                                                                                    to
                                                                                    upload
                                                                                </p>
                                                                                <audio
                                                                                    controls
                                                                                    src={URL.createObjectURL(
                                                                                        audioBlob,
                                                                                    )}
                                                                                    className='w-full'
                                                                                >
                                                                                    Your
                                                                                    browser
                                                                                    does
                                                                                    not
                                                                                    support
                                                                                    the
                                                                                    audio
                                                                                    element.
                                                                                </audio>
                                                                            </div>
                                                                        ) : (
                                                                            <div className='bg-muted/50 p-6 rounded-lg border border-dashed border-muted-foreground/30'>
                                                                                <p className='text-muted-foreground'>
                                                                                    {isAudioRecording
                                                                                        ? 'Recording in progress...'
                                                                                        : 'No recording yet'}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {isUploading && (
                                                                            <div className='mt-4'>
                                                                                <p className='text-sm text-muted-foreground mb-2'>
                                                                                    Uploading
                                                                                    recording...
                                                                                </p>
                                                                                <Progress
                                                                                    value={Math.round(
                                                                                        (uploadProgress.uploadedSize *
                                                                                            100) /
                                                                                            uploadProgress.totalSize,
                                                                                    )}
                                                                                    className='h-2'
                                                                                />
                                                                            </div>
                                                                        )}

                                                                        <div className='flex justify-center gap-3 mt-4'>
                                                                            {!isAudioRecording ? (
                                                                                <Button
                                                                                    onClick={
                                                                                        startAudio
                                                                                    }
                                                                                    className='gap-2'
                                                                                    disabled={
                                                                                        isTimeout
                                                                                    }
                                                                                >
                                                                                    <Mic className='h-4 w-4' />
                                                                                    {audioBlob
                                                                                        ? 'Re-Record'
                                                                                        : 'Start Recording'}
                                                                                </Button>
                                                                            ) : (
                                                                                <Button
                                                                                    variant='destructive'
                                                                                    onClick={
                                                                                        stopAudio
                                                                                    }
                                                                                    className='gap-2'
                                                                                >
                                                                                    <MicOff className='h-4 w-4' />
                                                                                    Stop
                                                                                    Recording
                                                                                </Button>
                                                                            )}

                                                                            {audioBlob && (
                                                                                <Button
                                                                                    onClick={() =>
                                                                                        handleUploadAudio(
                                                                                            questions[
                                                                                                current
                                                                                            ]
                                                                                                ?.questionType,
                                                                                            questions[
                                                                                                current
                                                                                            ]
                                                                                                ?.answerType,
                                                                                        )
                                                                                    }
                                                                                    disabled={
                                                                                        isUploading ||
                                                                                        isTimeout
                                                                                    }
                                                                                    className='gap-2'
                                                                                >
                                                                                    {isUploading && (
                                                                                        <Loader2 className='h-4 w-4 animate-spin' />
                                                                                    )}
                                                                                    <Upload className='h-4 w-4' />
                                                                                    Upload
                                                                                </Button>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {renderQuestionDots()}
                                        </div>
                                    </CardContent>

                                    <CardFooter className='flex justify-between pt-2 pb-6'>
                                        <Button
                                            variant='outline'
                                            onClick={handlePrev}
                                            disabled={
                                                current === 0 || isTimeout
                                            }
                                            className='gap-2'
                                        >
                                            <ChevronLeft className='h-4 w-4' />{' '}
                                            Previous
                                        </Button>

                                        {current < questions.length - 1 ? (
                                            <Button
                                                onClick={handleNext}
                                                disabled={isTimeout}
                                                className='gap-2'
                                            >
                                                Next{' '}
                                                <ChevronRight className='h-4 w-4' />
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={handleSubmit}
                                                disabled={
                                                    isSubmitting || isTimeout
                                                }
                                                className='gap-2 bg-green-600 hover:bg-green-700'
                                            >
                                                {isSubmitting && (
                                                    <Loader2 className='h-4 w-4 animate-spin' />
                                                )}
                                                <CheckCircle className='h-4 w-4' />
                                                Submit Test
                                            </Button>
                                        )}
                                    </CardFooter>
                                </>
                            ) : (
                                <div className='py-3 px-3 my-3 mx-4 rounded-md bg-muted '>
                                    <p className='text-center text-muted-foreground'>
                                        No questions available for this test.
                                    </p>
                                </div>
                            )}
                        </Card>
                    </div>
                )}
            </div>
        </>
    );
}
