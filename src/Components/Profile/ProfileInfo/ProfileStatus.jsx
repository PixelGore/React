import React, { useState, useEffect } from 'react';
import s from'./ProfileStatus.module.css'

const ProfileStatusHooks = (props) => {

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

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={s.Status}>
            {!editMode &&
                <div>
                    <span onDoubleClick={toggleEditMode}>{props.status || "-----"}</span>
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

export default ProfileStatusHooks;