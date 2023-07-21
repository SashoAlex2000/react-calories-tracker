import { useState } from "react";
import classes from './EatFoodItem.module.css'
import Card from "./UI/Card";

const EatFooodItemCard = (props) => {

    const [amountEaten, setAmountEaten] = useState(props.item.commonDenomination);

    const addFoodHandler = () => {
        props.onFoodAdd(amountEaten);
    };

    console.log(props.item);

    return <li className={classes.foodItemToEat}>
        <Card additionalClass={'itemToEat'}>
            <h1>{props.item.name}</h1>
            <h3>{props.item.caloriesPerDenom} calories per {props.item.commonDenomination} {props.item.unit}</h3>
            
            <input value={amountEaten} onChange={(e) => { setAmountEaten(e.target.value) }} placeholder="Amout eaten"></input>
            <button onClick={addFoodHandler}>Eat This!</button>
        </Card>
    </li>

};

export default EatFooodItemCard;


