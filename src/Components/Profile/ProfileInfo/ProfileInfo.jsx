import React, { useState } from 'react';
import s from './ProfileInfo.module.css'
import PreLoader from '../../Common/Preloader/Preloader';
import userImage from '../../../assets/Images/user.jpg';
import ProfileStatus from './ProfileStatus';
import ProfileDataForm from './ProfileDataForm';


const ProfileInfo = ({ profile, status, isOwner, updateStatus, savePhoto, saveProfile }) => {

    let [editMode, setEditMode] = useState(false)
    //Loading PreLoader if profile isn't recieved yet
    if (!profile) {
        return <PreLoader />
    }
    //Dispatching profile photo
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    //Submitting any changes on profile
    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }

    return (
        <div>
            <div>
                <img src="https://images3.alphacoders.com/890/890438.jpg" alt="ProfileImg" />
            </div>

            <div className={s.content} >
                <div className={s.profilePhoto}>
                    <img src={profile.photos.large ? profile.photos.large : userImage} alt="ProfilePhoto" />
                </div>
                <div>
                    {editMode
                        ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} onMainPhotoSelected={onMainPhotoSelected} />
                        : <ProfileData profile={profile} isOwner={isOwner} toggleEditMode={() => { setEditMode(true) }} />}

                    <b>Status:<ProfileStatus status={status} updateStatus={updateStatus} /></b>
                </div>
            </div>
        </div>
    )
}

const ProfileData = ({ profile, isOwner, toggleEditMode }) => {
    return <div>
        <div className={s.ProfileName} >{profile.fullName}</div>
        {isOwner && <div><button onClick={toggleEditMode}>Edit</button></div>}
        <div>
            <div>{profile.lookingForAJob ? 'Searching for job' : 'lazy butt'}</div>
            {profile.lookingForAJob && <div>{profile.lookingForAJobDescription}</div>}
            <div>{profile.aboutMe}</div>
            <div>Contacts:</div> {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
        </div>
    </div>
}




const Contact = ({ contactTitle, contactValue }) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;