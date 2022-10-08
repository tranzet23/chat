import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer, {authKey} from './auth/slice';
import chatReducer from './chat/slice';
import userReducer from './profile/slice';
import postReducer from './post/slice';


const rootReducer = combineReducers({
    authReducer,
    chatReducer,
    userReducer,
    postReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']