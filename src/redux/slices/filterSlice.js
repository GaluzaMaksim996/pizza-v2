import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
