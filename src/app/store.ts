import { configureStore } from '@reduxjs/toolkit'
import { AnyAction, combineReducers } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authSlice } from '../features/auth/auth-slice'
import { cardsReducer } from '../features/cards/cards-reducer'
import { packsReducer } from '../features/packs/packs-reducer'

import { appSlice } from './app-slice'

const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  packs: packsReducer,
  cards: cardsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

// types
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
