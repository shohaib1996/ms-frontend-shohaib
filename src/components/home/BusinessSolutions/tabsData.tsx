import {
    FileText,
    Users,
    MessageSquare,
    BarChart3,
    Calendar,
    Zap,
    CalendarDays,
    ChartNoAxesColumnIncreasing,
    MessageSquareMore,
} from 'lucide-react';

export const tabsData = {
    content: {
        title: 'Content Management',
        description: 'Create and organize your coaching materials with ease',
        icon: <FileText className='h-5 w-5' />,
        benefits: [
            'Drag-and-drop content builder',
            'Multimedia lesson support',
            'Automated content organization',
            'Version control and scheduling',
            'Student progress tracking',
        ],
        image: '/dashboard_img.png',
        callout: {
            text: 'Boost Engagement',
            value: '47%',
        },
    },
    student: {
        title: 'Student Engagement',
        description:
            'Keep your students motivated and on track to complete your program',
        icon: <Users className='h-5 w-5' />,
        benefits: [
            'Personalized learning paths',
            'Gamification and achievement badges',
            'Progress visualization tools',
            'Automated check-ins and reminders',
            'Community and peer support features',
        ],
        image: '/student_engagement.png',
        callout: {
            text: 'Completion rates up',
            value: '68%',
        },
    },
    communication: {
        title: 'Communication Tools',
        description:
            'Stay connected with your students through integrated messaging',
        icon: <MessageSquareMore className='h-5 w-5' />,
        benefits: [
            'Group and private messaging',
            'Video conferencing integration',
            'Automated notifications',
            'Email and SMS campaigns',
            'Feedback collection tools',
        ],
        image: '/communication_tools.png',
        callout: {
            text: 'Response time reduced',
            value: '82%',
        },
    },
    analytics: {
        title: 'Advanced Analytics',
        description:
            'Make data-driven decisions to improve your coaching business',
        icon: <ChartNoAxesColumnIncreasing className='h-5 w-5' />,
        benefits: [
            'Student engagement metrics',
            'Revenue and sales tracking',
            'Content performance analysis',
            'Conversion rate optimization',
            'Predictive analytics for growth',
        ],
        image: '/advanced_analytics.png',
        callout: {
            text: 'Revenue insights increased',
            value: '53%',
        },
    },
    scheduling: {
        title: 'Smart Scheduling',
        description: 'Streamline appointment booking and calendar management',
        icon: <CalendarDays className='h-5 w-5' />,
        benefits: [
            'Automated booking system',
            'Calendar synchronization',
            'Time zone management',
            'Group and 1:1 session scheduling',
            'Reminder and follow-up automation',
        ],
        image: '/smart_scheduling.png',
        callout: {
            text: 'Administrative time reduced',
            value: '75%',
        },
    },
    workflow: {
        title: 'Workflow Automation',
        description:
            'Automate repetitive tasks and streamline your coaching operations',
        icon: <Zap className='h-5 w-5' />,
        benefits: [
            'Custom automation workflows',
            'Triggered actions and sequences',
            'Student onboarding automation',
            'Payment and invoice processing',
            'Certificate and credential issuance',
        ],
        image: '/workflow_automation.png',
        callout: {
            text: 'Operational efficiency up',
            value: '63%',
        },
    },
};
