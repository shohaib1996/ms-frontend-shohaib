import { cn } from '@/lib/utils';
import { GraduationCap } from 'lucide-react';
import React from 'react';

type NotFoundProps = {
    itemText: string;
    className?: string;
};

export default function NotFoundSection({
    itemText,
    className,
}: NotFoundProps) {
    return (
        <div className='text-center'>
            {/* Icon Container */}
            {/* <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-8">
                <GraduationCap className="w-12 h-12 text-purple-600" />
            </div> */}

            {/* Main Content */}
            <div className='max-w-md mx-auto'>
                <h3
                    className={cn(
                        'text-lg font-semibold text-gray-900 mb-3',
                        className,
                    )}
                >
                    {itemText}
                </h3>
                {/* <p className="text-gray-600">
                    We're currently collecting inspiring career transformation stories from our graduates.
                </p> */}
            </div>
        </div>
    );
}
