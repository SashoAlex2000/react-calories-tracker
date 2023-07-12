import { useDispatch } from "react-redux";
import EatFooodItemCard from "./EatFoodItemCard";
import { daysActions } from "../store/days-slice";


const MealChoicesToEat = (props) => {

    const dispatch = useDispatch();
    
    const addFoodEatenHandler = (foodItemId, quantity) => {
        console.log('we really in separate component though')
        dispatch(daysActions.addNewFood({
            foodId: foodItemId,
            amount: quantity,
        }));
    }

    return <div>
        <ul>
            {Object.entries(props.currentUserFoods).map(([key, value]) => <EatFooodItemCard item={value} key={key} onFoodAdd={addFoodEatenHandler.bind(null, key)}>

            </EatFooodItemCard>)}
        </ul>
    </div>

};

export default MealChoicesToEat;
