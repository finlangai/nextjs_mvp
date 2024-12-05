import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Layout {
  name: string;
  layout: any;
  createdAt: string;
}

interface LayoutState {
  selectedLayout: Layout | null;
}

const initialState: LayoutState = {
  selectedLayout: null,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setSelectedLayout(state, action: PayloadAction<Layout>) {
      state.selectedLayout = action.payload;
    },
    clearSelectedLayout(state) {
      state.selectedLayout = null;
    },
  },
});

export const { setSelectedLayout, clearSelectedLayout } = layoutSlice.actions;

export const selectSelectedLayout = (state: RootState) => state.techChartlayout.selectedLayout;

export default layoutSlice.reducer;
