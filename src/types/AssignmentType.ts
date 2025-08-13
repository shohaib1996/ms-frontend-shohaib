export interface RootResponse {
    success: boolean;
    assignments: Assignment[];
    pagination: Pagination;
}

export interface Assignment {
    attachments: string[];
    groups: Group[];
    mark: number;
    isActive: boolean;
    category: 'task' | 'question';
    branches: string[];
    _id: string;
    question: string;
    createdBy: CreatedBy;
    answer: string;
    id: number;
    organization: string;
    workshop: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    description?: string;
    program?: any[];
    session?: any[];
}

export interface CreatedBy {
    lastName: string;
    _id: string;
    firstName: string;
    fullName: string;
}

export interface Group {
    activeStatus: ActiveStatus | null;
    _id: string;
    title: string;
}

export interface ActiveStatus {
    isActive: boolean;
    activeUntill: string | null;
}

export interface Pagination {
    total: number;
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
}
