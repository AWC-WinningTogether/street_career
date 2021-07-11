import { UserInfo } from "../model/common";

//TODO
export const signInApi = (phoneNumber: string, password: string): Promise<UserInfo> => {
    if (phoneNumber && password) {
        return Promise.resolve({ userId: "1", fullName: "Manikanta Challa" })
    }
    return Promise.reject("Phone number and password don't match");
}

export const signUpApi = (phoneNumber: string, password: string, fullName: string): Promise<UserInfo> => {
    if (phoneNumber && password) {
        return Promise.resolve({ userId: "1", fullName: fullName })
    }
    return Promise.reject("Phone number and password don't match");
}