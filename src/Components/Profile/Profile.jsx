import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = ({ profile, status, isOwner, updateStatus, savePhoto, saveProfile }) => {
    return (
        <div className={s.content}>
            <ProfileInfo isOwner={isOwner} savePhoto={savePhoto} profile={profile} status={status} saveProfile={saveProfile} updateStatus={updateStatus} />
            <MyPostsContainer />
        </div>

    )
}

export default Profile;
