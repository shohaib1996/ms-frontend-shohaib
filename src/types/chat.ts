import { Program, Session } from './common';

export type TBotInfo = {
    botInfo: {
        branches: string[];
        createdBy: {
            firstName: string;
            fullName: string;
            lastName: string;
            profilePicture: string;
            type: string;
            _id: string;
        };
        description: string;
        isActive: boolean;
        organization: string;
    };
    createdAt: string; // ISO date string
    firstName: string;
    fullName: string;
    lastName: string;
    lastSend: string; // ISO date string
    totalUsed: number;
    _id: string;
};

type Emoji = {
    _id: string;
    user: string;
    symbol: string;
    createdAt: string; // ISO date string
};

type Sender = {
    profilePicture: string;
    lastName: string;
    _id: string;
    firstName: string;
    fullName: string;
};

type LatestMessage = {
    type: string;
    status: string;
    _id: string;
    sender: Sender;
    text: string;
    files: any[]; // If files have a structure, replace `any` with a proper type
    emoji: Emoji[];
    createdAt: string; // ISO date string
    id: number;
};

type NotificationSettings = {
    isOn: boolean;
};

type MuteSettings = {
    isMuted: boolean;
};

type MyData = {
    user: string;
    isFavourite: boolean;
    isBlocked: boolean;
    role: string;
    _id: string;
    notification: NotificationSettings;
    mute: MuteSettings;
};

export type TChat = {
    membersCount: number;
    isArchived: boolean;
    organization: string;
    memberScope: string;
    latestMessage: LatestMessage;
    _id: string;
    isChannel: boolean;
    isReadOnly: boolean;
    isPublic: boolean;
    description: string;
    name: string;
    branch: string;
    unreadCount: number;
    myData: MyData;
};

type Job = {
    channels: { _id: string; name?: string }[]; // Assuming channels are an array of strings (IDs or names)
    text: string;
    program: Program;
    session: Session;
};

export type TCronJob = {
    job: Job;
    isActive: boolean;
    _id: string;
    name: string;
    description: string;
    session?: Session;
    creator: string;
    program?: Program;
    bot: string;
    cronExpression: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
    nextDate: string | null; // Can be `null` or a string (date)
};
