import type React from 'react';
import MessagePreview from '../global/MarkdownPreview';

interface RequirementsProps {
    requirements: string;
    className?: string;
}

const Requirements: React.FC<RequirementsProps> = ({
    requirements,
    className,
}) => {
    if (!requirements) {
        return null;
    }

    return (
        <section className='xl:py-6 py-6 bg-gradient-to-b from-slate-50 dark:from-slate-900 dark:to-slate-950 to-white'>
            <div className='my-container'>
                <div className='text-center mb-4'>
                    <h2 className='text-3xl md:text-4xl font-bold text-black mb-4'>
                        Requirements
                    </h2>
                    <div className='w-20 h-1 bg-primary mx-auto rounded-full'></div>
                </div>

                <div className='max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 md:p-8'>
                    <div className='prose prose-slate dark:prose-invert text-dark-gray max-w-none'>
                        <MessagePreview text={requirements} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Requirements;
