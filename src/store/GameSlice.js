import {createSlice} from "@reduxjs/toolkit";


export const emptyInitialStateForGameSlice = {
    teams: [
        {
            id: 1,
            name: 'First team'
        },
        {
            id: 2,
            name: 'Second team'
        },
    ]
}

const initialState = emptyInitialStateForGameSlice

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        editTeamName(state, action) {
            const {teamId, newName} = action.payload
            state.teams.find(el => el.id === teamId).name = newName
        },
        deleteTeam(state, action) {
            const teamId = action.payload
            state.teams = state.teams.filter(el => el.id !== teamId)
        },
        addNewTeam(state, action) {
            state.teams.push(action.payload)
        },

    },
})


export const {
    editTeamName,
    deleteTeam,
    addNewTeam
} = gameSlice.actions

export default gameSlice.reducer
