// valuationHistorySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Định nghĩa state cho ValuationHistoryPage
interface ValuationHistoryPageState {
  selectedButton: number;
}

// State ban đầu
const initialState: ValuationHistoryPageState = {
  selectedButton: 1,
};

// Tạo slice cho ValuationHistoryPage
const valuationHistoryPageSlice = createSlice({
  name: 'valuationHistoryPage',
  initialState,
  reducers: {
    setHistorySelectedButton: (state, action: PayloadAction<{ button: number }>) => {
      state.selectedButton = action.payload.button;
    },
  },
});

// Export action để sử dụng trong component
export const { setHistorySelectedButton } = valuationHistoryPageSlice.actions;

// Selectors để lấy state từ store
export const selectHistorySelectedButton = (state: RootState) => 
  state.valuetionPage.valuationHistoryPage.selectedButton;

export default valuationHistoryPageSlice.reducer;
