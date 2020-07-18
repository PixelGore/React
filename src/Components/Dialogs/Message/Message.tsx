//Import
import React from 'react';
import s from './../Dialogs.module.css'

//Message Component
const Message: React.FC<PropsType> = (props) => {

    return (
        <div className={s.message}>{props.message}</div>
    )
}
type PropsType = {
    message: string
}

//Export
export default Message;