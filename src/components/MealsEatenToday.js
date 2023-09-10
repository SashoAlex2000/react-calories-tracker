import { useDispatch, useSelector } from "react-redux";
import { transformDate } from "../utils/constants";
import { lowerFoodEatenAmoount } from "../store/days-actions";


const MealsEatenToday = (props) => {

    const dispatch = useDispatch();
    
    const currentUserId = useSelector(state => state.auth.user?.uid);

    let currentDate = useSelector(state => state.days.currentDate);
    const dateTransformed = transformDate(currentDate)

    const reduceFoodEatenAmount = (foodId, quantity) => {

        if (!quantity) {
            quantity = 100; // change default to food commonDenomination, connect to value displayed
        };

        // Doesn't work this way, accessing the values has to be through square brackets e.g. [`${key}`] 
        // const newFoodAmount = Number(props.foodsEatenDetails.foodId.amountEaten) - quantity;
        const newFoodAmount = Number(props.foodsEatenDetails[`${foodId}`].amountEaten) - quantity;

        // TODO add checks and dispatch different actions depending on whether the whole amount is removed
        // add option to choose reduction amount and connect it to values/refs;
        // Catch cases where the amount would reach below 0 

        dispatch(lowerFoodEatenAmoount(currentUserId, dateTransformed, foodId, newFoodAmount));

    };

    return <>
    <h1>
        This is the page of meals consumed today - {props.currentDate};
    </h1>
        <ul>
            {Object.entries(props.foodsEatenDetails).map(([key, value]) => <li key={key}>
                {key} - {value.repr_string}
                <button onClick={reduceFoodEatenAmount.bind(null, key, 100)}>Reduce by 100</button>
                </li>)}
        </ul>
        {/* display appropriate message for lack of foods eaten for current day */}
        {Object.entries(props.foodsEatenDetails).length===0 && <h1>You haven't eaten anything today!</h1>}
    </>

};

export default MealsEatenToday;
