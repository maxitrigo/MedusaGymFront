import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import gymReducer from './gymSlice';
import gymUserReducer from './gymUserSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const persistConfig = {
    key: 'root',
    storage,
};

const appReducer = combineReducers({
    user: userReducer,
    gym: gymReducer,
    gymUser: gymUserReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === "user/logout") {
        storage.removeItem("persist:root"); // Limpia el almacenamiento persistente
        state = undefined; // Resetea todo el estado global
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
