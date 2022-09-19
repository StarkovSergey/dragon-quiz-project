import { setAppError, setAppStatus } from '../../app/app-reducer'
import { AppDispatch } from '../../app/store'

export const handleServerNetworkError = (e: any, dispatch: AppDispatch) => {
  const error = e.response ? (e.response.data as { error: string }).error : e.message

  dispatch(setAppError(error))
  dispatch(setAppStatus('failed'))
}
