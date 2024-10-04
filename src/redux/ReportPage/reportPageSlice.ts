import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Định nghĩa state cho ReportPage
interface ReportPageState {
  selectedButton: number; 
  selectedText: string; 
}

// State ban đầu
const initialState: ReportPageState = {
  selectedButton: 1, 
  selectedText: 'Cân đối kế toán',
};

// Tạo slice cho ReportPage
const reportPageSlice = createSlice({
  name: 'reportPage',
  initialState,
  reducers: {
    setSelectedButtonAndText: (state, action: PayloadAction<{ button: number, text: string }>) => {
      state.selectedButton = action.payload.button;
      state.selectedText = action.payload.text;
    },
  },
});

// Export action để sử dụng trong component
export const { setSelectedButtonAndText } = reportPageSlice.actions;

// Selectors để lấy state từ store
export const selectSelectedButton = (state: RootState) => state.reportPage.selectedButton;
export const selectSelectedText = (state: RootState) => state.reportPage.selectedText;

export default reportPageSlice.reducer;
