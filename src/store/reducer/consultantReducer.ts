import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConsultantState {
    active: any | null;
}

const initialState: ConsultantState = {
    active: null,
};

const consultantSlice = createSlice({
    name: 'consultant',
    initialState,
    reducers: {
        setActiveConsultant: (state, action: PayloadAction<any>) => {
            state.active = action.payload;
        },
    },
});

export const { setActiveConsultant } = consultantSlice.actions;
export default consultantSlice.reducer;
