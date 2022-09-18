import axios from 'axios'

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const signUpAPI = {
  signUp(data: signUpType) {
    return instance.post<ResponseSignUpType>('/auth/register', data)
  },
}

// type
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
