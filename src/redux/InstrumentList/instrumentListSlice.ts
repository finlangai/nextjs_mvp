import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Instruments } from '@/src/interfaces/Instruments';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface InstrumentListState {
  data: Instruments[];
  loading: boolean;
  error: string | null;
}

const initialState: InstrumentListState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchInstrumentList = createAsyncThunk(
  'instrumentList/fetch',
  async ({ category }: { category: string }) => {
    const api = `${apiUrl}/tickers/technical-chart/instruments?category=${category}`;
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const instrumentListSlice = createSlice({
  name: 'instrumentList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstrumentList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInstrumentList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchInstrumentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectInstrumentListsData = (state: RootState) => state.instrumentList.data;
export const selectInstrumentListsLoading = (state: RootState) => state.instrumentList.loading;
export const selectInstrumentListsError = (state: RootState) => state.instrumentList.error;

export default instrumentListSlice.reducer;
