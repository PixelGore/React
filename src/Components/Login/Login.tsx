//Imports
import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../Redux/Reducers/authReducer'
import { AppStateType } from '../../Redux/reduxStore';
import { LoginFormType, LoginReduxForm } from './LoginForm';


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