import Card from "./UI/Card";
import classes from './FoodItem.module.css';
import { useRef, useState } from "react";

const FoodEatenItem = (props) => {

    const foodData = props.data;
    const reductionAmount = useRef()

    const reduceFoodEaten = () => {
        console.log('reducing...')
        props.reduceFoodAmount(reductionAmount.current.value);
    };

    return <li className={classes.listItem}>
        <Card>
            <h1>{foodData.name}</h1>
            <p>{foodData.amountConsumed} for a total of  {foodData.caloriesConsumed}</p>

            <input ref={reductionAmount} defaultValue={foodData.commonDenomination}></input>

            <button onClick={reduceFoodEaten}>Reduce amount eaten</button>
        </Card>
    </li>

};

export default FoodEatenItem;
