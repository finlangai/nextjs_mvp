import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { priceInsights } from '@/src/interfaces/PriceInsights';

interface priceInsightState {
  data: priceInsights | null;
  loading: boolean;
  error: string | null;
}

const initialState: priceInsightState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchpriceInsights = createAsyncThunk(
  'priceInsights/fetch',
  async ({symbol}: { symbol: string;}) => {
    const api = `${apiUrl}/symbols/${symbol}/fluctuation`;
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const priceInsightlice = createSlice({
  name: 'priceInsights',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchpriceInsights.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchpriceInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchpriceInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectpriceInsightsData = (state: RootState) => state.priceInsights.data;
export const selectpriceInsightsLoading = (state: RootState) => state.priceInsights.loading;
export const selectpriceInsightsError = (state: RootState) => state.priceInsights.error;

export default priceInsightlice.reducer;