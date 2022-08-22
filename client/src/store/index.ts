import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer, {authKey} from './auth/slice';
import chatReducer from './chat/slice';


const rootReducer = combineReducers({
    authReducer,
    chatReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']