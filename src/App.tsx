//Imports
import React, { Suspense } from 'react'
import './App.css'
import { UsersPage } from './Components/Users/UsersContainer'
import { LoginPage } from './Components/Login/Login'
import NavBar from './Components/Navbar/Navbar'
import { Route, withRouter, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import HeaderContainer from './Components/Header/HeaderContainer'
import { connect, Provider } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from './Redux/Reducers/appReducer'
import PreLoader from './Components/Common/Preloader/Preloader'
import { AppStateType } from './Redux/reduxStore'
import store from './Redux/reduxStore'


//React.lazy
const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));


//App Component
class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {

  catchAllUnhandledRejections = (e: PromiseRejectionEvent) => {
    alert("Some error occurred...")
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledRejections);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledRejections);
  }

  render() {

    if (!this.props.initialized) {
      return <PreLoader />
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <NavBar />
        <div className="app-wrapper-content bg-secondary">
          <Switch>
            <Route path='/Dialogs' render={() => <Suspense fallback={<PreLoader />}>  <DialogsContainer /></Suspense>} />

            <Route path='/Profile/:userId?' render={() => <Suspense fallback={<div>Loading...</div>}> <ProfileContainer /></Suspense>} />

            <Route path='/Users' render={() => <UsersPage />} />

            <Route path='/Login' render={() => <LoginPage />} />

            <Redirect from="/" to="/Profile" />

            <Route path='*' render={() => <div>404 Not Found</div>} />
          </Switch>
        </div>
      </div>
    );
  }

}


//MSTP
const MapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})
type MapStatePropsType = ReturnType<typeof MapStateToProps>
type MapDispatchPropsType = {
  initializeApp: () => void
}


//AppContainer
let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(MapStateToProps, { initializeApp }))(App);


//The main App
const ReactJSApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store} >
      <AppContainer />
    </Provider>
  </BrowserRouter>
}


//Export
export default ReactJSApp;