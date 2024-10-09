import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store'; 
import { CardStock } from '@/src/interfaces/CardStock';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface IndustryState {
  data: CardStock[];
  loading: boolean;
  error: string | null;
}

const initialState: IndustryState = {
  data: [],
  loading: false,
  error: null,
};

// Async action để fetch dữ liệu cho industry
export const fetchIndustry = createAsyncThunk(
  'industry/fetch',
  async ({name, limit}: { name: string, limit: number}) => {
    const api = `${apiUrl}/tickers/industry?name=${name}&limit=${limit}`;
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

// Tạo slice cho industry
const industrySlice = createSlice({
  name: 'industry',
  initialState,
  reducers: {
    setIndustry(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIndustry.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchIndustry.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchIndustry.rejected, (state, action) => {
      state.error = action.error.message || null;
      state.loading = false;
    });
  },
});

// Selector
export const selectIndustry = (state: RootState) => state.cardStock.industry.data;
export const selectIndustryLoading = (state: RootState) => state.cardStock.industry.loading;
export const selectIndustryError = (state: RootState) => state.cardStock.topGainer.error;

export const { setIndustry } = industrySlice.actions;
export default industrySlice.reducer;
