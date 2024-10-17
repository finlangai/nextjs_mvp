import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RevenueGrowthRateChartState {
  title: string;
  color: string[]; // Mảng màu sắc
  type: string[];  // Mảng loại biểu đồ
}

const initialState: RevenueGrowthRateChartState = {
  title: "Tỷ lệ tăng trưởng doanh thu",
  color: ["#25B770", "white", "#FF6347"], // Mảng màu sắc
  type: ["spline", "line", "spline"],     // Mảng loại biểu đồ
};

const revenueGrowthRateChartSlice = createSlice({
  name: 'revenueGrowthRateChart',
  initialState,
  reducers: {
    updateRevenueGrowthRateChartColor: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
    },
    updateRevenueGrowthRateChartTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateRevenueGrowthRateChartType: (state, action: PayloadAction<string[]>) => {
      state.type = action.payload;
    }
  }
});

export const { updateRevenueGrowthRateChartColor, updateRevenueGrowthRateChartTitle, updateRevenueGrowthRateChartType } = revenueGrowthRateChartSlice.actions;
export default revenueGrowthRateChartSlice.reducer;
