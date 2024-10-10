import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Định nghĩa state cho ReportPage
interface HistoricalPageState {
  selectedButton: number; 
  selectedText: string; 
}

// State ban đầu
const initialState: HistoricalPageState = {
  selectedButton: 0, 
  selectedText: 'Lịch sử giá',
};

// Tạo slice cho ReportPage
const historicalDataPageSlice = createSlice({
  name: 'historicalDataPage',
  initialState,
  reducers: {
    setSelectedButtonAndText: (state, action: PayloadAction<{ button: number, text: string }>) => {
      state.selectedButton = action.payload.button;
      state.selectedText = action.payload.text;
    },
  },
});

// Export action để sử dụng trong component
export const { setSelectedButtonAndText } = historicalDataPageSlice.actions;

// Selectors để lấy state từ store
export const selectSelectedButton = (state: RootState) => state.historicalDataPage.selectedButton;
export const selectSelectedText = (state: RootState) => state.historicalDataPage.selectedText;

export default historicalDataPageSlice.reducer;
