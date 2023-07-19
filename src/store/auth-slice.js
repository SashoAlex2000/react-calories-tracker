import { createSlice } from "@reduxjs/toolkit";

// 20230719 -> set/remove the userData to localStorage, and set the initialState to be equal
// to the data in localStorage, to preserve auth info on refresh
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('userData')),
    },
    reducers: {
        setUser (state, action) {
            console.log('test');

            const userData = {
                uid: action.payload.uid,
                username: action.payload.username,
                email: action.payload.email,
            };

            state.user = userData
            localStorage.setItem('userData', JSON.stringify(userData));

        },
        removeUser (state, action) {
            state.user = undefined;
            localStorage.removeItem('userData')
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


