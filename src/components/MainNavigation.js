import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';


function MainNavigation() {
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
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;