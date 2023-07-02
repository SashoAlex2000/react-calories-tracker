import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: undefined,
    },
    reducers: {
        setUser (state, action) {
            state.user = {
                uid: action.payload.uid,
                username: action.payload.username,
                email: action.payload.email,
            };
        },
        removeUser (state, action) {
            state.user = undefined;
        },
    }
});

export default authSlice;

export const authActions = authSlice.actions;


