
import classes from './AddFoodForm.module.css';

const AddFoodForm = (props) => {

    return <>
        <form className={classes.foodForm}>

            <input placeholder="food name" id="food-name"></input>
            <input placeholder="calories" id="calories"></input>
            <input placeholder="unit" id="unit"></input>
            <input placeholder="common denomination" id="denom"></input>
            <input placeholder="protein" id="protein"></input>
            <input placeholder="carbs" id="carbs"></input>
            <input placeholder="fat" id="fat"></input>

            <button type="submit">Add food</button>

        </form>
    </>

};

export default AddFoodForm;
