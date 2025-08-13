import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    [key: string]: any;
}

interface AuthState {
    user: User;
    isAuthenticated: boolean;
    enrollment: null | any;
}

const initialState: AuthState = {
    user: {},
    isAuthenticated: false,
    enrollment: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            state.user = { ...state.user, ...action.payload };
        },
        setEnrollment: (state, action: PayloadAction<any>) => {
            state.enrollment = action.payload;
        },
        logout: (state) => {
            state.user = {};
            state.isAuthenticated = false;
            state.enrollment = null;
        },
    },
});

export const { setUser, updateUser, setEnrollment, logout } = authSlice.actions;
export default authSlice.reducer;
