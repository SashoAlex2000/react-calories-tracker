import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_FOODS } from "../utils/constants";


const foodsSlice = createSlice({
    name: 'foods',
    initialState: {
        foodItems: DUMMY_FOODS,
        currentFoodCounter: -1,
    },
    reducers: {
        addNewFood (state, action) {

            const currentFood = action.payload;

            const newFood = {...currentFood, id: `f${state.foodItems.length + 1}`};

            state.foodItems.push(newFood);

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
