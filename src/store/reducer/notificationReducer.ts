import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
    _id: string;
    [key: string]: any;
}

interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = {
    notifications: [],
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload;
        },
        newNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.unshift(action.payload);
        },
        updateNotification: (state, action: PayloadAction<Notification>) => {
            const index = state.notifications.findIndex(
                (notification) => notification._id === action.payload._id,
            );
            if (index !== -1) {
                state.notifications[index] = action.payload;
            }
        },
    },
});

export const { setNotifications, newNotification, updateNotification } =
    notificationSlice.actions;
export default notificationSlice.reducer;
