import { configureStore } from '@reduxjs/toolkit';
import graphReducer from '../slices/graphSlice';

export default configureStore({
    reducer: {
        graph: graphReducer
    }
})