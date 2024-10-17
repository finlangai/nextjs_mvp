import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProfitGrowthRateChartState {
  title: string;
  color: string[]; // Mảng màu sắc
  type: string[];  // Mảng loại biểu đồ
}

const initialState: ProfitGrowthRateChartState = {
  title: "Tỷ lệ tăng trưởng lợi nhuận",
  color: ["#25B770", "white", "#FF6347"], // Mảng màu sắc
  type: ["column", "column", "spline"],     // Mảng loại biểu đồ
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
