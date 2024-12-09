import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AssetGrowthRateChartState {
  title: string;
  color: string[]; // Mảng màu sắc
  type: string[];  // Mảng loại biểu đồ
}

const initialState: AssetGrowthRateChartState = {
  title: "Tỷ lệ tăng trưởng tài sản",
  color: ["#25B770", "white", "#FF6347"],
  type: ["area", "area", "area"],   
};

const assetGrowthRateChartSlice = createSlice({
  name: 'assetGrowthRateChart',
  initialState,
  reducers: {
    updateAssetGrowthRateChartColor: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
    },
    updateAssetGrowthRateChartTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateAssetGrowthRateChartType: (state, action: PayloadAction<string[]>) => {
      state.type = action.payload;
    }
  }
});

export const { updateAssetGrowthRateChartColor, updateAssetGrowthRateChartTitle, updateAssetGrowthRateChartType } = assetGrowthRateChartSlice.actions;
export default assetGrowthRateChartSlice.reducer;
