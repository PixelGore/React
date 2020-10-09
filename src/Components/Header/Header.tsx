//Imports
import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';


//Header Component
const Header: React.FC<mapPropsType & DispatchPropsType> = (props) => {
  return (
    <div className={s.header}>
      <div className={s.inner_header}>
        <div className={s.logo_container}>
          <h1>MY<span>SITE</span></h1>
        </div>
        <div className={s.loginBlock}>
          <div>
            {props.isAuth ?
              <div>{props.login} <span onClick={props.logout}>Log out</span> </div>
              :
              <span><NavLink to={'/login'}>Login</NavLink></span>}
          </div>
        </div>
      </div>
    </div >
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