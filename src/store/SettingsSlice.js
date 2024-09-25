import {createSlice} from "@reduxjs/toolkit";


export const emptyInitialStateForSettingsSlice = {
    wordsGoalNumber: 30,
    roundDuration: 60,
    isPenaltyForSkipping: true

}

const initialState = emptyInitialStateForSettingsSlice

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setWordsGoalNumber(state, action) {
            state.wordsGoalNumber = action.payload
        },

        setRoundDuration(state, action) {
            state.roundDuration = action.payload
        },

        setIsPenaltyForSkipping(state, action) {
            state.isPenaltyForSkipping = action.payload
        },

        setAllSettings(state, action) {
            return {
                ...initialState,
                ...action.payload
            }
        },
    },
})


export const {
    setWordsGoalNumber,
    setRoundDuration,
    setIsPenaltyForSkipping,
    setAllSettings
} = settingsSlice.actions

export default settingsSlice.reducer