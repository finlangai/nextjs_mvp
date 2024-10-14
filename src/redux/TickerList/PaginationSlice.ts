import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface PaginationState {
  currentPage: number;
  totalPages: number;
  limit: number;
  offset: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  totalPages: 1,
  limit: 10,
  offset: 0
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setLimitPage: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    }  
  },
});

export const { 
  setCurrentPage, 
  setTotalPages, 
  setLimitPage, 
  setOffset
} = paginationSlice.actions;

export const selectCurrentPage = (state: RootState) => state.tickerList.Pagination.currentPage;
export const selectTotalPages = (state: RootState) => state.tickerList.Pagination.totalPages;
export const selectLimitPage = (state: RootState) => state.tickerList.Pagination.limit;
export const selectOffsetPage = (state: RootState) => state.tickerList.Pagination.offset;

export default paginationSlice.reducer;