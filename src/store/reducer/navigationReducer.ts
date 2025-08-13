import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
    portalGuide: boolean;
    myImportantLink: boolean;
    myProgram: boolean;
    myE2eProgramAgenda: boolean;
    myPurchasedItem: boolean;
    myDocument: boolean;
    myUploadedDocument: boolean;
    myMockInterview: boolean;
    reviewMockInterview: boolean;
    myCalender: boolean;
    myPayment: boolean;
    myFeedback: boolean;
    myIssue: boolean;
    myShoutOut: boolean;
    myDayToDayActivity: boolean;
    helpCenter: boolean;
    nearMe: boolean;
    myGiftCard: boolean;
    changePassword: boolean;
    myProfile: boolean;
    myAgreement: boolean;
    professionalConsultant: boolean;
}

const initialState: NavigationState = {
    portalGuide: false,
    myImportantLink: false,
    myProgram: false,
    myE2eProgramAgenda: false,
    myPurchasedItem: false,
    myDocument: false,
    myUploadedDocument: false,
    myMockInterview: false,
    reviewMockInterview: false,
    myCalender: false,
    myPayment: false,
    myFeedback: false,
    myIssue: false,
    myShoutOut: false,
    myDayToDayActivity: false,
    helpCenter: false,
    nearMe: false,
    myGiftCard: false,
    changePassword: false,
    myProfile: false,
    myAgreement: false,
    professionalConsultant: true,
};

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setNavigation: (state, action: PayloadAction<NavigationState>) => {
            return action.payload;
        },
    },
});

export const { setNavigation } = navigationSlice.actions;
export default navigationSlice.reducer;
