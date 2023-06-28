

export const unitChoices = {
    'grams': 'gr.',
    'milliliters': 'ml.',
    'liters': 'l.',
    'kilograms': 'kg.',
};

// temporary dummy foods for testing, until there is Firebase connection
export const DUMMY_FOODS = [

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
