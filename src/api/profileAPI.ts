//Imports
import { ProfileType, PhotosType } from './../types/types';
import { instance, APIResponseType } from './api';


//ProfileAPI
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, { status: status }).then(res => res.data)
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put<APIResponseType<savePhotoResponseDataType>>(`profile/photo`, formData).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile).then(res => res.data)
    }
};
type savePhotoResponseDataType = {
    photos: PhotosType
}