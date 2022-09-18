import axios from 'axios'

import { LoginFormDataType } from './sign-in/SignIn'

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})
export const loginAPI = {
  login(loginData: LoginFormDataType) {
    return instance.post(`auth/login`, loginData)
  },
}
