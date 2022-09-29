import { useState } from 'react'

export const showPassword = () => {
  const [show, setShow] = useState(true)
  const [showConfirm, setShowConfirm] = useState(true)

  const setShowPassword = () => {
    setShow(!show)
  }

  const setShowConfirmPassword = () => {
    setShowConfirm(!showConfirm)
  }

  return {
    show,
    setShowPassword,
    showConfirm,
    setShowConfirmPassword,
  }
}
