import { instance } from "./api";

//Capthca

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<getCaptchaUrlType>(`security/get-captcha-url`).then(res=>res.data)
    }
};

//securityAPI Types 
//getCaptchaUrlType
type getCaptchaUrlType = {
    url: string;
};
