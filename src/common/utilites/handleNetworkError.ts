import axios from 'axios'

import { setAppError, setAppStatus } from '../../app/app-reducer'
import { AppDispatch } from '../../app/store'

export const handleServerNetworkError = (e: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(e)) {
    const error = e.response ? (e.response.data as { error: string }).error : e.message

    dispatch(setAppError(error))
  }
  dispatch(setAppStatus('failed'))
}
