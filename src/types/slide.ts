import { TUser } from './auth';
import { Program, Session } from './common';

type Slide = {
    _id: string;
    content: string;
    title: string;
};

export type TSlide = {
    _id: string;
    title: string;
    programs: Program[];
    sessions: Session[];
    branches: string[];
    slides: Slide[];
    createdBy: TUser;
    organization: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
