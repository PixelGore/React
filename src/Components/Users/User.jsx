import React from 'react';
import userImage from '../../assets/Images/user.jpg';
import s from './Users.module.css';
import { NavLink } from 'react-router-dom';

let User = ({user,followingInProgress,follow,unfollow,}) => {
    return(
        <div className={s.user}>
            <span>

                <div className={s.userPhoto}>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userImage} alt="ProfilePicture" />
                    </NavLink>
                </div>

                <div>
                    {user.followed ?
                        <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {unfollow(user.id); }} >Unfollow</button>
                        :
                        <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {follow(user.id); }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status} </div>
                </span>
                <span>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"} </div>
                </span>
            </span>
        </div>)
}

export default User;