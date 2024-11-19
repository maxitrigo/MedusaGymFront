import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GymUserState {
    admissions: number;
    freePass: boolean;
    points: number;
    streak: number;
    trainingDates: string[];
    totalPoints: number;
    subscriptionEnd: Date | null;
}

const initialState: GymUserState = {
    admissions: 0,
    freePass: false,
    points: 0,
    streak: 0,
    trainingDates: [],
    totalPoints: 0,
    subscriptionEnd: null,
};

const gymUserSlice = createSlice({
    name: "gymUser",
    initialState,
    reducers: {
        setGymUser: (state, action: PayloadAction<GymUserState>) => {
            state.admissions = action.payload.admissions;
            state.freePass = action.payload.freePass ;
            state.points = action.payload.points;
            state.streak = action.payload.streak;
            state.trainingDates = action.payload.trainingDates;
            state.totalPoints = action.payload.totalPoints;
            state.subscriptionEnd = action.payload.subscriptionEnd;
            sessionStorage.setItem('admissions', JSON.stringify(action.payload.admissions) || '0' );
            sessionStorage.setItem('freePass', JSON.stringify(action.payload.freePass) || 'false' );
            sessionStorage.setItem('points', JSON.stringify(action.payload.points) || '0' );
            sessionStorage.setItem('subscriptionEnd', JSON.stringify(action.payload.subscriptionEnd) || 'null' );
        },
        clearGymUser: (state) => {
            state.admissions = 0;
            state.freePass = false;
            state.points = 0;
            state.streak = 0;
            state.trainingDates = [];
            state.totalPoints = 0;
            state.subscriptionEnd = null;
        }
    }    
});

export default gymUserSlice.reducer;
export const { setGymUser, clearGymUser } = gymUserSlice.actions;