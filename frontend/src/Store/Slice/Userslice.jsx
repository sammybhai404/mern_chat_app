import { createSlice } from "@reduxjs/toolkit";
import {
  GetUserDeatils,
  LogOutUser,
  RegisterUser,
  loginUser,
} from "../Actions/UserActions";
// Login Register And Logout
const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    isAuthenticated: false,
    error: null,
    message: null,
  },

  reducers: {
    clearMessage: (state) => ({
      ...state,
      message: null,
    }),
    clearError: (state) => ({
      ...state,
      error: null,
    }),
  },
  extraReducers: (builder) => {
    // Handle both LoginUser and RegisterUser actions
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });

    builder
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.user = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });

    builder
      .addCase(LogOutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LogOutUser.fulfilled, (state, action) => {
        state.user = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.message = action.payload.message;
      })
      .addCase(LogOutUser.rejected, (state, action) => {
        state.user = {};
        state.loading = false;
        state.isAuthenticated = true;
        state.error = action.error.message;
      });

    // Get UserDetails
    builder
      .addCase(GetUserDeatils.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetUserDeatils.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.message = null;
      })
      .addCase(GetUserDeatils.rejected, (state, action) => {
        state.user = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearMessage, clearError } = UserSlice.actions;
export const { reducer: UserReducer } = UserSlice;
