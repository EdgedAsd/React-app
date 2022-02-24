import { createSlice } from '@reduxjs/toolkit';

const graphSlice = createSlice({
    name: 'graph',
    initialState: {
        width: 0,
        height: 0,
        padding: [50, 50, 50, 50]
    },
    reducers: {
        setWidth: (state, action) => {
            state.width = action.payload;
        },
        setHeight: (state, action) => {
            state.height = action.payload;
        }
    }
})

export const { setWidth, setHeight } = graphSlice.actions

export const rectParams = state => {
    return {
        height: state.graph.height,
        width: state.graph.width,
        padding: state.graph.padding
    }
}

export default graphSlice.reducer