import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { category, sortType, order, currentPage, searchValue } = params;
  const { data } = await axios.get(
    `https://636fc345bb9cf402c81f2e03.mockapi.io/items/?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}&search=${searchValue}`,
  );

  return data;
});
