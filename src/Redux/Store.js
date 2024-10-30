import { configureStore } from '@reduxjs/toolkit';
import { allApislice } from './slices/apiSlice';
import taskSlice from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    [allApislice.reducerPath]: allApislice.reducer,
    taskStore: taskSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(allApislice.middleware),
})