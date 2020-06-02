import React from 'react';
import s from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom';




const DialogsItem = (props) => {

    return (
        <div className={s.dialog + " " + s.active}>
            <NavLink to={"/Dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    )
}

export default DialogsItem;