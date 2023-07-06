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
        addCurrentMetaCounter (state, action) { // 20230607 -> when fetching foods, use this reducer to put the meta counter to the user state
            state.user = {
                ...state.user,
                currentMetaCounter: action.payload,
            }
        },
    }
});

export default authSlice;

export const authActions = authSlice.actions;


