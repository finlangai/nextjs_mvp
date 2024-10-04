import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface StockPageState {
  selectedButton: number | null; 
}

const initialState: StockPageState = {
  selectedButton: null, 
};

const stockPageSlice = createSlice({
  name: 'stockPage',
  initialState,
  reducers: {
    setSelectedButtonActive: (state, action: PayloadAction<{ button: number | null}>) => {
      state.selectedButton = action.payload.button;
    },
  },
});

export const { setSelectedButtonActive } = stockPageSlice.actions;

export const selectSelectedButton = (state: RootState) => state.stockPage.selectedButton;

export default stockPageSlice.reducer;
