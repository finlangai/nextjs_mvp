import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface liquidityRatioChartState {
  title: string;
  color: string[]; // Đổi từ object sang mảng
  type: string[];  // Đổi từ object sang mảng
}

const initialState: liquidityRatioChartState = {
  title: "Hệ số thanh toán hiện hành",
  color: ["#25B770", "white", "#FF6347"], // Mảng màu sắc
  type: ["spline", "spline", "line"],     // Mảng loại biểu đồ
};

const liquidityRatioChartSlice = createSlice({
  name: 'liquidityRatioChart',
  initialState,
  reducers: {
    updateliquidityRatioChartColor: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
    },
    updateliquidityRatioChartTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateliquidityRatioChartType: (state, action: PayloadAction<string[]>) => {
      state.type = action.payload;
    }
  }
});

export const { updateliquidityRatioChartColor, updateliquidityRatioChartTitle, updateliquidityRatioChartType } = liquidityRatioChartSlice.actions;
export default liquidityRatioChartSlice.reducer;
