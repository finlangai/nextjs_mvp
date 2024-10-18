import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ForecastingOverallAssessment } from '@/src/interfaces/ForecastingOverallAssessment';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ForecastingOverallAssessmentState {
  data: ForecastingOverallAssessment | null;
  loading: boolean;
  error: string | null;
}

const initialState: ForecastingOverallAssessmentState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchForecastingOverallAssessment = createAsyncThunk(
  'forecastingOverallAssessment/fetch',
  async ({symbol}: { symbol: string}) => {
    const api = `${apiUrl}/symbols/${symbol}/assessment/overview`;
    const response = await fetch(api);
    // console.log('cos ig sai',api)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const forecastingOverallAssessmentSlice = createSlice({
  name: 'forecastingOverallAssessment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecastingOverallAssessment.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchForecastingOverallAssessment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchForecastingOverallAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectForecastingOverallAssessmentData = (state: RootState) => state.forecastingOverallAssessment.data;
export const selectForecastingOverallAssessmentLoading = (state: RootState) => state.forecastingOverallAssessment.loading;
export const selectForecastingOverallAssessmentError = (state: RootState) => state.forecastingOverallAssessment.error;
export const selectForecastingCriterias = (state: RootState) => state.forecastingOverallAssessment.data?.criterias || null;
// src/store/slices/forecastingOverallAssessmentSlice.ts

export const selectForecastingCriteriaGroupByIndex = (state: RootState, index: number) => {
  const criterias = state.forecastingOverallAssessment.data?.criterias;
  const criteriaKeys = criterias ? Object.keys(criterias) : [];
  
  // Kiểm tra index hợp lệ, nếu không hợp lệ thì trả về null
  if (index >= 0 && index < criteriaKeys.length) {
    const key = criteriaKeys[index];
    const selectedCriteria = criterias ? criterias[key] : null;
    
    // Truy cập vào group của criteria nếu tồn tại
    return selectedCriteria ? selectedCriteria.group : null;
  }

  return null; // Trường hợp index không hợp lệ hoặc không có group
};



export default forecastingOverallAssessmentSlice.reducer;