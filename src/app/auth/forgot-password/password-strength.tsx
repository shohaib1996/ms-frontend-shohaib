'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface PasswordStrengthProps {
    password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
    const [strength, setStrength] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (!password) {
            setStrength(0);
            setFeedback('');
            return;
        }

        let score = 0;
        let message = '';

        // Length check
        if (password.length >= 8) {
            score += 20;
        }

        // Uppercase check
        if (/[A-Z]/.test(password)) {
            score += 20;
        } else {
            message = 'Add an uppercase letter';
        }

        // Lowercase check
        if (/[a-z]/.test(password)) {
            score += 20;
        } else if (!message) {
            message = 'Add a lowercase letter';
        }

        // Number check
        if (/\d/.test(password)) {
            score += 20;
        } else if (!message) {
            message = 'Add a number';
        }

        // Special character check
        if (/[^A-Za-z0-9]/.test(password)) {
            score += 20;
        } else if (!message) {
            message = 'Add a special character';
        }

        // Set feedback based on score
        if (score === 100 && !message) {
            message = 'Strong password';
        } else if (score >= 60 && !message) {
            message = 'Good password';
        } else if (score >= 40 && !message) {
            message = 'Moderate password';
        } else if (!message) {
            message = 'Weak password';
        }

        setStrength(score);
        setFeedback(message);
    }, [password]);

    const getStrengthColor = () => {
        if (strength >= 80) {
            return 'bg-green-500';
        }
        if (strength >= 60) {
            return 'bg-yellow-500';
        }
        if (strength >= 40) {
            return 'bg-orange-500';
        }
        return 'bg-red-500';
    };

    return (
        <div className='space-y-2'>
            <div className='flex justify-between items-center'>
                <Progress
                    value={strength}
                    className='h-2'
                    indicatorClassName={getStrengthColor()}
                />
                <span className='text-xs text-muted-foreground ml-2'>
                    {strength}%
                </span>
            </div>
            {feedback && (
                <p className='text-xs text-muted-foreground'>{feedback}</p>
            )}
        </div>
    );
}
