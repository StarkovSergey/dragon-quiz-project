import { ChangeEvent } from 'react'

import { Dispatch } from 'redux'

import { setAppError } from '../../app/app-slice'

export const uploadFileHandler = (
  e: ChangeEvent<HTMLInputElement>,
  callback: (file64: string) => void,
  dispatch: Dispatch
) => {
  if (e.target.files && e.target.files.length) {
    const file = e.target.files[0]

    if (file.size < 4000000) {
      const reader = new FileReader()

      reader.onloadend = () => {
        const file64 = reader.result as string

        callback(file64)
      }
      reader.readAsDataURL(file)
    } else {
      dispatch(setAppError({ error: 'The file is too large' }))
    }
  }
}
