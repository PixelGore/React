//Imports
import React from 'react'
import { createField, Input, Textarea } from '../../../Common/FormsControls/FormsControl';
import { reduxForm, InjectedFormProps } from "redux-form"
import style from "../../../Common/FormsControls/FormsControl.module.css"
import { ProfileType } from '../../../../types/types';


//ProfileDataForm
const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error, onMainPhotoSelected }) => {
    return <form onSubmit={handleSubmit}>
        {error && <div className={style.formSummaryError} >
            {error}
        </div>}
        <input type="file" onChange={onMainPhotoSelected} />
        <div><button>save</button></div>
        <div >{createField<ProfileTypeKeys>("Fullname", "fullName", [], Input)}</div>
        <div>
            <div><span>Looking for a job:</span>{createField("", "lookingForAJob", [], Input, { type: "checkbox" })}</div>
            <div>
                <span>Skills:</span>
                {createField<ProfileTypeKeys>("Skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <span>About me:</span>
                {createField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <div>Contacts:</div> {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className="s.contact">
                        {/*TODO:create add ProfileTypeKeys to field below */}
                        <span>{key}:{createField(key, "contacts." + key, [], Input)}</span>
                    </div>
                })}
            </div>
        </div>
    </form>
}
type PropsType = {
    profile: ProfileType
    onMainPhotoSelected: (e: React.ChangeEvent<HTMLInputElement>) => void
}
type ProfileTypeKeys = Extract<keyof ProfileType, string>

//Adding reduxForm to ProfileDataForm
const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({ form: 'editProfile' })(ProfileDataForm)


//Export
export default ProfileDataFormReduxForm;