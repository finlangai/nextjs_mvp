import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { TechnicalChartOverview } from '@/src/interfaces/TechnicalChartOverview';

interface TechnicalChartOverviewState {
  data: TechnicalChartOverview | null;
  loading: boolean;
  error: string | null;
}

const initialState: TechnicalChartOverviewState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchTechnicalChartOverview = createAsyncThunk(
  'technicalChartOverview/fetch',
  async () => {
    const api = `${apiUrl}/tickers/technical-chart/overview`;
    const response = await fetch(api);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const technicalChartOverviewSlice = createSlice({
  name: 'technicalChartOverview',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTechnicalChartOverview.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTechnicalChartOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTechnicalChartOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectTechnicalChartOverviewData = (state: RootState) => state.technicalChartOverview.data;
export const selectTechnicalChartOverviewLoading = (state: RootState) => state.technicalChartOverview.loading;
export const selectTechnicalChartOverviewError = (state: RootState) => state.technicalChartOverview.error;

export default technicalChartOverviewSlice.reducer;
