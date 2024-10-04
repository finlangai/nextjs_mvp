import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { FinancialMetric } from '@/src/interfaces/FinancialMetric';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface FinancialMetricState {
  data: FinancialMetric[];
  loading: boolean;
  error: string | null;
}

const initialState: FinancialMetricState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchFinancialMetrics = createAsyncThunk(
  'financialMetrics/fetch',
  async ({symbol, year, quarter}: { symbol: string; year: number, quarter: number}) => {
    const limit = 10;
    const api = `${apiUrl}/symbols/${symbol}/ratio?year=${year}&quarter=${quarter}&limit=${limit}`;
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const financialMetricSlice = createSlice({
  name: 'financialMetric',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinancialMetrics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFinancialMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFinancialMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

// Selectors
export const selectFinancialMetricsData = (state: RootState) => state.financialMetric.data;
export const selectFinancialMetricsLoading = (state: RootState) => state.financialMetric.loading;
export const selectFinancialMetricsError = (state: RootState) => state.financialMetric.error;

export default financialMetricSlice.reducer;