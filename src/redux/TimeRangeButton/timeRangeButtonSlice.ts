// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../store';

// interface TimeRangeState {
//     timeRange: {
//       label: string;
//       interval: string;
//       start: number;
//       end: number;
//       limit: number;
//     };
// }

// const initialState: TimeRangeState = {
//     timeRange: {
//       label: '1D',
//       interval: '1m',
//       start: 0,
//       end: 0,
//       limit: 400,
//     },
// };

// const timeRangeSlice = createSlice({
//     name: 'timeRange',
//     initialState,
//     reducers: {
//       setTimeRange: (state, action: PayloadAction<TimeRangeState['timeRange']>) => {
//         state.timeRange = action.payload;
//       },
//     },
// });

// const getTimeRanges = () => {
//     const now = Math.floor(Date.now() / 1000);
//     const oneDay = 24 * 60 * 60;
  
//     const getStartOfPreviousDay = () => {
//       const date = new Date();
//       date.setDate(date.getDate() - 1);
//       date.setHours(0, 0, 0, 0);
//       return Math.floor(date.getTime() / 1000);
//     };
  
//     const getEndOfPreviousDay = () => {
//       const date = new Date();
//       date.setDate(date.getDate() - 1);
//       date.setHours(23, 59, 59, 999);
//       return Math.floor(date.getTime() / 1000);
//     };
  
//     const getStartOfYear = () => {
//       const date = new Date();
//       date.setMonth(0);
//       date.setDate(1);
//       date.setHours(0, 0, 0, 0);
//       return Math.floor(date.getTime() / 1000);
//     };
  
//     return [
//       {
//         label: '1D',
//         interval: '1m',
//         start: getStartOfPreviousDay(),
//         end: getEndOfPreviousDay(),
//         limit: 400,
//       },
//       {
//         label: '1M',
//         interval: '1D',
//         start: now - (30 * oneDay),
//         end: now,
//         limit: 31,
//       },
//       {
//         label: '3M',
//         interval: '1D',
//         start: now - (90 * oneDay),
//         end: now,
//         limit: 90,
//       },
//       {
//         label: '5Y',
//         interval: '1D',
//         start: (() => {
//           const date = new Date();
//           date.setFullYear(date.getFullYear() - 5);
//           date.setHours(0, 0, 0, 0);
//           return Math.floor(date.getTime() / 1000);
//         })(),
//         end: now,
//         limit: 365 * 5,
//       },
//       {
//         label: 'YTD',
//         interval: '1D',
//         start: getStartOfYear(),
//         end: now,
//         limit: 365,
//       },
//     ];
// };
  

// export const { setSelectedButtonActive } = siderBarSlice.actions;

// const getTimeRange = createSelector(
//     (state: RootState) => state.timeRange,
//     (timeRange) => timeRange.timeRange
// );


// export default siderBarSlice.reducer;
