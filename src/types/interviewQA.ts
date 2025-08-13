// types/interviewQA.ts

export interface IOption {
    _id: string;
    option: string;
    isCorrect: boolean;
}

export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    email: string;
    profilePicture?: string;
}

export interface IQuestion {
    _id: string;
    question: string;
    options: IOption[];
    isActive: boolean;
    createdBy: IUser;
    createdAt: string;
    updatedAt: string;
}

export interface ITopic {
    _id: string;
    topic?: string;
    name?: string;
    isActive: boolean;
    programs?: {
        _id: string;
        title: string;
    }[];
    sessions?: any[];
    branches?: string[];
    createdBy: IUser;
    organization: string;
    createdAt: string;
    questionCount?: number;
}
export interface IProgram {
    _id: string;
    title: string;
    description?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface IInterviewQAResponse {
    interviewQA: ITopic;
    questions: IQuestion[];
    pagination?: {
        total: number;
        page: number;
        limit: number;
    };
}

export interface IInterviewQAListResponse {
    interviewQAs: ITopic[];
    pagination: {
        total: number;
        page: number;
        limit: number;
    };
}
