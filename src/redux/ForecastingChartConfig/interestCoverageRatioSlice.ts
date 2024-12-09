import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InterestCoverageRatioChartState {
  title: string;
  color: string[];
  type: string[];  
}

const initialState: InterestCoverageRatioChartState = {
  title: "Tỷ số thanh toán lãi vay",
  color: ["#25B770", "white", "#FF6347"], 
  type: ["column", "line", "spline"],  
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
