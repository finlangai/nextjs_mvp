import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { DataNotifications } from '@/src/interfaces/Notifications';

interface NotificationsState {
  data: DataNotifications[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  data: [],
  loading: false,
  error: null,
};

// GET
export const fetchNotifications = createAsyncThunk(
  'notifications/fetch',
  async (
    { token, conditional }: { token: string, conditional: string },
    { rejectWithValue }
  ) => {
    const api = `${apiUrl}/general/notification?${conditional}`;
    // console.log('??', api)
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

// POST
export const postNotification = createAsyncThunk(
  'notifications/post',
  async (
    { token, body }: { token: string; body: { uuids: string[] } },
    { rejectWithValue }
  ) => {
    const api = `${apiUrl}/general/notification/mark-as-read`;
// console.log('??', body)
    if (!token) {
      return rejectWithValue('Token không tồn tại');
    }

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
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
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Đã xảy ra lỗi';
      })
      // POST
      .addCase(postNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postNotification.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = [action.payload, ...state.data];
      })
      .addCase(postNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Đã xảy ra lỗi';
      });
  },
});

// Selectors
export const selectNotificationsData = (state: RootState) => state.notifications.dataNoti.data;
export const selectNotificationsLoading = (state: RootState) => state.notifications.dataNoti.loading;
export const selectNotificationsError = (state: RootState) => state.notifications.dataNoti.error;

// Export reducer
export default notificationsSlice.reducer;
