'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';

// Dynamically import MarkdownPreview
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
    ssr: false,
});

// Function to transform specific markdown links into styled components
function transformMessage(text: string) {
    return text?.replace(
        // eslint-disable-next-line no-useless-escape
        /@\[([^\]]+)\]\([^\)]+\)/g,
        '<span style="background-color: #00800024;color:#008000f0;font-weight:bold">@$1</span>',
    );
}

const components = {
    a: ({ ...props }) => (
        <a target='_blank' rel='noopener noreferrer' {...props} />
    ),
};

// Function to transform date placeholders ({{DATE:...}}) into a formatted date
const transFormDate = (text: string) => {
    const regexPattern = /\{\{DATE:(.*?)\}\}/g;
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return text?.replace(regexPattern, (match, startTime) => {
        return `${dayjs(startTime).format('MMMM Do YYYY, h:mm A z')} (${userTimezone})`;
    });
};

interface MessagePreviewProps {
    text: string;
}

const MessagePreview: React.FC<MessagePreviewProps> = ({ text }) => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    // Resize handler for responsiveness
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const aboutText = transFormDate(transformMessage(text)) || '';
    const isLongText = aboutText.length > 300; // Check if the text is long
    const isSmallScreen = windowWidth < 768; // Check if the screen width is small

    return (
        <div className='relative w-full'>
            <MarkdownPreview
                className='overflow-x-hidden text-dark-gray'
                style={{
                    overflowY: isSmallScreen && isLongText ? 'scroll' : 'auto', // Scrollable for long text
                    maxHeight: isSmallScreen && isLongText ? '200px' : 'none', // Limit height for long texts
                }}
                source={aboutText}
                components={components}
            />
        </div>
    );
};

export default MessagePreview;
