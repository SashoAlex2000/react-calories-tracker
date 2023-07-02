import { configureStore } from "@reduxjs/toolkit";
import foodsSlice from "./foods-slice";
import authSlice from "./auth-slice";


const store = configureStore({
    reducer: {
        foods: foodsSlice.reducer,
        auth: authSlice.reducer,
    }
});

export default store;
