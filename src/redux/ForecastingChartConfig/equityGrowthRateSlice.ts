import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EquityGrowthRateChartState {
  title: string;
  color: string[]; 
  type: string[];
}

const initialState: EquityGrowthRateChartState = {
  title: "Tỷ lệ tăng trưởng vốn chủ sở hữu",
  color: ["#25B770", "white", "#FF6347"],
  type: ["area", "area", "area"],   
};

const equityGrowthRateChartSlice = createSlice({
  name: 'equityGrowthRateChart',
  initialState,
  reducers: {
    updateEquityGrowthRateChartColor: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
    },
    updateEquityGrowthRateChartTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateEquityGrowthRateChartType: (state, action: PayloadAction<string[]>) => {
      state.type = action.payload;
    }
  }
});

export const { updateEquityGrowthRateChartColor, updateEquityGrowthRateChartTitle, updateEquityGrowthRateChartType } = equityGrowthRateChartSlice.actions;
export default equityGrowthRateChartSlice.reducer;
