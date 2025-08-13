import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
const whyChooseBootcampsHub = '/why-choose.png';

const WhyChooseBootcampsHub = () => {
    return (
        <div className='my-container mx-auto py-8 mt-20 px-4 gap-5 font-sans text-black flex items-center'>
            <div className='flex-1'>
                <h1 className='text-3xl font-bold mb-2'>Why Choose SkillBNK</h1>
                <p className='mb-6'>
                    SkillBNK differentiates itself from other Learning
                    Management Systems (LMS) in the market through several key
                    aspects:
                </p>

                <div className='space-y-4 mb-6'>
                    <div className='flex gap-2'>
                        <span className='text-green-500 mt-1 flex-shrink-0'>
                            ✓
                        </span>
                        <div>
                            <span className='font-bold'>Unified Platform:</span>{' '}
                            Unlike traditional LMSs that often require the use
                            of multiple applications for different
                            functionalities, SkillBNK offers a comprehensive
                            solution. This unified approach reduces the
                            complexity and exhaustion associated with using
                            multiple platforms for educational purposes.
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <span className='text-green-500 mt-1 flex-shrink-0'>
                            ✓
                        </span>
                        <div>
                            <span className='font-bold'>
                                Modern and User-Friendly Interface:
                            </span>{' '}
                            The platform addresses a common issue with many LMSs
                            - outdated and cumbersome user interfaces.SkillBNK
                            provides a more modern, intuitive, and user-friendly
                            experience for both students and educational
                            institutions.
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <span className='text-green-500 mt-1 flex-shrink-0'>
                            ✓
                        </span>
                        <div>
                            <span className='font-bold'>
                                Solving Real Problems:
                            </span>{' '}
                            The design and functionality of SkillBNK are
                            specifically tailored to address challenges that are
                            overlooked by other platforms. This includes
                            streamlining various educational processes and
                            integrating diverse content and tools into a single,
                            cohesive system.
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <span className='text-green-500 mt-1 flex-shrink-0'>
                            ✓
                        </span>
                        <div>
                            <span className='font-bold'>
                                AI and Automation:
                            </span>{' '}
                            A significant feature of SkillBNK is its use of AI
                            and automation. These technologies are leveraged to
                            optimize learning experiences, administrative
                            processes, and overall efficiency, setting it apart
                            from traditional LMSs.
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <span className='text-green-500 mt-1 flex-shrink-0'>
                            ✓
                        </span>
                        <div>
                            <span className='font-bold'>
                                Cost and Overhead Reduction:
                            </span>{' '}
                            By employing AI and automation, SkillBNK helps
                            schools reduce overhead costs and improve processes.
                            This can lead to increased revenue and more
                            efficient management of resources.
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <span className='text-green-500 mt-1 flex-shrink-0'>
                            ✓
                        </span>
                        <div>
                            <span className='font-bold'>
                                Personalized Demos and Founder Interaction:
                            </span>{' '}
                            SkillBNK offers personalized demonstrations to
                            interested parties, allowing them to meet with the
                            founder and understand how the platform can
                            specifically benefit their institution.
                        </div>
                    </div>
                </div>

                <p className='mb-6'>
                    These features collectively make SkillBNK a standout choice
                    in the crowded LMS market. Its focus on modernization, ease
                    of use, problem-solving, and the integration of advanced
                    technologies like AI positions it as a forward-thinking
                    solution for educational needs. Schools and training
                    institutions are encouraged to book a demo to explore how
                    SkillBNK can revolutionize their processes, reduce costs,
                    and enhance learning outcomes.
                </p>

                <button className='bg-primary text-pure-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors'>
                    Book A Demo <ArrowRight className='h-4 w-4' />
                </button>
            </div>

            <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-tr from-emerald-100 to-sky-100 rounded-3xl transform rotate-2 opacity-70'></div>
                <div className='relative overflow-hidden rounded-2xl shadow-lg'>
                    <Image
                        src={whyChooseBootcampsHub}
                        alt='About SkillBNK'
                        width={600}
                        height={400}
                        className='w-full h-auto object-cover'
                    />
                </div>
            </div>
        </div>
    );
};

export default WhyChooseBootcampsHub;
