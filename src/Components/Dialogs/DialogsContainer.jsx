import { sendMessageAC } from '../../Redux/Reducers/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux'
import { AuthRedirect } from '../../HOC/AuthRedirect';
import { compose } from 'redux';



let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessagesText) => { dispatch(sendMessageAC(newMessagesText)) }
    }
}


compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthRedirect
)(Dialogs)

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthRedirect
)(Dialogs);

 //DialogsContainer;