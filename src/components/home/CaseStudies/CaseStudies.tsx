import GlobalTitle from '@/components/global/GlobalTitle';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import CaseStudyCard from './CaseStudyCard';

const caseStudiesData = [
    {
        name: 'Jack Thompson',
        title: 'Career Development Coach',
        image: '/CaseStudies/person_1.png',
        background:
            'Jack had 15 years of HR experience but struggled to build a structured coaching program around his expertise.',
        challenge:
            'His DIY approach using multiple tools led to a disjointed student experience and 40% drop-out rate.',
        solutions: [
            'Integrated all content into SkillBNK',
            'Implemented progress tracking system',
            'Created automated check-in sequences',
        ],
        results: [
            'Doubled completion rates',
            'Increased referrals by 300%',
            'Grew revenue from $15K to $450K/year',
        ],
        downloadLink: '#',
    },
    {
        name: 'Marcus Rodriguez',
        title: 'Software Engineering Coach',
        image: '/CaseStudies/person_2.jpg',
        background:
            'Marcus was an expert developer trying to help career-switchers break into tech while working full-time.',
        challenge:
            'Limited by time constraints and lack of structured systems for student management.',
        solutions: [
            'Deployed ready-made tech assessment tools',
            'Leveraged AI-driven student insights',
            'Automated routine communications',
        ],
        results: [
            'Scaled to 75 students while keeping his job',
            'Generated $750K in annual revenue',
            'Reduced administrative time by 85%',
        ],
        downloadLink: '#',
    },
    {
        name: 'Jennifer Wu',
        title: 'Business Growth Coach',
        image: '/CaseStudies/person_3.jpg',
        background:
            'Jennifer had valuable experience scaling startups but struggled with content organization and student engagement.',
        challenge:
            'Her coaching was effective, but operations and student management consumed 30+ hours weekly.',
        solutions: [
            'Centralized all operations on one platform',
            'Implemented student dashboard system',
            'Created milestone-based progress tracking',
        ],
        results: [
            'Increased student satisfaction by 85%',
            'Expanded to 3 different coaching programs',
            'Grew average student LTV from $10K to $28K',
        ],
        downloadLink: '#',
    },
];

const CaseStudies = () => {
    return (
        <div className='bg-foreground w-full mx-auto'>
            <div className='flex flex-col gap-2 items-center justify-center py-12 my-container'>
                <Button
                    variant={'primary_light'}
                    className='h-[26px] rounded-full border-none shadow-md flex items-center gap-1 mb-2'
                >
                    <FileText className='h-3.5 w-3.5' />
                    Success Stories
                </Button>
                <GlobalTitle
                    title='Comprehensive Case Studies'
                    subTitle='See how coaches like you are finding success on our platform'
                />
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full mt-4'>
                    {caseStudiesData.map((caseStudy, index) => (
                        <CaseStudyCard
                            key={index}
                            name={caseStudy.name}
                            title={caseStudy.title}
                            image={caseStudy.image}
                            background={caseStudy.background}
                            challenge={caseStudy.challenge}
                            solutions={caseStudy.solutions}
                            results={caseStudy.results}
                            downloadLink={caseStudy.downloadLink}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CaseStudies;
