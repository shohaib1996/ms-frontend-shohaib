'use client';

import React, { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Zap } from 'lucide-react';
import ContactForm from './ContactFormCRM';

export default function FAQContactSection() {
    const faqItems = [
        {
            question: 'What is SkillBNK?',
            answer: 'SkillBNK is an all-in-one coaching platform designed for individual coaches and companies to offer private coaching, sell online courses, run live or recorded bootcamps, and manage learner engagement across web and mobile.',
        },
        {
            question: 'Who can use SkillBNK?',
            answer: '• Private Coaches: Run 1-on-1 coaching, sell courses, and manage students.\n• Coaching Companies: Operate multiple branches and trainers from one centralized dashboard.\n• Schools or Academies: Administer multiple bootcamps under a unified system.',
        },
        {
            question: 'What features are included in SkillBNK?',
            answer: '• Web and Mobile App Access for students, coaches, and company admins.\n• Chat System for real-time communication between students and coaches.\n• Calendar with To-Do Lists to schedule classes, tasks, and track deadlines.\n• Content Management: Control who can access specific course materials with expiration dates.\n• AI Tools: Auto content generation, AI-powered quizzes, AI-driven mock interview practice.\n• Assessments Portal: Deliver and manage student tests and evaluations.\n• Email & SMS Reminders: Send personalized or bulk communications to students.\n• Enrollment Forms: Create customizable forms for course sign-ups.\n• Surveys: Gather feedback and insights from students.\n• Community: Build engagement through group chat, forums, and interview prep communities.\n• White Labeling: Upload custom logos, apply brand colors, and rename features.\n• Employee & Role Management: Coach check-in/check-out tracking, Custom permission levels for HR, sales, marketing, or development teams.',
        },
        {
            question: 'How is SkillBNK structured?',
            answer: '• Learner Portal: For students to access courses, chat, content, calendar, and community.\n• Branch Admin Portal: For school admins or coaches to manage bootcamps.\n• Company Admin Portal: For companies to oversee multiple branches and coaches.',
        },
        {
            question: 'Is there a free trial available?',
            answer: 'Yes! SkillBNK offers a 15-day free trial with full access to all core features.',
        },
        {
            question: 'Is the platform mobile-friendly?',
            answer: 'Absolutely. SkillBNK has a fully responsive mobile app, giving students and coaches access to chat, content, calendars, community, and more — anytime, anywhere.',
        },
        {
            question: 'Can I customize the platform with my branding?',
            answer: 'Yes. SkillBNK supports full white-labeling, including:\n• Uploading your own company logo\n• Customizing feature names\n• Applying your brand colors',
        },
    ];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        details: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    interface FormData {
        name: string;
        email: string;
        phone: string;
        details: string;
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { id, value } = e.target;
        setFormData((prev: FormData) => ({
            ...prev,
            [id]: value,
        }));
    };

    // interface SubmitEvent extends React.FormEvent<HTMLFormElement> { }

    // const handleSubmit = async (e: SubmitEvent): Promise<void> => {
    //     e.preventDefault();
    //     setIsSubmitting(true);

    //     try {
    //         // Log form data for demonstration
    //         console.log('Form submitted with data:', formData);

    //         // Here you would typically send the data to your backend
    //         // Example:
    //         // const response = await fetch('/api/contact', {
    //         //     method: 'POST',
    //         //     headers: {
    //         //         'Content-Type': 'application/json',
    //         //     },
    //         //     body: JSON.stringify(formData),
    //         // });

    //         // if (!response.ok) throw new Error('Failed to submit form');

    //         // Clear form after successful submission
    //         setFormData({
    //             name: '',
    //             email: '',
    //             phone: '',
    //             details: ''
    //         });

    //         setSubmitMessage('Thank you! Your message has been sent.');

    //         // Clear success message after 5 seconds
    //         setTimeout(() => {
    //             setSubmitMessage('');
    //         }, 5000);

    //     } catch (error: unknown) {
    //         console.error('Error submitting form:', error);
    //         setSubmitMessage('Failed to send message. Please try again.');
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    return (
        <div className='   md:px-8 py-12 w-full relative' id='faq'>
            <div
                className='absolute inset-0 bg-gradient-to-br from-purple-500/30 via-purple-500/20 to-purple-500/5 top-[30%] -left-[200px] z-[-1] rounded-full h-1/2 w-1/2 blur-3xl 
            '
            ></div>
            <div className='my-container mx-auto'>
                <div className='flex justify-center mb-2'>
                    <div className='inline-flex items-center gap-1.5 bg-foreground text-primary-white px-3 py-1 rounded-full text-sm'>
                        <Zap className='w-4 h-4' />
                        <span>Common Questions</span>
                    </div>
                </div>

                <h1 className='text-4xl md:text-5xl font-bold text-center text-black mb-2'>
                    Frequently Asked Questions
                </h1>
                <p className='text-center text-black mb-8'>
                    Everything you need to know about SkillBNK
                </p>

                <div className='grid md:grid-cols-2 gap-6'>
                    {/* FAQ Section */}
                    <div className='bg-foreground rounded-lg p-6 shadow-sm '>
                        <Accordion
                            type='single'
                            collapsible
                            className='space-y-4'
                            defaultValue='item-0'
                        >
                            {faqItems.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className='border py-[10px] border-black rounded-lg overflow-hidden mt-6'
                                >
                                    <AccordionTrigger className='px-4 py-2 text-black hover:no-underline'>
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className='px-4 pb-4 pt-0'>
                                        <div className='text-black whitespace-pre-line'>
                                            {item.answer}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        {/* <div className='mt-6 flex justify-center'>
                            <Button
                                variant='ghost'
                                size={'sm'}
                                className='text-primary-white bg-primary-foreground  rounded-full  gap-2'
                            >
                                View More
                                <ArrowRight className='w-4 h-4' />
                            </Button>
                        </div> */}
                    </div>

                    {/* Contact Form with Background */}
                    <div className='bg-foreground rounded-lg p-6 shadow-sm relative overflow-hidden'>
                        {/* Background Image */}
                        {/* <div className=''>
                            <Image
                                src={bgImage}
                                alt='Background Image'
                                className='rotate-180 animate-pulse-scale absolute -top-40 -right-36 overflow-hidden'
                            />
                        </div> */}
                        <div className='absolute -top-32 -right-36 animate-pulse-scale '>
                            <div className='size-96 rounded-full bg-purple-200/40 dark:bg-purple-800/30 flex items-center justify-center'>
                                <div className='size-64 rounded-full bg-purple-200/60 dark:bg-purple-800/30 flex items-center justify-center'>
                                    <div className='size-36 rounded-full bg-purple-200 dark:bg-purple-800/30'></div>
                                </div>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className='relative z-10'>
                            <h2 className='text-2xl font-semibold text-black mb-3'>
                                Let&apos;s Connect For 15 minutes
                            </h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
