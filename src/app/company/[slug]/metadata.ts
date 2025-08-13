// app/bootcamps/[slug]/metadata.ts
import { Metadata, ResolvingMetadata } from 'next';
import axios from 'axios';
import { createArticleMetadata } from '@/utils/generateMetaData';

interface CompanyData {
    name: string;
    description?: string;
    logoUrl?: string;
    foundedDate?: string;
    tags?: string[];
}

interface ApiResponse {
    company: CompanyData | null;
    studentCount: number;
    branches: any[];
}

export async function generateMetadata(
    { params }: { params: { slug: string } },
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const { slug } = params;

    try {
        const res = await axios.get<ApiResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/organization/details/${slug}`,
        );

        const company = res?.data?.company;

        if (!company) {
            return createArticleMetadata({
                title: 'Company Not Found | SkillBNK',
                description: 'The requested company could not be found.',
            });
        }

        return createArticleMetadata({
            title: `${company.name} Bootcamps | SkillBNK`,
            description:
                company.description ||
                `Explore bootcamp programs offered by ${company.name}`,
            slug: `bootcamps/${slug}`,
            imageUrl: company.logoUrl || '/default-company-logo.png',
            imageAlt: `${company.name} logo`,
            authorName: company.name,
            publishedTime: company.foundedDate,
            tags: company.tags || ['bootcamp', 'education', 'learning'],
        });
    } catch (error) {
        console.error(error);
        return createArticleMetadata({
            title: 'Error Loading Bootcamp | SkillBNK',
            description: 'There was an error loading the bootcamp information.',
        });
    }
}
