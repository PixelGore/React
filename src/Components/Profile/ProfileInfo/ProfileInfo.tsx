//Imports
import React, { useState, ChangeEvent } from 'react';
import s from '../Css/ProfileInfo.module.css'
import PreLoader from '../../Common/Preloader/Preloader';
import userImage from '../../../assets/Images/user.jpg';
import ProfileStatus from './Status/ProfileStatus';
import ProfileDataForm from './Form/ProfileDataForm';
import { ProfileType, ContactsType } from '../../../types/types';

//Profileinfo Component
const ProfileInfo: React.FC<PropsType> = ({ profile, status, isOwner, updateStatus, savePhoto, saveProfile }) => {
    //Local State
    let [editMode, setEditMode] = useState(false)
    //Loading PreLoader if profile isn't recieved yet
    if (!profile) {
        return <PreLoader />
    }
    //Dispatching profile photo
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    //Submitting any changes on profile
    const onSubmit = (formData: ProfileType) => {
        // TODO: Refactor this code
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
type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

//ProfileData (if EditMode is false)
const ProfileData: React.FC<ProfileDataType> = ({ profile, isOwner, toggleEditMode }) => {
    return <div>
        <div className={s.ProfileName} >{profile.fullName}</div>
        {isOwner && <div><button onClick={toggleEditMode}>Edit</button></div>}
        <div>
            <div>{profile.lookingForAJob ? 'Yes' : 'No'}</div>
            {profile.lookingForAJob && <div>{profile.lookingForAJobDescription}</div>}
            <div>{profile.aboutMe}</div>
            <div>Contacts:</div> {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
            })}
        </div>
    </div>
}
type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    toggleEditMode: () => void
}


//Contact Component
const Contact: React.FC<ContactType> = ({ contactTitle, contactValue }) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}
type ContactType = {
    contactTitle: string
    contactValue: string
}


//Export
export default ProfileInfo;