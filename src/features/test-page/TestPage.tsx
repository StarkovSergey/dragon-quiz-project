import React from 'react'
import { Button } from '../../components/Button/Button'
import { InputText } from '../../components/InputText/InputText'
import { Checkbox } from '../../components/Checkbox/Checkbox'

export const TestPage = () => {

  return (
    <div>
      <div style={{marginBottom: '10px'}}><Button>Just button</Button>
        <Button art>Art button</Button></div>
      <div style={{marginBottom: '10px'}}>
        <InputText label='Name' />
      </div>
      <Checkbox label="I like dragons"/>
    </div>
  )
}
