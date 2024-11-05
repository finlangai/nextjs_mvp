import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface WatchlistState {
    watchlist: string[];
}

const initialState: WatchlistState = {
    watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]'),
};

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        toggleWatchlist: (state, action: PayloadAction<string>) => {
            const symbol = action.payload;
            if (state.watchlist.includes(symbol)) {
                state.watchlist = state.watchlist.filter(stock => stock !== symbol);
            } else {
                state.watchlist.push(symbol);
            }
            localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
        },
        setWatchlist: (state, action: PayloadAction<string[]>) => {
            state.watchlist = action.payload;
            localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
        }
    }
});

// Selectors
export const selectWatchlist = (state: RootState) => state.watchlist.watchlist;
export const selectIsInWatchlist = (symbol: string) => (state: RootState) =>
    state.watchlist.watchlist.includes(symbol);

export const { toggleWatchlist, setWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
