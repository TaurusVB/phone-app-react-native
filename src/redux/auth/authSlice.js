import { createSlice } from "@reduxjs/toolkit";
import {
  registerDB,
  loginDB,
  logOut,
  authStateChanged,
  uploadPhotoToStorage,
} from "./operations";

const initialState = {
  user: { userId: null, nickname: null, email: "", photoURL: null },
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: {
    [registerDB.fulfilled](state, action) {
      state.user.userId = action.payload.uid;
      state.user.nickname = action.payload.displayName;
      state.isLoggedIn = true;
    },
    [loginDB.fulfilled](state, action) {
      state.user.userId = action.payload.uid;
      state.user.nickname = action.payload.displayName;
      state.isLoggedIn = true;
    },
    [logOut.fulfilled](state) {
      state.user = { userId: null, nickname: null };
      state.isLoggedIn = false;
    },
    [authStateChanged.fulfilled](state, action) {
      state.user.userId = action.payload.uid;
      state.user.nickname = action.payload.displayName;
      state.isLoggedIn = true;
    },
    [uploadPhotoToStorage.fulfilled](state, action) {
      state.user.photoURL = action.payload;
    },
    // updateUser: {
    //   reducer(state, { payload }) {
    //     return { ...state, ...payload };
    //   },
    //   prepare(data) {
    //     return {
    //       user: { userId: data.uid, nickname: data.displayName },
    //       token: data.accessToken,
    //       isLoggedIn: true,
    //     };
    //   },
    // },
    // [refreshUser.pending](state) {
    //   state.isRefreshing = true;
    // },
    // [refreshUser.fulfilled](state, action) {
    //   state.user = action.payload;
    //   state.isLoggedIn = true;
    //   state.isRefreshing = false;
    // },
    // [refreshUser.rejected](state) {
    //   state.isRefreshing = false;
    // },
  },
});

export const authReducer = authSlice.reducer;
