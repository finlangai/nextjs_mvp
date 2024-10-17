import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DebtToAssetsRatioChartState {
  title: string;
  color: string[]; // Mảng màu sắc
  type: string[];  // Mảng loại biểu đồ
}

const initialState: DebtToAssetsRatioChartState = {
  title: "Tỷ số nợ trên tài sản",
  color: ["#25B770", "white", "#FF6347"], // Mảng màu sắc
  type: ["column", "line", "spline"],     // Mảng loại biểu đồ
};

const debtToAssetsRatioChartSlice = createSlice({
  name: 'debtToAssetsRatioChart',
  initialState,
  reducers: {
    updateDebtToAssetsRatioChartColor: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
    },
    updateDebtToAssetsRatioChartTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateDebtToAssetsRatioChartType: (state, action: PayloadAction<string[]>) => {
      state.type = action.payload;
    }
  }
});

export const { updateDebtToAssetsRatioChartColor, updateDebtToAssetsRatioChartTitle, updateDebtToAssetsRatioChartType } = debtToAssetsRatioChartSlice.actions;
export default debtToAssetsRatioChartSlice.reducer;
