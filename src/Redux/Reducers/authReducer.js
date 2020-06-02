import { authAPI, securityAPI } from "../../api/api";
import { stopSubmit } from "redux-form";

const SetUserData = 'auth/SetUserData';
const toggleIsFETCHING = 'toggleIsFetching';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

//Initial state
let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null,
};
//Reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SetUserData:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

//Action Creators
export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SetUserData, payload:
        { userId, email, login, isAuth }
});
export const toggleIsFetching = (isFetching) => ({ type: toggleIsFETCHING, isFetching })


export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
});

//Thunks

//Authentication
export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.GetAuth();
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe,captcha) => async (dispatch) => {
    let response = await authAPI.Login(email, password, rememberMe,captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCapthcaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Ups we have some trouble("
        dispatch(stopSubmit("login", { _error: message }));
    }
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.Logout();
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData(null, null, null, false))
    }
}

//Captcha
export const getCapthcaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const capthcaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(capthcaUrl));

}

//end.
export default authReducer;