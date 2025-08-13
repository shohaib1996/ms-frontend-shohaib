export interface CompanyFormData {
    name: string;
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        zip: string;
    };
    companyUrl: string;
    phone: string;
    faxNumber?: string;
    taxNumber?: string;
    firstContact: {
        name: string;
        email: string;
        phone: string;
    };
    secondContact: {
        name?: string;
        email?: string;
        phone?: string;
    };
    about?: string;
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        github?: string;
        instagram?: string;
        linkedin?: string;
    };
    companyLogo?: string;
    companyDocument?: string;
    otherDocument?: string;
}
