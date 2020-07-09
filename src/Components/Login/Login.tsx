//Imports
import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { Input, createField } from '../Common/FormsControls/FormsControl'
import { required } from '../Common/utils/Validators/Validators'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../Redux/Reducers/authReducer'
import style from './../Common/FormsControls/FormsControl.module.css';
import { AppStateType } from '../../Redux/reduxStore';

//Login Component
const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (FormData: LoginFormType) => {
        props.login(FormData.email, FormData.password, FormData.rememberMe, FormData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}


//Login_Form
const _LoginForm: React.FC<InjectedFormProps<LoginFormType, LoginFormIProps> & LoginFormIProps> = ({ handleSubmit, error, captchaUrl }) => {

    return (
        <form onSubmit={handleSubmit} >
            {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, { type: "password" })}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, { type: "checkbox" }, "Remember me")}

            {captchaUrl && <img alt="Captcha" src={captchaUrl} />}
            {captchaUrl && createField<LoginFormValuesTypeKeys>("Enter text here", "captcha", [required], Input)}

            {error && <div className={style.formSummaryError} >
                {error}
            </div>}

            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
//LoginForm Types
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


//Adding Redux-Form
const LoginReduxForm = reduxForm<LoginFormType, LoginFormIProps>({ form: 'login' })(_LoginForm)


//MapStateToPops
const MapStateToPops = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
//MSTP & MDTP Types
type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}


//Export
export default connect(MapStateToPops, { login })(Login);