'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

type RoadmapStep = {
    id: number;
    title: string;
    duration: string;
    description: string;
    skills: string[];
    projects?: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
};

type CourseRoadmap = {
    id: string;
    title: string;
    description: string;
    steps: RoadmapStep[];
    totalDuration: string;
    certification: string;
    icon: React.ReactNode;
};

const roadmaps: CourseRoadmap[] = [
    {
        id: 'mern',
        title: 'MERN Stack Development',
        description:
            'Master the MERN (MongoDB, Express.js, React, Node.js) stack and become a full-stack JavaScript developer capable of building modern web applications.',
        totalDuration: '16 weeks',
        certification: 'Certified MERN Stack Developer',
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <path d='M17 17h.01' />
                <path d='M12 17h.01' />
                <path d='M7 17h.01' />
                <path d='M7 12h.01' />
                <path d='M12 12h.01' />
                <path d='M17 12h.01' />
                <path d='M7 7h.01' />
                <path d='M12 7h.01' />
                <path d='M17 7h.01' />
                <rect width='18' height='18' x='3' y='3' rx='2' />
            </svg>
        ),
        steps: [
            {
                id: 1,
                title: 'Web Development Fundamentals',
                duration: '3 weeks',
                description:
                    'Build a strong foundation in HTML, CSS, and JavaScript. Learn responsive design principles and modern CSS frameworks.',
                skills: [
                    'HTML5',
                    'CSS3',
                    'JavaScript ES6+',
                    'Responsive Design',
                    'Git & GitHub',
                ],
                projects: [
                    'Personal Portfolio Website',
                    'Interactive Landing Page',
                ],
                difficulty: 'Beginner',
            },
            {
                id: 2,
                title: 'Frontend Development with React',
                duration: '4 weeks',
                description:
                    'Master React.js to build dynamic user interfaces. Learn component architecture, state management, and routing.',
                skills: [
                    'React.js',
                    'JSX',
                    'Hooks',
                    'Context API',
                    'React Router',
                    'State Management',
                ],
                projects: ['Task Management App', 'E-commerce Product Page'],
                difficulty: 'Intermediate',
            },
            {
                id: 3,
                title: 'Backend Development with Node.js',
                duration: '4 weeks',
                description:
                    'Build robust server-side applications with Node.js and Express. Learn RESTful API design and implementation.',
                skills: [
                    'Node.js',
                    'Express.js',
                    'REST APIs',
                    'Authentication',
                    'Middleware',
                    'Error Handling',
                ],
                projects: ['RESTful API Service', 'Authentication System'],
                difficulty: 'Intermediate',
            },
            {
                id: 4,
                title: 'Database Management with MongoDB',
                duration: '3 weeks',
                description:
                    'Learn NoSQL database concepts and MongoDB. Master data modeling, CRUD operations, and database integration.',
                skills: [
                    'MongoDB',
                    'Mongoose ODM',
                    'Data Modeling',
                    'CRUD Operations',
                    'Aggregation',
                    'Indexing',
                ],
                projects: [
                    'Database Design Implementation',
                    'Data API Integration',
                ],
                difficulty: 'Intermediate',
            },
            {
                id: 5,
                title: 'Full Stack Integration & Deployment',
                duration: '2 weeks',
                description:
                    'Connect frontend and backend components to create complete applications. Learn deployment and CI/CD workflows.',
                skills: [
                    'Full Stack Integration',
                    'Deployment',
                    'CI/CD',
                    'Performance Optimization',
                    'Security Best Practices',
                ],
                projects: [
                    'Complete MERN Application',
                    'Deployment to Cloud Platform',
                ],
                difficulty: 'Advanced',
            },
        ],
    },
    {
        id: 'aws',
        title: 'AWS Cloud Engineering',
        description:
            'Develop expertise in Amazon Web Services (AWS) cloud infrastructure, architecture, and services to design, deploy, and manage scalable cloud solutions.',
        totalDuration: '14 weeks',
        certification: 'AWS Certified Solutions Architect',
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <path d='M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z' />
            </svg>
        ),
        steps: [
            {
                id: 1,
                title: 'Cloud Computing Fundamentals',
                duration: '2 weeks',
                description:
                    'Understand cloud computing concepts, service models, and the AWS global infrastructure. Learn account setup and management.',
                skills: [
                    'Cloud Computing Concepts',
                    'AWS Global Infrastructure',
                    'AWS Account Management',
                    'AWS Console',
                ],
                projects: ['AWS Account Setup', 'Basic Resource Deployment'],
                difficulty: 'Beginner',
            },
            {
                id: 2,
                title: 'Core AWS Services',
                duration: '3 weeks',
                description:
                    'Master essential AWS services including compute, storage, and networking. Learn to provision and manage resources.',
                skills: ['EC2', 'S3', 'VPC', 'IAM', 'RDS', 'Route 53'],
                projects: ['Multi-tier Architecture', 'Static Website Hosting'],
                difficulty: 'Intermediate',
            },
            {
                id: 3,
                title: 'Advanced AWS Services',
                duration: '3 weeks',
                description:
                    'Explore advanced AWS services for application deployment, monitoring, and scaling. Learn serverless architecture.',
                skills: [
                    'Lambda',
                    'API Gateway',
                    'DynamoDB',
                    'CloudWatch',
                    'SNS',
                    'SQS',
                    'Elastic Beanstalk',
                    'CloudFormation',
                ],
                projects: [
                    'Serverless Application',
                    'Auto-scaling Architecture',
                ],
                difficulty: 'Intermediate',
            },
            {
                id: 4,
                title: 'Security & Compliance',
                duration: '2 weeks',
                description:
                    'Implement AWS security best practices, identity management, and compliance frameworks. Learn threat detection and prevention.',
                skills: [
                    'AWS Security Best Practices',
                    'Identity & Access Management',
                    'Encryption',
                    'Compliance Frameworks',
                    'Security Services',
                ],
                projects: ['Security Assessment', 'Compliance Implementation'],
                difficulty: 'Advanced',
            },
            {
                id: 5,
                title: 'DevOps on AWS',
                duration: '2 weeks',
                description:
                    'Implement DevOps practices on AWS using CI/CD services. Learn infrastructure as code and automation.',
                skills: [
                    'CodePipeline',
                    'CodeBuild',
                    'CodeDeploy',
                    'CloudFormation',
                    'Infrastructure as Code',
                ],
                projects: [
                    'CI/CD Pipeline Implementation',
                    'Infrastructure as Code Deployment',
                ],
                difficulty: 'Advanced',
            },
            {
                id: 6,
                title: 'Architecture & Optimization',
                duration: '2 weeks',
                description:
                    'Design resilient, high-performance, and cost-optimized AWS architectures. Prepare for the AWS certification.',
                skills: [
                    'Well-Architected Framework',
                    'High Availability',
                    'Disaster Recovery',
                    'Cost Optimization',
                    'Performance Efficiency',
                ],
                projects: [
                    'Enterprise Architecture Design',
                    'Cost Optimization Implementation',
                ],
                difficulty: 'Advanced',
            },
        ],
    },
    {
        id: 'data-science',
        title: 'Data Science & Machine Learning',
        description:
            'Develop expertise in data analysis, statistical modeling, and machine learning to extract insights and build predictive models from complex datasets.',
        totalDuration: '20 weeks',
        certification: 'Certified Data Scientist',
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <path d='M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z' />
            </svg>
        ),
        steps: [
            {
                id: 1,
                title: 'Programming for Data Science',
                duration: '3 weeks',
                description:
                    'Learn Python programming fundamentals with a focus on data science libraries. Master data manipulation and visualization.',
                skills: [
                    'Python',
                    'NumPy',
                    'Pandas',
                    'Matplotlib',
                    'Seaborn',
                    'Jupyter Notebooks',
                ],
                projects: [
                    'Data Analysis Report',
                    'Interactive Data Dashboard',
                ],
                difficulty: 'Beginner',
            },
            {
                id: 2,
                title: 'Statistics & Exploratory Data Analysis',
                duration: '4 weeks',
                description:
                    'Develop a strong foundation in statistics and probability. Learn techniques for exploring and preparing data for analysis.',
                skills: [
                    'Descriptive Statistics',
                    'Probability',
                    'Hypothesis Testing',
                    'Data Cleaning',
                    'Feature Engineering',
                    'Exploratory Analysis',
                ],
                projects: [
                    'Statistical Analysis Project',
                    'Data Preparation Pipeline',
                ],
                difficulty: 'Intermediate',
            },
            {
                id: 3,
                title: 'Machine Learning Fundamentals',
                duration: '5 weeks',
                description:
                    'Master core machine learning algorithms and techniques. Learn model evaluation, validation, and hyperparameter tuning.',
                skills: [
                    'Supervised Learning',
                    'Unsupervised Learning',
                    'Model Evaluation',
                    'Cross-Validation',
                    'Feature Selection',
                    'Scikit-learn',
                ],
                projects: [
                    'Predictive Modeling Project',
                    'Classification System',
                ],
                difficulty: 'Intermediate',
            },
            {
                id: 4,
                title: 'Deep Learning',
                duration: '4 weeks',
                description:
                    'Explore neural networks and deep learning techniques. Build and train models for complex pattern recognition tasks.',
                skills: [
                    'Neural Networks',
                    'TensorFlow',
                    'Keras',
                    'CNNs',
                    'RNNs',
                    'Transfer Learning',
                ],
                projects: [
                    'Image Classification System',
                    'Natural Language Processing Application',
                ],
                difficulty: 'Advanced',
            },
            {
                id: 5,
                title: 'Big Data & Data Engineering',
                duration: '2 weeks',
                description:
                    'Learn techniques for working with large-scale datasets. Master data processing frameworks and cloud-based solutions.',
                skills: [
                    'SQL',
                    'NoSQL',
                    'Data Warehousing',
                    'Spark',
                    'Cloud Data Services',
                    'Data Pipelines',
                ],
                projects: [
                    'Big Data Processing Pipeline',
                    'Data Warehouse Implementation',
                ],
                difficulty: 'Advanced',
            },
            {
                id: 6,
                title: 'Applied Data Science Capstone',
                duration: '2 weeks',
                description:
                    'Apply all learned skills to a comprehensive real-world data science project. Develop end-to-end solution from data collection to deployment.',
                skills: [
                    'End-to-end Project Management',
                    'Model Deployment',
                    'Communication of Results',
                    'Business Impact',
                ],
                projects: [
                    'Comprehensive Data Science Solution',
                    'Model Deployment to Production',
                ],
                difficulty: 'Advanced',
            },
        ],
    },
];

