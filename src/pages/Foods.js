import { useState } from "react";
import AddFoodForm from "../components/AddFoodForm";
import FoodList from "../components/FoodList";
import { useSelector } from "react-redux";


const header = "This is the page of your foods available;";

// 20230628 -> no longer utilize useState to have foodList and setFoodListm, with initial state from DUMMY_FOODS
// use redux and the foodsItems from the foods slice; also remove the addFoodHandler, 
// foods are now added with dispatch and redux actions

function FoodsPage () {

    const testItems = useSelector(state => state.foods.foodItems);

    return <>
        <AddFoodForm/>
        <FoodList header={header} foods={testItems}/>
    </>
};

export default FoodsPage;

