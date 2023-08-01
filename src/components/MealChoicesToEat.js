import { useDispatch } from "react-redux";
import EatFooodItemCard from "./EatFoodItemCard";
import classes from './MealChoicesToEat.module.css';
import { eatFood } from "../store/days-actions";
import { foodFilterOptions, transformDate } from "../utils/constants";
import { useMemo, useState } from "react";

const MealChoicesToEatTEST = (props) => {

    const dispatch = useDispatch();

    const [selectedSortingParam, setSelectedSortingParam] = useState(Object.entries(foodFilterOptions)[0][0]);
    const [searchedFood, setSearchedFood] = useState('');

    // 20230719 -> no longer use addNewFood, dispatch an 'eatFood' action to send the data to Firebase
    const addFoodEatenHandler = (foodItemId, quantity) => {

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

    };

    // 20230725 -> remove the sorting by button; sort on keystroke and option change
    // useMemo to memoize the results and re-render only when necessary 
    const filteredItems = useMemo(() => {
        if (!searchedFood.trim()) return props.currentUserFoods;
        // 20230801 -> fix: filtering works irrespective of letter case
        return Object.fromEntries(Object.entries(props.currentUserFoods).filter(([key, value]) => value.name.toLowerCase().includes(searchedFood.toLocaleLowerCase())));;
    }, [
        props.currentUserFoods, // use props.currentUserFoods to re-render correctly on DB fetch
        searchedFood
    ]);

    const sortedItems = useMemo(() => {
        const itemsCopy = { ...filteredItems };

        if (selectedSortingParam === "date-asc") {
            return itemsCopy;
        } else if (selectedSortingParam === "date-desc") {
            const reversedKeys = Object.keys(itemsCopy).reverse();
            const newObj = {};
            reversedKeys.forEach(key => {
                newObj[key] = props.currentUserFoods[key];
            });
            // filter the choices to exclude undefined values
            return Object.fromEntries(Object.entries(newObj).filter(([key, value]) => value !== undefined));
        } else if (selectedSortingParam === "calories-desc") {
            console.log("baznin ga");
            let foodEntries = Object.entries(itemsCopy);
            foodEntries.sort((a, b) => b[1].caloriesPerDenom - a[1].caloriesPerDenom);
            return Object.fromEntries(foodEntries);
        } else if (selectedSortingParam === "calories-asc") {
            let foodEntries = Object.entries(itemsCopy);
            foodEntries.sort((a, b) => a[1].caloriesPerDenom - b[1].caloriesPerDenom);
            return Object.fromEntries(foodEntries);
        };

    }, [
        filteredItems,
        selectedSortingParam
    ]);

    const handleSortingParamChange = (event) => {

        setSelectedSortingParam(event.target.value);

    };

    // 20230725 -> the bug with items not re-rendering here when fetched was due to them being in local 
    // state with useState, which didn't catch anything changed in the store, beyond the inital state,
    // so there was need for reaching the page again; fixed with using props.currentUserFoods
    return <div>
        Order by:
        <select value={selectedSortingParam} onChange={handleSortingParamChange}>
            {Object.entries(foodFilterOptions).map(([key, value]) => <option key={key} value={key}>
                {value}
            </option>)}
        </select>
        <input placeholder="Search By Name" value={searchedFood} onChange={(e) => setSearchedFood(e.target.value)}></input>
        <ul className={classes.foodsToEatList}>
            {Object.entries(sortedItems).map(([key, value]) => <EatFooodItemCard item={value} key={key} onFoodAdd={addFoodEatenHandler.bind(null, key)}>

            </EatFooodItemCard>)}
        </ul>
    </div>

};

export default MealChoicesToEatTEST;
