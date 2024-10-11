import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TickerList } from '@/src/interfaces/TickerList';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface TickerListState {
  data: TickerList[];
  loading: boolean;
  error: string | null;
}

const initialState: TickerListState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchTickerList = createAsyncThunk(
  'tickerList/fetch',
  async ({limit}: { limit: number}) => {
    const api = `${apiUrl}/tickers?limit=${limit}`;
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const tickerListSlice = createSlice({
  name: 'tickerList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickerList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickerList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTickerList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectTickerListsData = (state: RootState) => state.tickerList.data;
export const selectTickerListsLoading = (state: RootState) => state.tickerList.loading;
export const selectTickerListsError = (state: RootState) => state.tickerList.error;

export default tickerListSlice.reducer;