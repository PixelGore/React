//Imports
import { authAPI, securityAPI } from "../../api/api";
import { stopSubmit } from "redux-form";
//Actions
const SetUserData = 'auth/SetUserData';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

//Action Creators
type setAuthUserDataType = {
    type: typeof SetUserData,
    payload: setAuthUserDataPayloadType
}
type setAuthUserDataPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataType => ({
    type: SetUserData, payload:
        { userId, email, login, isAuth }
});
type getCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccessAC = (captchaUrl: string): getCaptchaUrlSuccessType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
});

//Initial state
type initialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
let initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};
//Reducer
const authReducer = (state = initialState, action: any): initialStateType => {
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

//Thunks

//Authentication
export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.GetAuth();
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserDataAC(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let response = await authAPI.Login(email, password, rememberMe, captcha);
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

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.Logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}

//Captcha
export const getCapthcaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    const capthcaUrl = response.data.url
    dispatch(getCaptchaUrlSuccessAC(capthcaUrl));

}

//end.
export default authReducer;