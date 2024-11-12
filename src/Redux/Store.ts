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

export type RootState = ReturnType<typeof store.getState>; // Define RootState usando el tipo del store
export type AppDispatch = typeof store.dispatch; // Si necesitas usar el dispatch tipado en tus componentes
export default store;