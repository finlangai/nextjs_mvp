import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Instruments } from '@/src/interfaces/Instruments';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface SearchStockTechChartState {
  data: Instruments[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchStockTechChartState = {
  data: [],
  loading: false,
  error: null,
};

// Async thunk to fetch data for SearchStockTechChart
export const fetchSearchStockTechChart = createAsyncThunk(
  'searchStockTechChart/fetch',
  async ({ query }: { query: string }) => {
    const api = `${apiUrl}/tickers/technical-chart/instruments/search?q=${query}`;
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const searchStockTechChartSlice = createSlice({
  name: 'searchStockTechChart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchStockTechChart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchStockTechChart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSearchStockTechChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

// Selectors
export const selectSearchStockTechChartData = (state: RootState) => state.searchStockTechChart.data;
export const selectSearchStockTechChartLoading = (state: RootState) => state.searchStockTechChart.loading;
export const selectSearchStockTechChartError = (state: RootState) => state.searchStockTechChart.error;

export default searchStockTechChartSlice.reducer;
