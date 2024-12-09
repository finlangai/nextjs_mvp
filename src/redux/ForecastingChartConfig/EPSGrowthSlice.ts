import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EPSGrowthChartState {
  title: string;
  color: string[];
  type: string[];  
}

const initialState: EPSGrowthChartState = {
  title: "Tăng trưởng lợi nhuận trên mỗi cổ phần",
  color: ["#25B770", "white", "#FF6347"],
  type: ["spline", "line", "spline"],     
};

const epsGrowthChartSlice = createSlice({
  name: 'epsGrowthChart',
  initialState,
  reducers: {
    updateEPSGrowthChartColor: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
    },
    updateEPSGrowthChartTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateEPSGrowthChartType: (state, action: PayloadAction<string[]>) => {
      state.type = action.payload;
    }
  }
});

export const { updateEPSGrowthChartColor, updateEPSGrowthChartTitle, updateEPSGrowthChartType } = epsGrowthChartSlice.actions;
export default epsGrowthChartSlice.reducer;
