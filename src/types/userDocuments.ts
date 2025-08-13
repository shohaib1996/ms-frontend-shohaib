import { TEnrollment } from './auth';
import { User } from './common';

export type TUserDocument = {
    _id: string;
    name: string;
    description: string;
    attachment: any[]; // Assuming attachments can be of any type, specify type if needed
    user: User;
    branch: string;
    enrollment: TEnrollment;
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
    expiredAt?: string;
    __v: number;
};
