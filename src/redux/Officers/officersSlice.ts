import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Officers } from '@/src/interfaces/Officers';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface OfficersState {
  data: Officers[];
  loading: boolean;
  error: string | null;
}

const initialState: OfficersState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchOfficers = createAsyncThunk(
  'officers/fetch',
  async ({symbol}: { symbol: string; }) => {
    const api = `${apiUrl}/symbols/${symbol}/officers?limit=9`;
    // console.log(api)
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const officersSlice = createSlice({
  name: 'officers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfficers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOfficers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOfficers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectOfficersData = (state: RootState) => state.officers.data;
export const selectOfficersLoading = (state: RootState) => state.officers.loading;
export const selectOfficersError = (state: RootState) => state.officers.error;

export default officersSlice.reducer;
