export interface IInvoice {
    loan: {
        approved: number;
        received: number;
    };
    address: string[];
    tax: number;
    country: string;
    _id: string;
    name: string;
    phone: string;
    user: {
        lastName: string;
        _id: string;
        email: string;
        firstName: string;
        fullName: string;
    };
    courses: {
        price: number;
        _id: string;
        title: string;
        session: string;
    }[];
    payments: any[]; // You can replace `any` with a specific type if you have payment details
    createdBy: string;
    enrollment: string;
    branch: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IEnrollment {
    status: string;
    _id: string;
    totalAmount: number;
    user: {
        phone: string;
        lastName: string;
        _id: string;
        email: string;
        firstName: string;
        fullName: string;
    };
    program: {
        price: {
            cost: {
                price: number;
                salePrice: number;
            };
            isFree: boolean;
        };
        _id: string;
        title: string;
    };
    session: {
        _id: string;
        name: string;
    };
    isApproved: boolean;
    organization: string;
    branch: string;
    updatedAt: string;
    activeTill: string | null;
    formStepsData: any[];
    id: string;
}

export interface IInvoiceDetails {
    invoice: IInvoice;
    enrollment: IEnrollment;
}
