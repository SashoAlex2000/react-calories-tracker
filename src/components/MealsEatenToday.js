import { useDispatch, useSelector } from "react-redux";
import { transformDate } from "../utils/constants";
import { lowerFoodEatenAmoount, removeFoodEaten } from "../store/days-actions";


const MealsEatenToday = (props) => {

    const dispatch = useDispatch();
    
    const currentUserId = useSelector(state => state.auth.user?.uid);

    let currentDate = useSelector(state => state.days.currentDate);
    const dateTransformed = transformDate(currentDate)

    const reduceFoodEatenAmount = (foodId, quantity) => {

        if (!quantity) {
            quantity = 100; // change default to food commonDenomination, connect to value displayed
        };

        // props.foodsEatenDetails.foodId.amountEaten -->> Doesn't work, 
        // accessing the values has to be through square brackets e.g. [`${key}`] 
        const newFoodAmount = Number(props.foodsEatenDetails[`${foodId}`].amountEaten) - quantity;

        // TODO 
        //  ✓ add checks and dispatch different actions depending on whether the whole amount is removed
        // add option to choose reduction amount and connect it to values/refs;
        // ✓ Catch cases where the amount would reach below 0 

        // Check the new food amount locally, and then call the appropriate fucntion:
        // lower the amount if the new amount > 0, else remove it -> circumvent negative values
        if (newFoodAmount > 0) {
            dispatch(lowerFoodEatenAmoount(currentUserId, dateTransformed, foodId, newFoodAmount));
        } else if (newFoodAmount <= 0) {
            dispatch(removeFoodEaten(currentUserId, dateTransformed, foodId));
        };

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
