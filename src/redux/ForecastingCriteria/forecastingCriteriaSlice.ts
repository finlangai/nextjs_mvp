import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ForecastingCriteria, Metric } from '@/src/interfaces/ForecastingCriteria';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ForecastingCriteriaState {
  data: ForecastingCriteria[];
  loading: boolean;
  error: string | null;
}

const initialState: ForecastingCriteriaState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchForecastingCriteria = createAsyncThunk(
  'forecastingCriteria/fetch',
  async ({symbol, type, group}: { symbol: string; type: number; group: string}) => {
    const api = `${apiUrl}/symbols/${symbol}/assessment/criteria?type=${type}${group}`;
    const response = await fetch(api);
    // console.log('cos ig sai',api)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const forecastingCriteriaSliceSlice = createSlice({
  name: 'forecastingCriteriaSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecastingCriteria.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchForecastingCriteria.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchForecastingCriteria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectForecastingCriteriaData = (state: RootState) => state.forecastingCriteria.data;
export const selectForecastingCriteriaLoading = (state: RootState) => state.forecastingCriteria.loading;
export const selectForecastingCriteriaError = (state: RootState) => state.forecastingCriteria.error;

export default forecastingCriteriaSliceSlice.reducer;