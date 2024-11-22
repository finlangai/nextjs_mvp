import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Scenarios } from '@/src/interfaces/Scenarios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ScenariosState {
  data: Scenarios[]; 
  loading: boolean;
  error: string | null;
}

const initialState: ScenariosState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchScenarios = createAsyncThunk(
  'scenarios/fetch',
  async (
    { symbol, name, token }: { symbol: string; name: string, token: string },
    { rejectWithValue }
  ) => {
    const api = `${apiUrl}/valuation/${name}/${symbol}/scenarios`;

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

const scenariosSlice = createSlice({
  name: 'scenarios',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchScenarios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScenarios.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchScenarios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Đã xảy ra lỗi';
      });
  },
});

export const selectScenariosData = (state: RootState) => state.scenarios.data;
export const selectScenariosLoading = (state: RootState) => state.scenarios.loading;
export const selectScenariosError = (state: RootState) => state.scenarios.error;

export default scenariosSlice.reducer;
