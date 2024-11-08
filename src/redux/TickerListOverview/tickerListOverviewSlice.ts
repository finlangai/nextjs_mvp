import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { TickerListOverview } from '@/src/interfaces/TickerListOverview';

interface TickerListOverviewState {
  data: TickerListOverview | null;
  loading: boolean;
  error: string | null;
}

const initialState: TickerListOverviewState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchTickerListOverview = createAsyncThunk(
  'tickerListOverview/fetch',
  async () => {
    const api = `${apiUrl}/tickers/overview`;
    const response = await fetch(api);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const tickerListOverviewSlice = createSlice({
  name: 'tickerListOverview',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickerListOverview.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickerListOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTickerListOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectTickerListOverviewData = (state: RootState) => state.tickerListOverview.data;
export const selectTickerListOverviewLoading = (state: RootState) => state.tickerListOverview.loading;
export const selectTickerListOverviewError = (state: RootState) => state.tickerListOverview.error;

export default tickerListOverviewSlice.reducer;
