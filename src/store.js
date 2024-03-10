import { configureStore } from '@reduxjs/toolkit';
import { Tuple } from '@reduxjs/toolkit';
import dataReducer from './features/dataSlice';
import { logger } from './features/middleware';

export const store = configureStore({
    reducer: {
        data: dataReducer
    },
    middleware: getDefaultMiddleware => new Tuple(logger) // from reactjs, I didn't read enough to understand why this is what is needed and what Tuple is, but it works.
})
