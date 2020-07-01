//Imports
import React from 'react'
import styles from './FormsControl.module.css'
import { Field, WrappedFieldProps, WrappedFieldMetaProps } from 'redux-form'
import { FieldValidatorType } from '../../../utils/Validators/Validators'

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
type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, children, ...restProps } = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, children, ...restProps } = props
    return <FormControl {...props} ><input {...input} {...restProps} /></FormControl>
}


export function createField<FormKeysType extends string>(placeholder: string | undefined, name: FormKeysType,
                            validators: FieldValidatorType[],
                            component: React.FC<WrappedFieldProps>,
                            props = {}, text = ""){
    return <div>
        <Field placeholder={placeholder} name={name}
            validate={validators}
            component={component}
            {...props}
        /> {text}
    </div>
}