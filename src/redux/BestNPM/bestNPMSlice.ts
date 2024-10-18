import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BestNPMData } from '@/src/interfaces/BestNPM'; // Sử dụng interface đã định nghĩa

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface BestNPMState {
  data: BestNPMData | null;
  loading: boolean;
  error: string | null;
}

const initialState: BestNPMState = {
  data: null,
  loading: false,
  error: null,
};

// Async action để fetch dữ liệu cho BestNPM
export const fetchBestNPM = createAsyncThunk(
  'bestNPM/fetch',
  async () => {
    const api = `${apiUrl}/tickers/best`;
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

// Tạo slice cho BestNPM
const bestNPMSlice = createSlice({
  name: 'bestNPM',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBestNPM.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBestNPM.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBestNPM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

// Selectors
export const selectBestNPMData = (state: RootState) => state.bestNPM.data;
export const selectBestNPMLoading = (state: RootState) => state.bestNPM.loading;
export const selectBestNPMError = (state: RootState) => state.bestNPM.error;

export default bestNPMSlice.reducer;
