import { combineReducers } from '@reduxjs/toolkit';
import valuetionParamsReducer from './valuationParamsSlice';

const valuetionParamsReducers = combineReducers({
    valuetionParams: valuetionParamsReducer,
});

export type RootState = ReturnType<typeof valuetionParamsReducer>;
export default valuetionParamsReducers;
