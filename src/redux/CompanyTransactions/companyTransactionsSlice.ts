import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { companyTransactions, records, total } from '@/src/interfaces/CompanyTransactions';

interface companyTransactionsState {
  data: companyTransactions[];
  records: records[];
  total: total | null;
  loading: boolean;
  error: string | null;
}

const initialState: companyTransactionsState = {
  data: [],
  records: [],
  total: null,
  loading: false,
  error: null,
};

// Async action để fetch dữ liệu cho companyTransaction
export const fetchcompanyTransaction = createAsyncThunk(
  'companyTransaction/fetch',
  async ({symbol, limit, offset, start_and_end}: { symbol: string, limit: number, offset: string, start_and_end: string}) => {
    const api = `${apiUrl}/symbols/${symbol}/transactions?limit=${limit}${offset}${start_and_end}`;
    // console.log('api', api)
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

// Tạo slice cho companyTransaction
const companyTransactionSlice = createSlice({
  name: 'companyTransaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchcompanyTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchcompanyTransaction.fulfilled, (state, action) => {
        state.total = action.payload.total || null;
        state.records = action.payload.records || [];
        state.loading = false;
      })
      .addCase(fetchcompanyTransaction.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });
  },
});

// Selectors hiện có
export const selectcompanyTransactionData = (state: RootState) => state.companyTransaction.data;
export const selectcompanyTransactionLoading = (state: RootState) => state.companyTransaction.loading;
export const selectcompanyTransactionError = (state: RootState) => state.companyTransaction.error;

// Thêm selectors mới cho records và total
export const selectcompanyTransactionRecords = (state: RootState) => state.companyTransaction.records;
export const selectcompanyTransactionTotal = (state: RootState) => state.companyTransaction.total;

// Selector để lấy tất cả thông tin
export const selectAllcompanyTransactionInfo = (state: RootState) => ({
  data: state.companyTransaction.data,
  records: state.companyTransaction.records,
  total: state.companyTransaction.total,
  loading: state.companyTransaction.loading,
  error: state.companyTransaction.error,
});

export default companyTransactionSlice.reducer;