import { configureStore } from '@reduxjs/toolkit';
import pollsReducer from './pollsSlice'; // Correct path to the slice file

/**
 * The main Redux store for the application.
 */
export const store = configureStore({
  reducer: {
    polls: pollsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
