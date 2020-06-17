import React from 'react'
import { reduxForm } from 'redux-form'
import { Input, createField } from '../Common/FormsControls/FormsControl'
import { required } from '../../utils/Validators/Validators'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../Redux/Reducers/authReducer'
import style from './../Common/FormsControls/FormsControl.module.css';


const LoginForm = ({ handleSubmit, error, captchaUrl }) => {

    return (
        <form onSubmit={handleSubmit} >
            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, { type: "password" })}
            {createField(null, "rememberMe", [], Input, { type: "checkbox" }, "Remember me")}

            {captchaUrl && <img alt="Captcha" src={captchaUrl} />}
            {captchaUrl && createField("Enter text here", "captcha", [required], Input)}

            {error && <div className={style.formSummaryError} >
                {error}
            </div>}

            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    const onSubmit = (FormData) => {
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

const mapStateToPops = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToPops, { login })(Login);