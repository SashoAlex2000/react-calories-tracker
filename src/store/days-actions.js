import { FIREBASE_URL } from "../utils/constants";
import { daysActions } from "./days-slice";


export const getTodaysFoods = (currentUserId, currentDate) => {

    return async (dispatch) => {

        async function getTheData() {

            const data = await fetch(`${FIREBASE_URL}days/${currentUserId}/${currentDate}.json`);

            const result = await data.json();

            return result;

        };

        try {
            const todaysMeals = await getTheData();
            console.log(todaysMeals);
            dispatch(daysActions.replaceFoodsEaten(todaysMeals));
        } catch (error) {
            console.log(error);
        }
        

    };

};

// 20230719 -> PUT the updated list of foods eaten in Firebase, w/ appropriate UID and date
export const eatFood = (userId, date, foodsEaten) => {

    return async (dispatch) => {

        const sendData = async () => {
            await fetch (`${FIREBASE_URL}days/${userId}/${date}.json`, {
                method: 'PUT',
                body: JSON.stringify(foodsEaten),
            });
        };

        try {
            await sendData();
            // could try adding one food only to avoid changing whole state
            dispatch(daysActions.replaceFoodsEaten(foodsEaten));
        } catch (error) {
            console.log(error);
        }
        
    };

};


export const lowerFoodEatenAmoount = (userId, date, foodId, newAmount) => {

    return async (dispatch) => {

        const sendReductionRequest = async () => {

            await fetch(`${FIREBASE_URL}days/${userId}/${date}/${foodId}.json`, {
                method: 'PUT',
                body: JSON.stringify(newAmount),
            });

        };

        try {
            
            await sendReductionRequest();
            dispatch(daysActions.lowerFoodEaten({
                uid: foodId,
                newAmount: newAmount,
            }));

        } catch (error) {
            console.log(`Error reducing the food amount: ${error}`);
        }

    }

}



export const removeFoodEaten = (userId, date, foodId) => {

    return async (dispatch) => {

        const sendRemovalRequest = async () => {
            // https://stackoverflow.com/questions/68333644/how-can-i-delete-some-data-from-firebase-realtime-database
            await fetch(`${FIREBASE_URL}days/${userId}/${date}/${foodId}.json`, {
                method: 'DELETE',
            })
        };

        try {

            await sendRemovalRequest();
            
            dispatch(daysActions.deleteFoodEaten(foodId));

        } catch (error) {
            console.log(`ERROR: ${error}`)
        }

    };

};
