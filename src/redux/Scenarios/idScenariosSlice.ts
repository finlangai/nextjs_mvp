import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { Scenarios } from '@/src/interfaces/Scenarios';

interface IdScenarioState {
  data: Scenarios | null;
  loading: boolean;
  error: string | null;
}

const initialState: IdScenarioState = {
  data: null,
  loading: false,
  error: null,
};

// FETCH
export const fetchIdScenario = createAsyncThunk(
  'idScenario/fetch',
  async (
    { symbol, name, token, id }: { symbol: string; name: string; token: string; id:string; },
    { rejectWithValue }
  ) => {
    const api = `${apiUrl}/valuation/${name}/${symbol}/scenarios/${id}`;
    if (!token) {
      return rejectWithValue('Token không tồn tại');
    }
    
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
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

// DELETE
export const deleteScenario = createAsyncThunk(
  'idScenario/delete',
  async (
    { symbol, name, token, id }: { symbol: string; name: string; token: string; id: string },
    { rejectWithValue }
  ) => {
    const api = `${apiUrl}/valuation/${name}/${symbol}/scenarios/${id}`;
    // console.log('api', api)

    if (!token) {
      return rejectWithValue('Token không tồn tại');
    }

    try {
      const response = await fetch(api, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return { success: true, id }; // Trả về `id` để cập nhật state
    } catch (error: any) {
      return rejectWithValue(error.message || 'Đã xảy ra lỗi không xác định');
    }
  }
);

// PATCH
export const patchScenario = createAsyncThunk(
  'idScenario/patch',
  async (
    { symbol, name, token, id, updatedData }: { symbol: string; name: string; token: string; id: string; updatedData: Partial<Scenarios> },
    { rejectWithValue }
  ) => {
    const api = `${apiUrl}/valuation/${name}/${symbol}/scenarios/${id}`;

    if (!token) {
      return rejectWithValue('Token không tồn tại');
    }

    try {
      const response = await fetch(api, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
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

// SLICE
const idScenarioSlice = createSlice({
  name: 'idScenario',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Fetch IdScenario
    .addCase(fetchIdScenario.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchIdScenario.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchIdScenario.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Đã xảy ra lỗi';
    })
    
    // Delete Scenario
    .addCase(deleteScenario.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteScenario.fulfilled, (state, action) => {
      state.loading = false;
      if (state.data?.id === action.payload.id) {
        state.data = null; 
      }
    })
    .addCase(deleteScenario.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Đã xảy ra lỗi khi xóa';
    })

    // PATCH Scenario
    .addCase(patchScenario.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(patchScenario.fulfilled, (state, action) => {
      state.loading = false;
      if (state.data && state.data.id === action.payload.id) {
        state.data = { ...state.data, ...action.payload }; // Cập nhật state với dữ liệu mới
      }
    })
    .addCase(patchScenario.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Đã xảy ra lỗi khi sửa dữ liệu';
    });
  }
  
});

// SELECTORS
export const selectIdScenario = (state: RootState) => state.idScenario.data;
export const selectIdScenarioLoading = (state: RootState) => state.idScenario.loading;
export const selectIdScenarioError = (state: RootState) => state.idScenario.error;

// LẤY ID
export const selectIdScenarioId = (state: RootState) => state.idScenario.data?.id || null;

export default idScenarioSlice.reducer;
