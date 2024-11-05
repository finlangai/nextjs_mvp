// // chartSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Chart, Series } from 'highcharts';
// import { RootState } from './store'; // Đảm bảo đúng đường dẫn tới store của bạn
// import { AppDispatch } from './store';

// interface ChartConfig {
//     options?: any;
// }

// interface ChartState {
//   chartInstance: ChartConfig | null;
//   isSaving: boolean;
//   lastSaved: number | null;
// }

// const initialState: ChartState = {
//   chartInstance: null,
//   isSaving: false,
//   lastSaved: null,
// };

// const chartSlice = createSlice({
//   name: 'chart',
//   initialState,
//   reducers: {
//     setChartInstance: (state, action: PayloadAction<ChartConfig | null>) => {
//       state.chartInstance = action.payload;
//     },
//     setSaving: (state, action: PayloadAction<boolean>) => {
//       state.isSaving = action.payload;
//     },
//     setLastSaved: (state, action: PayloadAction<number>) => {
//       state.lastSaved = action.payload;
//     }
//   }
// });

// export const { setChartInstance, setSaving, setLastSaved } = chartSlice.actions;

// // Thunk action để lưu chart
// export const saveChart = () => async (dispatch: AppDispatch, getState: () => RootState) => {
//   const chartInstance = getState().chart.chartInstance;
  
//   if (chartInstance) {
//     dispatch(setSaving(true));
    
//     try {
//       const chartConfig = chartInstance.options;
//       const annotations = chartConfig.annotations || [];

//       const indicators = (chartInstance.series as Series[])
//         .filter((series) => {
//           const seriesOptions = series.options as any;
//           return (
//             seriesOptions.type && 
//             seriesOptions.type !== 'candlestick' && 
//             seriesOptions.type !== 'column'
//           );
//         })
//         .map((series) => ({
//           type: series.options.type || '',
//           options: series.options,
//         }));

//       const savedConfig = {
//         chartConfig,
//         annotations,
//         indicators,
//         timestamp: new Date().getTime()
//       };

//       sessionStorage.setItem('chartConfig', JSON.stringify(savedConfig));
//       dispatch(setLastSaved(savedConfig.timestamp));
//     } catch (error) {
//       console.error('Error saving chart:', error);
//     } finally {
//       dispatch(setSaving(false));
//     }
//   }
// };

// // Selectors
// export const selectChartInstance = (state: RootState) => state.chart.chartInstance;
// export const selectIsSaving = (state: RootState) => state.chart.isSaving;
// export const selectLastSaved = (state: RootState) => state.chart.lastSaved;

// export default chartSlice.reducer;
