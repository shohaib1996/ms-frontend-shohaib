import { setChats, setOnlineUsers } from '@/store/reducer/chatReducer';
import { setMeetings } from '@/store/reducer/meetingReducer';
import { setNavigation } from '@/store/reducer/navigationReducer';
import { setNotifications } from '@/store/reducer/notificationReducer';
import {
    setCourses,
    setPrograms,
    setServices,
} from '@/store/reducer/programReducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';

/**
 * Load user notifications
 */
export const loadNotifications = createAsyncThunk(
    'notification/loadNotifications',
    async (_, { dispatch }) => {
        try {
            const response = await axios.get('/notification/mynotifications');
            dispatch(setNotifications(response.data.notifications));
            return response.data.notifications;
        } catch (error: any) {
            console.error(error);
            toast.error(
                error?.response?.data?.error || 'Failed to load notifications',
            );
            throw error;
        }
    },
);

/**
 * Get online users
 */
export const getOnlines = createAsyncThunk(
    'chat/getOnlineUsers',
    async (_, { dispatch }) => {
        try {
            const response = await axios.get('/user/online');
            dispatch(setOnlineUsers(response.data.users));
            return response.data.users;
        } catch (error: any) {
            console.error(error);
            toast.error(
                error?.response?.data?.error || 'Failed to get online users',
            );
            throw error;
        }
    },
);

/**
 * Get user meetings
 */
export const myMeetings = createAsyncThunk(
    'meeting/getMyMeetings',
    async (_, { dispatch }) => {
        try {
            const response = await axios.get('/meeting/mymeetings');
            dispatch(setMeetings(response.data.meetings));
            return response.data.meetings;
        } catch (error: any) {
            console.error(error);
            toast.error(
                error?.response?.data?.error || 'Failed to load meetings',
            );
            throw error;
        }
    },
);

/**
 * Get programs
 */
export const getPrograms = createAsyncThunk(
    'program/getPrograms',
    async (_, { dispatch }) => {
        try {
            const response = await axios.get('/course/get?type=program');
            dispatch(setPrograms(response.data.courses));
            return response.data.courses;
        } catch (error: any) {
            console.error(error);
            toast.error(
                error?.response?.data?.error || 'Failed to load programs',
            );
            throw error;
        }
    },
);

/**
 * Get courses
 */
export const getCourses = createAsyncThunk(
    'program/getCourses',
    async (_, { dispatch }) => {
        try {
            const response = await axios.get('/course/get?type=course');
            dispatch(setCourses(response.data.courses));
            return response.data.courses;
        } catch (error: any) {
            console.error(error);
            toast.error(
                error?.response?.data?.error || 'Failed to load courses',
            );
            throw error;
        }
    },
);

/**
 * Get services
 */
export const getServices = createAsyncThunk(
    'program/getServices',
    async (_, { dispatch }) => {
        try {
            const response = await axios.get(
                '/course/get?type=professional-service',
            );
            dispatch(setServices(response.data.courses));
            return response.data.courses;
        } catch (error: any) {
            console.error(error);
            toast.error(
                error?.response?.data?.error || 'Failed to load services',
            );
            throw error;
        }
    },
);

/**
 * Get user navigations
 * (Uncommented for future use)
 */
export const getMyNavigations = createAsyncThunk(
    'navigation/getMyNavigations',
    async (_, { dispatch }) => {
        try {
            const response = await axios.get('/navigation/mynavigations');
            dispatch(setNavigation(response.data.navigations));
            return response.data.navigations;
        } catch (error: any) {
            console.error(error);
            toast.error(
                error?.response?.data?.error || 'Failed to load navigations',
            );
            throw error;
        }
    },
);

/**
 * Load user chats
 * (Uncommented for future use)
 */
export const loadChats = createAsyncThunk(
    'chat/loadChats',
    async (_, { dispatch }) => {
        try {
            const response = await axios.get('/chat/mychats');
            dispatch(setChats(response.data.chats));
            return response.data.chats;
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.error || 'Failed to load chats');
            throw error;
        }
    },
);
