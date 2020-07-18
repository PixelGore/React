import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { Input, createField } from '../Common/FormsControls/FormsControl'
import { required } from '../Common/Validators/Validators'
import style from './../Common/FormsControls/FormsControl.module.css'
//Login_Form
const LoginForm: React.FC<InjectedFormProps<LoginFormType, LoginFormIProps> & LoginFormIProps> = ({ handleSubmit, error, captchaUrl }) => {

    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, { type: "password" })}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, { type: "checkbox" }, "Remember me")}

            {captchaUrl && <img alt="Captcha" src={captchaUrl} />}
            {captchaUrl && createField<LoginFormValuesTypeKeys>("Enter text here", "captcha", [required], Input)}

            {error && <div className={style.formSummaryError}>
                {error}
            </div>}

            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
type LoginFormIProps = {
    captchaUrl: string | null
}
export type LoginFormType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = keyof LoginFormType

//Adding Redux-Form & Export
export const LoginReduxForm = reduxForm<LoginFormType, LoginFormIProps>({ form: 'login' })(LoginForm)