import { NavLink, redirect } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../store/auth-actions';


function MainNavigation() {

    const authInfo = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    

    const logOutHandler = () => {

        dispatch(logOutUser());
        return redirect('/home');

    };

    return (
        <header className={classes.header}>
            <nav className={classes.navbar}>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/today"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Today
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/foods"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Foods
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/eat"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            EAT
                        </NavLink>
                    </li>
                    {authInfo && <button onClick={logOutHandler}>LogOut</button>}
                    {!authInfo && <li>
                        <NavLink
                            to="/signin"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Sign In
                        </NavLink>
                    </li>}
                    {!authInfo && <li>
                        <NavLink
                            to="/signup"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Sign Up
                        </NavLink>
                    </li>}

                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;