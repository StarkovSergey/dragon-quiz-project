import axios from 'axios'

import { LoginFormDataType } from './sign-in/SignIn'

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})
export const authAPI = {
  me() {
    return instance.post(`auth/me`, {})
  },
  login(loginData: LoginFormDataType) {
    return instance.post(`auth/login`, loginData)
  },
  logout() {
    return instance.delete<{ info: string }>(`auth/me`)
  },
  signUp(data: signUpType) {
    return instance.post<ResponseSignUpType>('/auth/register', data)
  },
  updateProfile(model: UpdateProfileModelType) {
    return instance.put<UpdateProfileResponseType>(`auth/me`, model)
  },
}

// type
export type UpdateProfileModelType = {
  name?: string
  avatar?: string
}

export type UpdateProfileResponseType = {
  updatedUser: ProfileType
  error?: string
}

export type ResponseSignUpType = {
  addedUser: {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
  }
}

export type signUpType = {
  email: string
  password: string
}

export type ProfileType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
  avatar: string
}
