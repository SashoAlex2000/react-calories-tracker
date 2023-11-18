
import { useRef, useState } from 'react';
import classes from './AddFoodForm.module.css';
import { checkEmptyInput, checkForNonNegativeNumberInput } from '../utils/formValidityCheckers';
import { constructFoodItemId, unitChoices } from '../utils/constants';
import { redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postFoodItem } from '../store/food-actions';
import Modal from './UI/Modal';
import { fivePercentBoundCalorieCheck } from '../utils/calorieVerifiers';

const AddFoodForm = (props) => {

    const foodName = useRef();
    const calories = useRef();
    const denom = useRef();

    const [unitValue, setUnitValue] = useState(Object.entries(unitChoices)[0][0]);

    const fat = useRef();
    const protein = useRef();
    const carbs = useRef();

    const dispatch = useDispatch();

    const currentMetaCounter = useSelector(state => state.auth.user?.currentMetaCounter);
    const currentFoodCounter = useSelector(state => state.foods?.currentFoodCounter);
    const currentItemId = constructFoodItemId(currentMetaCounter, currentFoodCounter);
    const UID = useSelector(state => state.auth.user?.uid);

    const foodAll = useSelector(state => state.foods.foodItems);

    const [caloriesColorOuline, setCaloriesColorOutline] = useState(false);

    const addFoodSubmitHandler = (event) => {

        event.preventDefault();
        // TODO -> prevent this page from loading if no user

        const nameIsValid = checkEmptyInput(foodName.current.value);
        const caloriesIsValid = checkEmptyInput(calories.current.value) && checkForNonNegativeNumberInput(calories.current.value);
        const unitIsValid = checkEmptyInput(unitValue) && unitValue in unitChoices;
        const denomIsValid = checkEmptyInput(denom.current.value);
        const proteinIsValid = checkEmptyInput(protein.current.value) && checkForNonNegativeNumberInput(protein.current.value);
        const carbsIsValid = checkEmptyInput(carbs.current.value) && checkForNonNegativeNumberInput(carbs.current.value);
        const fatIsValid = checkEmptyInput(fat.current.value) && checkForNonNegativeNumberInput(fat.current.value);

        const formIsValid = nameIsValid && caloriesIsValid && unitIsValid && denomIsValid && proteinIsValid && carbsIsValid && fatIsValid;

        if (!formIsValid) {
            return;
        };

        if (currentItemId === "error") {
            return;
        }

        let totalCaloriesAreCorrect = fivePercentBoundCalorieCheck(
            calories.current.value,
            carbs.current.value,
            protein.current.value,
            fat.current.value,
        );

        if (!totalCaloriesAreCorrect) {
            console.log('CALORIES DO NOT MATCH')
            setCaloriesColorOutline(true);
            return;
        };
        

        // 20230628 -> remove props.onAddFood (addFoodHandler), add foods to redux with dispatch and actions
        // 20230706 -> no longer added directly in redux, use action to send data to Firebase, 
        // and then update local redux state accordingly
        const newFoodObjectData = {
            name: foodName.current.value,
            caloriesPerDenom: +calories.current.value,
            unit: unitValue,
            commonDenomination: denom.current.value,
            macros: {
                protein: +protein.current.value,
                carbohydrates: +carbs.current.value,
                fat: +fat.current.value,
            }
        };

        const newItem = {};
        newItem[currentItemId] = newFoodObjectData;
        // TODO -> in this way all the foods are added each time and sent - fix with a POST request
        const newFoods = {
            ...foodAll,
            ...newItem,
        };

        // the new foodCounter has to be passed to enable updating in Firebase
        const newFoodCounter = currentFoodCounter + 1;
        dispatch(postFoodItem(newFoods, UID, currentItemId, newFoodCounter));

        return redirect('/foods');

    };

    const handleOptionChange = (event) => {
        setUnitValue(event.target.value);
    }

    const onTotalCaloriesChange = (event) => {

        // If the total calories do not match, and the user re-enters the total calories correctly, remove red outline
        // TODO -> this should remove it when the macros are changed as well; if the total sum matches


        let checkForTotalCals = fivePercentBoundCalorieCheck(
            calories.current.value,
            carbs.current.value,
            protein.current.value,
            fat.current.value,
        );
        
        // No if-else statements; just set it to the reverse, this way the UI reflects correct-> incorrect calories change
        setCaloriesColorOutline(!checkForTotalCals);

    };

    // The class is applied when there is a mistake, however it is red only when the input element is clicked
    // probably since it is not re-rendered - but it should be, since it uses caloriesColorOuline ?
    // The problem was with the lack of outline-style: solid in the css ...
    let calorieInputClass = caloriesColorOuline ? classes.wrongInput : classes.correctInput;
    console.log(`OUTLINE IS: ${calorieInputClass}`);

    return <Modal onClose={props.onCloseAddForm}>
        <form className={classes.foodForm} onSubmit={addFoodSubmitHandler}>

            <input placeholder="food name" id="food-name" ref={foodName}></input>

            {caloriesColorOuline && <p>Total calories do NOT match with the sum of macros</p>}
            <input placeholder="calories" id="calories" ref={calories} className={calorieInputClass} onChange={onTotalCaloriesChange}></input>

            <select value={unitValue} onChange={handleOptionChange}>
                {Object.entries(unitChoices).map(([key, value]) => <option key={key} value={key}>
                    {value}
                </option>)}
            </select>


            <input placeholder="common denomination" id="denom" ref={denom}></input>
            <input placeholder="protein" id="protein" ref={protein}></input>
            <input placeholder="carbs" id="carbs" ref={carbs}></input>
            <input placeholder="fat" id="fat" ref={fat}></input>

            <button type="submit">Add food</button>
            <button type="button" onClick={props.onCloseAddForm}>Close</button>

        </form>
    </Modal>

};

export default AddFoodForm;
