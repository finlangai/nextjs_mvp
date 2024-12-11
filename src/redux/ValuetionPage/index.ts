import { combineReducers } from '@reduxjs/toolkit';
import valuetionPageReducer from './valuetionPageSlice';
import valuationHistoryPageReducer from './valuationHistorySlice';
import valuationSelectTimeReducer from "./valuetionSelectTimeSlice";

const valuetionReducers = combineReducers({
  valuetionPage: valuetionPageReducer,
  valuationHistoryPage: valuationHistoryPageReducer,
  valuetionSelectTime: valuationSelectTimeReducer
});

export type RootState = ReturnType<typeof valuetionPageReducer>;
export default valuetionReducers;
