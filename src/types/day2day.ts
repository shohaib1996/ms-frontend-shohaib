export interface Day2dayPost {
    _id: string;
    title: string;
    description: string;
    attachments: string[];
    sender: {
        _id: string;
        fullName: string;
        email: string;
        profilePicture?: string;
    };
    category: string;
    branch?: string;
    enrollment?: {
        _id: string;
        program?: { title: string };
        session?: { name: string };
    };
    createdAt: string;
    updatedAt: string;
}
