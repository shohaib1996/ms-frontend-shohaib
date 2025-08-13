'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { MapPin, Mail, Phone, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import instance from '@/lib/axios';
import { toast } from 'sonner';
import ContactFormCRM from '../home/ContactFormCRM';

interface FormData {
    name: string;
    email: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });
    const [isSending, setIsSending] = useState<boolean>(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        try {
            const response = await instance.post(
                '/marketing/contact/email',
                formData,
            );

            setFormData({
                name: '',
                email: '',
                message: '',
            });

            toast.success('Message Sent Successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Message not sent!');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section className='xl:py-20 py-16 bg-gradient-to-b from-slate-50 dark:from-slate-900 dark:to-slate-950 to-white'>
            <div className='my-container pt-10'>
                <div className='text-center mb-12'>
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4'>
                        Contact{' '}
                        <span className='text-primary-white'>SkillBNK</span>
                    </h1>
                    <div className='w-20 h-1 bg-primary mx-auto rounded-full mb-6'></div>
                    <p className='text-lg text-dark-gray dark:text-slate-300 max-w-2xl mx-auto'>
                        Give us a call or drop by anytime, we endeavour to
                        answer all enquiries within 24 hours on business days.
                        We will be happy to answer your questions.
                    </p>
                </div>

                <div className='grid lg:grid-cols-2 gap-4 lg:gap-6 items-start'>
                    {/* Contact Information */}
                    <div className='space-y-5'>
                        <div className='bg-white border border-forground-border dark:bg-slate-800 rounded-xl shadow-sm p-2 md:p-4'>
                            <Link
                                href='https://www.google.com/maps/place/30500+Van+Dyke+Ave,+Warren,+MI+48093/@42.5179438,-83.0327162,17z/data=!3m1!4b1!4m6!3m5!1s0x8824da5cfec53ad9:0xb7471c701eb7cd21!8m2!3d42.5179399!4d-83.0278453!16s%2Fg%2F11c3q3mb7h'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-start gap-3 group'
                            >
                                <div className='bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors'>
                                    <MapPin className='h-6 w-6 text-primary' />
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold text-black dark:text-white mb-1'>
                                        Address:
                                    </h3>
                                    <p className='text-dark-gray dark:text-slate-300'>
                                        30500 Van Dyke, Ste - 201
                                        <br />
                                        Warren, MI 48093
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* <div className='bg-white border border-forground-border dark:bg-slate-800 rounded-xl shadow-sm p-6 md:p-8'>
                            <Link
                                href='tel:+15862767347'
                                className='flex items-start gap-3 group'
                            >
                                <div className='bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors'>
                                    <Phone className='h-6 w-6 text-primary' />
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold text-black dark:text-white mb-1'>
                                        Our Phone:
                                    </h3>
                                    <p className='text-dark-gray dark:text-slate-300'>
                                        +1 (586) 276-7347
                                    </p>
                                </div>
                            </Link>
                        </div> */}

                        <div className='bg-white border border-forground-border dark:bg-slate-800 rounded-xl shadow-sm p-6 md:p-8'>
                            <Link
                                href='mailto:hello@skillbnk.com'
                                className='flex items-start gap-3 group'
                            >
                                <div className='bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors'>
                                    <Mail className='h-6 w-6 text-primary' />
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold text-black dark:text-white mb-1'>
                                        Email:
                                    </h3>
                                    <p className='text-dark-gray dark:text-slate-300'>
                                        hello@skillbnk.com
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className='bg-white border border-forground-border dark:bg-slate-800 rounded-xl shadow-sm p-3 md:p-6'>
                        <h1 className='text-black font-bold text-xl'>
                            Let&apos;s Connect For 15 minute
                        </h1>
                        <ContactFormCRM />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
