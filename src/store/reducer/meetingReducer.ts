import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Meeting {
    _id: string;
    [key: string]: any;
}

interface MeetingState {
    meetings: Meeting[];
}

const initialState: MeetingState = {
    meetings: [],
};

const meetingSlice = createSlice({
    name: 'meeting',
    initialState,
    reducers: {
        setMeetings: (state, action: PayloadAction<Meeting[]>) => {
            state.meetings = action.payload;
        },
        newMeeting: (state, action: PayloadAction<Meeting>) => {
            state.meetings.unshift(action.payload);
        },
        updateMeeting: (state, action: PayloadAction<Meeting>) => {
            const index = state.meetings.findIndex(
                (meeting) => meeting._id === action.payload._id,
            );
            if (index !== -1) {
                state.meetings[index] = action.payload;
            }
        },
    },
});

export const { setMeetings, newMeeting, updateMeeting } = meetingSlice.actions;
export default meetingSlice.reducer;
