export interface MarketingData {
    _id: string;
    createdBy?: {
        profilePicture?: string;
        fullName?: string;
        role?: string;
    };
    body?: string;
    totalUsers?: number;
    totalSent?: number;
    totalFailed?: number;
    comment?: string;
    createdAt?: string;
    updatedAt?: string;
    history?: Array<{ data: string }>;
    cron?: {
        expression: string;
        isActive: boolean;
    };
    userLists?: Array<{
        name?: string;
        phone?: string;
    }>;
}

export interface MarketingRecord {
    _id: string;
    category?: string;
    subject: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    totalUsers: number;
    totalSent: number;
    totalFailed: number;
}
