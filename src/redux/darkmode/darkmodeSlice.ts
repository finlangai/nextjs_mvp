import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DarkModeState {
    isDarkMode: boolean; // Trạng thái dark mode
}

const initialState: DarkModeState = {
    isDarkMode:  false, // Giá trị mặc định là dark mode
};

const darkmodeSlice = createSlice({
    name: 'darkmode',
    initialState,
    reducers: {
        toggleDarkMode(state) {
            state.isDarkMode = !state.isDarkMode;
        },
        setDarkMode(state, action: PayloadAction<boolean>) {
            state.isDarkMode = action.payload;
        },
    },
});

export const { toggleDarkMode, setDarkMode } = darkmodeSlice.actions;

// Selector để lấy trạng thái dark mode
export const selectDarkMode = (state: { darkmode: DarkModeState }) => state.darkmode.isDarkMode;

export default darkmodeSlice.reducer;
