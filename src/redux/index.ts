import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import articles from './features/articles'

export const store = configureStore({
  reducer: { articles },
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<TAppDispatch>()
export const useSelectorTyped: TypedUseSelectorHook<TRootState> = useSelector
