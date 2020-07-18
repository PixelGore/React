//Imports
import { instance, APIResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum } from "./api";


//Auth

export const authAPI = {
    Me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data);
    },
    Login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data);
    },
    Logout() {
        return instance.delete(`auth/login`);
    },
};
//AuthAPI Types
//MeType
export type MeResponseDataType = {
    id: number
    email: string
    login: string
}
//LoginType
export type LoginResponseDataType = {
    userId: number
}