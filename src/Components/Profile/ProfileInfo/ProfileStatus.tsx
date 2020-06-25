import React, { useState, useEffect, ChangeEvent } from 'react';
import s from './ProfileStatus.module.css'


type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
}
const ProfileStatus: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const toggleEditMode = () => {
        if (editMode === false) {
            setEditMode(true)
        } else {
            setEditMode(false)
            props.updateStatus(status);
        };
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={s.Status}>
            {!editMode &&
                <div>
                    <span onClick={toggleEditMode}>{props.status || "-----"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={toggleEditMode} value={status} />
                </div>
            }
        </div>
    )

}

export default ProfileStatus;