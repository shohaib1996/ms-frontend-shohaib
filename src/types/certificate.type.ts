type TBranchData = {
    data: {
        address: {
            street: string;
            city: string;
            zip: string;
            state: string;
            country: string;
        };
        firstContact: {
            email: string;
            name: string;
            phone: string;
        };
        secondContact: {
            email: string;
            name: string;
            phone: string;
        };
        socialLinks: {
            facebook: string;
            github: string;
            instagram: string;
        };
        branchUrl: string;
        phone: string;
        faxNumber: string;
        taxNumber: string;
        branchLogo: string;
        branchDarkLogo: string;
        branchDocument: string;
        otherDocument: string;
        about: string;
    };
    _id: string;
    name: string;
};

export type TCertificateTemplate = {
    templateName: string;
    details1: string;
    details2: string;
};

export type TUserData = {
    name: string;
    program: string;
    session: string;
    instructor: string;
    signature: string;
    issueDate: string; // ISO date string
    expireDate: string; // ISO date string
    id?: string;
};
export type TCertificate = {
    certificateTemplate: TCertificateTemplate;
    userData: TUserData;
    results: any[]; // Update with actual result type if known
    isActive: boolean;
    _id: string;
    id: string;
    user: string; // user ID
    testimonial: string;
    enrollment: string; // enrollment ID
    generatedBy: string; // user ID who generated it
    complements: any[]; // Update with actual complement type if known
    branch: TBranchData;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
};
