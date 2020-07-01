//Imports
import { authAPI, securityAPI, ResultCodesEnum, ResultCodeForCaptcha } from "../../api/api"
import { stopSubmit } from "redux-form"
import { Dispatch } from "redux"
//Actions
const SetUserData = 'auth/SetUserData'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

//Action Creators
const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataType => ({
    type: SetUserData, payload:
        { userId, email, login, isAuth }
})
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
export const getCaptchaUrlSuccessAC = (captchaUrl: string): getCaptchaUrlSuccessType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
});
type getCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}

type ActionsTypes = setAuthUserDataType | getCaptchaUrlSuccessType
//Initial state
let initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
}
type initialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
//Reducer
const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case SetUserData:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

//Thunks
type DispatchType = Dispatch<ActionsTypes>
//Authentication
export const getAuthUserData = () => async (dispatch: DispatchType) => {
    let meData = await authAPI.Me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, login, email } = meData.data;
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let loginData = await authAPI.Login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCapthcaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Ups we have some trouble("
        dispatch(stopSubmit("login", { _error: message }))
    }
}

export const logout = () => async (dispatch: DispatchType) => {
    let response = await authAPI.Logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}

//Captcha
export const getCapthcaUrl = () => async (dispatch: DispatchType) => {
    const response = await securityAPI.getCaptchaUrl()
    const capthcaUrl = response.data.url
    dispatch(getCaptchaUrlSuccessAC(capthcaUrl))

}

//Export
export default authReducer;