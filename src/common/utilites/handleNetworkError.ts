import { setAppError, setAppStatus } from '../../app/app-reducer'
import { AppDispatch } from '../../app/store'

export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
  dispatch(setAppError(error.message ? error.message : 'Some error occurred'))
  dispatch(setAppStatus('failed'))
}
