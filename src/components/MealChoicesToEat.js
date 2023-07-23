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
    const [searchedFood, setSearchedFood] = useState('');
    
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

        let finalFoodChoices;

        // props.currentUserFoods has to be used, to avoid nulling the food choices with
        // filtering by searched word
        if (selectedSortingParam === "date-asc") {
            finalFoodChoices = props.currentUserFoods;
        } else if (selectedSortingParam === "date-desc") {
            const reversedKeys = Object.keys(props.currentUserFoods).reverse();
            const newObj = {};
            reversedKeys.forEach(key => {
                newObj[key] = foodChoices[key];
            });
            // filter the choices to exclude undefined values
            finalFoodChoices = Object.fromEntries(Object.entries(newObj).filter(([key, value]) => value !== undefined));
        } else if (selectedSortingParam === "calories-desc") {
            console.log("baznin ga");
            let foodEntries = Object.entries(props.currentUserFoods);
            foodEntries.sort((a, b) => b[1].caloriesPerDenom - a[1].caloriesPerDenom);
            finalFoodChoices = Object.fromEntries(foodEntries);
        } else if (selectedSortingParam === "calories-asc") {
            let foodEntries = Object.entries(props.currentUserFoods);
            foodEntries.sort((a, b) => a[1].caloriesPerDenom - b[1].caloriesPerDenom);
            finalFoodChoices = Object.fromEntries(foodEntries);
        };

        if (searchedFood.trim() !== '') {
            finalFoodChoices = Object.fromEntries(Object.entries(finalFoodChoices).filter(([key, value]) => value.name.includes(searchedFood)));
        };

        setFoodChoices(finalFoodChoices);

    };

    return <div>
        ORder by:
        <select value={selectedSortingParam} onChange={handleSortingParamChange}>
                {Object.entries(foodFilterOptions).map(([key, value]) => <option key={key} value={key}>
                    {value}
                </option>)}
            </select>
        <input placeholder="Search By Name" value={searchedFood} onChange={(e) => setSearchedFood(e.target.value)}></input>
        <button onClick={sortButtonHandler}>GO!</button>
        <ul className={classes.foodsToEatList}>
            {Object.entries(foodChoices).map(([key, value]) => <EatFooodItemCard item={value} key={key} onFoodAdd={addFoodEatenHandler.bind(null, key)}>

            </EatFooodItemCard>)}
        </ul>
    </div>

};

export default MealChoicesToEat;
