// src/app/actions/urlActions.ts
'use server';

import axios from 'axios';

export interface UrlResult {
    success: boolean;
    url?: {
        redirectUrl: string;
    };
    error?: string;
}

export async function getRedirectUrl(slug: string): Promise<UrlResult> {
    try {
        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/short-url/get/${slug}`,
        );
        console.log(result);

        return {
            success: true,
            url: result.data.url,
        };
    } catch (error: any) {
        console.error(
            'Error fetching redirect URL:',
            error?.response?.data?.error,
        );

        return {
            success: false,
            error:
                error?.response?.data?.error ||
                'Sorry, the page you visited does not exist.',
        };
    }
}
