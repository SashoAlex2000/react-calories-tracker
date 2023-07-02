import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { authActions } from "./auth-slice";
import { redirect } from "react-router-dom";



export const signUpUser = (email, password, username) => {

    return async (dispatch) => {

        createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            console.log(userCredentials);
            dispatch(authActions.setUser({
                uid: userCredentials.user.uid,
                email: email,
                username: 'placeholder',
            }))
        }).catch((err) => console.log(err));

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
