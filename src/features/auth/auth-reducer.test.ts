import { ProfileType, UpdateProfileModelType } from './auth-api'
import { AuthReducerStateType, authSlice, loginTC, logoutTC, updateProfileTC } from './auth-slice'

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
  }
})
test('isLogged property should be changed and profile should be added', () => {
  const endState = authSlice(
    startState,
    loginTC.fulfilled({ profile: mockProfile }, 'requestId', {
      email: '',
      rememberMe: true,
      password: '',
    })
  )

  expect(endState.isLoggedIn).toBe(true)
  expect(endState.profile).toEqual(mockProfile)
})

test('logout should work correctly', () => {
  startState.isLoggedIn = true
  startState.profile = mockProfile

  let testParam: void // just for test
  const endState = authSlice(startState, logoutTC.fulfilled(testParam, '', testParam))

  expect(endState.isLoggedIn).toBe(false)
  expect(endState.profile).toBe(null)
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

  const updateModel: UpdateProfileModelType = {
    name: 'updated name',
  }

  const endState = authSlice(startState, updateProfileTC.fulfilled({ profile: newProfile }, 'requestId', updateModel))

  expect(endState.profile?.name).toBe(newProfile.name)
  expect(endState.profile?.avatar).toBe(newProfile.avatar)
})
