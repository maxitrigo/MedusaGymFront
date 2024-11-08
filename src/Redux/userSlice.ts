import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    isLoggedIn: boolean;
    token: string | null;
    role: string;
    name: string;
    email: string;
}

const initialState: UserState = {
    isLoggedIn: false,
    token: null,
    role: "",
    name: "",
    email: ""
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; role: string; name: string; email: string }>) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.name = action.payload.name;
            state.email = action.payload.email;
            sessionStorage.setItem('token', action.payload.token);
            sessionStorage.setItem('role', action.payload.role);
            sessionStorage.setItem('name', action.payload.name);
            sessionStorage.setItem('email', action.payload.email);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
            state.role = '';
            state.name = '';
            state.email = '';
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('email');
        }
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
