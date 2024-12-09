import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EPSChartState {
  title: string;
  color: string[]; 
  type: string[]; 
}

const initialState: EPSChartState = {
  title: "Lợi nhuận trên mỗi cổ phần",
  color: ["#25B770"], 
  type: ["waterfall"], 
};


const epsChartSlice = createSlice({
  name: 'epsChart',
  initialState,
  reducers: {
    updateEPSChartColor: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
    },
    updateEPSChartTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateEPSChartType: (state, action: PayloadAction<string[]>) => {
      state.type = action.payload;
    }
  }
});

export const { updateEPSChartColor, updateEPSChartTitle, updateEPSChartType } = epsChartSlice.actions;
export default epsChartSlice.reducer;
