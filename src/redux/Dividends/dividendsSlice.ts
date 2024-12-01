import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { DividendData, Legend, DividendRecord } from '@/src/interfaces/Dividends';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Định nghĩa trạng thái ban đầu
interface DividendDataState {
  cashLegend: Legend[];
  stockLegend: Legend[];
  records: DividendRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: DividendDataState = {
  cashLegend: [],
  stockLegend: [],
  records: [],
  loading: false,
  error: null,
};

// Async action để fetch dữ liệu cổ tức
export const fetchDividendData = createAsyncThunk(
  'dividendData/fetch',
  async (symbol: string) => {
    const api = `${apiUrl}/symbols/${symbol}/dividends`;
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

// Tạo slice cho DividendData
const dividendDataSlice = createSlice({
  name: 'dividendData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDividendData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDividendData.fulfilled, (state, action) => {
        state.cashLegend = action.payload.cashLegend || [];
        state.stockLegend = action.payload.stockLegend || [];
        state.records = action.payload.records || [];
        state.loading = false;
      })
      .addCase(fetchDividendData.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });
  },
});

// Selectors
export const selectCashLegend = (state: RootState) => state.dividends.cashLegend;
export const selectStockLegend = (state: RootState) => state.dividends.stockLegend;
export const selectDividendRecords = (state: RootState) => state.dividends.records;
export const selectDividendDataLoading = (state: RootState) => state.dividends.loading;
export const selectDividendDataError = (state: RootState) => state.dividends.error;

// Selector để lấy toàn bộ thông tin
export const selectAllDividendData = (state: RootState) => ({
  cashLegend: state.dividends.cashLegend,
  stockLegend: state.dividends.stockLegend,
  records: state.dividends.records,
  loading: state.dividends.loading,
  error: state.dividends.error,
});

export default dividendDataSlice.reducer;
