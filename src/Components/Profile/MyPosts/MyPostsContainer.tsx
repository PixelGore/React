import { actions } from '../../../Redux/Reducers/profileReducer';
//Imports
import MyPosts, { MapPropsType, DispatchPropsType } from './MyPosts';
import { connect } from 'react-redux'
import { AppStateType } from '../../../Redux/reduxStore';

//MSTP
let mapStateToProps = (state:AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}


//Connecting to Provider
const MyPostsContainer = connect<MapPropsType,DispatchPropsType,{},AppStateType>(mapStateToProps, {addPost:actions.addPostAC})(MyPosts)
//Export
export default MyPostsContainer;