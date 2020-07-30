//Imports
import React from 'react'
import { connect } from 'react-redux'
import { follow, unfollow, requestUsers, FilterType } from '../../Redux/Reducers/usersReducer'
import Users from './Users'
import PreLoader from '../Common/Preloader/Preloader'
import { compose } from 'redux'
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, getUsersFilter } from '../../Redux/Selectors/userSelector'
import { UserType } from '../../types/types'
import { AppStateType } from '../../Redux/reduxStore'


//UserContainer
class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const { currentPage, pageSize, filter } = this.props;
        this.props.requestUsers(currentPage, pageSize, filter);
    }

    onPageChange = (pageNumber: number) => {
        const { pageSize, filter } = this.props
        this.props.requestUsers(pageNumber, pageSize, filter)
    }
    onFilterChange = (filter: FilterType) => {
        const { pageSize } = this.props;
        this.props.requestUsers(1, pageSize, filter)
    }
    render() {
        return <>
            {this.props.isFetching ? <PreLoader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize} currentPage={this.props.currentPage}
                onPageChange={this.onPageChange} onFilterChange={this.onFilterChange} users={this.props.users}
                follow={this.props.follow} unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress} />

        </>
    }
}
type PropsType = MapDispatchPropsType & MapStatePropsType


//MSTP
let MapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
}
type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    filter: FilterType
}
type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}


//Export
export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, never, AppStateType>(MapStateToProps,
        { follow, unfollow, requestUsers }
    )
)(UsersContainer)