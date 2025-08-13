'use client';
import React, { useState, useEffect, ReactNode, FC } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { SpinnerCircularFixed } from 'spinners-react';
import { io, Socket } from 'socket.io-client';
import store from '../store';
import {
    getOnlines,
    loadNotifications,
    getPrograms,
    getCourses,
    getServices,
} from '../../action/initialActions';
import { toast } from 'sonner';
import { setEnrollment, setUser } from '@/store/reducer/authReducer';
import instance from '@/lib/axios';

// Define types
interface WithAuthProps {
    children: ReactNode;
}

export let socket: Socket | null = null;

const configureAxiosHeader = (): void => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
    const token = Cookies.get(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || '');
    if (token) {
        axios.defaults.headers.common = {
            Authorization: token,
        };
    }
};

const handleReferralToken = (): void => {
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const refParam = urlParams.get('ref');
        const ref = Cookies.get(
            process.env.NEXT_PUBLIC_REFERRAL_TOKEN_NAME || '',
        );
        if (refParam && ref !== refParam) {
            Cookies.set(
                process.env.NEXT_PUBLIC_REFERRAL_TOKEN_NAME || '',
                refParam,
                {
                    expires: 7,
                },
            );
        }
    }
};

const WithAuth: FC<WithAuthProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const initializeAuth = async () => {
            handleReferralToken();
            configureAxiosHeader();

            const token = Cookies.get(
                process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || '',
            );
            store.dispatch(getPrograms());
            store.dispatch(getCourses());
            store.dispatch(getServices());

            if (token) {
                setIsLoading(true);
                try {
                    const response = await instance.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/user/verify`,
                        {},
                    );

                    if (response.status === 200 && response.data.success) {
                        // store.dispatch(loadChats());
                        store.dispatch(loadNotifications());
                        store.dispatch(getOnlines());

                        // Socket connection options
                        const options = {
                            rememberUpgrade: true,
                            transports: ['websocket'],
                            secure: true,
                            rejectUnauthorized: false,
                        };

                        socket = io(
                            process.env.NEXT_PUBLIC_API_SOCKET || '',
                            options,
                        );

                        store.dispatch(setUser(response.data.user));
                        store.dispatch(setEnrollment(response.data.enrollment));

                        setIsLoading(false);
                    }
                } catch (err: any) {
                    setIsLoading(false);
                    Cookies.remove(
                        process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || '',
                    );
                    toast.error(
                        err?.response?.data?.error || 'Something went wrong',
                    );

                    store.dispatch({
                        type: 'LOGOUT',
                    });
                }
            }
        };

        initializeAuth();

        // Cleanup function
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    return <div>{children}</div>;
};

export default WithAuth;
