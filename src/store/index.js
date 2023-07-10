import { configureStore } from "@reduxjs/toolkit";
import foodsSlice from "./foods-slice";
import authSlice from "./auth-slice";
import daysSlice from "./days-action";


const store = configureStore({
    reducer: {
        foods: foodsSlice.reducer,
        auth: authSlice.reducer,
        days: daysSlice.reducer,
    }
});

export default store;
