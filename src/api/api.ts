//Imports
import axios from "axios"
import { UserType } from "../types/types";


//Instance
export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "ebe19719-5d15-4ad3-aa7f-5ba4c65f5f8e"
    }
});
//Enums
export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

//Response of get /users
export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null

}

//Server response
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}