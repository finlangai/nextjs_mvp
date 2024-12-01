import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AddStockComparisonPage } from '@/src/interfaces/SearchStock';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface SearchStockComparisonState {
  data: AddStockComparisonPage[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchStockComparisonState = {
  data: [],
  loading: false,
  error: null,
};

// Async thunk to fetch data for SearchStockComparison
export const fetchSearchStockComparison = createAsyncThunk(
  'searchStockComparison/fetch',
  async ({ query }: { query: string }) => {
    const api = `${apiUrl}/symbols/comparison/search?q=${query}`;
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const searchStockComparisonSlice = createSlice({
  name: 'searchStockComparison',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchStockComparison.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchStockComparison.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSearchStockComparison.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

// Selectors
export const selectSearchStockComparisonData = (state: RootState) => state.searchStockComparison.data;
export const selectSearchStockComparisonLoading = (state: RootState) => state.searchStockComparison.loading;
export const selectSearchStockComparisonError = (state: RootState) => state.searchStockComparison.error;

export default searchStockComparisonSlice.reducer;
