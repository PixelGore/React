//Imports
import React, { useEffect } from 'react';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';
import s from "./Users.module.css"
import { UserSearchForm } from './Form/UserSearchForm';
import { FilterType, requestUsers } from '../../Redux/Reducers/usersReducer';
import { useSelector, useDispatch } from 'react-redux';
import { getTotalUsersCount, getCurrentPage, getPageSize, getUsersFilter, getUsers, getFollowingInProgress } from '../../Redux/Selectors/userSelector';


//Users Component
export const Users: React.FC = (props) => {

    const dispatch = useDispatch()

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)


    const onPageChange = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChange = (filter: FilterType) => {
        requestUsers(1, pageSize, filter)
    }
    const follow = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }


    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    return <div className={s.usersBlock} >
        <div className={s.searchForm}>
            <UserSearchForm onFilterChange={onFilterChange} />
        </div>
        <div className={s.users}>{users.map(u =>
            <User user={u} key={u.id} followingInProgress={followingInProgress} follow={follow} unfollow={unfollow} />)}
        </div>
        <div className={s.paginator}>
            <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount} onPageChange={onPageChange} pageSize={pageSize} />
        </div>
    </div>
}