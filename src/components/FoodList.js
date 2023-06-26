import FooodItem from "./FoodItem";
import classes from './FoodList.module.css'

const FoodList = (props) => {

    return <>
        <h1>
            {props.header}
        </h1>
        <ul className={classes.foodList}>
            {props.foods.map(f => <FooodItem key={f.id} data={{
                name: f.name,
                caloriesPerDenom: f.caloriesPerDenom,
                unit: f.unit,
                commonDenomination: f.commonDenomination,
                macros: f.macros,
            }} />)}
        </ul>
    </>

};

export default FoodList;
