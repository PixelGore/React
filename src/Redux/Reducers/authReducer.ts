//Imports
import { ResultCodesEnum, ResultCodeForCaptchaEnum } from "../../api/api"
import { securityAPI } from "../../api/securityAPI"
import { authAPI } from "../../api/authAPI"
import { stopSubmit, FormAction } from "redux-form"
import { InferActionstypes, BaseThunkType } from "../reduxStore"


//Actions
const actions = {
    setAuthUserDataAC: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'auth/SetUserData', payload: { userId, email, login, isAuth }
    } as const),
    getCaptchaUrlSuccessAC: (captchaUrl: string) => ({
        type: 'auth/GetCaptchaUrlSuccess', payload: { captchaUrl }
    } as const)
}
type ActionsTypes = InferActionstypes<typeof actions>


//Initial state
let InitialState = {
    userId: null as (number | null),
    email: null as (string | null),
    login: null as (string | null),
    isAuth: false,
    captchaUrl: null as (string | null),
}
type initialStateType = typeof InitialState


//Reducer
const authReducer = (state = InitialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case "auth/SetUserData":
        case 'auth/GetCaptchaUrlSuccess':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

//Thunks
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
//Authentication
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.Me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, login, email } = meData.data;
        dispatch(actions.setAuthUserDataAC(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let loginData = await authAPI.Login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCapthcaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Ups we have some trouble("
        dispatch(stopSubmit("login", { _error: message }))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.Logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserDataAC(null, null, null, false))
    }
}

//Captcha
export const getCapthcaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const capthcaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccessAC(capthcaUrl))

}


//Export
export default authReducer;