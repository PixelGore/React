//Imports
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppStateType } from '../Redux/reduxStore'


//The component receives another component and if the user it's not authenticated it redirects to /Login
export function AuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<StateToPropsType> = (props) => {
        let { isAuth, ...restProps } = props

        if (!isAuth) return <Redirect to={'/Login'} />

        return <WrappedComponent{...restProps as WCP} />
    }


    //Connect
    let ConnectedAuthRedirectComponent = connect<StateToPropsType, {}, WCP, AppStateType>
        (mapStateToPropsRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}


//MSTP
let mapStateToPropsRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
type StateToPropsType = {
    isAuth: boolean
}