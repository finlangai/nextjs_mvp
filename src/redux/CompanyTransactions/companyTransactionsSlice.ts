import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store'; 
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { companyTransactions } from '@/src/interfaces/CompanyTransactions';

interface companyTransactionsState {
  data: companyTransactions[];
  loading: boolean;
  error: string | null;
}

const initialState: companyTransactionsState = {
  data: [],
  loading: false,
  error: null,
};

// Async action để fetch dữ liệu cho companyTransaction
export const fetchcompanyTransaction = createAsyncThunk(
  'companyTransaction/fetch',
  async ({symbol, limit}: { symbol: string, limit: number}) => {
    const api = `${apiUrl}/symbols/${symbol}/transactions?limit=${limit}`;
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
  reducers: {
    setIndustry(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchcompanyTransaction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchcompanyTransaction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchcompanyTransaction.rejected, (state, action) => {
      state.error = action.error.message || null;
      state.loading = false;
    });
  },
});

// Selector
export const selectcompanyTransactionData = (state: RootState) => state.companyTransaction.data;
export const selectcompanyTransactionLoading = (state: RootState) => state.companyTransaction.loading;
export const selectcompanyTransactionError = (state: RootState) => state.companyTransaction.error;

export default companyTransactionSlice.reducer;
