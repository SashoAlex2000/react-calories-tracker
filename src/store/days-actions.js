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

