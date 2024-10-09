import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CompanyDescription } from '@/src/interfaces/CompanyDescription';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface CompanyDescriptionState {
  data: CompanyDescription | null;
  loading: boolean;
  error: string | null;
}

const initialState: CompanyDescriptionState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchCompanyDescriptions = createAsyncThunk(
  'companyDescription/fetch',
  async ({symbol}: { symbol: string;}) => {
    const api = `${apiUrl}/symbols/${symbol}/summary`;
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const companyDescriptionSlice = createSlice({
  name: 'companyDescription',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyDescriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanyDescriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCompanyDescriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectCompanyDescriptionsData = (state: RootState) => state.companyDescription.data;
export const selectCompanyDescriptionsLoading = (state: RootState) => state.companyDescription.loading;
export const selectCompanyDescriptionsError = (state: RootState) => state.companyDescription.error;

export default companyDescriptionSlice.reducer;