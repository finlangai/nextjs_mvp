import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Company } from '@/src/interfaces/Comparison';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Định nghĩa trạng thái ban đầu
interface CompanyState {
  data: Company[];
  loading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  data: [],
  loading: false,
  error: null,
};

// Async action để fetch dữ liệu công ty
export const fetchCompanyData = createAsyncThunk(
    'company/fetch',
    async (
      { symbol, payload }: { symbol: string; payload: { symbols: string[] } },
      { rejectWithValue }
    ) => {
      try {
        const api = `${apiUrl}/${symbol}/comparison`;
        const response = await fetch(api, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          return rejectWithValue(`HTTP error! status: ${response.status}`);
        }
  
        return await response.json();
      } catch (error: any) {
        return rejectWithValue(error.message || 'Something went wrong');
      }
    }
);
   

// Tạo slice cho Company
const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyData.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchCompanyData.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });
  },
});

// Selectors
export const selectCompanyData = (state: RootState) => state.comparison.data;
export const selectCompanyLoading = (state: RootState) => state.comparison.loading;
export const selectCompanyError = (state: RootState) => state.comparison.error;

// Selector để lấy thông tin chi tiết
export const selectCompanyBySymbol = (state: RootState, symbol: string) =>
  state.comparison.data.find((company) => company.symbol === symbol);

// Selector để lấy tất cả thông tin
export const selectAllCompanyInfo = (state: RootState) => ({
  data: state.comparison.data,
  loading: state.comparison.loading,
  error: state.comparison.error,
});

export default companySlice.reducer;
