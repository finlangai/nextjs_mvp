import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ChangeStockatReportPage } from '@/src/interfaces/SearchStock';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface SearchStockState {
  vn30: ChangeStockatReportPage[];  // Dữ liệu cho VN30
  data: ChangeStockatReportPage[];  // Dữ liệu tìm kiếm dựa trên query
  loading: boolean;
  error: string | null;
}

const initialState: SearchStockState = {
  vn30: [],   // Dữ liệu VN30 khởi tạo
  data: [],   // Dữ liệu tìm kiếm khởi tạo
  loading: false,
  error: null,
};

// Thunk fetch dữ liệu VN30
export const fetchSearchVn30Stock = createAsyncThunk(
  'searchVn30Stock/fetch',
  async () => {
    const api = `${apiUrl}/symbols/vn30`;
    const response = await fetch(api);
    console.log('api query', api)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

// Thunk fetch dữ liệu dựa trên query
export const fetchSearchStockByQuery = createAsyncThunk(
  'searchStock/fetchByQuery',
  async (query: string) => {
    const api = `${apiUrl}/symbols/search?q=${query}`; // Đường dẫn API với query
    const response = await fetch(api);
    console.log('api 30', api)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const searchVn30StockSlice = createSlice({
  name: 'searchVn30Stock',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch VN30 data
      .addCase(fetchSearchVn30Stock.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchVn30Stock.fulfilled, (state, action) => {
        state.loading = false;
        state.vn30 = action.payload;  // Cập nhật dữ liệu VN30
      })
      .addCase(fetchSearchVn30Stock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      // Fetch data by query
      .addCase(fetchSearchStockByQuery.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchStockByQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;  // Cập nhật dữ liệu tìm kiếm
      })
      .addCase(fetchSearchStockByQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

// Selectors
export const selectSearchVn30StockData = (state: RootState) => state.searchVn30Stock.vn30; 
export const selectSearchStockData = (state: RootState) => state.searchVn30Stock.data;      
export const selectSearchStockLoading = (state: RootState) => state.searchVn30Stock.loading;
export const selectSearchStockError = (state: RootState) => state.searchVn30Stock.error;

export default searchVn30StockSlice.reducer;
