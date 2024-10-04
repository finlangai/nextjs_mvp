import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { FinancialStatement } from '@/src/interfaces/FinancialStatement';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface FinancialStatementState {
  data: FinancialStatement[];
  loading: boolean;
  error: string | null;
}

const initialState: FinancialStatementState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchFinancialStatements = createAsyncThunk(
  'financialStatements/fetch',
  async ({type, symbol, year, quarter}: { type: number; symbol: string; year: number, quarter: number}) => {
    const limit = 10;
    const api = `${apiUrl}/symbols/${symbol}/financial-statements?type=${type}&year=${year}&quarter=${quarter}&limit=${limit}`
    const response = await fetch(api);
    console.log(api)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const financialStatementSlice = createSlice({
  name: 'financialStatement',
  initialState,
  reducers: {
    setFinancialStatements: (state, action: PayloadAction<FinancialStatement[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinancialStatements.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFinancialStatements.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFinancialStatements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { setFinancialStatements } = financialStatementSlice.actions;

export const selectFinancialStatementsData = (state: RootState) => state.financialStatement.data;
export const selectFinancialStatementsLoading = (state: RootState) => state.financialStatement.loading;
export const selectFinancialStatementsError = (state: RootState) => state.financialStatement.error;

export default financialStatementSlice.reducer;