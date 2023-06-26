import Card from "./UI/Card";
import classes from './FoodItem.module.css';
import { useState } from "react";

const FooodItem = (props) => {

    const [shouldShowMacros, setShouldShowMacros] = useState(false);

    const foodData = props.data;

    // TODO display arrows for showing and hiding
    let arrow = String.fromCharCode(`&#11015`);

    let buttonText = shouldShowMacros ? 'show macros' : 'hide macros';

    const toggleMacrosHandler = (event) => {

        setShouldShowMacros(shouldShowMacros => !shouldShowMacros);

    }

    const macros = <>
        <p>Protein: {foodData.macros.protein}</p>
        <p>Carbs: {foodData.macros.carbohydrates}</p>
        <p>Fat: {foodData.macros.fat}</p>
    </>

    return <li className={classes.listItem}>
        <Card>
            <h1>{foodData.name}</h1>
            <p>{foodData.caloriesPerDenom} calories per {foodData.commonDenomination}{foodData.unit}</p>
            <button onClick={toggleMacrosHandler}>{buttonText}</button>
            {shouldShowMacros && macros}
        </Card>
    </li>

};

export default FooodItem;
