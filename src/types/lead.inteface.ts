export type TLead = {
    _id: string;
    id: number;
    account: string;
    name: string;
    phone: string;
    email1?: string;
    email2?: string;
    status: string;
    assignedTo: string;
    date?: string;
    source: string;
    fbData?: {
        pageId?: string;
        psId?: string;
    };
    scheduleAlerts: any[]; // Specify a more detailed type if needed
    score: number;
    unread: boolean;
};

export type TCreateLead = {
    name: string;
    phone: string;
    email1?: string;
    email2?: string;
    status: string;
    assignedTo: string;
    source: string;
    date?: string;
    timeZone: 'PST' | 'EST' | 'CST' | 'MST' | string;
};
