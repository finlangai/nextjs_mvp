import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { FAQ } from '@/src/interfaces/Faq'; 

interface FAQState {
  data: FAQ[]; 
  loading: boolean;
  error: string | null;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const initialState: FAQState = {
  data: [],
  loading: false,
  error: null,
};

// Thunk để fetch dữ liệu FAQ
export const fetchFAQs = createAsyncThunk(
  'faq/fetch',
  async () => {
    const api = `${apiUrl}/general/faq`;
    const response = await fetch(api);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  }
);

const faqSlice = createSlice({
  name: 'faqSlice',
  initialState,
  reducers: {
    resetFAQ: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFAQs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.loading = false;

        if (Array.isArray(action.payload)) {
          // Nếu payload là một mảng, thay thế hoàn toàn state.data
          state.data = action.payload;
        } else {
          console.error('Dữ liệu trả về không hợp lệ');
        }
      })
      .addCase(fetchFAQs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

// Selector để lấy dữ liệu
export const selectFAQData = (state: RootState) => state.faq.data;
export const selectFAQLoading = (state: RootState) => state.faq.loading;
export const selectFAQError = (state: RootState) => state.faq.error;

// Xuất actions
export const { resetFAQ } = faqSlice.actions;

// Xuất reducer
export default faqSlice.reducer;
