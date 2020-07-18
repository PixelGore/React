//Imports
import React from 'react'
import s from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom'


//DialogItem Component
const DialogsItem: React.FC<PropsType> = (props) => {

    return (
        <div className={s.dialog + " " + s.active}>
            <NavLink to={"/Dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    )
}
type PropsType = {
    id: number
    name: string
}


//Export
export default DialogsItem;