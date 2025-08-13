export type TPagination = {
    total: number;
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
};

export type TResponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string;
    pagination?: TPagination;
    data: T;
};

export interface Program {
    _id: string;
    title: string;
}

export interface Session {
    _id: string;
    name: string;
}

export interface User {
    profilePicture: string;
    lastName: string;
    _id: string;
    email: string;
    firstName: string;
    fullName: string;
    program?: Program;
    session?: Session;
}

export interface CreatedBy {
    profilePicture: string;
    lastName: string;
    _id: string;
    email: string;
    firstName: string;
    fullName: string;
}

type GroupUser = {
    profilePicture: string;
    lastName: string;
    _id: string;
    email: string;
    firstName: string;
    fullName: string;
};

type GroupProgram = {
    _id: string;
    title: string;
};

type GroupSession = {
    _id: string;
    name: string;
};

export type Group = {
    activeStatus: {
        isActive: boolean;
        activeUntill: string;
    };
    description: string | null;
    programs: GroupProgram[];
    sessions: GroupSession[];
    users: GroupUser[];
    category: string;
    branches: string[];
    _id: string;
    title: string;
    organization: string;
    createdAt: string;
    updatedAt: string;
};
