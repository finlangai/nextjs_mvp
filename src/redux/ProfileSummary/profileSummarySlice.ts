import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { ProfileSummary } from '@/src/interfaces/ProfileSummary';

interface ProfileSummaryState {
  data: ProfileSummary | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileSummaryState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProfileSummaries = createAsyncThunk(
  'profileSummary/fetch',
  async ({symbol}: { symbol: string}) => {
    const api = `${apiUrl}/symbols/${symbol}/profile`;
    const response = await fetch(api);
    console.log('cos ig sai',api)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const profileSummarySlice = createSlice({
  name: 'profileSummary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileSummaries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfileSummaries.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfileSummaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectProfileSummaryData = (state: RootState) => state.profileSummary.data;
export const selectProfileSummaryLoading = (state: RootState) => state.profileSummary.loading;
export const selectProfileSummaryError = (state: RootState) => state.profileSummary.error;

export default profileSummarySlice.reducer;