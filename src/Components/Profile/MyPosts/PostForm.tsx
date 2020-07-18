//Imports
import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { Textarea, createField } from '../../Common/FormsControls/FormsControl'


//PostForm Component
const PostForm: React.FC<InjectedFormProps<PostFormValuesType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<PostFormValuesTypeKeys>("What's new ?", "newPostText", [], Textarea)}
            <div>
                <button>Click</button>
            </div>
        </form>
    )
}
export type PostFormValuesType = {
    newPostText: string
}
type PostFormValuesTypeKeys = Extract<keyof PostFormValuesType, string>

//Export
export const ReduxPostForm = reduxForm<PostFormValuesType>({ form: 'AddPostForm' })(PostForm)