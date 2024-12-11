import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Định nghĩa state cho ValuetionSelectTimePage
interface ValuetionSelectTimeState {
  quarter: number | null; // Quý, có thể là null nếu không chọn
  year: number | null;    // Năm, có thể là null nếu không chọn
}

// State ban đầu
const initialState: ValuetionSelectTimeState = {
  quarter: null,
  year: null,
};

// Tạo slice cho ValuetionSelectTimePage
const valuetionSelectTimeSlice = createSlice({
  name: 'valuetionSelectTime',
  initialState,
  reducers: {
    setQuarterSlice: (state, action: PayloadAction<{ quarter: number | null }>) => {
      state.quarter = action.payload.quarter;
    },
    setYearSlice: (state, action: PayloadAction<{ year: number | null }>) => {
      state.year = action.payload.year;
    },
    resetTime: (state) => {
      state.quarter = null;
      state.year = null;
    },
  },
});

// Export actions để sử dụng trong component
export const { setQuarterSlice, setYearSlice, resetTime } = valuetionSelectTimeSlice.actions;

// Selectors để lấy state từ store
export const selectQuarter = (state: RootState) => state.valuetionPage.valuetionSelectTime.quarter;
export const selectYear = (state: RootState) => state.valuetionPage.valuetionSelectTime.year;

// Export reducer
export default valuetionSelectTimeSlice.reducer;
