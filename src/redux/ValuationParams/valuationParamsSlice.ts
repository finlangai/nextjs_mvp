import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { PeParams, PbParams } from '@/src/interfaces/Valuation';

interface ValuationParamsState {
  data: PeParams | PbParams | null;
  loading: boolean;
  error: string | null;
}

const initialState: ValuationParamsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchValuationParams = createAsyncThunk(
    'valuationParams/fetch',
    async (
        { symbol, name, token }: { symbol: string; name: string, token: string }, 
        { rejectWithValue }) => 
    {

      const api = `${apiUrl}/valuation/${name}/${symbol}/params`; 
  
      if (!token) {
        return rejectWithValue('Token không tồn tại');
      }
  
      try {
        const response = await fetch(api, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
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
  
// Slice để quản lý state
const valuationParamsSlice = createSlice({
    name: 'valuationParams',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchValuationParams.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchValuationParams.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchValuationParams.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || 'Đã xảy ra lỗi';
        });
    },
});

// Selectors
export const selectValuationParamsData = (state: RootState) => state.valuationParams.valuetionParams.data;
export const selectValuationParamsLoading = (state: RootState) => state.valuationParams.valuetionParams.loading;
export const selectValuationParamsError = (state: RootState) => state.valuationParams.valuetionParams.loading;

// Export reducer
export default valuationParamsSlice.reducer;
