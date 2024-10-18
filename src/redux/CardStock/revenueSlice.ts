import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CardStock } from '@/src/interfaces/CardStock';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface RevenueState {
  data: CardStock[];
  loading: boolean;
  error: string | null;
}

const initialState: RevenueState = {
  data: [],
  loading: false,
  error: null,
};

// Async action để fetch dữ liệu cho revenue
export const fetchRevenue = createAsyncThunk(
  'revenue/fetch',
  async ({ limit }: { limit: number }) => {
    const api = `${apiUrl}/tickers/top-revenue?&limit=${limit}`;
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

// Tạo slice cho revenue
const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {
    setRevenue(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRevenue.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRevenue.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchRevenue.rejected, (state, action) => {
      state.error = action.error.message || null;
      state.loading = false;
    });
  },
});

// Selectors
export const selectRevenue = (state: RootState) => state.cardStock.revenue.data;
export const selectRevenueLoading = (state: RootState) => state.cardStock.revenue.loading;
export const selectRevenueError = (state: RootState) => state.cardStock.revenue.error;

export const { setRevenue } = revenueSlice.actions;
export default revenueSlice.reducer;
