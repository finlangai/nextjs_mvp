import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EBITDAGrowthRateChartState {
  title: string;
  color: string[]; // Mảng màu sắc
  type: string[];  // Mảng loại biểu đồ
}

const initialState: EBITDAGrowthRateChartState = {
  title: "Tỷ lệ tăng trưởng EBITDA",
  color: ["#25B770", "white", "#FF6347"], 
  type: ["spline", "line", "spline"],   
};

const ebitdaGrowthRateChartSlice = createSlice({
  name: 'ebitdaGrowthRateChart',
  initialState,
  reducers: {
    updateEBITDAGrowthRateChartColor: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
    },
    updateEBITDAGrowthRateChartTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateEBITDAGrowthRateChartType: (state, action: PayloadAction<string[]>) => {
      state.type = action.payload;
    }
  }
});

export const { updateEBITDAGrowthRateChartColor, updateEBITDAGrowthRateChartTitle, updateEBITDAGrowthRateChartType } = ebitdaGrowthRateChartSlice.actions;
export default ebitdaGrowthRateChartSlice.reducer;
