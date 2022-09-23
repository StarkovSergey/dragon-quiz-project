import axios, { AxiosError } from 'axios'

import { setAppError, setAppStatus } from '../../app/app-reducer'
import { AppDispatch } from '../hooks/hooks'

export const handleServerNetworkError = (e: unknown, dispatch: AppDispatch) => {
  const err = e as Error | AxiosError

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? (err.response.data as { error: string }).error : err.message

    // condition against initial auth error
    if (err.response?.status !== 401) {
      dispatch(setAppError({ error }))
    }
  } else {
    dispatch(setAppError({ error: `Native error ${err.message}` }))
  }
  dispatch(setAppStatus({ status: 'failed' }))
}
