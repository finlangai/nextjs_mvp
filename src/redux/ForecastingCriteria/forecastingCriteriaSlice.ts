import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ForecastingCriteria } from '@/src/interfaces/ForecastingCriteria';
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

// Thunk để fetch dữ liệu
export const fetchForecastingCriteria = createAsyncThunk(
  'forecastingCriteria/fetch',
  async ({ symbol, type, group }: { symbol: string; type: number; group?: number }) => {
    const api = `${apiUrl}/symbols/${symbol}/assessment/criteria?type=${type}${group !== undefined ? `&group=${group}` : ''}`;
    console.log(api);
    const response = await fetch(api);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json(); // Lấy dữ liệu JSON từ phản hồi
    return result;
  }
);

const forecastingCriteriaSlice = createSlice({
  name: 'forecastingCriteriaSlice',
  initialState,
  reducers: {
    // Action để reset data về trạng thái ban đầu
    resetForecastingCriteria: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecastingCriteria.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchForecastingCriteria.fulfilled, (state, action) => {
        state.loading = false;

        if (Array.isArray(action.payload)) {
          // Nếu payload là một mảng, thay thế hoàn toàn state.data
          state.data = action.payload;
        } else if (typeof action.payload === 'object' && action.payload !== null) {
          // Nếu payload là một object (một phần tử), thêm nó vào state.data
          state.data.push(action.payload);
        } else {
          console.error('Dữ liệu trả về không hợp lệ');
        }
      })
      .addCase(fetchForecastingCriteria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

// Selector để lấy dữ liệu
export const selectForecastingCriteriaData = (state: RootState) => state.forecastingCriteria.data;
export const selectForecastingCriteriaLoading = (state: RootState) => state.forecastingCriteria.loading;
export const selectForecastingCriteriaError = (state: RootState) => state.forecastingCriteria.error;

// Xuất actions
export const { resetForecastingCriteria } = forecastingCriteriaSlice.actions;

// Xuất reducer
export default forecastingCriteriaSlice.reducer;
