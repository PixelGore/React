import React from 'react'
import { createField, Input, Textarea } from '../../Common/FormsControls/FormsControl';
import { reduxForm } from "redux-form"
import style from "../../Common/FormsControls/FormsControl.module.css"


const ProfileDataForm = ({ handleSubmit, profile, error, onMainPhotoSelected}) => {
    return <form onSubmit={handleSubmit}>
        {error && <div className={style.formSummaryError} >
            {error}
        </div>}
        <input type="file" onChange={onMainPhotoSelected} />
        <div><button>save</button></div>
        <div >{createField("Fullname", "fullName", [], Input)}</div>
        <div>
            <div><span>Looking for a job:</span>{createField("", "lookingForAJob", [], Input, { type: "checkbox" })}</div>
            <div>
                <span>Skills:</span>
                {createField("Skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <span>About me:</span>
                {createField("About me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <div>Contacts:</div> {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className="s.contact">
                        <span>{key}:{createField(key, "contacts." + key, [], Input)}</span>
                    </div>
                })}
            </div>
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({ form: 'editProfile' })(ProfileDataForm)

export default ProfileDataFormReduxForm;