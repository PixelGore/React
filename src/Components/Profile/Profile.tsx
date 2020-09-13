// import React from 'react';
// //Imports
// import s from './Css/Profile.module.css'
// import ProfileInfo from './ProfileInfo/ProfileInfo';
// import MyPostsContainer from './MyPosts/MyPostsContainer';
// import { ProfileType } from '../../types/types';


// //Profile Component
// const Profile: React.FC<PropsType> = ({ profile, status, isOwner, updateStatus, savePhoto, saveProfile }) => {
//     return (
//         <div className={s.content}>
//             <ProfileInfo isOwner={isOwner} savePhoto={savePhoto} profile={profile} status={status} saveProfile={saveProfile} updateStatus={updateStatus} />
//             <MyPostsContainer />
//         </div>

//     )
// }
// type PropsType = {
//     profile: ProfileType | null
//     status: string
//     isOwner: boolean
//     updateStatus: (status: string) => void
//     savePhoto: (file: File) => void
//     saveProfile: (profile: ProfileType) => Promise<any>
// }


// //Export
// export default Profile;


//Imports
import React from 'react';
import s from './Css/Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';
import { getProfile, getStatus } from '../../Redux/Selectors/ProfileSelector';
import { useSelector, useDispatch } from 'react-redux';
import { savePhoto, updateStatus } from '../../Redux/Reducers/profileReducer';


//Profile Component
const Profile: React.FC<PropsType> = ({ isOwner, saveProfile }) => {

    //Creating own dispatch
    const dispatch = useDispatch()
    //Selectors
    const profile = useSelector(getProfile)
    const status = useSelector(getStatus)
    //Actions
    // const isOwner = () => {

    // }
    const updateMeStatus = (status: string) => {
        dispatch(updateStatus(status))
    }
    const saveMePhoto = (file: File) => {
        dispatch(savePhoto(file))
    }
    // const saveProfile = (profile:ProfileType) => {

    // }

    return (
        <div className={s.content}>
            <ProfileInfo isOwner={isOwner} savePhoto={saveMePhoto}
                profile={profile} status={status}
                saveProfile={saveProfile} updateStatus={updateMeStatus} />
            <MyPostsContainer />
        </div>

    )
}
type PropsType = {
    isOwner: boolean
    saveProfile: (profile: ProfileType) => Promise<any>
}


//Export
export default Profile;