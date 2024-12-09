import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FreeCashFlowGrowthRateChartState {
  title: string;
  color: string[];
  type: string[];  
}

const initialState: FreeCashFlowGrowthRateChartState = {
  title: "Tăng trưởng dòng tiền tự do",
  color: ["#25B770", "white", "#FF6347"], 
  type: ["column", "line", "spline"],  
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
  