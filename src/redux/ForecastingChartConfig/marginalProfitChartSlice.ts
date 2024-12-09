import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MarginalProfitChartState {
  title: string;
  color: string[];
  type: string[];
}

const initialState: MarginalProfitChartState = {
  title: "Biên lợi nhuận",
  color: ["white", "#25B770"], 
  type: ["column", "column"],  
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
