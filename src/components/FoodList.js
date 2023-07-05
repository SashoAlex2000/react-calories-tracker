import FooodItem from "./FoodItem";
import classes from './FoodList.module.css'

const FoodList = (props) => {

    console.log(props.foods);

    return <>
        <h1>
            {props.header}
        </h1>
        <ul className={classes.foodList}>
            {/* 20230705 -> props.foods is now a object, so it has to be iterated differently */}
            {Object.entries(props.foods).map(([key, value]) => <FooodItem key={key} data={{
                name: value.name,
                caloriesPerDenom: value.caloriesPerDenom,
                unit: value.unit,
                commonDenomination: value.commonDenomination,
                macros: value.macros,
            }} />)}
        </ul>
    </>

};

export default FoodList;


// {Object.entries(props.foods).map(([key, value]) => <FooodItem key={key} data={{
//     name: value.name,
//     caloriesPerDenom: value.caloriesPerDenom,
//     unit: value.unit,
//     commonDenomination: value.commonDenomination,
//     macros: value.macros,
// }} />)}

// {props.foods.map(f => <FooodItem key={f.id} data={{
//     name: f.name,
//     caloriesPerDenom: f.caloriesPerDenom,
//     unit: f.unit,
//     commonDenomination: f.commonDenomination,
//     macros: f.macros,
// }} />)}