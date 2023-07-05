import { DUMMY_FOODS, FIREBASE_URL } from "../utils/constants";
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
            } else {
                dispatch(foodActions.replaceFoodItems(DUMMY_FOODS));
            };
            

        } catch (error) {
            // TODO make ui redux slice
            console.log('error');
        }


    };

};


