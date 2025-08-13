import { redirect } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default async function LinkRedirectPage({ params }: { params: any }) {
    let target: string;

    try {
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/short-url/get/${params.slug}`,
        );
        target = data.url.redirectUrl;
    } catch (err: any) {
        // render your error UI
        return (
            <div className='flex min-h-screen items-center justify-center p-4'>
                <Card className='shadow-xl border-none overflow-hidden max-w-md'>
                    <div className='bg-red-500 dark:bg-red-800 p-6 text-center text-white'>
                        <AlertTriangle className='mx-auto mb-4 h-16 w-16' />
                        <h2 className='text-2xl font-bold'>Link Not Found</h2>
                        <p className='mt-2'>
                            {err?.response?.data?.error ??
                                'The link you’re trying to access doesn’t exist or has expired.'}
                        </p>
                    </div>
                    <CardContent className='p-6'>
                        <p className='font-medium mb-2'>Slug:</p>
                        <code className='block rounded bg-gray-100 p-2 font-mono'>
                            {params.slug}
                        </code>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // this will now throw NEXT_REDIRECT and *not* be caught
    redirect(target);
}
