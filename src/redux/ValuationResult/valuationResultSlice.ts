import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { ValuationResult } from '@/src/interfaces/ValuationResult';

interface ValuationResultState {
  data: ValuationResult | null;
  loading: boolean;
  error: string | null;
}

const initialState: ValuationResultState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchValuationResult = createAsyncThunk(
  'valuationResult/fetch',
  async (
    { symbol, name, token, body = null }: { symbol: string; name: string; token: string; body?: Record<string, any> | null; },
    { rejectWithValue }
  ) => {
    const api = `${apiUrl}/valuation/${name}/${symbol}/calculate`;

    if (!token) {
      return rejectWithValue('Token không tồn tại');
    }

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Đã xảy ra lỗi không xác định');
    }
  }
);

const valuationResultSlice = createSlice({
  name: 'valuationResult',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchValuationResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchValuationResult.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchValuationResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Đã xảy ra lỗi';
      });
  },
});

// Selectors
export const selectValuationResultData = (state: RootState) => state.valuationResult.data;
export const selectValuationResultLoading = (state: RootState) => state.valuationResult.loading;
export const selectValuationResultError = (state: RootState) => state.valuationResult.error;

// Export reducer
export default valuationResultSlice.reducer;
