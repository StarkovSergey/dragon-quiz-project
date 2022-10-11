import axios from 'axios'

import { instance } from '../../common/api-instances/instance'

import { LoginFormDataType } from './sign-in/SignIn'

export const authAPI = {
  me() {
    return instance.post(`auth/me`, {})
  },
  login(loginData: LoginFormDataType) {
    return instance.post<ProfileType>(`auth/login`, loginData)
  },
  logout() {
    return instance.delete<{ info: string }>(`auth/me`)
  },
  signUp(data: signUpType) {
    return instance.post<ResponseSignUpType>('auth/register', data)
  },
  updateProfile(model: UpdateProfileModelType) {
    return instance.put<UpdateProfileResponseType>(`auth/me`, model)
  },
  forgotPassword(email: string) {
    const message = `<div style='padding: 15px'>password recovery link: <a href='https://starkovsergey.github.io/dragon-quiz-project/#/set-new-password/$token$'>link</a></div>`

    return axios.post<{ info: string; error: string }>(
      `https://neko-back.herokuapp.com/2.0/auth/forgot`,
      {
        email,
        message,
        from: 'test-front-admin <ai73a@yandex.by>',
      },
      { withCredentials: true }
    )
  },
  setNewPassword(password: string, resetPasswordToken: string) {
    return axios.post<{ info: string; error: string }>(
      `https://neko-back.herokuapp.com/2.0/auth/set-new-password`,
      {
        password,
        resetPasswordToken,
      },
      { withCredentials: true }
    )
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
