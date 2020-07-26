//Imports
import React from 'react';
import s from './Dialogs.module.css'
import DialogsItem from "./DialogItem/DialogsItem"
import Message from "./Message/Message"
import { initialStateType } from '../../Redux/Reducers/dialogsReducer'
import { AddMessageFormRedux } from './Form/DialogForm'


//Dialogs Component
const Dialogs: React.FC<IPropsType> = (props) => {

    let addNewMessage = (values: DialogFormType) => {
        props.sendMessage(values.newMessagesText)
        values.newMessagesText = ""
    }

    let state = props.messagesPage;
    let dialogsElements = state.dialogs.map(d => <DialogsItem name={d.name} id={d.id} key={d.id} />)
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <div className={s.form}>
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>

        </div>
    )
}
type IPropsType = {
    messagesPage: initialStateType
    sendMessage: (messageText: string) => void
}
export type DialogFormType = {
    newMessagesText: string
}


//Export
export default Dialogs