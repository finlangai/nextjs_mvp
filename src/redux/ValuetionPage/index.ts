import { combineReducers } from '@reduxjs/toolkit';
import valuetionPageReducer from './valuetionPageSlice';
import valuationHistoryPageReducer from './valuationHistorySlice';

const valuetionReducers = combineReducers({
  valuetionPage: valuetionPageReducer,
  valuationHistoryPage: valuationHistoryPageReducer,
});

export type RootState = ReturnType<typeof valuetionPageReducer>;
export default valuetionReducers;
