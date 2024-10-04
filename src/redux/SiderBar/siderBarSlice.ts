import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SiderBarState {
  selectedButton: number | null; 
}

const initialState: SiderBarState = {
  selectedButton: null, 
};

const siderBarSlice = createSlice({
  name: 'siderBar',
  initialState,
  reducers: {
    setSelectedButtonActive: (state, action: PayloadAction<{ button: number | null}>) => {
      state.selectedButton = action.payload.button;
    },
  },
});

export const { setSelectedButtonActive } = siderBarSlice.actions;

export const selectSelectedButton = (state: RootState) => state.siderBar.selectedButton;

export default siderBarSlice.reducer;
