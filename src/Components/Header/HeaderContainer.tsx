//Imports
import React from 'react';
import Header, { mapPropsType, DispatchPropsType } from './Header'
import { connect } from 'react-redux'
import { logout } from '../../Redux/Reducers/authReducer'
import { AppStateType } from '../../Redux/reduxStore'


//Header Container
const HeaderContainer: React.FC<mapPropsType & DispatchPropsType> = (props) => {
  return <Header {...props} />
}

//MSTP
const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
})

//Export
export default connect<mapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer);