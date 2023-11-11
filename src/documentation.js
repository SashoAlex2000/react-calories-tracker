
/*
-------------------------------------------------- React Calorie Tracker --------------------------------------------------

-- Overview

---- react-calorie-tracker (RCT) is a hobby project, used to practice React and other connected technologies/concepts. It 
provides users with the ability to save items with calories and macros, and to add each day what they've eaten, in order 
to track their daily eating habits.
-> Users can look at the foods they've added and the details of them; as well as add new foods.
-> They can 'eat' any of the foods they've added and it will be saved in the database. 

---- State so far:
-> The app is in a very inital stage of development; 
-> The UI styling is almost non-existent; there is just a basic separation into grid of some items
-> some data are just displayed in text on the screen for verification purposes, with no styling yet

---- Development plan further on:
-> Write documentation
-> Total UI overhaul to make the app actually look decent
-> improvement & enlargement of current functionality, e.g. add ability to delete an 'eaten' item; more filtering options;
pagination and so on;
-> add 'guards' for components / functionalities which shouldn't be accessed by non-authenticated users
-> Add ability to view total calories, macros and foods for previous days; create charts, statistics and so on;
-> Add Meals -> allow users to build custom meals they eat frequently from foods they've added for smoother addition of 
calories, e.g. Meal 'Breakfast Oatmeal' -> 100 gr. Oats, 150 ml whole milk, 15 gr. honey
-> Integrate with the FatSecret Platform API to expose the user to a wider range of food choices
-> Write tests

-- Architecture

---- Overview:
RCT utilizes several connected technologies and third-party services; 
-> React Router is used to turn the application into a Multi Page App;
-> Redux is used to keep state management regarding auth info, foods of the user, eaten meals and so on;
-> Firebase Auth is used to manage the verifycation of the users 
-> Firebase's Realtime Database is used to keep information about users and the foods

---- Component Structure
The main groups of components are: 
-> Page Components, which listed in App against an 'URL', utilizing React Router. Some don't hold any nested children,
such as the authentication components, some hold nested children elements from 'components'. 
Most have some dispatch functions to dispatch some data into the React Store
Most have some access to the state managed variables - such as Auth Status, Food Items, and so on
-> 'component' Components - components usually nested inside one of the Page components, or into each other. Display some
data and provide structure
-> UI components -> reusable holder/wrapper components such as 'Card' or 'Modal' - a shell for applying styling, the 
component takes props and outputs props.children, e.g. everything passed onto it

---- State Management - Redux
In the main index.js the <App> component is wrapped with a <Provider>, where store={store}; the store variable being the 
store imported from store/index.js , where it is set up with configureStore, giving access to the reducers of the 
different state slices.

Slices:
Created with createSlice, they hold "name", "initialState", and "reducers" : Object containing the different reducers

------ Food Slice:
Hold the foods of the current user, and currently, if no user, holds a list of dummy meals, for structure of the data
look at the DB schema part of the docs. 
The foodState also holds the currentFoodCounter, initialized as -1, but updated when there is a user. This is used when 
communicating and sending requests to the DB for generating unique IDs for each food item
The reducers are 3 -> adding a new food to the state, replacing all foods in the state, and updating the currentFCounter

------ Auth Slice:
Just hold the current user, extracts it from localStorage in order to preserve it on page refreshes and so on.
NO deletion for now -> TODO add deletion after a given interval of time
3 reducers: 
- setUser -> setting the user to the localStorage and to the state
- removeUser -> for removing it
- addCurrentMetaCounter -> adds the current Meta handler to the user object -> done when fetching the foods;
this meta handler is needed when creating new meals, to derive their UID (e.g. u3f8)

------ Day Slice:
initialState consists of:
- currentDate -> received with new Date().toLocaleDateDateString() -> in the format 'mm/dd/yyyy' -> transformed by 
caller
- foodsAteToday, initally with dummy values, later updated with info from the database. Holds an object of with 
keys the UID of the food, and value the amount of units eaten e.g.
{
    'u1f4': 100,
    'u1f13': 250,
}
Reducers: replacing the eaten food items, adding a new foodItem (not currently used)

Actions:
------ Food Actions:
-> fetchFoodData -> called with the dispatch hook in components where the food data is needed
It defines an inner function fetchData, which makes a 'GET' fetch request to the backend to get all the information for 
all the 'users' (see DB schema for more)
Then wrappes it in a try-catch block to extract the data and searches for the currentUserId. If there are food matching 
the current user, two of the reducers are used -> 'replaceFoodItems' to replace the local state foods with the ones fetched
from the DB and 'updateFoodCounter' to update the state's foodCounter to match the one from the DB

(TODO) The current inefficiency is that it fetches all the users at once; future scalability concern as the userbase grows ->
a direct fetch via UID should be examined (UID is present in the userState)

addCurrentMetaCounter is used to place the info received and to place the currentUser's metaCounter into the state

-> postFoodItem: used for posting a new food user item once a user has uploaded it
Called in AddFoodForm
In it, two inner function are defined:
- sendFoodRequest, which sends a 'PUT' request to the database, updating the foods 
- sendCounterRequest, to update the counter, used for forming the food IDs (e.g. u13f54). Length of received object
should NOT be checked, since if items are deleted there could be two items with the same prefix: e.g. 
6 items, last is with ID uXf6, a food item is deleted, new length is 5, so if a new item is added it would be assigned an ID
of uXf6, thus violationg the unique ID constraint 

------ Auth Actions:
-> signUpUser -> utilizes the user creation with the Firebase Authentication SDK with 'createUserWithEmailAndPassword'
The local state is changed with 'authActions.setUser'
A request is made to fetch the userMetaCounter and a new user object is created with a helper func
Then the user is created in the database (with two requests for now), and the DB MetaCounter is updated
-> logOutUser & signInUser -> call the appropriate reducers; when signing in 'signInWithEmailAndPassword' is
used from the Firebase SDK

------ Day Actions:
-> getTodaysFoods: fetches the foods for the current date, for the current user and updates the state with them
In case there is no such record, Firebase responds with null, giving an empty object in the state -> handled by users of 
state

-> eatFood: sends a 'PUT' request to Firebase and updates the local state if it is successful -> changes all the items,
should try with just adding one; doesn't work for now with a 'POST' request, since I cannot figure out how to do it
TODO -> Investigate how to do it with just a 'POST' request

lowerFoodEatenAmoount and removeFoodEaten are both utilized when the user decides to lower the amount eaten of one of the 
foods for the day. The amount is calculated as the amount in props minus the entered amount by the user(passed back from
a bound function for each FoodEatenItem), thus deriving the new amount
-> lowerFoodEatenAmoount is used when the new value is > 0, sending a 'PUT' request to update the information in the DB;
-> removeFoodEaten is ised when the new value is <= 0, sending a 'DELETE' request to the backend 

-- DATA FLOW:
[...]

-- DB SCHEMA

The DB is in a Firebase realtime database - it is NoSQL database; has the following structure:

Two main 'clusters' of data:

----- days -> has a key for each user and a matching object as a value; 
This object has a key for each day in the format yyyymmdd (e.g. 20230901) is 1st of september, 2023
In this way the days are unqie AND ordered correctly because of the trailing zeros (if 1st was written as 1, there
would be inconsistencies -> 20230115 is before 20230201, but 202321 is before 2023115) 

The values of the days in the format:
key: the UID of the food (in the format uXfY)
value: the amount eaten for each food, a simple number. The React app takes care of calculating the calories, based on the 
division of (amount eaten/commonDenomination) * caloriesPerDenom; The additional information is stored in the 'users' DS

days: {

    # user UID (not real)
    2F76Wr123sdaasodkj9812u: {
        20230603: {
            uXf1: 150,
        },
        20230713: {
            uXf3: 240,
            uXF6: 133, 
        }
        [...]
    }, 
    1sdsa6Wru8ausd98y79123y: {
        [...]
    }

}

---- users -> preserves the needed data for the userbase.
users: {

    metaCounter: (int, the number of users added HISTORICALLY!)
    # user UID (not real)
    2F76Wr123sdaasodkj9812u: {
        currentFcounter: (int, number of foods the user has added HISTORICALLY),
        currentMCounter: (int, the historical sequence number),
        data: {
            // personal info for the user, such as username, email, first and last name and password (JK :D)
        },
        # an object with all the foods for the current user
        foods:{
            uXf1: {
                caloriesPerDenom: X,
                commonDenomination: "100",
                macros: {
                    carbohdrate: X,
                    fat: X,
                    protein: X,
                },
                name: "The name of the food",
                unit: gram, kiligram, milliliter, liter, etc.
            },
            # Notice the 3 in the food UID, that 2 is skipped (meaning that the user has deleted the second food they've ever added);
            # this is why the Fcounter is used, to avoid duplication of IDs, which are in the format uXfY, where Y can take
            # the same value if a food is deleted
            uXf3: {
                ...
            }
        }
    }

}


[... to be continued]

!!! NOTE: This documentation is by no means well-written, useful or resembling anything professional. It is done with the 
purpose of practicing writting documentation; as well as a personal guide and a refresher for future development of 
this application; as well as a beginner explanation for some of the concepts, which could be omitted in real docs.

--------------------------------------------------------------------------------------------------------------------------- 
*/
