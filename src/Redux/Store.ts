import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import gymReducer from './gymSlice'


export const store = configureStore({
    reducer: {
        //aca adentro van los reducers, o porcion de estados de redux
        user: userReducer,
        gym: gymReducer
    },
})