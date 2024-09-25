import {combineReducers, configureStore} from '@reduxjs/toolkit'
import gameReducer from '../store/GameSlice'
import {setupListeners} from "@reduxjs/toolkit/query";
import settingsReducer from '../store/SettingsSlice'


export const USER_LOGOUT = '@@logout/USER_LOGOUT'

const combinedReducer = combineReducers({
    game: gameReducer,
    settings: settingsReducer,
});

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = undefined;
    }
    return combinedReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
})

setupListeners(store.dispatch)