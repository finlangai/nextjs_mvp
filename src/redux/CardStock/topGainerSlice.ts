import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store'; 
import { CardStock } from '@/src/interfaces/CardStock';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface TopGainerState {
  data: CardStock[];
  loading: boolean;
  error: string | null;
}

const initialState: TopGainerState = {
  data: [],
  loading: false,
  error: null,
};

// Tạo slice cho top gainers
const topGainerSlice = createSlice({
  name: 'topGainer',
  initialState,
  reducers: {
    setTopGainers(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopGainers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTopGainers.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTopGainers.rejected, (state, action) => {
      state.error = action.error.message || null;
      state.loading = false;
    });
  },
});

// Async action để fetch dữ liệu cho top gainers
export const fetchTopGainers = createAsyncThunk(
    'topGainers/fetch',
    async ({limit}: { limit: number}) => {
        const api = `${apiUrl}/tickers/top-gainers?&limit=${limit}`;
        const response = await fetch(api);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
);

// Selector
export const selectTopGainers = (state: RootState) => state.cardStock.topGainer.data;
export const selectTopGainersLoading = (state: RootState) => state.cardStock.topGainer.loading;
export const selectTopGainersError = (state: RootState) => state.cardStock.topGainer.error;

export const { setTopGainers } = topGainerSlice.actions;
export default topGainerSlice.reducer;
