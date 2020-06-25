//Imports
import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, requestUsers } from '../../Redux/Reducers/usersReducer';
import Users from './Users';
import PreLoader from '../Common/Preloader/Preloader';
import { compose } from 'redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../Redux/Selectors/userSelectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../Redux/reduxStore';
//Types
type PropsType = MapDispatchPropsType & MapStatePropsType & OwnPropsType
type MapStatePropsType = {
    currentPage:number
    pageSize:number
    isFetching:boolean
    totalUsersCount:number
    users:Array<UserType>
    followingInProgress: Array<number>
}
type MapDispatchPropsType = {
    requestUsers:(currentPage:number, pageSize:number)=>void
    follow: (userId:number) => void
    unfollow: (userId:number) => void
}
type OwnPropsType = {
    pageTitle:string
}
//UserContainer
class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const { currentPage, pageSize } = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChange = (pageNumber:number) => {
        const {pageSize} = this.props
        this.props.requestUsers(pageNumber, pageSize)
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <PreLoader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize} currentPage={this.props.currentPage}
                onPageChange={this.onPageChange} users={this.props.users}
                follow={this.props.follow} unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress} />

        </>
    }
}
//MSTP
let MapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}


export default compose(
    connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType>(MapStateToProps,
        { follow, unfollow,requestUsers }
    )
)(UsersContainer);