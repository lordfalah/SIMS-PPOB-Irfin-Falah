import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { clearToken, saveToken } from "@/lib/storage";
import type { AuthState } from "@/types/auth.type";

const token = localStorage.getItem("auth_token");

const initialState: AuthState = {
  token,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    rehydrate(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },

    loginSuccess(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = true;
      saveToken(action.payload);
    },

    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      clearToken();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
