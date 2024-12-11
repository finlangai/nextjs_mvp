import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface liquidityRatioChartState {
  title: string;
  color: string[]; 
  type: string[];  
}

const initialState: liquidityRatioChartState = {
  title: "Hệ số thanh toán hiện hành",
  color: ["#25B770", "white", "#FF6347"], 
  type: ["spline", "spline", "line"],     
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
