
import { useRef, useState } from 'react';
import classes from './AddFoodForm.module.css';
import { checkEmptyInput, checkForNonNegativeNumberInput } from '../utils/formValidityCheckers';
import { unitChoices } from '../utils/constants';
import { redirect } from 'react-router-dom';

const AddFoodForm = (props) => {

    const foodName = useRef();
    const calories = useRef();
    const denom = useRef();

    const [unitValue, setUnitValue] = useState(Object.entries(unitChoices)[0][0]);

    const fat = useRef();
    const protein = useRef();
    const carbs = useRef(); 

    const addFoodSubmitHandler = (event) => {

        event.preventDefault();

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
        }

        props.onFoodAdd({
            name: foodName.current.value,
            caloriesPerDenom: denom.current.value,
            unit: unitValue,
            commonDenomination: denom.current.value,
            macros: {
                protein: +protein.current.value,
                carbohydrates: +carbs.current.value,
                fat: +fat.current.value,
            }

        });
        return redirect('/foods');

    };
    
    const handleOptionChange = (event) => {
        setUnitValue(event.target.value);
    }

    return <>
        <form className={classes.foodForm} onSubmit={addFoodSubmitHandler}>

            <input placeholder="food name" id="food-name" ref={foodName}></input>
            <input placeholder="calories" id="calories" ref={calories}></input>

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

        </form>
    </>

};

export default AddFoodForm;
