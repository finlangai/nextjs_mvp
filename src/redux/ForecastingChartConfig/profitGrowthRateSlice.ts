import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProfitGrowthRateChartState {
  title: string;
  color: string[]; 
  type: string[]; 
}

const initialState: ProfitGrowthRateChartState = {
  title: "Tỷ lệ tăng trưởng lợi nhuận",
  color: ["#25B770", "white", "#FF6347"], 
  type: ["column", "column", "spline"], 
};

const profitGrowthRateChartSlice = createSlice({
  name: 'profitGrowthRateChart',
  initialState,
  reducers: {
    updateProfitGrowthRateChartColor: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
    },
    updateProfitGrowthRateChartTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateProfitGrowthRateChartType: (state, action: PayloadAction<string[]>) => {
      state.type = action.payload;
    }
  }
});

export const { updateProfitGrowthRateChartColor, updateProfitGrowthRateChartTitle, updateProfitGrowthRateChartType } = profitGrowthRateChartSlice.actions;
export default profitGrowthRateChartSlice.reducer;
