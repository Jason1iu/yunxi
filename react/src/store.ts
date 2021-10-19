import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './main/slice';
import { StateKeys } from './global';

export const store = configureStore({
    reducer: {
        [StateKeys.MAIN]: mainReducer,
    },
    devTools: process.env.NODE_ENV === 'development',

});

export type ReduxDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof store.getState>;