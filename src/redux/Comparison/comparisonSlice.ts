import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Company, CompanyList } from '@/src/interfaces/Comparison';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface CompanyState {
  data: CompanyList;
  loading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  data: [],
  loading: false,
  error: null,
};

//(POST)
export const fetchPostComparison= createAsyncThunk(
  'company/fetch',
  async (
    { payload }: { symbol: string; payload: { symbols: string[] } },
    { rejectWithValue }
  ) => {
    try {
      const api = `${apiUrl}/symbols/comparison`;
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

//(GET)
export const fetchGetComparison = createAsyncThunk< any, string >(
  'company/fetchAll',
  async (symbol, { rejectWithValue }) => {
    try {
      const api = `${apiUrl}/symbols/${symbol}/comparison`;
      const response = await fetch(api);

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
  reducers: {
    // Reducer xóa công ty theo symbol
    removeCompany: (state, action) => {
      state.data = state.data.filter((company) => company.symbol !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch dữ liệu công ty (POST)
      .addCase(fetchPostComparison.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostComparison.fulfilled, (state, action) => {
        const newCompany: Company = action.payload;
        const exists = state.data.some((company) => company.symbol === newCompany.symbol);

        if (!exists) {
          state.data.push(newCompany);
        }

        state.loading = false;
      })
      .addCase(fetchPostComparison.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      // Fetch tất cả công ty (GET)
      .addCase(fetchGetComparison.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetComparison.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchGetComparison.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

// Export actions
export const { removeCompany } = companySlice.actions;

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
