//Imports
import { profileAPI } from "../../api/api";
import { stopSubmit } from "redux-form";
import { PostsType, PhotosType, ProfileType } from './../../types/types';
import { Dispatch } from 'redux';
//Actions
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'setUserProfile';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO = 'Save_Photo';
//Action Creators

export const addPostAC = (newPostText: string): addPostACType => ({ type: ADD_POST, newPostText });
type addPostACType = {
    type: typeof ADD_POST
    newPostText: string
}
export const setUserProfileAC = (profile: ProfileType): setUserProfileACType => ({ type: SET_USER_PROFILE, profile });
type setUserProfileACType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setStatusAC = (status: string): setStatusACType => ({ type: SET_STATUS, status });
type setStatusACType = {
    type: typeof SET_STATUS
    status: string
}
export const savePhotoAC = (photos: PhotosType): savePhotoACType => ({ type: SAVE_PHOTO, photos });
type savePhotoACType = {
    type: typeof SAVE_PHOTO
    photos: PhotosType
}
//All Actions Type
type ActionsTypes = addPostACType | setUserProfileACType | setStatusACType | savePhotoACType

//Initial State
let initialState = {
    posts: [
        { id: 1, message: "Hi , ur mom gay !", upvotes: 69, downvotes: 99 },
        { id: 2, message: "No , u !", upvotes: 420, downvotes: 23 },
    ] as Array<PostsType>,
    newPostText: '',
    profile: null as ProfileType | null,
    status: "",
}
type InitialStateType = typeof initialState
//Reducer
const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                upvotes: 0,
                downvotes: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost], newPostText: ''
            };
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_STATUS: {
            return { ...state, status: action.status }
        }
        case SAVE_PHOTO: {
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        }
        default:
            return state;
    }

}

//Thunks
type DispatchType = Dispatch<ActionsTypes>

//Status
export const getStatus = (userId: number) => async (dispatch: DispatchType) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setStatusAC(response.data));
}

export const updateStatus = (status: string) => async (dispatch: DispatchType) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusAC(status));
    }
}
//Photo
export const savePhoto = (file: any) => async (dispatch: DispatchType) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoAC(response.data.data.photos));
    }
}
//Profile
export const getUserProfile = (userId: number) => async (dispatch: DispatchType) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfileAC(response.data));
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getstate: any) => {
    const userId = getstate().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("editProfile", { _error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0]);
    }
}

//Export
export default profileReducer;