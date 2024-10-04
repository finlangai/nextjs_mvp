import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface BtnNextPrevReportPage {
  quarter: number | null;
  year: number | null;
  btnPrev: boolean;
  btnNext: boolean;
}

interface BtnNextPrevReportPageSliceState {
  defaultState: BtnNextPrevReportPage;
  byDataState: BtnNextPrevReportPage;
  limiSubcribleSate: {
    quarter: number | null;
    year: number | null;
  };
}

const initialState: BtnNextPrevReportPageSliceState = {
  defaultState: {
    quarter: 3,
    year: 2024,
    btnPrev: true,
    btnNext: true,
  },
  byDataState: {
    quarter: null,
    year: null,
    btnPrev: true,
    btnNext: true,
  },
  limiSubcribleSate: {
    quarter: null,
    year: null,
  },
};

const btnNextPrevReportPageSlice = createSlice({
  name: 'btnNextPrevReportPageSlice',
  initialState,
  reducers: {
    setSelectedLimitDefault: (state, action: PayloadAction<BtnNextPrevReportPage>) => {
      state.defaultState.year = action.payload.year;
      state.defaultState.quarter = action.payload.quarter;
      state.defaultState.btnPrev = action.payload.btnPrev;
      state.defaultState.btnNext = action.payload.btnNext;
    },
    setSelectedLimitByData: (state, action: PayloadAction<BtnNextPrevReportPage>) => {
      state.byDataState.year = action.payload.year;
      state.byDataState.quarter = action.payload.quarter;
      state.byDataState.btnPrev = action.payload.btnPrev;
      state.byDataState.btnNext = action.payload.btnNext;
    },
    setLimitByDataBtnNext: (state, action: PayloadAction<boolean>) => {
      state.byDataState.btnNext = action.payload;
    },
    setLimitByDataBtnPrev: (state, action: PayloadAction<boolean>) => {
      state.byDataState.btnPrev = action.payload;
    },
    setLimitByDataQuarter: (state, action: PayloadAction<number | null>) => {
      state.byDataState.quarter = action.payload;
    },
    setLimitByDataYear: (state, action: PayloadAction<number | null>) => {
      state.byDataState.year = action.payload;
    },

    // Cập nhật từng thuộc tính của limiSubcribleSate
    setLimitSubscribe: (state, action: PayloadAction<{ quarter: number; year: number }>) => {
      state.limiSubcribleSate.quarter = action.payload.quarter;
      state.limiSubcribleSate.year = action.payload.year;
    },
    // Cập nhật từng thuộc tính của limiSubcribleSate
    setLimitSubscribeQuarter: (state, action: PayloadAction<number>) => {
      state.limiSubcribleSate.quarter = action.payload;
    },
    setLimitSubscribeYear: (state, action: PayloadAction<number>) => {
      state.limiSubcribleSate.year = action.payload;
    },
  },
});

// Actions
export const {
  setSelectedLimitDefault,
  setSelectedLimitByData,
  
  setLimitByDataQuarter,
  setLimitByDataYear,
  setLimitByDataBtnPrev,
  setLimitByDataBtnNext,

  setLimitSubscribe,
  setLimitSubscribeQuarter,
  setLimitSubscribeYear,
} = btnNextPrevReportPageSlice.actions;

// Selectors for defaultState
export const selectDefaultQuarter = (state: RootState) => state.btnNextPrevReport.defaultState.quarter;
export const selectDefaultYear = (state: RootState) => state.btnNextPrevReport.defaultState.year;
export const selectDefaultBtnPrev = (state: RootState) => state.btnNextPrevReport.defaultState.btnPrev;
export const selectDefaultBtnNext = (state: RootState) => state.btnNextPrevReport.defaultState.btnNext;

// Selectors for byDataState
export const selectByDataQuarter = (state: RootState) => state.btnNextPrevReport.byDataState.quarter;
export const selectByDataYear = (state: RootState) => state.btnNextPrevReport.byDataState.year;
export const selectByDataBtnPrev = (state: RootState) => state.btnNextPrevReport.byDataState.btnPrev;
export const selectByDataBtnNext = (state: RootState) => state.btnNextPrevReport.byDataState.btnNext;

// Selectors for limiSubcribleSate
export const selectLimitSubscribeQuarter = (state: RootState) => state.btnNextPrevReport.limiSubcribleSate.quarter;
export const selectLimitSubscribeYear = (state: RootState) => state.btnNextPrevReport.limiSubcribleSate.year;

// Export the reducer
export default btnNextPrevReportPageSlice.reducer;
