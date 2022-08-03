import { createSlice } from '@reduxjs/toolkit'


export const songSlice = createSlice({
    name: "song",
    initialState: {
        song: {},
        playlist: [],
        loading: false
    },
    reducers: {
        addSong: (state, action) => {

            state.song = action.payload
        },
        addPlaylist: (state, action) => {
            state.playlist = action.payload
        },
        loading: (state, action) => {
            state.loading = action.payload
        }

    }
})

export const { addSong, addPlaylist, loading } = songSlice.actions

export default songSlice.reducer

