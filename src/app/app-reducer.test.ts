import { appReducer, AppStateType, setAppError } from './app-reducer'

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

  const endState = appReducer(startState, setAppError({ error: newErrorMessage }))

  expect(endState.error).toBe(newErrorMessage)
})
