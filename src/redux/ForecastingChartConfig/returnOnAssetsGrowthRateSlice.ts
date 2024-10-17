import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ReturnOnAssetsGrowthRateChartState {
  title: string;
  color: string[]; // Mảng màu sắc
  type: string[];  // Mảng loại biểu đồ
}

const initialState: ReturnOnAssetsGrowthRateChartState = {
  title: "Tỷ lệ tăng trưởng lợi nhuận trên tài sản",
  color: ["#25B770", "white", "#FF6347"], // Mảng màu sắc
  type: ["area", "area", "area"],     // Mảng loại biểu đồ
};

const returnOnAssetsGrowthRateChartSlice = createSlice({
  name: 'returnOnAssetsGrowthRateChart',
  initialState,
  reducers: {
    updateReturnOnAssetsGrowthRateChartColor: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
    },
    updateReturnOnAssetsGrowthRateChartTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateReturnOnAssetsGrowthRateChartType: (state, action: PayloadAction<string[]>) => {
      state.type = action.payload;
    }
  }
});

export const { updateReturnOnAssetsGrowthRateChartColor, updateReturnOnAssetsGrowthRateChartTitle, updateReturnOnAssetsGrowthRateChartType } = returnOnAssetsGrowthRateChartSlice.actions;
export default returnOnAssetsGrowthRateChartSlice.reducer;
