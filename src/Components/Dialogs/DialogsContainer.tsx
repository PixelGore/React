//Imports
import { actions } from '../../Redux/Reducers/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux'
import { AuthRedirect } from '../../HOC/AuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../Redux/reduxStore';


//MSTP
let mapStateToProps = (state: AppStateType) => {
    return {
        messagesPage: state.messagesPage,
    }
}


//Export
export default compose<React.ComponentType>(
    connect(mapStateToProps, { sendMessageAC: actions.sendMessageAC }),
    AuthRedirect
)(Dialogs);