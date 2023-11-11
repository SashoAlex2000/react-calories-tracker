import Card from "./UI/Card";
import classes from './EatFoodItem.module.css'
import { useRef, useState, useEffect } from "react";

const FoodEatenItem = (props) => {

    // Regarding the defaultValueToDisplay being dynamic, it didn't work when the input had a 'defaultValue' set 
    // instead of a 'value' one, since it is changed only on component mount
    // When using 'value' there should be onChange function added to to make the component take the current entered value 
    // by the user, otherwise the value is locked as the one determined in defaultValueToDisplay

    const foodData = props.data;
    const reductionAmount = useRef();
    
    const calculateReductionValueToDisplay = (defaultValue, currentValue) => {
        const result = Math.min(defaultValue, currentValue);
        return result;
    };

    // let defaultValueToDisplay = calculateReductionValueToDispay(foodData.commonDenomination, foodData.amountConsumed);
    let [defaultValueToDisplay, setDefaultValueToDisplay] = useState(Math.min(foodData.commonDenomination, foodData.amountConsumed));

    useEffect(() => {
        const newValue =calculateReductionValueToDisplay(foodData.commonDenomination, foodData.amountConsumed)
        setDefaultValueToDisplay(newValue);
    }, [
        foodData.amountConsumed, 
        foodData.commonDenomination
    ]);


    const reduceFoodEaten = () => {
        props.reduceFoodAmount(reductionAmount.current.value);
    };

    return <li className={classes.foodItemToEat}>
        <Card>
            <h1>{foodData.name}</h1>
            <p>{foodData.amountConsumed} for a total of  {foodData.caloriesConsumed}</p>

            <input ref={reductionAmount} value={defaultValueToDisplay} onChange={(e) => setDefaultValueToDisplay(e.target.value)} ></input>

            <button onClick={reduceFoodEaten}>Reduce amount eaten</button>
        </Card>
    </li>

};

export default FoodEatenItem;
