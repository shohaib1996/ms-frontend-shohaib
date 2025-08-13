export type TCourse = {
    _id: string;
    title: string;
    slug: string;
    shortDescription: string;
    shortDetail: string;
    description: string;
    isPublished: boolean;
    isFeatured: boolean;
    isDemo: boolean;
    content: any;
    type: string;
    category: string;
    subCategory: string | null;
    language: string;
    tags: string[];
    label: string;
    image: string | null;
    country: string;
    branches: any[];
    createdBy: string;
    instructor: {
        _id: string;
        name: string;
        email: string;
        about: string;
        image: string;
        organization: string;
        isActive: boolean;
        createdBy: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    instructors: {
        _id: string;
        instructor: any; // you can refine this if instructor object is reused
        area: string;
    }[];
    meta: {
        title: string;
        description: string;
    };
    price: {
        cost: {
            price: number;
            salePrice: number;
        };
        isFree: boolean;
    };
    salaryForThisRole: {
        title: string;
        description: string;
    };
    recognition: {
        title: string;
        description: string;
    };
    obtainCertification: {
        title: string;
        description: string;
    };
    opportunities: {
        title: string;
        description: string;
    };
    requirements: string;
    whatLearns: {
        _id: string;
        key: number;
        title: string;
    }[];
    benefits: {
        _id: string;
        title: string;
        description: string;
        icon: string;
    }[];
    faqs: {
        _id: string;
        question: string;
        answer: string;
    }[];
    alumni: {
        images: string[];
    };
    layoutSections: {
        _id: string;
        id: string;
        title: string;
        isVisible: boolean;
    }[];
};
