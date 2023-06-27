

export const checkEmptyInput = (someValue) => {
    
    if (someValue.trim() === '') {
        return false;
    }

    return true;

};

export const checkForNonNegativeNumberInput = (someValue) => {

    someValue = +someValue;

    if (someValue < 0 || isNaN(someValue)) {
        return false;
    }

    return true;

};
