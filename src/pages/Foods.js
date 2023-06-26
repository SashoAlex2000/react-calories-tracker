import AddFoodForm from "../components/AddFoodForm";
import FoodList from "../components/FoodList";

const DUMMY_FOODS = [

    {
        id: 'f1',
        name: 'banitsa',
        caloriesPerDenom: '245',
        unit: 'gram',
        commonDenomination: 100,
        macros: {
            protein: 6,
            carbohydrates: 40,
            fat: 8,
        },
    },
    {
        id: 'f2',
        name: 'whole milk',
        caloriesPerDenom: '55',
        unit: 'milliliters',
        commonDenomination: 100,
        macros: {
            protein: 4,
            carbohydrates: 3,
            fat: 4,
        },
    },
    {
        id: 'f3',
        name: 'Eggs',
        caloriesPerDenom: '145',
        unit: 'grams',
        commonDenomination: 100,
        macros: {
            protein: 13,
            carbohydrates: 0,
            fat: 10,
        },
    },
    {
        id: 'f4',
        name: 'Tomatoes',
        caloriesPerDenom: '30',
        unit: 'grams',
        commonDenomination: 100,
        macros: {
            protein: 0,
            carbohydrates: 7,
            fat: 0,
        },
    },

];

const header = "This is the page of your foods available;";

function FoodsPage () {

    return <>
        <AddFoodForm/>
        <FoodList header={header} foods={DUMMY_FOODS}/>
    </>
};

export default FoodsPage;

