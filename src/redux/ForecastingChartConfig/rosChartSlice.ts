import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ROSChartState {
  title: string;
  color: string[];
  type: string[]; 
}

const initialState: ROSChartState = {
  title: "Tỷ suất lợi nhuận trên doanh thu",
  color: ["#25B770"],
  type: ["column"], 
};

const rosChartSlice = createSlice({
  name: 'rosChart',
  initialState,
  reducers: {
    updateROSChartColor: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
    },
    updateROSChartTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateROSChartType: (state, action: PayloadAction<string[]>) => {
      state.type = action.payload;
    }
  }
});

export const { updateROSChartColor, updateROSChartTitle, updateROSChartType } = rosChartSlice.actions;
export default rosChartSlice.reducer;
