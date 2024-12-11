import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { TokenData } from '@/src/interfaces/Notifications';

interface NotificationsTokenState {
  data: TokenData | null;
  loading: boolean;
  error: string | null;
}

const initialState: NotificationsTokenState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchNotificationsToken = createAsyncThunk(
  'tokenNotifications/fetch',
  async (
    { token }: { token: string },
    { rejectWithValue }
  ) => {
    const api = `${apiUrl}/general/notification/generate-token`;

    if (!token) {
      return rejectWithValue('Token không tồn tại');
    }

    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Đã xảy ra lỗi không xác định');
    }
  }
);

const notificationsSlice = createSlice({
  name: 'Tokennotifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsToken.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNotificationsToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Đã xảy ra lỗi';
      });
  },
});

// Selectors
export const selectTokenNotificationsData = (state: RootState) => state.notifications.tokenData.data;
export const selectTokenNotificationsLoading = (state: RootState) => state.notifications.tokenData.loading;
export const selectNotificationsError = (state: RootState) => state.notifications.tokenData.error;

// Export reducer
export default notificationsSlice.reducer;
