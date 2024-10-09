import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Holder } from '@/src/interfaces/Holder';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface HoldersState {
  data: Holder[];
  loading: boolean;
  error: string | null;
}

const initialState: HoldersState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchHolders = createAsyncThunk(
  'holders/fetch',
  async ({symbol}: { symbol: string; }) => {
    const api = `${apiUrl}/symbols/${symbol}/holders?limit=9`;
    console.log(api)
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const holdersSlice = createSlice({
  name: 'holders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHolders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHolders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHolders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectHoldersData = (state: RootState) => state.holders.data;
export const selectHoldersLoading = (state: RootState) => state.holders.loading;
export const selectHoldersError = (state: RootState) => state.holders.error;

export default holdersSlice.reducer;
