


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Khởi tạo trạng thái ban đầu
interface AuthState {
    user: null | { email: string,
        avatar?: string,
        fullname?: string,
        phone?: string
     };
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

// Thunk để xử lý logic đăng nhập
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, {
                email,
                password,
            });
            const { token, expiresIn } = response.data;

            // Lưu token vào cookie
            Cookies.set("token", token, { expires: expiresIn / (24 * 60 * 60) });
            return { email, token };
        } catch (error) {
            return rejectWithValue("Email hoặc mật khẩu không đúng");
        }
    }
);

// Thunk để lấy thông tin người dùng từ API /auth/profile
export const fetchUserProfile = createAsyncThunk(
    "auth/fetchUserProfile",
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                throw new Error("No token found");
            }
            const response = await axios.get(`${apiUrl}/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data; // Trả về thông tin người dùng từ API
        } catch (error) {
            return rejectWithValue("Lỗi khi lấy thông tin người dùng");
        }
    }
);

// Thunk để làm mới token
export const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                throw new Error("No token found");
            }
            // Gọi API làm mới token
            const response = await axios.post(`${apiUrl}/auth/refresh`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { token: newToken, expiresIn } = response.data;

            // Lưu token mới vào cookie
            Cookies.set("token", newToken, { expires: expiresIn / (24 * 60 * 60) });
            return { token: newToken };
        } catch (error) {
            return rejectWithValue(" ");
        }
    }
);



// Slice để quản lý trạng thái đăng nhập và thông tin người dùng
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Action để đăng xuất
        logout: (state) => {
            state.user = null;
            state.token = null;
            Cookies.remove("token"); // Xóa token khỏi cookie
        },
    },
    extraReducers: (builder) => {
        builder
            // Xử lý khi gửi yêu cầu đăng nhập
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Xử lý khi đăng nhập thành công
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { email: action.payload.email };
                state.token = action.payload.token;
            })
            // Xử lý khi đăng nhập thất bại
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Xử lý khi gửi yêu cầu lấy thông tin người dùng
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Xử lý khi lấy thông tin người dùng thành công
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Lưu thông tin người dùng
            })
            // Xử lý khi lấy thông tin người dùng thất bại
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Xử lý khi làm mới token
            .addCase(refreshToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token; // Lưu token mới
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
