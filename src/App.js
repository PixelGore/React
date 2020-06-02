import React, { Suspense } from 'react';
import './App.css';
import NavBar from './Components/Navbar/Navbar';
import UsersContainer from './Components/Users/UsersContainer';
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Settings from './Components/Settings/Settings';
import Login from './Components/Login/Login';
import { Route, withRouter, Switch } from 'react-router-dom'
import HeaderContainer from './Components/Header/HeaderContainer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './Redux/Reducers/appReducer';
import PreLoader from './Components/Common/Preloader/Preloader';


const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));

class App extends React.Component {


  catchAllUnhandledRejections = (reason,promise) => {
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
        <div className="app-wrapper-content">
          <Switch>
            <Route path='/Dialogs' render={() => <Suspense fallback={<PreLoader />}>  <DialogsContainer /></Suspense>} />

            <Route path='/Profile/:userId?' render={() => <Suspense fallback={<div>Loading...</div>}> <ProfileContainer /></Suspense>} />

            <Route path='/Users' render={() => <UsersContainer />} />

            <Route path='/News' render={() => <News />} />

            <Route path='/Music' render={() => <Music />} />

            <Route path='/Settings' render={() => <Settings />} />

            <Route path='/Login' render={() => <Login />} />

            <Route path='*' render={() => <div>404 Not Found</div>} />
          </Switch>
        </div>
      </div>
    );
  }

}

const MapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(MapStateToProps, { initializeApp }))(App);