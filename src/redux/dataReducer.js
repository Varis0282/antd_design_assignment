import { createSlice } from "@reduxjs/toolkit";

export const data = createSlice({
    name: 'data',
    initialState: {
        data : null,
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { setData } = data.actions;