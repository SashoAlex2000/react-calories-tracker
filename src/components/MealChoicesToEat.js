import { useDispatch } from "react-redux";
import EatFooodItemCard from "./EatFoodItemCard";
import { daysActions } from "../store/days-slice";
import classes from './MealChoicesToEat.module.css';
import { eatFood } from "../store/days-actions";
import { foodFilterOptions, transformDate } from "../utils/constants";
import { useState } from "react";

const MealChoicesToEat = (props) => {

    const dispatch = useDispatch();

    const [foodChoices, setFoodChoices] = useState(props.currentUserFoods);
    const [selectedSortingParam, setSelectedSortingParam] = useState(Object.entries(foodFilterOptions)[0][0]);
    
    // 20230719 -> no longer use addNewFood, dispatch an 'eatFood' action to send the data to Firebase
    const addFoodEatenHandler = (foodItemId, quantity) => {
        console.log('we really in separate component though');
        
        // prevent empty submission
        if (quantity <= 0) {
            return;
        };

        let date = new Date().toLocaleDateString();
        date = transformDate(date);

        let updatedFoods = {
            ...props.foodsEaten,
        };
        if (!updatedFoods.hasOwnProperty(foodItemId)) {
            updatedFoods[foodItemId] = 0;
        };
        updatedFoods[foodItemId] += Number(quantity);

        dispatch(eatFood(props.userId, date, updatedFoods));
        
    }

    const handleSortingParamChange = (event) => {

        setSelectedSortingParam(event.target.value);

    };

    const sortButtonHandler = () => {
        if (selectedSortingParam === "date-asc") {
            setFoodChoices(props.currentUserFoods);
        } else if (selectedSortingParam === "date-desc") {
            const reversedKeys = Object.keys(props.currentUserFoods).reverse();
            const newObj = {};
            reversedKeys.forEach(key => {
                newObj[key] = foodChoices[key];
            });
            setFoodChoices(newObj);
              
        } else if (selectedSortingParam === "calories-desc") {
            console.log("baznin ga");
            let foodEntries = Object.entries(foodChoices);
            foodEntries.sort((a, b) => b[1].caloriesPerDenom - a[1].caloriesPerDenom);
            setFoodChoices(Object.fromEntries(foodEntries));
        } else if (selectedSortingParam === "calories-asc") {
            let foodEntries = Object.entries(foodChoices);
            foodEntries.sort((a, b) => a[1].caloriesPerDenom - b[1].caloriesPerDenom);
            setFoodChoices(Object.fromEntries(foodEntries));
        };
    };

    return <div>
        ORder by:
        <select value={selectedSortingParam} onChange={handleSortingParamChange}>
                {Object.entries(foodFilterOptions).map(([key, value]) => <option key={key} value={key}>
                    {value}
                </option>)}
            </select>
        <button onClick={sortButtonHandler}>GO!</button>
        <ul className={classes.foodsToEatList}>
            {Object.entries(foodChoices).map(([key, value]) => <EatFooodItemCard item={value} key={key} onFoodAdd={addFoodEatenHandler.bind(null, key)}>

            </EatFooodItemCard>)}
        </ul>
    </div>

};

export default MealChoicesToEat;
