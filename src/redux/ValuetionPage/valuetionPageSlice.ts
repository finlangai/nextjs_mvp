import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Định nghĩa state cho ValuationPage
interface ValuetionPageState {
  selectedButton: number;
}

// State ban đầu
const initialState: ValuetionPageState = {
  selectedButton: 0,
};

// Tạo slice cho ValuationPage
const valuetionPageSlice = createSlice({
  name: 'valuetionPage',
  initialState,
  reducers: {
    setSelectedButton: (state, action: PayloadAction<{ button: number }>) => {
      state.selectedButton = action.payload.button;
    },
  },
});

// Export action để sử dụng trong component
export const { setSelectedButton } = valuetionPageSlice.actions;

// Selectors để lấy state từ store
export const selectSelectedButton = (state: RootState) => state.valuetionPage.valuetionPage.selectedButton;

export default valuetionPageSlice.reducer;
