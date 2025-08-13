import { configureStore } from '@reduxjs/toolkit';

// Import reducers
import authReducer from './authReducer';
import chatReducer from './chatReducer';
import notificationReducer from './notificationReducer';
import navigationReducer from './navigationReducer';
import meetingReducer from './meetingReducer';
import programReducer from './programReducer';
import consultantReducer from './consultantReducer';
import blogReducer from './blogReducer';
import docReducer from './docReducer';

// Configure store
export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        notification: notificationReducer,
        navigations: navigationReducer,
        meeting: meetingReducer,
        program: programReducer,
        consultant: consultantReducer,
        blog: blogReducer,
        docs: docReducer,
    },
});

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
