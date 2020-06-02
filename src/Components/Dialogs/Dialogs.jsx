import React from 'react';
import s from './Dialogs.module.css'
import DialogsItem from "./DialogItem/DialogsItem.jsx"
import Message from "./Message/Message.jsx"
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../Common/FormsControls/FormsControl';
import { required, maxLengthCreator } from '../../utils/Validators/Validators';

    const maxLength50 = maxLengthCreator(50);

const Dialogs = (props) => {

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessagesText);
        values.newMessagesText = "";
    }

    if (!props.isAuth) return <Redirect to={'/Login'} />;

    let state = props.messagesPage;
    let dialogsElements = state.dialogs.map(d => <DialogsItem name={d.name} id={d.id} key={d.id} />);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>
    )
}


const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field component={Textarea} name='newMessagesText' placeholder='Write a message...'
                 validate={[required,maxLength50]} />
            </div>
            <div><button>Send</button></div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)


export default Dialogs;