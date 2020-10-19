//Imports
import React, { useEffect } from 'react';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';
import s from "./Css/Users.module.css"
import { UserSearchForm } from './Form/UserSearchForm';
import { FilterType, requestUsers, follow, unfollow } from '../../Redux/Reducers/usersReducer';
import { useSelector, useDispatch } from 'react-redux';
import { getTotalUsersCount, getCurrentPage, getPageSize, getUsersFilter, getUsers, getFollowingInProgress } from '../../Redux/Selectors/userSelector';
import { useHistory } from 'react-router-dom';
import * as queryString from 'querystring'


//Users Component
export const Users: React.FC = (props) => {


    //Selectors
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    //Creating own dispatch
    const dispatch = useDispatch()


    //Actions
    const onPageChange = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChange = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const followUser = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId))
    }



    //History
    const history = useHistory()

    //Update the users[]
    useEffect(() => {

        const parsed = queryString.parse(history.location.search.substr(1)) as queryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)

        if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }

        switch (parsed.friend) {
            case 'null':
                actualFilter = { ...actualFilter, friend: null }
                break
            case 'true':
                actualFilter = { ...actualFilter, friend: true }
                break
            case 'false':
                actualFilter = { ...actualFilter, friend: false }
                break
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])
    type queryParamsType = {
        term?: string;
        page?: string;
        friend?: string;
    };

    useEffect(() => {

        const query: queryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])


    //Markup
    return (
        <div className="bg-secondary">
            <div className='container'>
                <div className='text-center p-5'>
                    <UserSearchForm onFilterChange={onFilterChange} />
                </div>
                <div className='row'>{users.map(u =>
                    <div className="col-3">
                        <User user={u} key={u.id} followingInProgress={followingInProgress} follow={followUser} unfollow={unfollowUser} />
                    </div>
                )}
                </div>
                <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount} onPageChange={onPageChange} pageSize={pageSize} />
            </div>
        </div>

    )
}