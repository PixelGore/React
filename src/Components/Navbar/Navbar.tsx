//Imports
import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

//Navbar
const NavBar:React.FC = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}><NavLink to="/Profile" activeClassName={s.activeLink}>Profile</NavLink></div>
      <div className={s.item}><NavLink to="/Dialogs" activeClassName={s.activeLink}>Messages</NavLink></div>
      <div className={s.item}><NavLink to="/Users" activeClassName={s.activeLink}>Users</NavLink></div>
    </nav>
  )
}

//Export
export default NavBar;