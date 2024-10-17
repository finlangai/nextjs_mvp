import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InterestCoverageRatioChartState {
  title: string;
  color: string[]; // Mảng màu sắc
  type: string[];  // Mảng loại biểu đồ
}

const initialState: InterestCoverageRatioChartState = {
  title: "Tỷ số thanh toán lãi vay",
  color: ["#25B770", "white", "#FF6347"], // Mảng màu sắc
  type: ["column", "line", "spline"],     // Mảng loại biểu đồ
};

const interestCoverageRatioChartSlice = createSlice({
  name: 'interestCoverageRatioChart',
  initialState,
  reducers: {
    updateInterestCoverageRatioChartColor: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
    },
    updateInterestCoverageRatioChartTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateInterestCoverageRatioChartType: (state, action: PayloadAction<string[]>) => {
      state.type = action.payload;
    }
  }
});

export const { updateInterestCoverageRatioChartColor, updateInterestCoverageRatioChartTitle, updateInterestCoverageRatioChartType } = interestCoverageRatioChartSlice.actions;
export default interestCoverageRatioChartSlice.reducer;
