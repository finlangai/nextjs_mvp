import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { PriceStock } from '@/src/interfaces/PriceStock';

interface PriceStockState {
  data: PriceStock[];
  loading: boolean;
  error: string | null;
}

const initialState: PriceStockState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPriceStocks = createAsyncThunk(
  'priceStock/fetch',
  async ({symbol, start, end, interval, type, limit}: { symbol: string; start: number, end: number, interval: string, type: number, limit: number}) => {
    const api = `${apiUrl}/symbols/${symbol}/quotes?start=${start}&end=${end}&interval=${interval}&type=${type}&limit=${limit}`;
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const priceStockSlice = createSlice({
  name: 'priceStock',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceStocks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPriceStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPriceStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectPriceStocksData = (state: RootState) => state.priceStock.data;
export const selectPriceStocksLoading = (state: RootState) => state.priceStock.loading;
export const selectPriceStocksError = (state: RootState) => state.priceStock.error;

export default priceStockSlice.reducer;