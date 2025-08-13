export interface IProfileResponse {
    success: boolean;
    profile: {
        about: string;
        _id: string;
        user: string;
        source: string;
        personalInformation: {
            firstName: string;
            lastName: string;
            middleName?: string;
            education: string;
            gender: 'male' | 'female' | 'other';
            dateOfBirth: string; // ISO format
            jobTitle: string;
            employmentType: string;
            hr?: string;
            reportingManager?: string;
            numberOfHolidays: number;
            yearlyVacation: number;
            resume?: string;
            _id: string;
            memberSince?: string | null;
        };
        presentAddress: {
            street: string;
            city: string;
            zipCode: string;
            state: string;
            country: string;
            _id: string;
        };
        emergencyContact: {
            fullName: string;
            relation: string;
            email: string;
            whatsapp?: string;
            _id: string;
        };
        bankingInformation: {
            bankName: string;
            accountHolderName: string;
            accountType: string;
            accountNumber: string;
            routingNumber: string;
            branchAddress: string;
            branchCode: string;
            _id: string;
        };
        attachments: {
            offerLetter?: string;
            nationalId?: string;
            other?: string;
            _id: string;
        };
        socialLinks: {
            facebook?: string;
            twitter?: string;
            linkedin?: string;
            instagram?: string;
            github?: string;
            _id: string;
        };
        references: any[]; // Define a proper type if references have a known structure
        jobExperience: any[]; // Define a proper type if jobExperience has a known structure
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
}
