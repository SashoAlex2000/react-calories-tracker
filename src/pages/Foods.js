import { useEffect, useState } from "react";
import AddFoodForm from "../components/AddFoodForm";
import FoodList from "../components/FoodList";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodData } from "../store/food-actions";


const header = "This is the page of your foods available;";

// 20230628 -> no longer utilize useState to have foodList and setFoodListm, with initial state from DUMMY_FOODS
// use redux and the foodsItems from the foods slice; also remove the addFoodHandler, 
// foods are now added with dispatch and redux actions

function FoodsPage () {

    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.auth.user?.uid);

    // 20230705 -> run this function each time the auth status changes -> 
    // if there is no user it will get get the dummy data, otherwise 
    // it sets the appropriate Redux state as the foodItems from DB
    // the right pattern is using the dispatch to change the data and later getting it with useSelector
    useEffect(() => {
        dispatch(fetchFoodData(currentUserId));
    }, [
        currentUserId,
    ]);

    
    // cannot get the result from dispatch, it returns promise ...
    // cannot use useSelector inside conditionals
    const items = useSelector(state => state.foods.foodItems);

    // 20230710 -> AddFoodForm is now rendered conditionally in a Modal with a Backdrop
    const [shouldShowAddForm, setShouldShowAddForm] = useState(false);

    const hideAddFormHandler = () => {
        setShouldShowAddForm(false);
    };

    const showAddFormHandler = () => {
        setShouldShowAddForm(true);
    };

    return <>
        {shouldShowAddForm && <AddFoodForm onCloseAddForm={hideAddFormHandler}/>}
        
        <FoodList header={header} foods={items} showAddFoodForm={showAddFormHandler}/>
    </>
};

export default FoodsPage;

