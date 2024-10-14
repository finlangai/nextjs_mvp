import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TickerList } from '@/src/interfaces/TickerList';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface TopStocksState {
  data: TickerList[];
  loading: boolean;
  error: string | null;
}

const initialState: TopStocksState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchTopStocks = createAsyncThunk(
  'topStocks/fetch',
  async ({limit}: { limit: number}) => {
    const api = `${apiUrl}/tickers?limit=${limit}`;
    // console.log(api)
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const topStocksSlice = createSlice({
  name: 'topStocks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopStocks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTopStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectTopStockssData = (state: RootState) => state.topStocks.data;
export const selectTopStockssLoading = (state: RootState) => state.topStocks.loading;
export const selectTopStockssError = (state: RootState) => state.topStocks.error;

export default topStocksSlice.reducer;