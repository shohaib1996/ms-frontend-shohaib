// utils/metadata.ts

// Define types for metadata options
interface MetadataBaseOptions {
    title?: string;
    description?: string;
    slug?: string;
    imageUrl?: string;
    imageWidth?: number;
    imageHeight?: number;
    imageAlt?: string;
    type?: string;
    twitter?: {
        handle: string;
        site: string;
        cardType: string;
    };
    additionalMetadata?: Record<string, any>;
}

interface ArticleMetadataOptions extends MetadataBaseOptions {
    authorName?: string;
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
}

/**
 * Creates a complete metadata object with OpenGraph, Twitter, and other social media tags
 */
export function createMetadata({
    title = 'SkillBNK - Industry leader in Unique LMS platforms',
    description = 'SkillBNK is AI-Powered, Automated Solutions For Schools and Students. Learn to grow and Earn',
    slug = '',
    imageUrl = '/multischool/new-folder/SchoolHubs-logo-final.png',
    imageWidth = 800,
    imageHeight = 600,
    imageAlt = 'SkillBNK Logo',
    type = 'website',
    twitter = {
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
    },
    additionalMetadata = {},
}: MetadataBaseOptions = {}): Record<string, any> {
    // Base URL from environment variables
    const baseUrl =
        process.env.NEXT_PUBLIC_CLIENT_URL || 'https://bootcampshub.com';

    // Full URL for the current page
    const url = slug ? `${baseUrl}/${slug}` : baseUrl;

    // Full image URL
    const fullImageUrl = imageUrl.startsWith('http')
        ? imageUrl
        : `${baseUrl}${imageUrl}`;

    return {
        // Basic metadata
        title,
        description,

        // Canonical link
        alternates: {
            canonical: url,
        },

        // OpenGraph metadata
        openGraph: {
            title,
            description,
            url,
            siteName: 'SkillBNK',
            locale: 'en_US',
            type,
            images: [
                {
                    url: fullImageUrl,
                    width: imageWidth,
                    height: imageHeight,
                    alt: imageAlt,
                },
            ],
            ...additionalMetadata.openGraph,
        },

        // Twitter metadata
        twitter: {
            card: twitter.cardType,
            site: twitter.site,
            creator: twitter.handle,
            title,
            description,
            images: [fullImageUrl],
            ...additionalMetadata.twitter,
        },

        // Facebook metadata (via OpenGraph)
        facebook: {
            appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
            ...additionalMetadata.facebook,
        },

        // Additional metadata from parameter
        ...additionalMetadata,
    };
}

/**
 * Creates article metadata with additional article-specific OpenGraph properties
 */
export function createArticleMetadata({
    authorName,
    publishedTime,
    modifiedTime,
    tags = [],
    ...baseOptions
}: ArticleMetadataOptions = {}): Record<string, any> {
    return createMetadata({
        ...baseOptions,
        type: 'article',
        additionalMetadata: {
            openGraph: {
                authors: authorName ? [authorName] : undefined,
                publishedTime,
                modifiedTime,
                tags,
            },
            // Add article-specific structured data
            schema: {
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: baseOptions.title,
                description: baseOptions.description,
                image: baseOptions.imageUrl,
                datePublished: publishedTime,
                dateModified: modifiedTime || publishedTime,
                author: authorName
                    ? {
                          '@type': 'Person',
                          name: authorName,
                      }
                    : undefined,
            },
        },
    });
}

/**
 * Creates dynamic metadata based on fetched data
 */
export async function generateDynamicMetadata(
    data: any,
): Promise<Record<string, any>> {
    if (!data) {
        return createMetadata();
    }

    return createMetadata({
        title: data.title || data.name,
        description: data.description || data.summary,
        slug: data.slug,
        imageUrl: data.featuredImage || data.image,
        imageAlt: data.imageAlt || `${data.title || data.name} image`,
    });
}

/**
 * Example usage in a page.ts file:
 *
 * export async function generateMetadata({ params }: { params: { slug: string } }) {
 *   const { slug } = params;
 *   const data = await fetchData(slug);
 *   return generateDynamicMetadata(data);
 * }
 */
