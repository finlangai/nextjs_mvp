import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MarginalProfitChartState {
  title: string;
  color: string[]; // Đổi từ object sang mảng
  type: string[];  // Đổi từ object sang mảng
}

const initialState: MarginalProfitChartState = {
  title: "Biên lợi nhuận",
  color: ["white", "#25B770"], // Mảng màu sắc
  type: ["column", "column"],  // Mảng loại biểu đồ
};

const marginalProfitChartSlice = createSlice({
  name: 'marginalProfitChart',
  initialState,
  reducers: {
    updateMarginalProfitChartColor: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
    },
    updateMarginalProfitChartTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateMarginalProfitChartType: (state, action: PayloadAction<string[]>) => {
      state.type = action.payload;
    }
  }
});

export const { updateMarginalProfitChartColor, updateMarginalProfitChartTitle, updateMarginalProfitChartType } = marginalProfitChartSlice.actions;
export default marginalProfitChartSlice.reducer;
