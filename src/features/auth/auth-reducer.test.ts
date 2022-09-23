import { ProfileType } from './auth-api'
import { authReducer, AuthReducerStateType, login, logout, setRegisteredIn, updateProfile } from './auth-reducer'

let startState: AuthReducerStateType
const mockProfile: ProfileType = {
  _id: 'id1',
  email: 'some@email.com',
  rememberMe: false,
  isAdmin: false,
  name: 'some name',
  verified: false,
  publicCardPacksCount: 10,
  created: '1000',
  updated: '1000',
  __v: 3,
  token: 'some token',
  tokenDeathTime: 1234,
  avatar: 'avatar url',
}

beforeEach(() => {
  startState = {
    isLoggedIn: false,
    profile: null,
    isRegister: false,
  }
})

test('isLogged property should be changed and profile should be added', () => {
  const endState = authReducer(startState, login({ profile: mockProfile }))

  expect(endState.isLoggedIn).toBe(true)
  expect(endState.profile).toEqual(mockProfile)
})

test('logout should work correctly', () => {
  startState.isLoggedIn = true
  startState.profile = mockProfile
  const endState = authReducer(startState, logout())

  expect(endState.isLoggedIn).toBe(false)
  expect(endState.profile).toBe(null)
})

test('isRegister should be changed', () => {
  const endState = authReducer(startState, setRegisteredIn({ isRegister: true }))

  expect(endState.isRegister).toBe(true)
})

test('profile should be updated', () => {
  startState.profile = mockProfile
  const newProfile: ProfileType = {
    _id: 'id1',
    email: 'some@email.com',
    rememberMe: false,
    isAdmin: false,
    name: 'updated name',
    verified: false,
    publicCardPacksCount: 10,
    created: '1000',
    updated: '1000',
    __v: 3,
    token: 'some token',
    tokenDeathTime: 1234,
    avatar: 'updated avatar url',
  }

  const endState = authReducer(startState, updateProfile({ profile: newProfile }))

  expect(endState.profile?.name).toBe(newProfile.name)
  expect(endState.profile?.avatar).toBe(newProfile.avatar)
})
