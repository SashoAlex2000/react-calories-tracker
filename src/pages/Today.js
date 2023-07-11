import { useDispatch, useSelector } from "react-redux";
import { daysActions } from "../store/days-slice";
import EatFooodItemCard from "../components/EatFoodItemCard";
import { useEffect } from "react";
import { getTodaysFoods } from "../store/days-actions";
import { transformDate } from "../utils/constants";

// 20230710 -> So far it works with local Redux state, no comm with DB;
// it doesn't work if the 'Foods' page isn't visited previously, since foodItems are not loded
function TodayPage() {

    const currentDate = useSelector(state => state.days.currentDate);
    const foodsEaten = useSelector(state => state.days.foodsAteToday);
    const currentUserFoods = useSelector(state => state.foods.foodItems);
    const currentUserId = useSelector(state => state.auth.user?.uid);

    const dateTransformed = transformDate(currentDate);

    console.log(foodsEaten);
    const dispatch = useDispatch();

    const foodsEatenDetails = {};

    useEffect(() => {
        if (currentUserId) {
            dispatch(getTodaysFoods(currentUserId, dateTransformed));
        }
    }, [
        currentUserId,
    ]);

    for (let [key, value] of Object.entries(currentUserFoods)) {
        if (foodsEaten.hasOwnProperty(key)) {
            console.log(`${key} - ${value}`);
            foodsEatenDetails[key] = `Today, you've eaten ${foodsEaten[key]} grams of
            ${currentUserFoods[key].name} for a total of ${(foodsEaten[key] / currentUserFoods[key].commonDenomination) * currentUserFoods[key].caloriesPerDenom} calories
            `;
        };
    };

    const addFoodEatenHandler = (foodItemId, quantity) => {
        console.log('we really in addFoodEatenHandler though')
        dispatch(daysActions.addNewFood({
            foodId: foodItemId,
            amount: quantity,
        }));
    }

    return <><h1>
        This is the page of meals consumed today - {currentDate};
    </h1>
        <div>
            <ul>
                {Object.entries(currentUserFoods).map(([key, value]) => <EatFooodItemCard item={value} key={key} onFoodAdd={addFoodEatenHandler.bind(null, key)}>

                </EatFooodItemCard>)}
            </ul>
        </div>
        <ul>
            {Object.entries(foodsEatenDetails).map(([key, value]) => <li key={key}>{key} - {value}</li>)}
        </ul>
    </>

};

export default TodayPage;

