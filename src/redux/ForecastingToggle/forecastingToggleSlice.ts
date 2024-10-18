import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Định nghĩa interface
interface ForecastingToggle {
    group: number;
    metrics: number[];
}

// Khởi tạo state ban đầu
const initialState: ForecastingToggle[] = [];

// Tạo slice
const forecastingToggleSlice = createSlice({
    name: 'forecastingToggle',
    initialState,
    reducers: {
        // Thêm một ForecastingToggle mới
        addForecastingToggle: (state, action: PayloadAction<ForecastingToggle>) => {
            state.push(action.payload);
        },
        // Cập nhật metrics dựa trên group
        updateMetrics: (state, action: PayloadAction<{ group: number; metrics: number[] }>) => {
            const toggle = state.find(f => f.group === action.payload.group);
            if (toggle) {
                toggle.metrics = [...action.payload.metrics]; // Thay thế metrics
            } else {
                // Nếu chưa tồn tại group, thêm mới
                state.push({ group: action.payload.group, metrics: action.payload.metrics });
            }
        },
        // Thêm một number vào metrics của một group
        addMetric: (state, action: PayloadAction<{ group: number; metric: number }>) => {
            const toggle = state.find(f => f.group === action.payload.group);
            if (toggle && !toggle.metrics.includes(action.payload.metric)) {
                toggle.metrics.push(action.payload.metric);
            }
        },
        // Xóa một number khỏi metrics của một group
        removeMetric: (state, action: PayloadAction<{ group: number; metric: number }>) => {
            const toggle = state.find(f => f.group === action.payload.group);
            if (toggle) {
                toggle.metrics = toggle.metrics.filter(m => m !== action.payload.metric);
            }
        },
        // Xóa ForecastingToggle theo group
        removeForecastingToggle: (state, action: PayloadAction<number>) => {
            return state.filter(f => f.group !== action.payload);
        },
        // Reset toàn bộ mảng
        resetForecastingToggles: () => initialState
    }
});

// **Selector**: Truy cập toàn bộ forecastingToggles
export const selectForecastingToggles = (state: RootState) => state.forecastingToggle;

// **Selector**: Truy cập ForecastingToggle dựa trên group
export const selectForecastingToggleByGroup = (desiredGroup: number) => (state: RootState) => 
    state.forecastingToggle.find(f => f?.group === desiredGroup) || null;

// Export actions
export const { 
    addForecastingToggle, 
    updateMetrics, 
    addMetric, 
    removeMetric, 
    removeForecastingToggle, 
    resetForecastingToggles 
} = forecastingToggleSlice.actions;

// Export reducer
export default forecastingToggleSlice.reducer;
