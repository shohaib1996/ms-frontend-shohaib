import type { LucideIcon } from 'lucide-react';

export interface Organization {
    _id: string;
    name: string;
    slug: string;
    data: {
        address: {
            street: string;
            city: string;
            state: string;
            country: string;
            zip: string;
        };
        firstContact: {
            name: string;
            email: string;
            phone: string;
        };
        secondContact: {
            name: string;
            email: string;
            phone: string;
        };
        socialLinks: {
            facebook: string;
            twitter: string;
        };
        companyUrl: string;
        phone: string;
        faxNumber: string;
        taxNumber: string;
        about: string;
        companyLogo: string;
        companyDocument: string;
        otherDocument: string;
    };
}

export interface Address {
    street?: string;
    city?: string;
    state: string;
    country: string;
}

export interface Program {
    id: number;
    title: string;
    description: string;
    duration: string;
    students: number;
    rating: number;
    image: string;
}

export interface Course {
    id: number;
    title: string;
    description: string;
    duration: string;
    level: string;
    rating: number;
    image: string;
}

export interface Testimonial {
    id: number;
    user: {
        fullName: string;
        profilePicture: string;
    };
    text?: string;
    role: string;
    company: string;
    content: string;
    avatar: string;
}

export interface Instructor {
    id: number;
    name: string;
    role: string;
    bio?: string;
    about?: string;
    expertise: string[];
    image: string;
}

export interface SuccessStore {
    id: number;
    name: string;
    role: string;
    previousRole: string;
    testimonial: string;
    salaryIncrease?: string;
    courseCompleted?: string;
    companyLogo?: string;
    company?: string;
    expertise: string[];
    avatar: string;
}

export interface Accreditation {
    id: number;
    name: string;
    description: string;
    accreditationDate: string;
    icon?: LucideIcon;
}

export interface Document {
    id: number;
    name: string;
    description: string;
    type: string;
    size: string;
    url: string;
}

export interface HeroStat {
    label: string;
    value: string;
}

export interface EnrollmentData {
    monthName: string;
    count: number;
    year: number;
}

export interface CompletionData {
    name: string;
    value: number;
}
