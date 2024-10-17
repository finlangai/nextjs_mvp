import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FreeCashFlowGrowthRateChartState {
  title: string;
  color: string[]; // Mảng màu sắc
  type: string[];  // Mảng loại biểu đồ
}

const initialState: FreeCashFlowGrowthRateChartState = {
  title: "Tăng trưởng dòng tiền tự do",
  color: ["#25B770", "white", "#FF6347"], // Mảng màu sắc
  type: ["column", "line", "spline"],     // Mảng loại biểu đồ
};

const freeCashFlowGrowthRateChartSlice = createSlice({
    name: 'freeCashFlowGrowthRateChart',
    initialState,
    reducers: {
      updateFreeCashFlowGrowthRateChartColor: (state, action: PayloadAction<string[]>) => {
        state.color = action.payload;
      },
      updateFreeCashFlowGrowthRateChartTitle: (state, action: PayloadAction<string>) => {
        state.title = action.payload;
      },
      updateFreeCashFlowGrowthRateChartType: (state, action: PayloadAction<string[]>) => {
        state.type = action.payload;
      }
    }
});
  
export const { updateFreeCashFlowGrowthRateChartColor, updateFreeCashFlowGrowthRateChartTitle, updateFreeCashFlowGrowthRateChartType } = freeCashFlowGrowthRateChartSlice.actions;
export default freeCashFlowGrowthRateChartSlice.reducer;
  