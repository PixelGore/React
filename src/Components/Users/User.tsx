//Imports
import React from 'react';
import userImage from '../../assets/Images/user.jpg';
import s from './Css/Users.module.css';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';


//User Componet
let User: React.FC<PropsType> = ({ user, followingInProgress, follow, unfollow, }) => {
    return (
        <div className={s.user}>
            <span>

                <div className={s.userPhoto}>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userImage} alt="ProfilePicture" />
                    </NavLink>
                </div>

                <div className={s.follow}>
                    {user.followed ?
                        <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => { unfollow(user.id); }} >Unfollow</button>
                        :
                        <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => { follow(user.id); }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div className={s.name}>{user.name}</div>
                </span>
                <span>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"} </div>
                </span>
            </span>
        </div>)
}
type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

//Export
export default User;