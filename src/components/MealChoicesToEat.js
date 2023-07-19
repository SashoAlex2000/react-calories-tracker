import { useDispatch } from "react-redux";
import EatFooodItemCard from "./EatFoodItemCard";
import { daysActions } from "../store/days-slice";
import classes from './MealChoicesToEat.module.css';
import { eatFood } from "../store/days-actions";
import { transformDate } from "../utils/constants";

const MealChoicesToEat = (props) => {

    const dispatch = useDispatch();
    
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

    return <div>
        <ul className={classes.foodsToEatList}>
            {Object.entries(props.currentUserFoods).map(([key, value]) => <EatFooodItemCard item={value} key={key} onFoodAdd={addFoodEatenHandler.bind(null, key)}>

            </EatFooodItemCard>)}
        </ul>
    </div>

};

export default MealChoicesToEat;
