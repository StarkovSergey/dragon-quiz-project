import axios, { AxiosError } from 'axios'

import { setAppError, setAppStatus } from '../../app/app-reducer'
import { AppDispatch } from '../../app/store'
import { changeCardStatus } from '../../features/cards/cards-reducer'
import { changePackStatus } from '../../features/packs/packs-reducer'

export const handleServerNetworkError = (
  e: unknown,
  dispatch: AppDispatch,
  params?: { cardID?: string; packID?: string }
) => {
  const err = e as Error | AxiosError

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? (err.response.data as { error: string }).error : err.message

    // condition against initial auth error
    if (err.response?.status !== 401) {
      dispatch(setAppError({ error }))
    }

    if (params?.cardID) {
      dispatch(
        changeCardStatus({
          cardID: params.cardID,
          status: 'failed',
        })
      )
    }

    if (params?.packID) {
      dispatch(
        changePackStatus({
          packID: params.packID,
          status: 'failed',
        })
      )
    }
  } else {
    dispatch(setAppError({ error: `Native error ${err.message}` }))
  }
  dispatch(setAppStatus({ status: 'failed' }))
}
