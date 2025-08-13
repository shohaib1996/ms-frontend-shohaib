import { School, GraduationCap, CheckCircle2, Medal } from 'lucide-react';
import type {
    Program,
    Course,
    Testimonial,
    Instructor,
    Accreditation,
    Document,
    HeroStat,
    EnrollmentData,
    CompletionData,
} from '@/types/organization';

// Programs data
export const programsData: Program[] = [
    {
        id: 1,
        title: 'Web Development Bootcamp',
        description:
            'Learn full-stack web development with modern frameworks and tools.',
        duration: '12 weeks',
        students: 120,
        rating: 4.8,
        image: '/placeholder.svg?height=200&width=400',
    },
    {
        id: 2,
        title: 'Data Science Fundamentals',
        description:
            'Master data analysis, visualization, and machine learning techniques.',
        duration: '10 weeks',
        students: 85,
        rating: 4.7,
        image: '/placeholder.svg?height=200&width=400',
    },
    {
        id: 3,
        title: 'UX/UI Design Intensive',
        description:
            'Learn user experience design principles and create stunning interfaces.',
        duration: '8 weeks',
        students: 65,
        rating: 4.9,
        image: '/placeholder.svg?height=200&width=400',
    },
];

// Courses data
export const coursesData: Course[] = [
    {
        id: 1,
        title: 'JavaScript Fundamentals',
        description:
            'Master the core concepts of JavaScript programming language.',
        duration: '4 weeks',
        level: 'Beginner',
        rating: 4.6,
        image: '/placeholder.svg?height=200&width=400',
    },
    {
        id: 2,
        title: 'React.js Deep Dive',
        description:
            'Build complex, interactive UIs with React and related libraries.',
        duration: '6 weeks',
        level: 'Intermediate',
        rating: 4.9,
        image: '/placeholder.svg?height=200&width=400',
    },
    {
        id: 3,
        title: 'Python for Data Analysis',
        description:
            'Learn to analyze and visualize data using Python and popular libraries.',
        duration: '5 weeks',
        level: 'Intermediate',
        rating: 4.7,
        image: '/placeholder.svg?height=200&width=400',
    },
    {
        id: 4,
        title: 'UI/UX Design Principles',
        description:
            'Learn the fundamentals of user interface and experience design.',
        duration: '3 weeks',
        level: 'Beginner',
        rating: 4.8,
        image: '/placeholder.svg?height=200&width=400',
    },
    {
        id: 5,
        title: 'Advanced Machine Learning',
        description: 'Implement advanced ML algorithms and neural networks.',
        duration: '8 weeks',
        level: 'Advanced',
        rating: 4.5,
        image: '/placeholder.svg?height=200&width=400',
    },
    {
        id: 6,
        title: 'DevOps & CI/CD',
        description: 'Master continuous integration and deployment workflows.',
        duration: '6 weeks',
        level: 'Intermediate',
        rating: 4.6,
        image: '/placeholder.svg?height=200&width=400',
    },
];

// Testimonials data
// export const testimonials: Testimonial[] = [
//     {
//         id: 1,
//         name: 'Sarah Johnson',
//         role: 'Web Developer',
//         company: 'TechCorp',
//         content:
//             'The bootcamp completely transformed my career. I went from knowing almost nothing about coding to landing a job as a full-stack developer within 3 months of graduation.',
//         avatar: '/placeholder.svg?height=80&width=80',
//     },
//     {
//         id: 2,
//         name: 'Michael Chen',
//         role: 'Data Analyst',
//         company: 'DataViz Inc',
//         content:
//             'The instructors were incredibly knowledgeable and supportive. The curriculum was challenging but well-structured, and the career services were exceptional.',
//         avatar: '/placeholder.svg?height=80&width=80',
//     },
//     {
//         id: 3,
//         name: 'Jessica Williams',
//         role: 'UX Designer',
//         company: 'Creative Solutions',
//         content:
//             'I appreciated the hands-on approach and real-world projects. The portfolio I built during the program helped me stand out to employers.',
//         avatar: '/placeholder.svg?height=80&width=80',
//     },
// ];

