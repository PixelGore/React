//Imports
import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { Textarea, createField } from '../../Common/FormsControls/FormsControl'
import { DialogFormType } from '../Dialogs'

//DialogForm
const DialogForm: React.FC<InjectedFormProps<DialogFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<DialogFormValuesTypeKeys>("Write a message...", "newMessagesText", [], Textarea)}
            </div>
            <div><button>Send</button></div>
        </form>
    )
}
type DialogFormValuesTypeKeys = keyof DialogFormType

//Adding reduxForm to DialogForm & Export
export const AddMessageFormRedux = reduxForm<DialogFormType>({ form: 'dialogAddMessageForm' })(DialogForm)