import React from 'react';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';
import s from "./Users.module.css"

let Users = ({ currentPage, totalUsersCount, pageSize, onPageChange, users, ...props }) => {
    return <div>
        <div className={s.paginator}>
            <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount} onPageChange={onPageChange} pageSize={pageSize} />
        </div>
        <div className={s.users}>{users.map(u =>
            <User user={u} key={u.id} followingInProgress={props.followingInProgress} follow={props.follow} unfollow={props.unfollow} />)}
        </div>

    </div>
}

export default Users;