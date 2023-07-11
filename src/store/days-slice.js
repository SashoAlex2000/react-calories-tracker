import { createSlice } from "@reduxjs/toolkit";

const daysSlice = createSlice({
    name: 'days',
    initialState: {
        currentDate: new Date().toLocaleDateString(),
        foodsAteToday: {
            'u1f1': 100,
            'u1f3': 200,
        },
    },
    reducers: {
        addNewFood (state, action) {
            if (state.foodsAteToday.hasOwnProperty(action.payload.foodId)) {
                state.foodsAteToday[action.payload.foodId] += Number(action.payload.amount);
            } else {
                console.log('we really in the loop though');
                console.log(action.payload);
                state.foodsAteToday[action.payload.foodId] = Number(action.payload.amount);
            };
        },
        replaceFoodsEaten (state, action) {
            state.foodsAteToday = action.payload;
        }
    }
});


export const daysActions = daysSlice.actions;

export default daysSlice;
