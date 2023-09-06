import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { authActions } from "./auth-slice";
import { redirect } from "react-router-dom";
import { FIREBASE_URL, constructNewUserObject } from "../utils/constants";



export const signUpUser = (email, password, username) => {

    return async (dispatch) => {

        try {

            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

            console.log(userCredentials);
            // maybe set the local state after the other requests
            dispatch(authActions.setUser({
                uid: userCredentials.user.uid,
                email: email,
                username: 'placeholder',
            }));

            let userMetaCounterRequest = await fetch (`${FIREBASE_URL}users/metaCounter.json`);
            const MetaCounterData = await userMetaCounterRequest.json(userMetaCounterRequest);  // ???
            console.log(MetaCounterData);
            // userMetaCounter = Number(MetaCounterData);

            const newUserObject = constructNewUserObject(email, MetaCounterData);
            console.log(newUserObject);
            console.log('pre-fetch');

            // 20230708 -> cannot solve the 'POST' request problem with Firebase realtime database
            // for now the schema works with two requests, the first creates the appropriate key - UID;
            // and the second does a 'PUT' request with the correct object data. 
            // TODO - fix this, merge into one request

            await fetch (`${FIREBASE_URL}users/${userCredentials.user.uid}.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify(newUserObject),
                body: JSON.stringify(""),
            });

            await fetch (`${FIREBASE_URL}users/${userCredentials.user.uid}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserObject),
            });

            // update the counter in Firebase
            await fetch (`${FIREBASE_URL}users/metaCounter.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(MetaCounterData + 1),
            });

            console.log('post-fetch');

        } catch (error) {
            console.log(`error in registration ${error}`)
        };

    };

};

export const logOutUser = () => {

    return async (dispatch) => {

        await signOut(auth).then(() => {
            dispatch(authActions.removeUser());

        })

    };

};

export const signInUser = (email, password) => {

    return async (dispatch) => {

        try {

            const userCredentials = await signInWithEmailAndPassword(auth, email, password);

            console.log(userCredentials);
            dispatch(authActions.setUser({
                uid: userCredentials.user.uid,
                email: email,
                username: 'placeholder',
            }));
            console.log('HERE');
            return redirect('/');

        } catch (error) {
            console.log(error);
        };

    };

};
