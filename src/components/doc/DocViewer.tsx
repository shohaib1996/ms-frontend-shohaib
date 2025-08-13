'use client';

import { Card, CardContent } from '@/components/ui/card';
import { renderText } from '../lexicalEditor/renderer/renderText';

interface Doc {
    _id: string;
    title: string;
    description: string;
}

interface DocViewerProps {
    doc: Doc;
}

function DocViewer({ doc }: DocViewerProps) {
    console.log(doc?.title);

    return (
        <Card className='docViewer_container shadow-none border-none'>
            <CardContent className='p-4'>
                {renderText({ text: doc?.description || '' })}
            </CardContent>
        </Card>
    );
}

export default DocViewer;
