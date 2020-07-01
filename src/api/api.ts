import { ProfileType } from './../types/types';
import axios from "axios"

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "ebe19719-5d15-4ad3-aa7f-5ba4c65f5f8e"
    }
});
//User
export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`);
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`);
    },
}


//Profile
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, { status: status });
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData);
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile);
    }
}



//Enums
export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}



//Auth
export const authAPI = {
    Me() {
        return instance.get<MeResponseType>(`auth/me`).then(response => response.data)
    },
    Login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha }).then(response => response.data)
    },
    Logout() {
        return instance.delete(`auth/login`);
    },
}
//AuthAPI Types
//MeType
type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
//LoginType
type LoginResponseType = {
    data: { userId: number }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}


//Capthca
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<getCaptchaUrlType>(`security/get-captcha-url`)
    }
}
//securityAPI Types 

//getCaptchaUrlType
type getCaptchaUrlType = {
    url: string
}