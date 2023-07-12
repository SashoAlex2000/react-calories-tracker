

const MealsEatenToday = (props) => {

    return <>
    <h1>
        This is the page of meals consumed today - {props.currentDate};
    </h1>
        <ul>
            {Object.entries(props.foodsEatenDetails).map(([key, value]) => <li key={key}>{key} - {value}</li>)}
        </ul>
        {/* display appropriate message for lack of foods eaten for current day */}
        {Object.entries(props.foodsEatenDetails).length==0 && <h1>You haven't eaten anything today!</h1>}
    </>

};

export default MealsEatenToday;
