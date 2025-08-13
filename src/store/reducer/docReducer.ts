import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DocState {
    docs: any[];
}

const initialState: DocState = {
    docs: [],
};

const docSlice = createSlice({
    name: 'docs',
    initialState,
    reducers: {
        setDocs: (state, action: PayloadAction<any[]>) => {
            state.docs = action.payload;
        },
    },
});

export const { setDocs } = docSlice.actions;
export default docSlice.reducer;
