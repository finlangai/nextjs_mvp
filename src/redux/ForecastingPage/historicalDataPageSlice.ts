import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Định nghĩa state cho ReportPage
interface ForecastingPageState {
  selectedButton: number; 
  selectedText: string; 
}

// State ban đầu
const initialState: ForecastingPageState = {
  selectedButton: 0, 
  selectedText: 'Đánh giá chung',
};

// Tạo slice cho ReportPage
const forecastingPageSlice = createSlice({
  name: 'forecastingPage',
  initialState,
  reducers: {
    setSelectedButtonAndText: (state, action: PayloadAction<{ button: number, text: string }>) => {
      state.selectedButton = action.payload.button;
      state.selectedText = action.payload.text;
    },
  },
});

// Export action để sử dụng trong component
export const { setSelectedButtonAndText } = forecastingPageSlice.actions;

// Selectors để lấy state từ store
export const selectSelectedButton = (state: RootState) => state.forecastingPage.selectedButton;
export const selectSelectedText = (state: RootState) => state.forecastingPage.selectedText;

export default forecastingPageSlice.reducer;
