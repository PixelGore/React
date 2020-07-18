//Imports
import React from 'react';
import s from './Header.module.css';
import Logo from '../../assets/Images/Logo.svg'
import { NavLink } from 'react-router-dom';


//Header Component
const Header: React.FC<mapPropsType & DispatchPropsType> = (props) => {
  return (
    <header className={s.header}>
      <div className={s.logo} ><img src={Logo} alt='Logo' /></div>
      <div className={s.welcome}>Welcome to the dark side !</div>
      <div className={s.loginBlock}>

        {props.isAuth ?
          <div>{props.login} <button onClick={props.logout}>Log out</button> </div>
          :
          <NavLink to={'/login'}>Login</NavLink>}

      </div>
    </header>
  )
}
export type mapPropsType = {
  isAuth: boolean
  login: string | null
}
export type DispatchPropsType = {
  logout: () => void
}

//Export
export default Header;