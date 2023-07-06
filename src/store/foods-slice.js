import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_FOODS } from "../utils/constants";


const foodsSlice = createSlice({
    name: 'foods',
    initialState: {
        foodItems: DUMMY_FOODS,
        currentFoodCounter: -1,
    },
    reducers: {
        addNewFood (state, action) { // called in the food-action 
            state.foodItems[action.payload.newId] = action.payload.newFood;
        },
        replaceFoodItems (state, action) {
            state.foodItems = action.payload;
        },
        updateFoodCounter (state, action) {
            state.currentFoodCounter = action.payload;
        },
    }
});


export const foodActions = foodsSlice.actions;

export default foodsSlice;
