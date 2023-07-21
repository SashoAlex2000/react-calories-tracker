

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


// 20230708 -> construct the object to be sent as a value on user register
export const constructNewUserObject = (email, metaCounter) => {

    metaCounter++;

    const obj = {
        currentFCounter: 0,
        currentMCounter: metaCounter,
        data: {
            email: email,
            username: '',
            first_name: '',
            last_name: '',
        },
        foods: null,
    };

    return obj;

};

// 20230711 -> the function constructs a date string, in the appropriate format
export function transformDate (someDate) {

    if (typeof someDate === 'string') { // the format of toLocaleDateString() is 'mm/dd/yyyy'
        const shredded = someDate.split('/');
        const year = shredded[2];
        const month = Number(shredded[0]) < 10 ? `0${shredded[0]}` : shredded[0];
        const day = Number(shredded[1]) < 10 ? `0${shredded[1]}` : shredded[1];

        const result = year + month + day;

        return result;

    };

};

export const foodFilterOptions = {
    'date-asc': 'By date, ascending',
    'date-desc': 'By date, descending',
    'calories-desc': 'By Calories, descending',
    'calories-asc': 'By Calories, ascending',
};
