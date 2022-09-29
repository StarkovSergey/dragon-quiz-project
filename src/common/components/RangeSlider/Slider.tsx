import * as React from 'react'

import { Box, Slider } from '@mui/material'

type SuperDoubleRangePropsType = {
  value: [number, number]
  setValue: (value: [number, number]) => void
}

const minDistance = 1

export const RangeSlider = ({ setValue, value }: SuperDoubleRangePropsType) => {
  const handleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]])
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)])
    }
  }

  return (
    <Box sx={{ width: 300 }}>
      <Slider onChange={handleChange1} value={value} valueLabelDisplay="off" color="primary" />
    </Box>
  )
}
