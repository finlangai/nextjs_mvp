import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EPSChartState {
  title: string;
  color: string[]; // Đổi từ object sang mảng
  type: string[];  // Đổi từ object sang mảng
}

const initialState: EPSChartState = {
  title: "Lợi nhuận trên mỗi cổ phần",
  color: ["#25B770"], // Mảng màu sắc
  type: ["waterfall"], // Mảng loại biểu đồ
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
