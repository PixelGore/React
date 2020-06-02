//All imports
import { profileAPI } from "../../api/api";
import { stopSubmit } from "redux-form";
//Action Creators
const addPost = 'ADD-POST';
const setUserProfile = 'setUserProfile';
const SET_STATUS = 'SET_STATUS';
const Save_Photo = 'Save_Photo';
//
export const addPostActionCreator = (newPostText) => ({ type: addPost, newPostText });
export const setUserProfileAC = (profile) => ({ type: setUserProfile, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const savePhotoAC = (photos) => ({ type: Save_Photo, photos });
//Initial State
let initialState = {
    posts: [
        { id: 1, message: "Hi , ur mom gay !", upvotes: 69, downvotes: 99 },
        { id: 2, message: "No , u !", upvotes: 420, downvotes: 23 },
    ],
    newPostText: '',
    profile: null,
    status: "",
}
//Reducer
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case addPost: {
            let text = action.newPostText
            return {
                ...state,
                posts: [...state.posts, { id: 5, message: text, upvote: 0 }]
            }

        }
        case setUserProfile: {
            return { ...state, profile: action.profile }
        }
        case SET_STATUS: {
            return { ...state, status: action.status }
        }
        case Save_Photo: {
            return { ...state, profile: { ...state.profile, photos: action.photos } }
        }
        default:
            return state;
    }

}

//Thunks

//Status
export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}
//Photo
export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoAC(response.data.data.photos));
    }
}
//Profile
export const getUserProfile = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfileAC(response.data));
}

export const saveProfile = (profile) => async (dispatch,getstate) => {
    const userId = getstate().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    }else {
        dispatch(stopSubmit("editProfile", { _error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0]);
    }
}

//end.
export default profileReducer;