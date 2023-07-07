

export const unitChoices = {
    'gram': 'gr.',
    'milliliters': 'ml.',
    'liters': 'l.',
    'kilograms': 'kg.',
};

// temporary dummy foods for testing, until there is Firebase connection
export const OLD_DUMMY_FOODS = [

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

// when fetching the data from firebase, the format is different -> object with keys 'id'
// and value - object with the respective properties. So the DUMMY_DATA has to match the format
export const DUMMY_FOODS = {
    'f1': {
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
    'f2': {
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

};


export const FIREBASE_URL = 'https://react-calorie-tracker-default-rtdb.europe-west1.firebasedatabase.app/';


export const constructFoodItemId = (currentMetaId, foodItemsLastId) => {

    // cannot call useSelector here ...

    if (!currentMetaId || foodItemsLastId < 0) {
        return 'error';
    };

    return `u${currentMetaId}f${foodItemsLastId + 1}`;

};


export const constructNewUserObject = (email, metaCounter) => {

    const obj = {
        currentFCounter: 0,
        currentMCounter: metaCounter+1,
        data: {
            email: email,
            username: '',
            first_name: '',
            last_name: '',
        },
        foods: {

        },
    };

    return obj;

};
