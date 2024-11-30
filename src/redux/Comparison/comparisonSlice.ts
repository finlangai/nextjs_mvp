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

// (POST) Fetch và thêm công ty vào danh sách
export const fetchPostComparison = createAsyncThunk(
  'company/fetch',
  async (
    { symbols }: { symbols: string[] },
    { rejectWithValue }
  ) => {
    try {
      const api = `${apiUrl}/symbols/comparison`;
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbols }),
      });

      if (!response.ok) {
        return rejectWithValue(`HTTP error! status: ${response.status}`);
      }

      return await response.json(); // Trả về mảng các công ty
    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

// (GET) Fetch tất cả dữ liệu công ty dựa trên symbol
export const fetchGetComparison = createAsyncThunk<any, string>(
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

// Slice quản lý dữ liệu công ty
const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    // Xóa công ty khỏi danh sách
    removeCompany: (state, action) => {
      state.data = state.data.filter((company) => company.symbol !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch POST: Thêm công ty
      .addCase(fetchPostComparison.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostComparison.fulfilled, (state, action) => {
        const newCompanies: Company[] = action.payload; // API trả về mảng các công ty

        newCompanies.forEach((newCompany) => {
          const exists = state.data.some((company) => company.symbol === newCompany.symbol);
          if (!exists) {
            state.data.push(newCompany);
          }
        });

        state.loading = false;
      })
      .addCase(fetchPostComparison.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      // Fetch GET: Lấy danh sách công ty
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

// Selector lấy công ty theo symbol
export const selectCompanyBySymbol = (state: RootState, symbol: string) =>
  state.comparison.data.find((company) => company.symbol === symbol);

// Selector lấy danh sách symbol
export const selectCompanySymbols = (state: RootState) =>
  state.comparison.data.map((company) => company.symbol);

// Selector toàn bộ thông tin
export const selectAllCompanyInfo = (state: RootState) => ({
  data: state.comparison.data,
  loading: state.comparison.loading,
  error: state.comparison.error,
});

export default companySlice.reducer;
