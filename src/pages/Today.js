import { useDispatch, useSelector } from "react-redux";
import { daysActions } from "../store/days-slice";
import EatFooodItemCard from "../components/EatFoodItemCard";
import { useEffect } from "react";
import { getTodaysFoods } from "../store/days-actions";
import { transformDate } from "../utils/constants";
import MealsEatenToday from "../components/MealsEatenToday";
import MealChoicesToEat from "../components/MealChoicesToEat";
import { fetchFoodData } from "../store/food-actions";

// 20230710 -> So far it works with local Redux state, no comm with DB;
// it doesn't work if the 'Foods' page isn't visited previously, since foodItems are not loded <- 20230717 - Fixed
// 20230712 -> Fetches Items from Firebase, rework into components for styling purposes
function TodayPage() {

    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.auth.user?.uid);

    useEffect(() => {
        dispatch(fetchFoodData(currentUserId));
    }, [
        currentUserId,
    ]);


    // most of the logic stays here, since it is shared and intertwined between the two parts
    const currentDate = useSelector(state => state.days.currentDate);
    const foodsEaten = useSelector(state => state.days.foodsAteToday);
    const currentUserFoods = useSelector(state => state.foods.foodItems);

    const dateTransformed = transformDate(currentDate);

    console.log(foodsEaten);
    
    const foodsEatenDetails = {};
    const newData = {};

    useEffect(() => {
        if (currentUserId) {
            dispatch(getTodaysFoods(currentUserId, dateTransformed));
        }
    }, [
        currentUserId,
        dispatch, // dateTransformed & dispatch should also be listed as dependencies
        dateTransformed, // theoretically, this should re-run the effect if 'currentDate' changes
    ]);

    for (let [key, value] of Object.entries(currentUserFoods)) { // TODO reverse
        if (foodsEaten.hasOwnProperty(key)) {
            console.log(`${key} - ${value}`);
            // foodsEatenDetails[key] = {};
            foodsEatenDetails[key]= {'repr_string': `Today, you've eaten ${foodsEaten[key]} grams of
            ${currentUserFoods[key].name} for a total of ${(foodsEaten[key] / currentUserFoods[key].commonDenomination) * currentUserFoods[key].caloriesPerDenom} calories
            `};
            foodsEatenDetails[key]['amountEaten'] = [foodsEaten[key]];
            newData[key] = {};
            newData[key]["name"] = currentUserFoods[key]["name"];
            newData[key]["unit"] = currentUserFoods[key]["unit"];
            newData[key]["amountConsumed"] = foodsEaten[key];
            newData[key]["caloriesConsumed"] = (foodsEaten[key] / currentUserFoods[key].commonDenomination) * currentUserFoods[key].caloriesPerDenom;
            newData[key]["commonDenomination"] = currentUserFoods[key].commonDenomination;
        };
    };

    return <>

        <MealsEatenToday currentDate={currentDate} foodsEatenDetails={foodsEatenDetails} newData={newData}/>
        {/* Also send the already eaten foods and the UID, to enable action dispatch (eatFood) */}
        <MealChoicesToEat currentUserFoods={currentUserFoods} foodsEaten={foodsEaten} userId={currentUserId}/>

    </>

};

export default TodayPage;

