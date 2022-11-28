import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './slices/paginationSlice';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    filter: filterReducer,
  },
});
