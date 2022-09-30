// import * as React from 'react'
// import { SyntheticEvent } from 'react'
//
// import { Box, Slider } from '@mui/material'
//
// type SuperDoubleRangePropsType = {
//   // defaultValue: [number, number]
//   // firstValue: number
//   // secondValue: number
//   // setValue: (value: [number, number]) => void
// }
//
// const minDistance = 1
//
// export const RangeSlider = ({ setValue, firstValue, secondValue, defaultValue }: SuperDoubleRangePropsType) => {
//   // const handleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
//   //   if (!Array.isArray(newValue)) {
//   //     return
//   //   }
//   //
//   //   if (activeThumb === 0) {
//   //     setValue([Math.min(newValue[0], secondValue - minDistance), secondValue])
//   //   } else {
//   //     setValue([firstValue, Math.max(newValue[1], firstValue + minDistance)])
//   //   }
//   // }
//
//   const sliderChangeHandler = (event: React.SyntheticEvent | Event, value: number | number[]): void => {
//     console.log(event)
//   }
//   // (e: Event, value: number[]) => void
//   // (event: Event | SyntheticEvent<Element, Event>, value: number | number[]) => void'.
//
//   return (
//     <Box sx={{ width: 300 }}>
//       <Slider
//         min={defaultValue[0]}
//         max={defaultValue[1]}
//         onChangeCommitted={sliderChangeHandler}
//         value={[firstValue, secondValue]}
//         valueLabelDisplay="off"
//         color="primary"
//       />
//     </Box>
//   )
// }
