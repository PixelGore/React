//Imports
import { profileAPI } from "../../api/profileAPI"
import { stopSubmit, FormAction } from "redux-form"
import { PostsType, PhotosType, ProfileType } from './../../types/types'
import { InferActionstypes, BaseThunkType } from "../reduxStore";


//Actions
export const actions = {
    addPostAC: (newPostText: string) =>
        ({ type: 'profilePage/addPost', newPostText } as const),
    setUserProfileAC: (profile: ProfileType) =>
        ({ type: 'profilePage/SET_USER_PROFILE', profile } as const),
    setStatusAC: (status: string) =>
        ({ type: 'profilePage/SET_STATUS', status } as const),
    savePhotoAC: (photos: PhotosType) =>
        ({ type: 'profilePage/SAVE_PHOTO', photos } as const),

}
type ActionsTypes = InferActionstypes<typeof actions>


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
        case 'profilePage/addPost': {
            let newPost = {
                id: 5,
                message: action.newPostText,
                upvotes: 0,
                downvotes: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }
        case 'profilePage/SET_USER_PROFILE': {
            return { ...state, profile: action.profile }
        }
        case 'profilePage/SET_STATUS': {
            return { ...state, status: action.status }
        }
        case 'profilePage/SAVE_PHOTO': {
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        }
        default:
            return state
    }

}


//Thunks
type ThunkType = BaseThunkType<ActionsTypes|FormAction>
//Status
export const getStatus = (userId: number):ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatusAC(data))
}

export const updateStatus = (status: string):ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatusAC(status))
    }
}
//Photo
export const savePhoto = (file: File):ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoAC(data.data.photos))
    }
}
//Profile
export const getUserProfile = (userId: number):ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfileAC(data))
}

export const saveProfile = (profile: ProfileType):ThunkType => async (dispatch, getstate) => {
    const userId = getstate().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if(userId != null) {
            dispatch(getUserProfile(userId))
        }else {
            throw new Error("userId can't be null")
        }
        
    } else {
        dispatch(stopSubmit("editProfile", { _error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
}

//Export
export default profileReducer;