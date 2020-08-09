//Imports
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../Redux/Reducers/authReducer'
import { AppStateType } from '../../Redux/reduxStore';
import { LoginFormType, LoginReduxForm } from './LoginForm';


//Login Component
export const LoginPage: React.FC = (props) => {

    const dispatch = useDispatch()

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const onSubmit = (FormData: LoginFormType) => {
        dispatch(login(FormData.email, FormData.password, FormData.rememberMe, FormData.captcha))
    }

    if (isAuth) {
        return <Redirect to={"/Profile"} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
}