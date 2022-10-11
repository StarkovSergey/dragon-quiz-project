import { appSlice, AppStateType, initializedAppTC, setAppError, setAppStatus } from './app-slice'

let startState: AppStateType

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: false,
  }
})

test('app error should be changed', () => {
  const newErrorMessage = 'some error'

  const endState = appSlice(startState, setAppError({ error: newErrorMessage }))

  expect(endState.error).toBe(newErrorMessage)
})

test('app status should be changed', () => {
  const endState = appSlice(startState, setAppStatus({ status: 'succeeded' }))

  expect(endState.status).toBe('succeeded')
})

test('app isInitialized property should be changed', () => {
  let variable: void
  const endState = appSlice(startState, initializedAppTC.fulfilled(variable, ''))

  expect(endState.isInitialized).toBe(true)
})
