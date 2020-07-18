//Imports
import React from 'react'
import styles from './FormsControl.module.css'
import { Field, WrappedFieldProps, WrappedFieldMetaProps } from 'redux-form'
import { FieldValidatorType } from '../Validators/Validators'


//Fuction is able to create Fields [placeholder,name of field , name of the component,validators and the components writen below {Textarea,Input}]
export function createField<FormKeysType extends string>
    (placeholder: string | undefined, name: FormKeysType,
        validators: FieldValidatorType[],
        component: React.FC<WrappedFieldProps>,
        props = {}, text = "") {
    return <div>
        <Field placeholder={placeholder} name={name}
            validate={validators}
            component={component}
            {...props}
        /> {text}
    </div>
}
//Textarea , used as children inside FormControl
export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, children, ...restProps } = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}
//Input , used as children inside FormControl
export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, children, ...restProps } = props
    return <FormControl {...props} ><input {...input} {...restProps} /></FormControl>
}

//The main component "FormControl"
const FormControl: React.FC<FormControlPropsType> = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>
    )
}
//Type of FormControl
type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}