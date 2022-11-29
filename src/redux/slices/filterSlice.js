import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,
  currentPage: 1,
  activeSort: { name: 'популярности', sortProperty: 'rating' },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },

    setActiveSort(state, action) {
      state.activeSort = action.payload;
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    setFilters(state, action) {
      state.activeCategory = Number(action.payload.activeCategory);
      state.currentPage = Number(action.payload.currentPage);
      state.activeSort = action.payload.activeSort;
    },
  },
});

export const { setActiveCategory, setActiveSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
