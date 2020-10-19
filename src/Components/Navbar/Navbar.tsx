//Imports
import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

//Navbar
const NavBar: React.FC = () => {
  return (
    <div className='bg-dark pt-5'>
      <ul className={s.nav}>
        <li className={s.item}><NavLink to="/Profile" activeClassName={s.activeLink}>Profile</NavLink></li>
        <li className={s.item}><NavLink to="/Dialogs" activeClassName={s.activeLink}>Messages</NavLink></li>
        <li className={s.item}><NavLink to="/Users" activeClassName={s.activeLink}>Users</NavLink></li>
      </ul>
    </div>

  )
}

//Export
export default NavBar;