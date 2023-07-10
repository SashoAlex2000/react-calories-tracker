import { useState } from "react";


const EatFooodItemCard = (props) => {

    const [amountEaten, setAmountEaten] = useState(0);

    const addFoodHandler = () => {
        props.onFoodAdd(amountEaten);
    };

    console.log(props.item);

    return <li>
        {props.item.name}
        {props.item.caloriesPerDenom}
        <input value={amountEaten} onChange={(e) => {setAmountEaten(e.target.value)}} placeholder="Amout eaten"></input>
        <button onClick={addFoodHandler}>Eat This!</button>
    </li>

};

export default EatFooodItemCard;


