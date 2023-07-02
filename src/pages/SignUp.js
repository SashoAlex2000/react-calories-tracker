import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { signUpUser } from "../store/auth-actions";
import { redirect } from "react-router-dom";


const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const signUpHandler = (event) => {

        event.preventDefault();

        // createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
        //     console.log(userCredentials);
        //     localStorage.setItem('currentUserId', userCredentials.user.uid);
        // }).catch((err) => console.log(err));

        dispatch(signUpUser(email, password, 'username'));
        

    }

    return <div className="signin-container">

        <form onSubmit={signUpHandler}>
            <h1>Create and account Here</h1>
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" placeholder="Enter p455" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit">SignUp</button>
        </form>

    </div>

};


export default SignUp;
