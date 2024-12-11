import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ROIChartState {
  title: string;
  color: string[];
  type: string[]; 
}

const initialState: ROIChartState = {
  title: "Hiệu quả sinh lời dựa trên vốn",
  color: ["#25B770", "white", "#FF6347"], 
  type: ["column", "line", "spline"], 
};


const roiChartSlice = createSlice({
  name: 'roiChart',
  initialState,
  reducers: {
    updateROIChartColor: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
    },
    updateROIChartTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateROIChartType: (state, action: PayloadAction<string[]>) => {
      state.type = action.payload;
    }
  }
});

export const { updateROIChartColor, updateROIChartTitle, updateROIChartType } = roiChartSlice.actions;
export default roiChartSlice.reducer;