// Instructors data
export const instructorsData: Instructor[] = [
    {
        id: 1,
        name: 'Dr. Robert Chen',
        role: 'Lead Instructor, Web Development',
        bio: 'Former senior engineer at Google with 15+ years of industry experience. PhD in Computer Science from Stanford.',
        expertise: ['JavaScript', 'React', 'Node.js', 'System Architecture'],
        image: '/placeholder.svg?height=300&width=300',
    },
    {
        id: 2,
        name: 'Emily Johnson',
        role: 'Lead Instructor, Data Science',
        bio: 'Data scientist with experience at Amazon and Netflix. Masters in Statistics from MIT.',
        expertise: [
            'Python',
            'Machine Learning',
            'Data Visualization',
            'Statistical Analysis',
        ],
        image: '/placeholder.svg?height=300&width=300',
    },
    {
        id: 3,
        name: 'Michael Rodriguez',
        role: 'Lead Instructor, UX/UI Design',
        bio: 'Former design lead at Apple with 10+ years in product design. BFA from Rhode Island School of Design.',
        expertise: [
            'UI Design',
            'User Research',
            'Prototyping',
            'Design Systems',
        ],
        image: '/placeholder.svg?height=300&width=300',
    },
    {
        id: 4,
        name: 'Sarah Williams',
        role: 'Career Coach',
        bio: 'Former tech recruiter with experience at top tech companies. Specialized in career transitions into tech.',
        expertise: [
            'Resume Building',
            'Interview Prep',
            'Career Strategy',
            'Networking',
        ],
        image: '/placeholder.svg?height=300&width=300',
    },
];

// Accreditation data
// export const accreditationData: Accreditation[] = [
//     {
//         id: 1,
//         name: 'Council on Higher Education Accreditation',
//         description: 'Nationally recognized educational accreditation.',
//         year: '2019',
//         icon: School,
//     },
//     {
//         id: 2,
//         name: 'National Association of Career Colleges',
//         description: 'Member in good standing since 2017.',
//         year: '2017',
//         icon: GraduationCap,
//     },
//     {
//         id: 3,
//         name: 'Tech Education Standards Board',
//         description: 'Certified curriculum meeting industry standards.',
//         year: '2020',
//         icon: CheckCircle2,
//     },
//     {
//         id: 4,
//         name: 'International Association of Technical Education',
//         description: 'Gold standard certification for technical training.',
//         year: '2021',
//         icon: Medal,
//     },
// ];

// Documents data
export const documentsData: Document[] = [
    {
        id: 1,
        name: 'Course Catalog',
        description: 'Complete listing of all courses and programs offered.',
        type: 'PDF',
        size: '2.4 MB',
        url: '#',
    },
    {
        id: 2,
        name: 'Student Handbook',
        description:
            'Policies, procedures, and resources for enrolled students.',
        type: 'PDF',
        size: '3.1 MB',
        url: '#',
    },
    {
        id: 3,
        name: 'Accreditation Certificates',
        description:
            'Official documentation of our institutional accreditations.',
        type: 'ZIP',
        size: '4.7 MB',
        url: '#',
    },
    {
        id: 4,
        name: 'Annual Report',
        description: 'Performance metrics and outcomes from the previous year.',
        type: 'PDF',
        size: '5.2 MB',
        url: '#',
    },
];

// Stats for hero section
export const heroStats: HeroStat[] = [
    { label: 'Students Trained', value: '10,000+' },
    { label: 'Job Placement Rate', value: '92%' },
    { label: 'Industry Partners', value: '150+' },
];

// Mock data for charts
// export const enrollmentData: EnrollmentData[] = [
//     { month: 'Jan', students: 65 },
//     { month: 'Feb', students: 59 },
//     { month: 'Mar', students: 80 },
//     { month: 'Apr', students: 81 },
//     { month: 'May', students: 56 },
//     { month: 'Jun', students: 55 },
//     { month: 'Jul', students: 40 },
//     { month: 'Aug', students: 70 },
//     { month: 'Sep', students: 90 },
//     { month: 'Oct', students: 110 },
//     { month: 'Nov', students: 105 },
//     { month: 'Dec', students: 95 },
// ];

export const courseCompletionData: CompletionData[] = [
    { name: 'Completed', value: 78 },
    { name: 'In Progress', value: 15 },
    { name: 'Dropped', value: 7 },
];

export const COLORS = ['#0088FE', '#00C49F', '#FF8042'];
