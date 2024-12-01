import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { RootState } from '../store';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Khởi tạo trạng thái ban đầu
interface AuthState {
    user: null | {
        email: string,
        avatar?: string,
        fullname?: string,
        phone?: string,
        scope?: string[],
        role?: string;
    };
    token: string | null;
    emailVerified: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    emailVerified: false,
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

// Thunk để xác thực email qua API Mailgun
export const verifyEmail = createAsyncThunk(
    "auth/verifyEmail",
    async (email: string, { rejectWithValue }) => {

        try {
            const apiKey = process.env.NEXT_PUBLIC_MAILGUN_API_KEY;

            if (!apiKey) {
                throw new Error("Mailgun API key is not defined");
            }
            const response = await axios.get(`https://api.mailgun.net/v4/address/validate`, {
                params: { address: email },
                auth: {
                    username: 'api',
                    password: apiKey,
                },
            });
            const { is_valid, is_disposable_address, is_role_address } = response.data;

            if (is_valid && !is_disposable_address && !is_role_address) {
                return true;
            } else {
                throw new Error("Email không hợp");
            }
        } catch (error) {
            return rejectWithValue("Lỗi khi xác thực email");
        }
    }
);

// export const verifyEmail = createAsyncThunk(
//     "auth/verifyEmail",
//     async (email: string, { rejectWithValue }) => {
//         try {
//             // API key từ Testmail.app
//             const apiKey = "58d984b9-09d4-4cfa-a558-9743f082645d"; // Thay bằng API key thực tế của bạn
//             const namespace = "tgzh2"; // Thay bằng namespace thực tế của bạn

//             console.log("Bắt đầu kiểm tra email...");

//             // Sử dụng Testmail.app API để kiểm tra hộp thư
//             const response = await axios.get("https://api.testmail.app/api/json", {

//                 params: {
//                     apikey: apiKey,
//                     namespace: namespace,
//                     pretty: true, // Thêm để dễ đọc kết quả
//                 },
//             });

//             console.log("Kết quả kiểm tra hộp thư:", response.data);

//             if (response.data && response.data.emails.length > 0) {
//                 // Nếu email được tìm thấy, coi như email đã xác thực thành công
//                 return true;
//             } else {
//                 // Nếu không tìm thấy email
//                 throw new Error("Email không hợp lệ hoặc không thể gửi email xác thực.");
//             }
//         } catch (error) {
//             console.error("Lỗi khi xác thực email:", error);
//             return rejectWithValue("Lỗi khi xác thực email");
//         }
//     }
// );

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
            return response.data;
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
            const response = await axios.post(`${apiUrl}/auth/refresh`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { token: newToken, expiresIn } = response.data;

            Cookies.set("token", newToken, { expires: expiresIn / (24 * 60 * 60) });
            return { token: newToken };
        } catch (error) {
            return rejectWithValue("");
        }
    }
);

// Thunk to update user information
export const updateUserInformation = createAsyncThunk(
    "auth/updateUser",
    async (
      { fullname, email, phone, address, password }: any,
      { rejectWithValue }
    ) => {
      try {
        const token = Cookies.get("token");
  
        const response = await axios.put(
            `${apiUrl}/general/user/update`,
          {
            fullname,
            email,
            phone,
            address,
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        return response.data;
      } catch (error) {
        return rejectWithValue("Failed to update user information");
      }
    }
  );
  
// Thunk to update user avatar
export const updateUserAvatar = createAsyncThunk(
    "auth/updateAvatar",
    async (file: File, { rejectWithValue }) => {
        try {
        const token = Cookies.get("token");

        const formData = new FormData();
        formData.append("avatar", file);

        const response = await axios.post(
            `${apiUrl}/general/user/change-avatar`,
            formData,
            {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
            }
        );
        return response.data;
        } catch (error) {
        return rejectWithValue("Failed to update avatar");
        }
    }
);

// Slice để quản lý trạng thái đăng nhập và thông tin người dùng
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.emailVerified = false;
            Cookies.remove("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { email: action.payload.email };
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(refreshToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state) => {
                state.loading = false;
                state.emailVerified = true;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateUserInformation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserInformation.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { ...state.user, ...action.payload };
            })
            .addCase(updateUserInformation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateUserAvatar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserAvatar.fulfilled, (state, action) => {
                state.loading = false;
                if (state.user) state.user.avatar = action.payload.avatar;
            })
            .addCase(updateUserAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Selector để lấy token từ Redux state
export const selectTokenFromRedux = (state: RootState): string | null => state.auth.token;

// Selector để lấy token từ Cookies
export const selectTokenFromCookies = (): string | null => Cookies.get("token") || null;

// Selector ưu tiên token từ Redux, nếu không có thì lấy từ Cookies
export const selectToken = (state: RootState): string | null => {
    return selectTokenFromRedux(state) || selectTokenFromCookies();
};

// Selector để lấy thông tin user từ Redux state
export const selectUser = (state: RootState) => state.auth.user;
export const selecScope = (state: RootState) => state.auth.user?.scope;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
