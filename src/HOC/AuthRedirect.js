import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

let mapStateToPropsRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

export const AuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to={'/Login'} />

            return <Component{...this.props}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent)

    return  ConnectedAuthRedirectComponent;
}

