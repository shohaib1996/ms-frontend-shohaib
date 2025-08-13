// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import reducers
import authReducer from './reducer/authReducer';
import chatReducer from './reducer/chatReducer';
import notificationReducer from './reducer/notificationReducer';
import navigationReducer from './reducer/navigationReducer';
import meetingReducer from './reducer/meetingReducer';
import programReducer from './reducer/programReducer';
import consultantReducer from './reducer/consultantReducer';
import blogReducer from './reducer/blogReducer';
import docReducer from './reducer/docReducer';

// Define root state type
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Configure Redux Persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // only auth will be persisted
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        chat: chatReducer,
        notification: notificationReducer,
        navigations: navigationReducer,
        meeting: meetingReducer,
        program: programReducer,
        consultant: consultantReducer,
        blog: blogReducer,
        docs: docReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
    devTools: process.env.NODE_ENV !== 'production',
});

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
export default store;
