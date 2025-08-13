'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Rocket,
    Brain,
    Clock,
    Users,
    Globe,
    DollarSign,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Mic,
    Video,
    BookOpen,
    Puzzle,
    MessageSquare,
    Trophy,
    TrendingUp,
    Building,
    GraduationCap,
    Monitor,
    FileText,
    Youtube,
    UserPlus,
    BarChart3,
    Sparkles,
    Gift,
    User,
    ArrowRight,
    Phone,
    Share2,
} from 'lucide-react';

export default function HomePage() {
    return (
        <div className='min-h-screen bg-white dark:bg-gray-900'>
            {/* Hero Section */}
            <section className='bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white py-20 pt-40'>
                <div className='container mx-auto px-6 text-center'>
                    <div className='flex items-center justify-center gap-2 mb-6'>
                        <Rocket className='w-8 h-8 text-red-400' />
                        <h1 className='text-5xl font-bold'>
                            AI Course Creator
                        </h1>
                    </div>
                    <p className='text-2xl mb-4 text-blue-200'>
                        Build. Scale. Earn. On Autopilot.
                    </p>
                    <p className='text-xl mb-8 text-gray-300'>
                        A Game-Changer for Educators, Trainers & Content
                        Creators Worldwide.
                    </p>
                    <p className='text-lg mb-6 text-gray-400'>
                        Welcome to the future of training and course creation —
                        built by SDB IT and proudly powered by SkillBNK.
                    </p>
                    <div className='bg-red-600 text-white px-6 py-3 rounded-lg inline-block mb-8 font-semibold'>
                        Create a complete, multilingual course in just 10
                        minutes. Start selling in 11.
                    </div>
                    <div className='flex gap-4 justify-center'>
                        <Button
                            onClick={() => alert('Coming soon')}
                            size='lg'
                            className='bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg'
                        >
                            Start Free Trial
                        </Button>
                        <Button
                            size='lg'
                            variant='outline'
                            className='border-white bg-transparent text-white hover:text-black px-8 py-4 text-lg dark:border-white dark:text-white dark:hover:text-black'
                            onClick={() => alert('Coming soon')}
                        >
                            Watch Demo
                        </Button>
                    </div>
                </div>
            </section>
            {/* What Is AI Course Creator */}
            <section className='py-16 bg-gray-50 dark:bg-gray-800'>
                <div className='container mx-auto px-6'>
                    <div className='flex items-center justify-center gap-3 mb-8'>
                        <Brain className='w-8 h-8 text-purple-600' />
                        <h2 className='text-4xl font-bold text-black dark:text-white'>
                            What Is AI Course Creator?
                        </h2>
                    </div>{' '}
                    <p className='text-xl text-gray-700 dark:text-gray-300 text-center mb-12 max-w-4xl mx-auto'>
                        A revolutionary end-to-end AI-powered course creation
                        tool designed to help content creators, trainers, and
                        education businesses build professional courses in
                        record time — no video editing, no design teams, no
                        complex software.
                    </p>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        <Card className='border-purple-200 hover:border-purple-400 transition-colors dark:bg-gray-700 dark:border-purple-300'>
                            <CardContent className='p-6 text-center'>
                                <Mic className='w-12 h-12 text-blue-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg mb-2 dark:text-white'>
                                    Multi-language voiceovers & subtitles
                                </h3>
                            </CardContent>
                        </Card>

                        <Card className='border-purple-200 hover:border-purple-400 transition-colors dark:bg-gray-700 dark:border-purple-300'>
                            <CardContent className='p-6 text-center'>
                                <Video className='w-12 h-12 text-red-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg mb-2 dark:text-white'>
                                    Auto-generated videos, presentations,
                                    quizzes
                                </h3>
                            </CardContent>
                        </Card>

                        <Card className='border-purple-200 hover:border-purple-400 transition-colors dark:bg-gray-700 dark:border-purple-300'>
                            <CardContent className='p-6 text-center'>
                                <BookOpen className='w-12 h-12 text-purple-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg mb-2 dark:text-white'>
                                    Instant documentation & product tutorials
                                </h3>
                            </CardContent>
                        </Card>

                        <Card className='border-purple-200 hover:border-purple-400 transition-colors dark:bg-gray-700 dark:border-purple-300'>
                            <CardContent className='p-6 text-center'>
                                <Puzzle className='w-12 h-12 text-blue-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    Visualizations, animations, and
                                    audio-to-video generation
                                </h3>
                            </CardContent>
                        </Card>

                        <Card className='border-purple-200 hover:border-purple-400 transition-colors dark:bg-gray-700 dark:border-purple-300'>
                            <CardContent className='p-6 text-center'>
                                <MessageSquare className='w-12 h-12 text-red-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg mb-2 dark:text-white'>
                                    Natural language content building from
                                    scratch
                                </h3>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>{' '}
            {/* Comparison Table */}
            <section className='py-16 dark:bg-gray-900'>
                <div className='container mx-auto px-6'>
                    <div className='flex items-center justify-center gap-3 mb-12'>
                        <Trophy className='w-8 h-8 text-red-600' />
                        <h2 className='text-4xl font-bold text-black dark:text-white'>
                            Why It&apos;s Better than Traditional Platforms
                        </h2>
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg'>
                            <thead className='bg-gradient-to-r from-purple-600 to-blue-600 text-white'>
                                <tr>
                                    <th className='p-4 text-left font-semibold'>
                                        Feature
                                    </th>
                                    <th className='p-4 text-center font-semibold'>
                                        AI Course Creator
                                    </th>
                                    <th className='p-4 text-center font-semibold'>
                                        Udemy / Coursera
                                    </th>
                                    <th className='p-4 text-center font-semibold'>
                                        Other AI Tools
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {' '}
                                <tr className='border-b dark:border-gray-600'>
                                    <td className='p-4 font-medium text-gray-900 dark:text-white'>
                                        Content Creation Time
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-red-600 font-semibold'>
                                            <Clock className='w-4 h-4' />
                                            10 minutes
                                        </div>
                                    </td>
                                    <td className='p-4 text-center'>
                                        {' '}
                                        <div className='flex items-center justify-center gap-2 text-red-500'>
                                            <XCircle className='w-4 h-4' />
                                            300+ hours
                                        </div>
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-yellow-600'>
                                            <AlertTriangle className='w-4 h-4' />
                                            25–50 hours
                                        </div>
                                    </td>
                                </tr>{' '}
                                <tr className='border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
                                    <td className='p-4 font-medium text-gray-900 dark:text-white'>
                                        Professional Team Required
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-green-600'>
                                            <XCircle className='w-4 h-4' />
                                            Not Needed
                                        </div>
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-red-500'>
                                            <CheckCircle className='w-4 h-4' />
                                            Yes
                                        </div>
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-yellow-600'>
                                            <AlertTriangle className='w-4 h-4' />
                                            Sometimes
                                        </div>
                                    </td>
                                </tr>{' '}
                                <tr className='border-b dark:border-gray-600'>
                                    <td className='p-4 font-medium text-gray-900 dark:text-white'>
                                        Multilingual Auto Generation
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-green-600'>
                                            <CheckCircle className='w-4 h-4' />
                                            Built-In
                                        </div>
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-red-500'>
                                            <XCircle className='w-4 h-4' />
                                            Limited
                                        </div>
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-yellow-600'>
                                            <AlertTriangle className='w-4 h-4' />
                                            Add-on
                                        </div>
                                    </td>
                                </tr>{' '}
                                <tr className='border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
                                    <td className='p-4 font-medium text-gray-900 dark:text-white'>
                                        Ownership & Export
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-green-600'>
                                            <CheckCircle className='w-4 h-4' />
                                            100% Yours
                                        </div>
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-red-500'>
                                            <XCircle className='w-4 h-4' />
                                            Limited Rights
                                        </div>
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-yellow-600'>
                                            <AlertTriangle className='w-4 h-4' />
                                            Often Locked
                                        </div>
                                    </td>
                                </tr>{' '}
                                <tr className='border-b dark:border-gray-600'>
                                    <td className='p-4 font-medium text-gray-900 dark:text-white'>
                                        Revenue Share
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-green-600 font-semibold'>
                                            <DollarSign className='w-4 h-4' />
                                            100%
                                        </div>
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-red-500'>
                                            <XCircle className='w-4 h-4' />
                                            30–40%
                                        </div>
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-yellow-600'>
                                            <AlertTriangle className='w-4 h-4' />
                                            Varies
                                        </div>
                                    </td>
                                </tr>{' '}
                                <tr>
                                    <td className='p-4 font-medium text-gray-900 dark:text-white'>
                                        Scalability
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-purple-600 font-semibold'>
                                            <Rocket className='w-4 h-4' />
                                            Fully Auto
                                        </div>
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-red-500'>
                                            <XCircle className='w-4 h-4' />
                                            Manual Scaling
                                        </div>
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className='flex items-center justify-center gap-2 text-yellow-600'>
                                            <AlertTriangle className='w-4 h-4' />
                                            Tool-Dependent
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            {/* ROI Section */}{' '}
            <section className='py-16 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20'>
                <div className='container mx-auto px-6'>
                    <div className='flex items-center justify-center gap-3 mb-12'>
                        <DollarSign className='w-8 h-8 text-green-600' />
                        <h2 className='text-4xl font-bold text-black dark:text-white'>
                            Return on Investment (ROI)
                        </h2>
                    </div>

                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
                        <Card className='text-center border-green-200 dark:bg-gray-800 dark:border-green-300'>
                            <CardContent className='p-6'>
                                <TrendingUp className='w-12 h-12 text-green-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg mb-2 dark:text-white'>
                                    Save 70–80%
                                </h3>
                                <p className='text-gray-600 dark:text-gray-300'>
                                    of your production time
                                </p>
                            </CardContent>
                        </Card>

                        <Card className='text-center border-blue-200 dark:bg-gray-800 dark:border-blue-300'>
                            <CardContent className='p-6'>
                                <Users className='w-12 h-12 text-blue-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg mb-2 dark:text-white'>
                                    Avoid Hiring
                                </h3>
                                <p className='text-gray-600 dark:text-gray-300'>
                                    content designers, editors, translators,
                                    voiceover artists
                                </p>
                            </CardContent>
                        </Card>

                        <Card className='text-center border-purple-200 dark:bg-gray-800 dark:border-purple-300'>
                            <CardContent className='p-6'>
                                <Globe className='w-12 h-12 text-purple-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg mb-2 dark:text-white'>
                                    Sell Globally
                                </h3>
                                <p className='text-gray-600 dark:text-gray-300'>
                                    across multiple platforms, languages, and
                                    formats
                                </p>
                            </CardContent>
                        </Card>

                        <Card className='text-center border-red-200 dark:bg-gray-800 dark:border-red-300'>
                            <CardContent className='p-6'>
                                <Rocket className='w-12 h-12 text-red-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg mb-2 dark:text-white'>
                                    7-Figure Potential
                                </h3>
                                <p className='text-gray-600 dark:text-gray-300'>
                                    by scaling with teams or as an agency
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className='bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg'>
                        <h3 className='text-2xl font-bold mb-6 text-center dark:text-white'>
                            Cost Comparison Example
                        </h3>
                        <div className='grid md:grid-cols-2 gap-8'>
                            <div className='text-center'>
                                <h4 className='text-xl font-semibold text-red-600 mb-4'>
                                    Traditional Cost
                                </h4>
                                <div className='text-4xl font-bold text-red-600 mb-2'>
                                    $25,000–$50,000
                                </div>
                                <p className='text-gray-600 dark:text-gray-300'>
                                    per course
                                </p>
                            </div>
                            <div className='text-center'>
                                <h4 className='text-xl font-semibold text-green-600 mb-4'>
                                    With AI Course Creator
                                </h4>
                                <div className='text-4xl font-bold text-green-600 mb-2'>
                                    Under $500
                                </div>
                                <p className='text-gray-600 dark:text-gray-300'>
                                    per course
                                </p>
                            </div>
                        </div>
                        <div className='text-center mt-8'>
                            <div className='bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg inline-block'>
                                <span className='text-xl font-bold'>
                                    ROI: 10x–100x faster, cheaper, and more
                                    scalable
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Scalability Section */}
            <section className='py-16 dark:bg-gray-900'>
                <div className='container mx-auto px-6'>
                    <div className='flex items-center justify-center gap-3 mb-12'>
                        <Globe className='w-8 h-8 text-blue-600' />
                        <h2 className='text-4xl font-bold text-black dark:text-white'>
                            Scalable, Sustainable, Global Impact
                        </h2>
                    </div>{' '}
                    <p className='text-xl text-center mb-12 text-gray-700 dark:text-gray-300'>
                        This is not just a tool — it&apos;s your complete growth
                        system:
                    </p>
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        <Card className='text-center border-purple-200 hover:border-purple-400 transition-colors dark:bg-gray-800 dark:border-purple-300'>
                            <CardContent className='p-6'>
                                <User className='w-12 h-12 text-purple-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    Build your personal brand or training
                                    business
                                </h3>
                            </CardContent>{' '}
                        </Card>

                        <Card className='text-center border-blue-200 hover:border-blue-400 transition-colors dark:bg-gray-800 dark:border-blue-300'>
                            <CardContent className='p-6'>
                                <Building className='w-12 h-12 text-blue-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    Launch a franchise or agency model
                                </h3>
                            </CardContent>
                        </Card>

                        <Card className='text-center border-red-200 hover:border-red-400 transition-colors dark:bg-gray-800 dark:border-red-300'>
                            <CardContent className='p-6'>
                                <Users className='w-12 h-12 text-red-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    Empower teams, assign credits, and manage
                                    collaboration
                                </h3>
                            </CardContent>
                        </Card>

                        <Card className='text-center border-green-200 hover:border-green-400 transition-colors dark:bg-gray-800 dark:border-green-300'>
                            <CardContent className='p-6'>
                                <Share2 className='w-12 h-12 text-green-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    Export & distribute content anywhere: LMS,
                                    websites, or marketplaces
                                </h3>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            {/* Use Cases */}
            <section className='py-16 bg-gray-50 dark:bg-gray-800'>
                <div className='container mx-auto px-6'>
                    <h2 className='text-4xl font-bold text-center mb-12 text-black dark:text-white'>
                        Use Cases
                    </h2>

                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        <Card className='border-purple-200 hover:border-purple-400 transition-colors dark:bg-gray-700 dark:border-purple-300'>
                            <CardContent className='p-6 text-center'>
                                <Building className='w-12 h-12 text-purple-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    Corporate Training Solutions
                                </h3>
                            </CardContent>
                        </Card>

                        <Card className='border-blue-200 hover:border-blue-400 transition-colors dark:bg-gray-700 dark:border-blue-300'>
                            <CardContent className='p-6 text-center'>
                                <GraduationCap className='w-12 h-12 text-blue-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    Bootcamps & Coaching Programs
                                </h3>
                            </CardContent>
                        </Card>

                        <Card className='border-red-200 hover:border-red-400 transition-colors dark:bg-gray-700 dark:border-red-300'>
                            <CardContent className='p-6 text-center'>
                                <Monitor className='w-12 h-12 text-red-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    Software/Product Walkthroughs
                                </h3>
                            </CardContent>
                        </Card>

                        <Card className='border-green-200 hover:border-green-400 transition-colors dark:bg-gray-700 dark:border-green-300'>
                            <CardContent className='p-6 text-center'>
                                <FileText className='w-12 h-12 text-green-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    Internal Team Documentation
                                </h3>
                            </CardContent>
                        </Card>

                        <Card className='border-purple-200 hover:border-purple-400 transition-colors dark:bg-gray-700 dark:border-purple-300'>
                            <CardContent className='p-6 text-center'>
                                <Youtube className='w-12 h-12 text-purple-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    YouTube or Course Monetization
                                </h3>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            {/* Team Features */}
            <section className='py-16 dark:bg-gray-900'>
                <div className='container mx-auto px-6'>
                    <div className='flex items-center justify-center gap-3 mb-12'>
                        <Puzzle className='w-8 h-8 text-purple-600' />
                        <h2 className='text-4xl font-bold text-black dark:text-white'>
                            Bonus: Built-In Features for Teams
                        </h2>
                    </div>

                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        <Card className='text-center border-purple-200 dark:bg-gray-800 dark:border-purple-300'>
                            <CardContent className='p-6'>
                                <UserPlus className='w-12 h-12 text-purple-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    Invite team members & assign course creation
                                    credits
                                </h3>
                            </CardContent>
                        </Card>

                        <Card className='text-center border-blue-200 dark:bg-gray-800 dark:border-blue-300'>
                            <CardContent className='p-6'>
                                <Rocket className='w-12 h-12 text-blue-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    Create hundreds of courses simultaneously
                                </h3>
                            </CardContent>
                        </Card>

                        <Card className='text-center border-red-200 dark:bg-gray-800 dark:border-red-300'>
                            <CardContent className='p-6'>
                                <Building className='w-12 h-12 text-red-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    White-label and resell your training
                                    services
                                </h3>
                            </CardContent>
                        </Card>

                        <Card className='text-center border-green-200 dark:bg-gray-800 dark:border-green-300'>
                            <CardContent className='p-6'>
                                <BarChart3 className='w-12 h-12 text-green-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    Track production metrics and course
                                    generation KPIs
                                </h3>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            {/* Future Section */}
            <section className='py-16 bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white'>
                <div className='container mx-auto px-6 text-center'>
                    <div className='flex items-center justify-center gap-3 mb-8'>
                        <Sparkles className='w-8 h-8 text-yellow-400' />
                        <h2 className='text-4xl font-bold'>
                            Built for the Future of Learning
                        </h2>
                    </div>
                    <p className='text-xl mb-8 max-w-4xl mx-auto'>
                        AI Course Creator is designed for the next 10–20 years
                        of education innovation. As the world moves toward
                        personalized, on-demand learning — this is your
                        competitive advantage.
                    </p>{' '}
                </div>
            </section>
            {/* Free Trial Section */}
            <section className='py-16 bg-gray-50 dark:bg-gray-800'>
                <div className='container mx-auto px-6 text-center'>
                    <div className='flex items-center justify-center gap-3 mb-8'>
                        <Gift className='w-8 h-8 text-red-600' />
                        <h2 className='text-4xl font-bold text-black dark:text-white'>
                            Start Free – No Setup Required
                        </h2>
                    </div>

                    <div className='grid md:grid-cols-3 gap-6 mb-12'>
                        <Card className='text-center border-red-200 dark:bg-gray-700 dark:border-red-300'>
                            <CardContent className='p-6'>
                                <div className='text-3xl font-bold text-red-600 mb-2'>
                                    600
                                </div>
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    free credits to test every feature
                                </h3>
                            </CardContent>
                        </Card>

                        <Card className='text-center border-blue-200 dark:bg-gray-700 dark:border-blue-300'>
                            <CardContent className='p-6'>
                                <Clock className='w-12 h-12 text-blue-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    No training required – Learn in just 2–3
                                    minutes
                                </h3>
                            </CardContent>
                        </Card>

                        <Card className='text-center border-purple-200 dark:bg-gray-700 dark:border-purple-300'>
                            <CardContent className='p-6'>
                                <Sparkles className='w-12 h-12 text-purple-600 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg dark:text-white'>
                                    Create professional-grade content in seconds
                                </h3>
                            </CardContent>
                        </Card>
                    </div>

                    <Button
                        size='lg'
                        className='bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-xl'
                    >
                        Start Your Free Trial Now
                    </Button>
                </div>
            </section>
            {/* Founder Section */}
            <section className='py-16 dark:bg-gray-900'>
                <div className='container mx-auto px-6'>
                    <div className='flex items-center justify-center gap-3 mb-8'>
                        <User className='w-8 h-8 text-purple-600' />
                        <h2 className='text-4xl font-bold text-black dark:text-white'>
                            From the Visionary Behind It
                        </h2>
                    </div>

                    <Card className='max-w-4xl mx-auto border-purple-200 dark:bg-gray-800 dark:border-purple-300'>
                        <CardContent className='p-8'>
                            {' '}
                            <blockquote className='text-xl italic text-gray-700 dark:text-gray-300 mb-6'>
                                &ldquo;I&apos;m Shiblu Ahmad, founder of TS4U
                                Inc. and SkillBNK. I&apos;ve trained thousands
                                through tech bootcamps — and I built this tool
                                to help creators like you skip the tech hurdles,
                                scale faster, and earn more. Let&apos;s shape
                                the future of education together.&rdquo;
                            </blockquote>
                            <div className='text-right'>
                                <div className='font-semibold text-lg text-purple-600'>
                                    — Shiblu Ahmad
                                </div>
                                <div className='text-gray-600 dark:text-gray-400'>
                                    Founder, TS4U Inc. & SkillBNK
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
            {/* Final CTA Section */}
            <section className='py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white'>
                <div className='container mx-auto px-6 text-center'>
                    <div className='flex items-center justify-center gap-3 mb-8'>
                        <Rocket className='w-8 h-8 text-yellow-400' />
                        <h2 className='text-4xl font-bold'>
                            Ready to Scale Your Training Business?
                        </h2>
                    </div>

                    <div className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
                        <Card className='bg-white/10 border-white/20 text-white'>
                            <CardContent className='p-6 text-center'>
                                <ArrowRight className='w-12 h-12 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg mb-4'>
                                    Sign up now – start creating in minutes
                                </h3>
                                <Button className='bg-red-600 hover:bg-red-700 text-white w-full'>
                                    Get Started Free
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className='bg-white/10 border-white/20 text-white'>
                            <CardContent className='p-6 text-center'>
                                <Phone className='w-12 h-12 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg mb-4'>
                                    Want the done-for-you setup? Contact us for
                                    enterprise solutions
                                </h3>
                                <Button
                                    variant='outline'
                                    className='border-white bg-transparent text-white hover:bg-white hover:text-purple-600 w-full'
                                    onClick={() =>
                                        window.open('tel:+15868765513')
                                    }
                                >
                                    Contact Sales
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className='bg-white/10 border-white/20 text-white'>
                            <CardContent className='p-6 text-center'>
                                <Share2 className='w-12 h-12 mx-auto mb-4' />
                                <h3 className='font-semibold text-lg mb-4'>
                                    Share your feedback – help us grow the
                                    future of learning
                                </h3>
                                <Button
                                    variant='outline'
                                    className='border-white bg-transparent text-white hover:bg-white hover:text-purple-600 w-full'
                                    onClick={() =>
                                        window.open(
                                            'https://www.linkedin.com/company/bootcampshub/',
                                            '_blank',
                                        )
                                    }
                                >
                                    Give Feedback
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>{' '}
            {/* Footer */}
            <footer className='bg-black dark:bg-gray-900 text-white py-8'>
                <div className='container mx-auto px-6 text-center'>
                    <div className='flex items-center justify-center gap-2 mb-4'>
                        <Brain className='w-6 h-6 text-purple-400' />
                        <span className='text-xl font-bold text-white'>
                            AI Course Creator
                        </span>
                    </div>
                    <p className='text-gray-400 dark:text-gray-300 mb-4'>
                        Built by TS4U Inc. • Powered by SkillBNK
                    </p>
                    <p className='text-gray-500 dark:text-gray-400 text-sm'>
                        © 2024 TS4U Inc. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
