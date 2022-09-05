import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { currentPage, categoryId, sortType, search } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://62f2550618493ca21f317d6b.mockapi.io/react_project?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType}&order=desc&${search}`,
    );
    return data;
  },
);