export function CourseRoadmap() {
    const [activeTab, setActiveTab] = useState('mern');
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'Intermediate':
                return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
            case 'Advanced':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    const activeRoadmap = roadmaps.find((roadmap) => roadmap.id === activeTab);

    return (
        <section
            ref={sectionRef}
            id='course-roadmap'
            className='py-20 relative overflow-hidden bg-gradient-to-r from-indigo-50 via-white to-primary-light dark:bg-gradient-to-l
             dark:from-indigo-900 dark:via-[#363f8f] dark:to-primary/10'
        >
            <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
                <div className='absolute -top-[30%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-200/30 to-transparent blur-3xl dark:from-indigo-700/20'></div>
                <div className='absolute top-[60%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tl from-primary/10 to-transparent blur-3xl'></div>
            </div>

            <div className='my-container relative z-10'>
                <motion.div
                    initial='hidden'
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className='text-center mb-12'
                >
                    <motion.h2
                        variants={itemVariants}
                        className='text-3xl md:text-4xl font-bold text-black mb-4'
                    >
                        Course Roadmaps
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className='text-dark-gray max-w-2xl mx-auto'
                    >
                        Explore our structured learning paths designed to take
                        you from beginner to professional. Each roadmap outlines
                        the skills, projects, and milestones you&apos;ll achieve
                        along the way.
                    </motion.p>
                </motion.div>

                <motion.div variants={itemVariants} className='mb-10'>
                    <Tabs
                        defaultValue='mern'
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className='w-full'
                    >
                        <TabsList className='grid grid-cols-1 sm:grid-cols-3 gap-2 bg-transparent h-auto p-0 mb-8'>
                            {roadmaps.map((roadmap) => (
                                <TabsTrigger
                                    key={roadmap.id}
                                    value={roadmap.id}
                                    className={`flex items-center gap-2 p-4 rounded-lg border data-[state=active]:border-primary data-[state=active]:bg-primary-light dark:data-[state=active]:bg-primary/50 data-[state=active]:shadow-sm ${
                                        activeTab === roadmap.id
                                            ? 'border-primary'
                                            : 'border-indigo-100/50 dark:border-indigo-800/30 hover:border-indigo-200 dark:hover:border-indigo-700/50'
                                    }`}
                                >
                                    <span
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            activeTab === roadmap.id
                                                ? 'bg-primary text-white'
                                                : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                                        }`}
                                    >
                                        {roadmap.icon}
                                    </span>
                                    <div className='text-left'>
                                        <div className='font-medium text-primary-white'>
                                            {roadmap.title}
                                        </div>
                                        <div className='text-xs text-dark-gray'>
                                            {roadmap.totalDuration}
                                        </div>
                                    </div>
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {roadmaps.map((roadmap) => (
                            <TabsContent
                                key={roadmap.id}
                                value={roadmap.id}
                                className='mt-0'
                            >
                                <AnimatePresence mode='wait'>
                                    <motion.div
                                        key={roadmap.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className='bg-white/80 dark:bg-[#1e1f2e]/80 backdrop-blur-sm rounded-xl p-6 border border-indigo-100/30 dark:border-indigo-800/30 shadow-sm mb-8'>
                                            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
                                                <div>
                                                    <h3 className='text-2xl font-semibold text-black'>
                                                        {roadmap.title}
                                                    </h3>
                                                    <p className='text-dark-gray'>
                                                        {roadmap.description}
                                                    </p>
                                                </div>
                                                <div className='flex flex-col items-start md:items-end gap-1'>
                                                    <div className='flex items-center gap-2'>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            width='16'
                                                            height='16'
                                                            viewBox='0 0 24 24'
                                                            fill='none'
                                                            stroke='currentColor'
                                                            strokeWidth='2'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            className='text-primary-white'
                                                        >
                                                            <rect
                                                                width='18'
                                                                height='18'
                                                                x='3'
                                                                y='4'
                                                                rx='2'
                                                                ry='2'
                                                            />
                                                            <line
                                                                x1='16'
                                                                x2='16'
                                                                y1='2'
                                                                y2='6'
                                                            />
                                                            <line
                                                                x1='8'
                                                                x2='8'
                                                                y1='2'
                                                                y2='6'
                                                            />
                                                            <line
                                                                x1='3'
                                                                x2='21'
                                                                y1='10'
                                                                y2='10'
                                                            />
                                                        </svg>
                                                        <span className='text-dark-gray'>
                                                            Duration:{' '}
                                                            <span className='font-medium text-black'>
                                                                {
                                                                    roadmap.totalDuration
                                                                }
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            width='16'
                                                            height='16'
                                                            viewBox='0 0 24 24'
                                                            fill='none'
                                                            stroke='currentColor'
                                                            strokeWidth='2'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            className='text-primary-white'
                                                        >
                                                            <path d='M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h3.8a2 2 0 0 0 1.4-.6L12 4.6a2 2 0 0 1 1.4-.6h3.8a2 2 0 0 1 2 2v2.4Z' />
                                                            <path d='M12 13v8' />
                                                            <path d='M16 17H8' />
                                                        </svg>
                                                        <span className='text-dark-gray'>
                                                            Certification:{' '}
                                                            <span className='font-medium text-black'>
                                                                {
                                                                    roadmap.certification
                                                                }
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                                                <div className='bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 flex items-center gap-3'>
                                                    <div className='w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-800/50 flex items-center justify-center'>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            width='20'
                                                            height='20'
                                                            viewBox='0 0 24 24'
                                                            fill='none'
                                                            stroke='currentColor'
                                                            strokeWidth='2'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            className='text-indigo-600 dark:text-indigo-300'
                                                        >
                                                            <path d='M12 20h9' />
                                                            <path d='M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className='text-xs text-indigo-700 dark:text-indigo-300'>
                                                            Skills Covered
                                                        </div>
                                                        <div className='font-medium text-black'>
                                                            {roadmap.steps.reduce(
                                                                (acc, step) =>
                                                                    acc +
                                                                    step.skills
                                                                        .length,
                                                                0,
                                                            )}
                                                            + Skills
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 flex items-center gap-3'>
                                                    <div className='w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-800/50 flex items-center justify-center'>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            width='20'
                                                            height='20'
                                                            viewBox='0 0 24 24'
                                                            fill='none'
                                                            stroke='currentColor'
                                                            strokeWidth='2'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            className='text-indigo-600 dark:text-indigo-300'
                                                        >
                                                            <path d='M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z' />
                                                            <path d='M13 5v2' />
                                                            <path d='M13 17v2' />
                                                            <path d='M13 11v2' />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className='text-xs text-indigo-700 dark:text-indigo-300'>
                                                            Projects
                                                        </div>
                                                        <div className='font-medium text-black'>
                                                            {roadmap.steps.reduce(
                                                                (acc, step) =>
                                                                    acc +
                                                                    (step.projects
                                                                        ? step
                                                                              .projects
                                                                              .length
                                                                        : 0),
                                                                0,
                                                            )}
                                                            + Hands-on Projects
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 flex items-center gap-3'>
                                                    <div className='w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-800/50 flex items-center justify-center'>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            width='20'
                                                            height='20'
                                                            viewBox='0 0 24 24'
                                                            fill='none'
                                                            stroke='currentColor'
                                                            strokeWidth='2'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            className='text-indigo-600 dark:text-indigo-300'
                                                        >
                                                            <path d='M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z' />
                                                            <path d='M12 13v8' />
                                                            <path d='M12 3v3' />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className='text-xs text-indigo-700 dark:text-indigo-300'>
                                                            Learning Modules
                                                        </div>
                                                        <div className='font-medium text-black'>
                                                            {
                                                                roadmap.steps
                                                                    .length
                                                            }{' '}
                                                            Learning Modules
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='relative'>
                                            <div className='absolute left-8 top-0 bottom-0 w-1 bg-indigo-100 dark:bg-indigo-900/50'></div>

                                            {roadmap.steps.map(
                                                (step, index) => (
                                                    <motion.div
                                                        key={step.id}
                                                        initial={{
                                                            opacity: 0,
                                                            x: -20,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                            delay: index * 0.1,
                                                        }}
                                                        className='relative mb-8 last:mb-0'
                                                    >
                                                        <div className='flex'>
                                                            <div className='flex-shrink-0 relative'>
                                                                <div className='relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-[#1e1f2e] border-4 border-indigo-100 dark:border-indigo-900/50 shadow-sm'>
                                                                    <span className='text-lg font-bold text-primary-white'>
                                                                        {
                                                                            step.id
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className='ml-6 flex-1'>
                                                                <div className='bg-white/80 dark:bg-[#1e1f2e]/80 backdrop-blur-sm rounded-xl p-6 border border-indigo-100/30 dark:border-indigo-800/30 shadow-sm'>
                                                                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4'>
                                                                        <div>
                                                                            <h4 className='text-xl font-semibold text-black'>
                                                                                {
                                                                                    step.title
                                                                                }
                                                                            </h4>
                                                                            <p className='text-dark-gray'>
                                                                                {
                                                                                    step.description
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <div className='flex flex-wrap gap-2 items-center'>
                                                                            <span className='px-3 py-1 rounded-full text-xs bg-primary-light dark:bg-primary text-primary-white'>
                                                                                {
                                                                                    step.duration
                                                                                }
                                                                            </span>
                                                                            <span
                                                                                className={`px-3 py-1 rounded-full text-xs ${getDifficultyColor(
                                                                                    step.difficulty,
                                                                                )}`}
                                                                            >
                                                                                {
                                                                                    step.difficulty
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                    <div className='mb-4'>
                                                                        <h5 className='text-sm font-medium text-black mb-2'>
                                                                            Skills
                                                                            You&apos;ll
                                                                            Learn:
                                                                        </h5>
                                                                        <div className='flex flex-wrap gap-2'>
                                                                            {step.skills.map(
                                                                                (
                                                                                    skill,
                                                                                    skillIndex,
                                                                                ) => (
                                                                                    <span
                                                                                        key={
                                                                                            skillIndex
                                                                                        }
                                                                                        className='px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded text-xs'
                                                                                    >
                                                                                        {
                                                                                            skill
                                                                                        }
                                                                                    </span>
                                                                                ),
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    {step.projects &&
                                                                        step
                                                                            .projects
                                                                            .length >
                                                                            0 && (
                                                                            <div>
                                                                                <h5 className='text-sm font-medium text-black mb-2'>
                                                                                    Projects:
                                                                                </h5>
                                                                                <ul className='list-disc list-inside text-dark-gray text-sm space-y-1'>
                                                                                    {step.projects.map(
                                                                                        (
                                                                                            project,
                                                                                            projectIndex,
                                                                                        ) => (
                                                                                            <li
                                                                                                key={
                                                                                                    projectIndex
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    project
                                                                                                }
                                                                                            </li>
                                                                                        ),
                                                                                    )}
                                                                                </ul>
                                                                            </div>
                                                                        )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ),
                                            )}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </TabsContent>
                        ))}
                    </Tabs>
                </motion.div>
            </div>
        </section>
    );
}
