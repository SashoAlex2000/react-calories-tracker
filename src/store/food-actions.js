import { DUMMY_FOODS, FIREBASE_URL, constructFoodItemId } from "../utils/constants";
import { authActions } from "./auth-slice";
import { foodActions } from "./foods-slice";


// 20230705 -> to be used in useEffect to set the Redux state foodItems, 
// based on auth status.
export const fetchFoodData = (currentUserId) => {

    return async (dispatch) => {

        const fetchData = async () => {
            const response = await fetch(FIREBASE_URL + 'users.json');

            if (!response.ok) {
                throw new Error('Could not fetch the data. Try again later!')
            }

            const data = await response.json();
            
            return data;
        };

        try {

            const foodData = await fetchData(); 

            const currentUserData = foodData.hasOwnProperty(currentUserId) ? foodData[currentUserId] : undefined;

            console.log(currentUserData);

            if (currentUserData) {
                dispatch(foodActions.replaceFoodItems(currentUserData.foods));
                dispatch(authActions.addCurrentMetaCounter(currentUserData.currentMCounter));
                dispatch(foodActions.updateFoodCounter(currentUserData.currentFCounter));
            } else {
                dispatch(foodActions.replaceFoodItems(DUMMY_FOODS));
            };
            

        } catch (error) {
            // TODO make ui redux slice
            console.log('error');
        }


    };

};


// 20230607 -> send ('PUT') request to change the food items to the updated foodItems,
// and update the new local food counter; then add the new food item to local redux state
export const postFoodItem = (foodItems, userId, newestItemId, newFoodCounter) => {

    return async (dispatch) => {

        const sendFoodRequest = async () => {

            const response = await fetch (`${FIREBASE_URL}users/${userId}/foods.json`, {
                method: 'PUT',
                body: JSON.stringify(foodItems)
            });

            if (!response.ok) {
                throw new Error("Couldn't add this food item");
            };

        };

        const sendCounterRequest = async () => {

            const response = await fetch (`${FIREBASE_URL}users/${userId}/currentFCounter.json`, {
                method: 'PUT',
                // body: JSON.stringify(Object.keys(foodItems).length), // using length will create bugs if items are deleted,
                body: JSON.stringify(newFoodCounter),  // receive explicitly the new foodCounter
            });

            if (!response.ok) {
                throw new Error("Couldn't add this food item");
            };

        };

        try {

            await sendFoodRequest();
            await sendCounterRequest();
            
            dispatch(foodActions.addNewFood({
                newId: newestItemId, 
                newFood: foodItems[newestItemId]
            }));

        } catch (error) {
            console.log('there has been an error');
        };
        
    };
    
};
