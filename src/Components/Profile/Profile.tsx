import React from 'react';
//Imports
import s from './Css/Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';


//Profile Component
const Profile: React.FC<PropsType> = ({ profile, status, isOwner, updateStatus, savePhoto, saveProfile }) => {
    return (
        <div className={s.content}>
            <ProfileInfo isOwner={isOwner} savePhoto={savePhoto} profile={profile} status={status} saveProfile={saveProfile} updateStatus={updateStatus} />
            <MyPostsContainer />
        </div>

    )
}
type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}


//Export
export default Profile;