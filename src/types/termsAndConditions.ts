import { Program, Session } from './common';

export interface TTermsCondition {
    programs: Program[];
    sessions: Session[]; // Replace 'any' with a more specific type if available
    isActive: boolean;
    category: string;
    branches: string[];
    _id: string;
    title: string;
    createdBy: string;
    organization: string;
    description: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
}
