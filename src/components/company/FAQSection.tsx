'use client';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

// FAQ data structure
type FAQItem = {
    id?: string;
    _id?: string;
    question: string;
    answer: string;
};

// FAQ categories
type FAQCategory = {
    title: string;
    faqs: FAQItem[];
};

interface Props {
    faqsData?: FAQItem[];
}

// Static fallback data
const staticFaqData: FAQCategory[] = [
    {
        title: 'Admissions & Enrollment',
        faqs: [
            {
                id: '1',
                question:
                    'What are the prerequisites for joining your courses?',
                answer: 'Most of our courses are designed for beginners and require no prior experience. However, some advanced courses may have specific prerequisites, which are clearly mentioned in the course details. We recommend checking the specific course page for detailed requirements.',
            },
            {
                id: '2',
                question: 'How do I enroll in a course?',
                answer: "Enrolling is simple! Browse our course catalog, select the course you're interested in, and click the 'Enroll Now' button. Follow the checkout process to complete your registration. If you need assistance, our support team is available via live chat or email.",
            },
            {
                id: '3',
                question: 'Do you offer any free trial periods?',
                answer: 'Yes! We offer a 7-day free trial for most of our courses. This allows you to explore the course content, teaching methodology, and platform features before making a commitment. No credit card is required for the trial period.',
            },
        ],
    },
    {
        title: 'Course Structure & Learning',
        faqs: [
            {
                id: '4',
                question:
                    'How long does it typically take to complete a course?',
                answer: 'Course duration varies depending on the program. Our short courses can be completed in 4-6 weeks, while comprehensive bootcamps may take 3-6 months. Each course page provides an estimated completion time based on the recommended study hours per week.',
            },
            {
                id: '5',
                question:
                    'Are the courses self-paced or do they have fixed schedules?',
                answer: 'We offer both options! Our self-paced courses allow you to learn at your own convenience, while scheduled cohort-based programs provide structure and peer interaction. You can choose the format that best suits your learning style and schedule.',
            },
            {
                id: '6',
                question:
                    'What kind of support will I receive during my course?',
                answer: 'All students receive comprehensive support including access to instructors through office hours, a dedicated teaching assistant for technical questions, peer discussion forums, and 24/7 technical support. Premium courses also include 1-on-1 mentorship sessions.',
            },
        ],
    },
    {
        title: 'Payment & Financial Aid',
        faqs: [
            {
                id: '7',
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. For some courses, we also offer payment through education financing partners with flexible installment options.',
            },
            {
                id: '8',
                question: 'Do you offer any scholarships or financial aid?',
                answer: "Yes, we're committed to making education accessible. We offer merit-based scholarships, need-based financial aid, and diversity scholarships. Visit our Financial Aid page to learn about eligibility criteria and application deadlines.",
            },
            {
                id: '9',
                question: 'What is your refund policy?',
                answer: "We offer a 14-day money-back guarantee for most courses. If you're unsatisfied with your experience, you can request a full refund within 14 days of enrollment, provided you haven't completed more than 20% of the course content.",
            },
        ],
    },
    {
        title: 'Certification & Career Support',
        faqs: [
            {
                id: '10',
                question: 'Are your certificates recognized by employers?',
                answer: "Yes, our certificates are industry-recognized and valued by employers worldwide. We've partnered with leading companies to ensure our curriculum meets industry standards. Many of our graduates have successfully transitioned to new careers or secured promotions.",
            },
            {
                id: '11',
                question: 'What career support services do you provide?',
                answer: 'Our career support includes resume reviews, portfolio development guidance, interview preparation, networking opportunities with industry partners, and access to our exclusive job board. Premium programs also include personalized career coaching.',
            },
            {
                id: '12',
                question:
                    'How long do I have access to course materials after completion?',
                answer: "You'll have lifetime access to all course materials, updates, and the alumni community after completing your course. This ensures you can revisit concepts and stay updated with industry changes even after graduation.",
            },
        ],
    },
];

export function FAQSection({ faqsData }: Props) {
    // Use static data if no faqsData is provided or if it's empty
    const shouldUseStaticData = !faqsData || faqsData.length === 0;

    return (
        <section id='faq' className='py-3 bg-background'>
            <div className='my-container'>
                <div className='text-center mb-4'>
                    <h2 className='text-3xl md:text-4xl font-bold text-black mb-3'>
                        Frequently Asked Questions
                    </h2>
                    <p className='text-dark-gray max-w-2xl mx-auto'>
                        Find answers to common questions about our courses,
                        enrollment process, and more. If you don&apos;t see your
                        question here, feel free to contact our support team.
                    </p>
                </div>

                <div className='max-w-6xl mx-auto space-y-8'>
                    <Accordion
                        type='single'
                        collapsible
                        className='bg-card shadow-sm rounded-lg'
                    >
                        {faqsData?.map((faq, faqIndex) => (
                            <AccordionItem
                                key={faq._id || faq.id || faqIndex}
                                value={`faq-${faqIndex}`}
                                className='border-b border-border-primary-light last:border-b-0'
                            >
                                <AccordionTrigger className='text-left text-primary-white font-medium px-6 py-4 hover:no-underline'>
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className='px-6 pb-4 text-dark-gray'>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className='text-center mt-3'>
                    <p className='text-dark-gray mb-3'>Still have questions?</p>
                    <Link
                        href={'#consultation'}
                        className='inline-flex items-center justify-center px-3 py-2 rounded-md bg-primary text-pure-white transition-colors hover:opacity-80'
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </section>
    );
}
