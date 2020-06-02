import React from 'react';
import s from './Header.module.css';
import Logo from '../../assets/Images/Logo.svg'
import { NavLink } from 'react-router-dom';

const Header = (props) => {

  return (
    <header className={s.header}>
      <div className={s.logo} ><img src={Logo} alt='Logo' /></div>
      <div className={s.welcome}>Welcome !</div>
      <div className={s.loginBlock}>

        {props.isAuth ?
          <div>{props.login} <button onClick={props.logout}>Log out</button> </div>
          :
          <NavLink to={'/login'}>Login</NavLink>}

      </div>
    </header>
  )
}

export default Header;