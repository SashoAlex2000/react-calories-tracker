import { configureStore } from "@reduxjs/toolkit";
import foodsSlice from "./foods-slice";


const store = configureStore({
    reducer: {
        foods: foodsSlice.reducer,
    }
});

export default store;
