//Imports
import React from 'react';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';
import s from "./Users.module.css"
import { UserType } from '../../types/types';


//Users Component
let Users: React.FC<PropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChange, users, ...props }) => {
    return <div>
        <div className={s.paginator}>
            <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount} onPageChange={onPageChange} pageSize={pageSize} />
        </div>
        <div className={s.users}>{users.map(u =>
            <User user={u} key={u.id} followingInProgress={props.followingInProgress} follow={props.follow} unfollow={props.unfollow} />)}
        </div>

    </div>
}
type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChange: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}


//Export
export default Users;