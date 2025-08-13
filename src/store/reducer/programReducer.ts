import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgramState {
    programs: any[];
    courses: any[];
    services: any[];
}

const initialState: ProgramState = {
    programs: [],
    courses: [],
    services: [],
};

const programSlice = createSlice({
    name: 'program',
    initialState,
    reducers: {
        setPrograms: (state, action: PayloadAction<any[]>) => {
            state.programs = action.payload;
        },
        setCourses: (state, action: PayloadAction<any[]>) => {
            state.courses = action.payload;
        },
        setServices: (state, action: PayloadAction<any[]>) => {
            state.services = action.payload;
        },
    },
});

export const { setPrograms, setCourses, setServices } = programSlice.actions;
export default programSlice.reducer;
