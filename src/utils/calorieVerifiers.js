import { MacrosCaloriesPerGram } from "./constants";


export const checkTotalCaloriValidy = (totalCalories, carbohydratesGrams, proteinGrams, fatGrams, confidenceInterval) => {

    // Function which takes (some of) the params when a user attempts to add a new food
    // Determines whether the total calories entered by the user match with the actual total calories,
    // derived by multiplying each macronutrient with its caloric content
    // In the future this option could be tweaked or turned off by users in the settings  

    // TODO extract into helper verifier functions wherever possible;
    // Raise error instead of returning undefined
    // Add more checks for the other variables 
    if (typeof confidenceInterval !== 'number') {
        return undefined;
    };

    if (confidenceInterval < 0 || confidenceInterval >= 1) {
        return undefined
    };

    const caloriesPerGramCarb = MacrosCaloriesPerGram['carbohydrates'];
    const caloriesPerGramFat = MacrosCaloriesPerGram['fat'];
    const caloriesPerGramProtein = MacrosCaloriesPerGram['protein'];

    const totalCaloriesByMacros = caloriesPerGramCarb * carbohydratesGrams + caloriesPerGramFat * fatGrams + caloriesPerGramProtein * proteinGrams;
    
    const lowerBound = totalCalories * (1 - confidenceInterval);
    const upperBound = totalCalories * (1 + confidenceInterval);

    console.log(`Total calclulated calories: ${totalCaloriesByMacros} VS. total calories as a given: ${totalCalories}`);

    if (totalCaloriesByMacros < lowerBound || totalCaloriesByMacros > upperBound) {
        return false;
    };

    return true;

};


export const fivePercentBoundCalorieCheck = (totalCalories, carbohydratesGrams, proteinGrams, fatGrams) => {
    
    const res = checkTotalCaloriValidy(totalCalories, carbohydratesGrams, proteinGrams, fatGrams, 0.05);
    return res;

}

