// Import necessary functions and types from Redux Toolkit
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Define the interface for the pagination state
interface PaginationState {
  currentPage: number;
  totalPages: number;
  limit: number;
  offset: number;
  nameSort: string;
  stateSort: string;
  isLoading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: PaginationState = {
  currentPage: 1,
  totalPages: 1,
  limit: 10,
  offset: 0,
  nameSort: 'marketcap',
  stateSort: 'desc',
  isLoading: false,
  error: null
};

// Create an async thunk to fetch the total number of pages
export const fetchTotal = createAsyncThunk(
  'pagination/fetchTotal',
  async (_, { rejectWithValue }) => {
    try {
      const api = `${apiUrl}/tickers/total`;
      const response = await fetch(api);

      if (!response.ok) {
        throw new Error('Failed to fetch total');
      }

      const data = await response.json();

      return Math.ceil(data.total / initialState.limit); // Calculate total pages
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Create the pagination slice
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
    },
    setNameSort: (state, action: PayloadAction<string>) => {
      state.nameSort = action.payload;
    },
    setStateSort: (state, action: PayloadAction<string>) => {
      state.stateSort = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTotal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalPages = action.payload;
      })
      .addCase(fetchTotal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

// Export the actions for updating the sort fields
export const {
  setCurrentPage,
  setTotalPages,
  setLimitPage,
  setOffset,
  setNameSort,
  setStateSort
} = paginationSlice.actions;

// Add selectors for nameSort and stateSort
export const selectCurrentPage = (state: RootState) => state.tickerList.Pagination.currentPage;
export const selectTotalPages = (state: RootState) => state.tickerList.Pagination.totalPages;
export const selectLimitPage = (state: RootState) => state.tickerList.Pagination.limit;
export const selectOffsetPage = (state: RootState) => state.tickerList.Pagination.offset;
export const selectIsLoading = (state: RootState) => state.tickerList.Pagination.isLoading;
export const selectError = (state: RootState) => state.tickerList.Pagination.error;
export const selectNameSort = (state: RootState) => state.tickerList.Pagination.nameSort;
export const selectStateSort = (state: RootState) => state.tickerList.Pagination.stateSort;

// Export the reducer
export default paginationSlice.reducer;
