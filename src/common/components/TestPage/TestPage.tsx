import React from 'react'

import { Button } from '../Button/Button'
import { Checkbox } from '../Checkbox/Checkbox'
import { InputText } from '../InputText/InputText'

export const TestPage = () => {
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Button>Just button</Button>
        <Button art>Art button</Button>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <InputText label="Name" error="some error" />
      </div>
      <Checkbox label="I like dragons" />
    </div>
  )
}
